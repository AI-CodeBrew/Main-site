import { NextRequest, NextResponse } from "next/server";
import { isWithinBusinessHours } from "@/lib/chat/business-hours";
import { chatwootHandoff, notifyTeam, type HandoffPayload } from "@/lib/chat/handoff";
import { siteConfig } from "@/lib/content/site";

/** Simulated agent wait — set CHAT_HANDOFF_AGENT_TIMEOUT_MS (default 120000). */
const AGENT_TIMEOUT_MS = Number(process.env.CHAT_HANDOFF_AGENT_TIMEOUT_MS ?? "120000");

export async function POST(req: NextRequest) {
  let payload: HandoffPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  /** Default true until Chatwoot/live agents are wired — set to false when ready. */
  const simulateNoAgent = process.env.CHAT_HANDOFF_SIMULATE_NO_AGENT !== "false";

  const withinHours = isWithinBusinessHours();

  if (!withinHours || (simulateNoAgent && AGENT_TIMEOUT_MS >= 0)) {
    return NextResponse.json({
      online: false,
      message: `Our team is currently offline. ${siteConfig.offlineReplyPromise}`,
      offlineReplyPromise: siteConfig.offlineReplyPromise,
    });
  }

  await notifyTeam({ ...payload, subject: "[Fynk Tech] Live chat handoff" });
  const chatwoot = await chatwootHandoff.createConversation(payload);

  return NextResponse.json({
    online: true,
    message: "Connecting you with our team. Someone will follow up shortly.",
    chatwootOk: chatwoot.ok,
    conversationId: chatwoot.conversationId,
  });
}
