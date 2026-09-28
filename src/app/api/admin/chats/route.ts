import { NextRequest, NextResponse } from "next/server";
import { listConversations } from "@/lib/chat/store";

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.cookies.get("fynk_admin")?.value === adminPassword;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const q = req.nextUrl.searchParams.get("q") ?? undefined;
  const conversations = await listConversations(q);
  return NextResponse.json({ conversations });
}
