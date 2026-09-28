import { NextRequest, NextResponse } from "next/server";
import { createTeamMember, listTeamMembers } from "@/lib/team/store";
import { firstIssue, teamMemberSchema } from "@/lib/team/validation";

const ADMIN_COOKIE = "fynk_admin";

function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}

/** Public read of published members; `?all=1` (admin only) includes hidden ones. */
export async function GET(req: NextRequest) {
  const includeHidden = req.nextUrl.searchParams.get("all") === "1";
  if (includeHidden && !isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await listTeamMembers({ includeHidden });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, items: result.data });
}

/** Admin create. */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = teamMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 });
  }

  const result = await createTeamMember(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, item: result.data });
}
