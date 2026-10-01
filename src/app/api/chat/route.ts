import { randomUUID } from "node:crypto";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { after, NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { flushPostHogLogs, posthogChatLogger } from "@/instrumentation";
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
import { callOpenAI, chatModel } from "@/lib/chat/openai";
import { getChatSettings } from "@/lib/chat/settings";
import { prepareHistory } from "@/lib/chat/history";
import {
  addMemoryTurn,
  formatMemoryBlock,
  isMem0Enabled,
  MEM0_RECENT_LIMIT,
  resolveMemoryUserId,
  searchMemories,
} from "@/lib/chat/memory";

export type ChatAction = "book" | "human" | "continue";

type ChatMessage = { role: "user" | "assistant" | "admin"; content: string };

type AiGeneration = {
  distinctId: string;
  sessionId: string;
  traceId: string;
  model: string;
  latency: number;
  status: number;
  inputTokens?: number;
  outputTokens?: number;
  stopReason?: string | null;
};

function createPostHogClient(): PostHog | null {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!token || !host) {
    if (process.env.NODE_ENV === "development" && (!token || !host)) {
      // PostHog is optional for local chat — skip quietly when unset.
    }
    return null;
  }

  return new PostHog(token, {
    host,
    flushAt: 1,
    flushInterval: 0,
    privacyMode: true,
    enableExceptionAutocapture: true,
  });
}

