import { siteConfig } from "@/lib/content/site";

export type HandoffPayload = {
  sessionId: string;
  pathname?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  message?: string;
  transcript?: string;
  subject?: string;
};

export interface ChatwootHandoff {
  createConversation(payload: HandoffPayload): Promise<{ ok: boolean; conversationId?: string }>;
}

/** Stub — swap for real Chatwoot API when env is configured. */
export class ChatwootHandoffStub implements ChatwootHandoff {
  async createConversation(payload: HandoffPayload) {
    const base = process.env.CHATWOOT_BASE_URL;
    const token = process.env.CHATWOOT_API_TOKEN;
    const accountId = process.env.CHATWOOT_ACCOUNT_ID;
    const inboxId = process.env.CHATWOOT_INBOX_ID;

    if (!base || !token || !accountId || !inboxId) {
      console.log("[ChatwootHandoff] stub — env not set", { sessionId: payload.sessionId });
      return { ok: false };
    }

    // TODO: POST to Chatwoot API — https://www.chatwoot.com/developers/api/
    console.log("[ChatwootHandoff] TODO implement API", {
      base,
      accountId,
      inboxId,
      sessionId: payload.sessionId,
    });
    return { ok: true, conversationId: "stub" };
  }
}

export async function notifyTeam(payload: HandoffPayload & { subject?: string }): Promise<void> {
  const subject =
    payload.subject ?? `[Fynk Tech] Chat handoff — ${payload.email ?? payload.sessionId}`;
  const body = [
    `Session: ${payload.sessionId}`,
    payload.pathname ? `Page: ${payload.pathname}` : null,
    payload.name ? `Name: ${payload.name}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    payload.whatsapp ? `WhatsApp: ${payload.whatsapp}` : null,
    payload.message ? `Message: ${payload.message}` : null,
    payload.transcript ? `\nTranscript:\n${payload.transcript}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `${subject}\n${body}` }),
    }).catch((e) => console.error("[notifyTeam] Slack failed", e));
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL ?? siteConfig.email;
  if (resendKey && to) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Fynk Tech <onboarding@resend.dev>",
        to: [to],
        subject,
        text: body,
      }),
    }).catch((e) => console.error("[notifyTeam] Resend failed", e));
    return;
  }

  console.log("[notifyTeam] no SLACK_WEBHOOK_URL or RESEND — log only\n", body);
}

export const chatwootHandoff: ChatwootHandoff = new ChatwootHandoffStub();
