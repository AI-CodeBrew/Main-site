import { NextRequest, NextResponse } from "next/server";
import { createProject, getProjectCards, listProjects } from "@/lib/projects/store";
import { firstIssue, projectSchema } from "@/lib/projects/validation";

const ADMIN_COOKIE = "fynk_admin";

function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}

/**
 * Public: published project cards (falls back to the defaults).
 * `?all=1` (admin only): every row, including hidden ones, for /admin/projects.
 */
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("all") === "1") {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await listProjects({ includeHidden: true });
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, items: result.data });
  }

  return NextResponse.json({ ok: true, cards: await getProjectCards() });
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

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 });
  }

  const result = await createProject(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, item: result.data });
}