async function captureAiGeneration(client: PostHog | null, generation: AiGeneration) {
  if (!client) return;

  client.capture({
    distinctId: generation.distinctId,
    event: "$ai_generation",
    properties: {
      $ai_trace_id: generation.traceId,
      $ai_session_id: generation.sessionId,
      $ai_span_id: randomUUID(),
      $ai_span_name: "openai_chat_completions",
      $ai_model: generation.model,
      $ai_provider: "openai",
      $ai_input_tokens: generation.inputTokens,
      $ai_output_tokens: generation.outputTokens,
      $ai_latency: generation.latency,
      $ai_http_status: generation.status,
      $ai_stop_reason: generation.stopReason,
      $ai_max_tokens: 1024,
      $ai_base_url: "https://api.openai.com",
      $ai_request_url: "https://api.openai.com/v1/chat/completions",
      $ai_is_error: generation.status >= 400,
    },
  });
  await client.shutdown();
}

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

  let body: {
    messages?: ChatMessage[];
    pathname?: string;
    sessionId?: string;
    distinctId?: string;
    visitorName?: string;
    visitorPhone?: string;
  };
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

  const sessionId =
    typeof body.sessionId === "string" && /^[\w-]{8,100}$/.test(body.sessionId) ? body.sessionId : null;
  const visitorName =
    typeof body.visitorName === "string"
      ? body.visitorName.replace(/[\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim().slice(0, 60) || null
      : null;
  const visitorPhone =
    typeof body.visitorPhone === "string"
      ? body.visitorPhone.replace(/[^\d+\s-]/g, "").replace(/\s+/g, " ").trim().slice(0, 20) || null
      : null;
  let conversation: ChatConversation | null = null;
  if (sessionId && lastUser) {
    try {
      conversation = await getOrCreateConversation(sessionId, body.pathname ?? null);
      if (conversation) {
        await addChatMessage(conversation.id, "user", lastUser.content);
        const contact = extractContact(lastUser.content);
        const knownName = visitorName ?? conversation.visitor_name;
        if (knownName) {
          if (conversation.visitor_name !== knownName) contact.visitor_name = knownName;
          else delete contact.visitor_name;
        }
        if (visitorPhone) {
          const stored = visitorPhone.replace(/[\s-]/g, "");
          if (conversation.visitor_whatsapp !== stored) contact.visitor_whatsapp = stored;
          else delete contact.visitor_whatsapp;
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

  if (conversation?.mode === "human") {
    return NextResponse.json({
      reply: null,
      humanMode: true,
      actions: ["continue"] as ChatAction[],
      needsPrivacyConsent: false,
    });
  }

  const query = lastUser?.content ?? messages.map((m) => m.content).join(" ");
  const mem0On = isMem0Enabled();
  const memoryUserId = mem0On
    ? resolveMemoryUserId({
        sessionId,
        visitorPhone,
        conversation,
      })
    : null;

  // Knowledge RAG + Mem0 search in parallel; Mem0 is fail-open / time-boxed.
  const [context, memoryHits] = await Promise.all([
    retrieveContext(query),
    memoryUserId ? searchMemories(query, memoryUserId) : Promise.resolve([]),
  ]);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      reply:
        "Thanks for your message. Our AI assistant is not configured yet (missing OPENAI_API_KEY). Please use Contact or WhatsApp, or book a call from the site.",
      actions: ["human", "book"] as ChatAction[],
      needsPrivacyConsent: false,
    });
  }

  const settings = await getChatSettings();
  // With Mem0: short recent window + no summary LLM (facts live in Mem0 → lower OpenAI cost).
  const historySettings = mem0On
    ? {
        ...settings,
        historyLimitEnabled: true,
        historyLimit: Math.min(settings.historyLimit, MEM0_RECENT_LIMIT),
        summaryEnabled: false,
      }
    : settings;

  let history: { role: ChatMessage["role"]; content: string }[] = historySettings.historyLimitEnabled
    ? messages.slice(-historySettings.historyLimit)
    : messages;
  let summary: string | null = null;
  if (conversation) {
    const saved = await getConversationMessages(conversation.id);
    if (saved.length > 0) {
      const prepared = await prepareHistory(conversation, saved, historySettings);
      history = prepared.history;
      summary = prepared.summary;
    }
  }

  const knownName = conversation?.visitor_name ?? visitorName;
  const nameBlock = knownName
    ? `VISITOR NAME: ${knownName} (already collected — use it naturally and do not ask for their name again).\n\n`
    : "";
  const memoryBlock = formatMemoryBlock(memoryHits);
  const summaryBlock = summary ? `SUMMARY OF EARLIER MESSAGES IN THIS CHAT:\n${summary}\n\n` : "";
  const contextBlock = `RETRIEVED CONTEXT:\n${context}\n\nSite booking URL: ${siteConfig.bookingUrl || "TODO: set NEXT_PUBLIC_BOOKING_URL"}`;

  const model = chatModel();
  const aiSessionId = body.sessionId ?? randomUUID();
  const traceId = randomUUID();
  const posthog = createPostHogClient();
  const distinctId = body.distinctId ?? aiSessionId;

  posthogChatLogger?.emit({
    body: "chat_generation_requested",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "chat.model": model,
      "chat.message_count": messages.length,
    },
  });

  const startedAt = performance.now();
  const result = await callOpenAI(
    [
      {
        role: "system",
        content: `${CHAT_SYSTEM_PROMPT}\n\n${nameBlock}${memoryBlock}${summaryBlock}${contextBlock}`,
      },
      ...history.map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    ],
    1024,
  );
  const latency = (performance.now() - startedAt) / 1000;

  if (!result.ok) {
    console.error("[chat] OpenAI error", result.status, result.error);
    posthogChatLogger?.emit({
      body: "chat_generation_failed",
      severityNumber: SeverityNumber.ERROR,
      attributes: {
        "chat.model": model,
        "http.response.status_code": result.status,
        "chat.latency_seconds": latency,
      },
    });
    after(flushPostHogLogs);
    await captureAiGeneration(posthog, {
      distinctId,
      sessionId: aiSessionId,
      traceId,
      model,
      latency,
      status: result.status || 502,
    });
    return NextResponse.json(
      { error: "Assistant temporarily unavailable.", actions: ["human"] as ChatAction[] },
      { status: 502 },
    );
  }

  const reply = result.text || "Sorry, I could not generate a reply. Would you like to talk to our team?";

  await captureAiGeneration(posthog, {
    distinctId,
    sessionId: aiSessionId,
    traceId,
    model: result.usage.model,
    latency,
    status: 200,
    inputTokens: result.usage.inputTokens,
    outputTokens: result.usage.outputTokens,
    stopReason: "stop",
  });

  const userText = lastUser?.content ?? "";
  const actions = detectActions(reply, userText);
  const privacy = needsPrivacyConsent(messages);

  posthogChatLogger?.emit({
    body: "chat_generation_completed",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "chat.model": result.usage.model,
      "http.response.status_code": 200,
      "chat.latency_seconds": latency,
      "chat.output_tokens": result.usage.outputTokens,
      "chat.action_count": actions.length,
    },
  });
  after(flushPostHogLogs);

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

  // Persist durable facts after the response — does not block the visitor.
  if (memoryUserId && lastUser) {
    const uid = memoryUserId;
    const turnUserText = lastUser.content;
    after(() =>
      addMemoryTurn({
        userId: uid,
        userText: turnUserText,
        assistantText: finalReply,
        sessionId,
        conversationId: conversation?.id ?? null,
      }),
    );
  }

  return NextResponse.json({
    reply: finalReply,
    actions,
    needsPrivacyConsent: privacy,
  });
}
