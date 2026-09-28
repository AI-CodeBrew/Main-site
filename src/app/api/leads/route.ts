import { NextRequest, NextResponse } from "next/server";
import { insertLead, type LeadInsert } from "@/lib/leads/store";
import { notifyTeam } from "@/lib/chat/handoff";

export async function POST(req: NextRequest) {
  let body: LeadInsert & { message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email && !body.whatsapp) {
    return NextResponse.json({ error: "email or whatsapp required" }, { status: 400 });
  }

  const result = await insertLead(body);

  await notifyTeam({
    sessionId: result.id ?? "lead-form",
    pathname: body.source_page ?? undefined,
    name: body.name ?? undefined,
    email: body.email ?? undefined,
    whatsapp: body.whatsapp ?? undefined,
    message: body.message ?? body.services_interest ?? undefined,
    subject: `[Fynk Tech] New lead — ${body.lead_type ?? "contact"}`,
  });

  return NextResponse.json({ ok: true, id: result.id, stored: result.ok });
}
