import { NextRequest, NextResponse } from "next/server";
import { listLeads, updateLeadStatus, type LeadStatus } from "@/lib/leads/store";

const ADMIN_COOKIE = "fynk_admin";

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.cookies.get("fynk_admin")?.value === adminPassword;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") as LeadStatus | null;
  const lead_score = req.nextUrl.searchParams.get("lead_score") as "hot" | "warm" | "cold" | null;
  const leads = await listLeads({
    status: status ?? undefined,
    lead_score: lead_score ?? undefined,
  });
  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string; status?: LeadStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }
  const ok = await updateLeadStatus(body.id, body.status);
  return NextResponse.json({ ok });
}
