import { NextRequest, NextResponse } from "next/server";
import { isWithinBusinessHours } from "@/lib/chat/business-hours";
import { chatwootHandoff, notifyTeam, type HandoffPayload } from "@/lib/chat/handoff";
import { getSiteHoursSettings } from "@/lib/settings/store";
import { getConversationBySession, updateConversation } from "@/lib/chat/store";

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

  // Flag the saved conversation so it stands out in /admin/chats.
  try {
    const conversation = await getConversationBySession(payload.sessionId);
    if (conversation) await updateConversation(conversation.id, { needs_human: true });
  } catch (err) {
    console.error("[handoff] failed to flag conversation", err);
  }

  const simulateNoAgent = process.env.CHAT_HANDOFF_SIMULATE_NO_AGENT !== "false";
  const hours = await getSiteHoursSettings();
  const withinHours = isWithinBusinessHours(hours);

  if (!withinHours || (simulateNoAgent && AGENT_TIMEOUT_MS >= 0)) {
    return NextResponse.json({
      online: false,
      message: `Our team is currently offline. ${hours.offlineReplyPromise}`,
      offlineReplyPromise: hours.offlineReplyPromise,
      businessHours: hours.businessHours,
      timezone: hours.timezone,
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
