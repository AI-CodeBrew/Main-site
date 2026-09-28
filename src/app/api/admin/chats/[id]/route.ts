import { NextRequest, NextResponse } from "next/server";
import {
  addChatMessage,
  getConversation,
  getConversationMessages,
  getConversationUsage,
  updateConversation,
  type ChatMode,
} from "@/lib/chat/store";

type Params = { params: Promise<{ id: string }> };

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.cookies.get("fynk_admin")?.value === adminPassword;
}

/** Conversation + all messages. Opening it in admin marks it as read. */
export async function GET(req: NextRequest, { params }: Params) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const conversation = await getConversation(id);
  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const [messages, usage] = await Promise.all([getConversationMessages(id), getConversationUsage(id)]);
  if (conversation.unread_count > 0) {
    await updateConversation(id, { unread_count: 0 });
    conversation.unread_count = 0;
  }
  return NextResponse.json({ conversation, messages, usage });
}

/** Admin reply. Takes the chat over from the bot. */
export async function POST(req: NextRequest, { params }: Params) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: { content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const content = body.content?.trim();
  if (!content || content.length > 4000) {
    return NextResponse.json({ error: "content required (max 4000 chars)" }, { status: 400 });
  }

  const message = await addChatMessage(id, "admin", content);
  if (!message) {
    return NextResponse.json({ error: "Could not save reply" }, { status: 502 });
  }
  await updateConversation(id, { mode: "human", needs_human: false, unread_count: 0 });
  return NextResponse.json({ message });
}

/** Switch between bot and human mode ("Hand back to bot"). */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: { mode?: ChatMode };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body.mode !== "bot" && body.mode !== "human") {
    return NextResponse.json({ error: "mode must be bot or human" }, { status: 400 });
  }
  const ok = await updateConversation(id, {
    mode: body.mode,
    ...(body.mode === "bot" ? { needs_human: false } : {}),
  });
  return NextResponse.json({ ok });
}
