import { NextRequest, NextResponse } from "next/server";
import { deleteTeamMember, updateTeamMember } from "@/lib/team/store";
import { firstIssue, teamMemberPatchSchema } from "@/lib/team/validation";

const ADMIN_COOKIE = "fynk_admin";

function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}

type Context = { params: Promise<{ id: string }> };

/** Admin update. */
export async function PATCH(req: NextRequest, { params }: Context) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = teamMemberPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 });
  }

  const result = await updateTeamMember(id, parsed.data);
  if (!result.ok) {
    const status = result.error === "Not found" ? 404 : 502;
    return NextResponse.json({ error: result.error }, { status });
  }
  return NextResponse.json({ ok: true, item: result.data });
}

/** Admin delete. */
export async function DELETE(req: NextRequest, { params }: Context) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const result = await deleteTeamMember(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
