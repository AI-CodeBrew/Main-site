import { NextRequest, NextResponse } from "next/server";
import { insertLead, type LeadInsert } from "@/lib/leads/store";
import { notifyTeam } from "@/lib/chat/handoff";

/** Columns of public.leads that forms may set. Anything else in the body is ignored. */
const LEAD_COLUMNS = [
  "name",
  "email",
  "whatsapp",
  "country",
  "company",
  "source_page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "lead_type",
  "services_interest",
  "qualification",
  "budget_range",
  "timeline",
  "chat_transcript_ref",
] as const satisfies readonly (keyof LeadInsert)[];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> & { message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email && !body.whatsapp) {
    return NextResponse.json({ error: "email or whatsapp required" }, { status: 400 });
  }

  // Forms also send `message`, which is not a column: sending it made Supabase reject the
  // whole row, so contact messages were never saved. Keep only real columns, and store the
  // message inside `qualification`, where the admin Leads inbox reads it.
  const lead: LeadInsert = {};
  for (const key of LEAD_COLUMNS) {
    if (body[key] !== undefined) (lead as Record<string, unknown>)[key] = body[key];
  }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message) {
    lead.qualification = { ...(lead.qualification ?? {}), message };
  }

  const result = await insertLead(lead);
  if (!result.ok) {
    console.error("[api/leads] lead not stored", { lead_type: lead.lead_type, source: lead.source_page });
  }

  await notifyTeam({
    sessionId: result.id ?? "lead-form",
    pathname: lead.source_page ?? undefined,
    name: lead.name ?? undefined,
    email: lead.email ?? undefined,
    whatsapp: lead.whatsapp ?? undefined,
    message: message || lead.services_interest || undefined,
    subject: `[FynkTech] New lead — ${lead.lead_type ?? "contact"}`,
  });

  return NextResponse.json({ ok: true, id: result.id, stored: result.ok });
}
