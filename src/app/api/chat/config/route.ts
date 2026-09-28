import { NextResponse } from "next/server";
import { getChatSettings } from "@/lib/chat/settings";

/** Public read for the website chat widget: how long a chat is kept after the last activity. */
export async function GET() {
  const settings = await getChatSettings();
  return NextResponse.json({
    sessionTimeoutMinutes: settings.sessionTimeoutEnabled ? settings.sessionTimeoutMinutes : null,
  });
}
