import { NextRequest, NextResponse } from "next/server";
import {
  CHAT_SETTINGS_LIMITS,
  getChatSettings,
  normalizeChatSettings,
  saveChatSettings,
  type ChatSettings,
} from "@/lib/chat/settings";

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.cookies.get("fynk_admin")?.value === adminPassword;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getChatSettings({ bypassCache: true });
  return NextResponse.json({ settings, limits: CHAT_SETTINGS_LIMITS });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Partial<ChatSettings>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const current = await getChatSettings({ bypassCache: true });
  const result = await saveChatSettings(normalizeChatSettings({ ...current, ...body }));
  if (!result.ok) {
    return NextResponse.json({ error: result.error || "Failed to save" }, { status: 502 });
  }
  return NextResponse.json({ settings: result.data });
}
