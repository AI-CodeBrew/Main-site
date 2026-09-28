import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/chat/retrieve";
import { siteConfig } from "@/lib/content/site";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat/system-prompt";
import {
  addChatMessage,
  addChatUsage,
  extractContact,
  getConversationMessages,
  getOrCreateConversation,
  updateConversation,
  type ChatConversation,
} from "@/lib/chat/store";
import { callOpenAI } from "@/lib/chat/openai";
import { getChatSettings } from "@/lib/chat/settings";
import { prepareHistory } from "@/lib/chat/history";

export type ChatAction = "book" | "human" | "continue";

type ChatMessage = { role: "user" | "assistant" | "admin"; content: string };

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 20;
const WINDOW_MS = 60_000;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

function detectActions(reply: string, userText: string): ChatAction[] {
  const actions: ChatAction[] = ["continue"];
  const combined = `${reply} ${userText}`.toLowerCase();
  if (/book|calendar|strategy call|schedule/.test(combined)) actions.push("book");
  if (/human|agent|team member|speak to someone|talk to/.test(combined)) actions.push("human");
  return [...new Set(actions)];
}

function needsPrivacyConsent(messages: ChatMessage[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const collecting =
    /@|email|whatsapp|phone|name is|my name|call me/i.test(lastUser) ||
    /share your (email|name|whatsapp)/i.test(lastUser);
  const priorConsent = messages.some(
    (m) => m.role === "user" && /privacy|agree|consent|understand/i.test(m.content),
  );
  return collecting && !priorConsent;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
  }

  let body: { messages?: ChatMessage[]; pathname?: string; sessionId?: string; visitorName?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  // Save the conversation for /admin/chats. Best-effort: chat keeps working if Supabase fails.
  const sessionId =
    typeof body.sessionId === "string" && /^[\w-]{8,100}$/.test(body.sessionId) ? body.sessionId : null;
  // Name the visitor typed in the widget before their first chat.
  const visitorName =
    typeof body.visitorName === "string"
      ? body.visitorName.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 60) || null
      : null;
  let conversation: ChatConversation | null = null;
  if (sessionId && lastUser) {
    try {
      conversation = await getOrCreateConversation(sessionId, body.pathname ?? null);
      if (conversation) {
        await addChatMessage(conversation.id, "user", lastUser.content);
        const contact = extractContact(lastUser.content);
        // The name from the widget wins over one guessed from the message text.
        const knownName = visitorName ?? conversation.visitor_name;
        if (knownName) {
          if (conversation.visitor_name !== knownName) contact.visitor_name = knownName;
          else delete contact.visitor_name;
        }
        if (Object.keys(contact).length > 0) {
          await updateConversation(conversation.id, contact);
          conversation = { ...conversation, ...contact };
        }
      }
    } catch (err) {
      console.error("[chat] failed to save user message", err);
    }
  }

  // An admin has taken over this chat from /admin/chats: the bot stays quiet.
  if (conversation?.mode === "human") {
    return NextResponse.json({
      reply: null,
      humanMode: true,
      actions: ["continue"] as ChatAction[],
      needsPrivacyConsent: false,
    });
  }

  const query = lastUser?.content ?? messages.map((m) => m.content).join(" ");
  const context = await retrieveContext(query);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      reply:
        "Thanks for your message. Our AI assistant is not configured yet (missing OPENAI_API_KEY). Please use Contact or WhatsApp, or book a call from the site.",
      actions: ["human", "book"] as ChatAction[],
      needsPrivacyConsent: false,
    });
  }

  // Which messages the AI sees: the saved chat (limited / summarized per admin settings),
  // or the browser's copy when the chat could not be saved.
  const settings = await getChatSettings();
  let history: { role: ChatMessage["role"]; content: string }[] = settings.historyLimitEnabled
    ? messages.slice(-settings.historyLimit)
    : messages;
  let summary: string | null = null;
  if (conversation) {
    const saved = await getConversationMessages(conversation.id);
    if (saved.length > 0) {
      const prepared = await prepareHistory(conversation, saved, settings);
      history = prepared.history;
      summary = prepared.summary;
    }
  }

  // The fixed system prompt goes first so OpenAI can cache it; per-request parts come after.
  const knownName = conversation?.visitor_name ?? visitorName;
  const nameBlock = knownName
    ? `VISITOR NAME: ${knownName} (already collected — use it naturally and do not ask for their name again).\n\n`
    : "";
  const summaryBlock = summary ? `SUMMARY OF EARLIER MESSAGES IN THIS CHAT:\n${summary}\n\n` : "";
  const contextBlock = `RETRIEVED CONTEXT:\n${context}\n\nSite booking URL: ${siteConfig.bookingUrl || "TODO: set NEXT_PUBLIC_BOOKING_URL"}`;

  const result = await callOpenAI(
    [
      { role: "system", content: `${CHAT_SYSTEM_PROMPT}\n\n${nameBlock}${summaryBlock}${contextBlock}` },
      ...history.map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    ],
    1024,
  );

  if (!result.ok) {
    console.error("[chat] OpenAI error", result.status, result.error);
    return NextResponse.json(
      { error: "Assistant temporarily unavailable.", actions: ["human"] as ChatAction[] },
      { status: 502 },
    );
  }

  const reply = result.text || "Sorry, I could not generate a reply. Would you like to talk to our team?";

  const userText = lastUser?.content ?? "";
  const actions = detectActions(reply, userText);
  const privacy = needsPrivacyConsent(messages);

  let finalReply = reply;
  if (privacy && !/privacy|personal data|inquiry only/i.test(reply)) {
    finalReply += `\n\nBefore we save your details: we use name, email, or WhatsApp only to respond to your inquiry. See our Privacy Policy on fynktech.com/privacy. Reply "I agree" to continue.`;
  }

  if (conversation) {
    try {
      const saved = await addChatMessage(conversation.id, "assistant", finalReply);
      await addChatUsage({
        conversation_id: conversation.id,
        message_id: saved?.id ?? null,
        kind: "reply",
        model: result.usage.model,
        input_tokens: result.usage.inputTokens,
        cached_tokens: result.usage.cachedTokens,
        output_tokens: result.usage.outputTokens,
        cost_usd: result.usage.costUsd,
      });
    } catch (err) {
      console.error("[chat] failed to save assistant reply", err);
    }
  }

  return NextResponse.json({
    reply: finalReply,
    actions,
    needsPrivacyConsent: privacy,
  });
}
