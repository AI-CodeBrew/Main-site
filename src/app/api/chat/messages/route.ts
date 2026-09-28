import { NextRequest, NextResponse } from "next/server";
import { getAdminMessagesSince, getSessionHistory } from "@/lib/chat/store";

// Used by the website chat widget:
// - `?history=1` restores the whole conversation after a page reload,
// - otherwise it polls for replies sent from /admin/chats.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId") ?? "";
  if (!/^[\w-]{8,100}$/.test(sessionId)) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  if (req.nextUrl.searchParams.get("history") === "1") {
    const { mode, messages } = await getSessionHistory(sessionId);
    return NextResponse.json({
      mode,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        created_at: m.created_at,
      })),
    });
  }

  const after = req.nextUrl.searchParams.get("after");
  const afterIso = after && !Number.isNaN(Date.parse(after)) ? after : null;

  const { mode, messages } = await getAdminMessagesSince(sessionId, afterIso);
  return NextResponse.json({
    mode,
    messages: messages.map((m) => ({ id: m.id, content: m.content, created_at: m.created_at })),
  });
}
