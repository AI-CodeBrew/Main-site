import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/is-admin";
import { deleteBlog, updateBlog } from "@/lib/blogs/store";
import { blogPatchSchema, firstIssue } from "@/lib/blogs/validation";

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

  const parsed = blogPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 });
  }

  const result = await updateBlog(id, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status ?? 502 });
  }
  return NextResponse.json({ ok: true, item: result.data });
}

/** Admin delete. */
export async function DELETE(req: NextRequest, { params }: Context) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const result = await deleteBlog(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status ?? 502 });
  }
  return NextResponse.json({ ok: true });
}
