import { randomUUID } from "node:crypto";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { after, NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { flushPostHogLogs, posthogChatLogger } from "@/instrumentation";
import { retrieveContext } from "@/lib/chat/retrieve";
import { siteConfig } from "@/lib/content/site";

export type ChatAction = "book" | "human" | "continue";

type ChatMessage = { role: "user" | "assistant"; content: string };

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

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
      );
    }
    return null;
  }

  if (!host) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        "NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured",
      );
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
      $ai_span_name: "anthropic_messages",
      $ai_model: generation.model,
      $ai_provider: "anthropic",
      $ai_input_tokens: generation.inputTokens,
      $ai_output_tokens: generation.outputTokens,
      $ai_latency: generation.latency,
      $ai_http_status: generation.status,
      $ai_stop_reason: generation.stopReason,
      $ai_max_tokens: 1024,
      $ai_base_url: "https://api.anthropic.com",
      $ai_request_url: "https://api.anthropic.com/v1/messages",
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

  let body: {
    messages?: ChatMessage[];
    pathname?: string;
    sessionId?: string;
    distinctId?: string;
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
  const query = lastUser?.content ?? messages.map((m) => m.content).join(" ");
  const context = await retrieveContext(query);

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
  const systemPrompt = `${SYSTEM}\n\n${contextBlock}`;
  const anthropicMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
  const aiSessionId = body.sessionId ?? randomUUID();
  const traceId = randomUUID();
  const posthog = createPostHogClient();
  posthogChatLogger?.emit({
    body: "chat_generation_requested",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "chat.model": model,
      "chat.message_count": messages.length,
    },
  });
  const startedAt = performance.now();

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
      system: systemPrompt,
      messages: anthropicMessages,
    }),
  });
  const latency = (performance.now() - startedAt) / 1000;
  const distinctId = body.distinctId ?? aiSessionId;

  if (!res.ok) {
    const errText = await res.text();
    console.error("[chat] Anthropic error", res.status, errText);
    posthogChatLogger?.emit({
      body: "chat_generation_failed",
      severityNumber: SeverityNumber.ERROR,
      attributes: {
        "chat.model": model,
        "http.response.status_code": res.status,
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
      status: res.status,
    });
    return NextResponse.json(
      { error: "Assistant temporarily unavailable.", actions: ["human"] as ChatAction[] },
      { status: 502 },
    );
  }

  const data = (await res.json()) as {
    content?: { type: string; text?: string }[];
    stop_reason?: string | null;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const reply =
    data.content?.find((c) => c.type === "text")?.text ??
    "Sorry, I could not generate a reply. Would you like to talk to our team?";

  await captureAiGeneration(posthog, {
    distinctId,
    sessionId: aiSessionId,
    traceId,
    model,
    latency,
    status: res.status,
    inputTokens: data.usage?.input_tokens,
    outputTokens: data.usage?.output_tokens,
    stopReason: data.stop_reason,
  });

  const userText = lastUser?.content ?? "";
  const actions = detectActions(reply, userText);
  const privacy = needsPrivacyConsent(messages);

  posthogChatLogger?.emit({
    body: "chat_generation_completed",
    severityNumber: SeverityNumber.INFO,
    attributes: {
      "chat.model": model,
      "http.response.status_code": res.status,
      "chat.latency_seconds": latency,
      "chat.output_tokens": data.usage?.output_tokens ?? 0,
      "chat.action_count": actions.length,
    },
  });
  after(flushPostHogLogs);

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
