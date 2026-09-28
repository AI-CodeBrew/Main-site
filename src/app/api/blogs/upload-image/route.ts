import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/is-admin";
import { bunnyConfigured, buildObjectPath, uploadToBunny } from "@/lib/bunny/storage";
import { insertMedia } from "@/lib/media/store";

const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** Admin upload of a blog cover or inline image to Bunny; returns the public CDN URL. */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!bunnyConfigured()) {
    return NextResponse.json(
      { error: "Bunny not configured. Set BUNNY_STORAGE_ZONE, BUNNY_STORAGE_API_KEY, and BUNNY_CDN_URL." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP or GIF images are allowed." }, { status: 415 });
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 3 MB or smaller." }, { status: 400 });
  }

  const path = buildObjectPath(file.name || "image", "blog");

  try {
    const uploaded = await uploadToBunny({
      data: Buffer.from(await file.arrayBuffer()),
      path,
      contentType: file.type,
    });

    // Also record it in the media library; failure here should not block the editor.
    await insertMedia({
      path: uploaded.path,
      url: uploaded.url,
      kind: "image",
      mime_type: file.type,
      size_bytes: uploaded.size,
      original_name: file.name,
      folder: "blog",
    }).catch(() => undefined);

    return NextResponse.json({ ok: true, url: uploaded.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("[api/blogs/upload-image]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
