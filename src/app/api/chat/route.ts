import { NextRequest, NextResponse } from "next/server";
import { retrieveContext } from "@/lib/chat/retrieve";
import { siteConfig } from "@/lib/content/site";

export type ChatAction = "book" | "human" | "continue";

type ChatMessage = { role: "user" | "assistant"; content: string };

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

const SYSTEM = `You are the Fynk Tech website assistant. Answer ONLY using the retrieved context below. If the answer is not in context, say you don't know and offer to connect them with the team.

Qualify gradually: business type, what they need, timeline, budget range, and country — one or two questions at a time, not all at once.

After providing useful value, ask for their name and email OR WhatsApp to follow up. Before collecting any personal data, remind them that details are used only to respond to their inquiry (privacy).

Suggest actions when appropriate:
- "book" if they want a strategy call (booking URL in context if present)
- "human" if they want a person or you cannot help
- "continue" for normal chat

Keep replies concise (2–4 short paragraphs max). Do not invent clients, prices, or results.`;

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

  let body: { messages?: ChatMessage[]; pathname?: string; sessionId?: string };
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
  const query = lastUser?.content ?? messages.map((m) => m.content).join(" ");
  const context = retrieveContext(query);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  if (!apiKey) {
    return NextResponse.json({
      reply:
        "Thanks for your message. Our AI assistant is not configured yet (missing ANTHROPIC_API_KEY). Please use Contact or WhatsApp, or book a call from the site.",
      actions: ["human", "book"] as ChatAction[],
      needsPrivacyConsent: false,
    });
  }

  const contextBlock = `RETRIEVED CONTEXT:\n${context}\n\nSite booking URL: ${siteConfig.bookingUrl || "TODO: set NEXT_PUBLIC_BOOKING_URL"}`;

  const anthropicMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: `${SYSTEM}\n\n${contextBlock}`,
      messages: anthropicMessages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[chat] Anthropic error", res.status, errText);
    return NextResponse.json(
      { error: "Assistant temporarily unavailable.", actions: ["human"] as ChatAction[] },
      { status: 502 },
    );
  }

  const data = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  const reply =
    data.content?.find((c) => c.type === "text")?.text ??
    "Sorry, I could not generate a reply. Would you like to talk to our team?";

  const userText = lastUser?.content ?? "";
  const actions = detectActions(reply, userText);
  const privacy = needsPrivacyConsent(messages);

  let finalReply = reply;
  if (privacy && !/privacy|personal data|inquiry only/i.test(reply)) {
    finalReply += `\n\nBefore we save your details: we use name, email, or WhatsApp only to respond to your inquiry. See our Privacy Policy on fynktech.com/privacy. Reply "I agree" to continue.`;
  }

  return NextResponse.json({
    reply: finalReply,
    actions,
    needsPrivacyConsent: privacy,
  });
}
