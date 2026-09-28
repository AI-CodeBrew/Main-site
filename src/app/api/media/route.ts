import { NextRequest, NextResponse } from "next/server";
import { listMedia } from "@/lib/media/store";

export async function GET(req: NextRequest) {
  const kind = req.nextUrl.searchParams.get("kind") as
    | "image"
    | "video"
    | "other"
    | null;
  const folder = req.nextUrl.searchParams.get("folder");

  const items = await listMedia({
    kind: kind || undefined,
    folder: folder || undefined,
  });

  return NextResponse.json({ ok: true, items });
}
