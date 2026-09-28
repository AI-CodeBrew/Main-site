import { NextRequest, NextResponse } from "next/server";
import {
  bunnyConfigured,
  buildObjectPath,
  kindFromMime,
  uploadToBunny,
} from "@/lib/bunny/storage";
import { insertMedia } from "@/lib/media/store";
import { normalizeSection } from "@/lib/media/sections";

const MAX_BYTES = 100 * 1024 * 1024;
const ADMIN_COOKIE = "fynk_admin";
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!bunnyConfigured()) {
    return NextResponse.json(
      {
        error:
          "Bunny not configured. Set BUNNY_STORAGE_ZONE, BUNNY_STORAGE_API_KEY, and BUNNY_CDN_URL.",
      },
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

  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File must be between 1 byte and ${MAX_BYTES} bytes` },
      { status: 400 }
    );
  }

  const contentType = file.type || "application/octet-stream";
  if (!ALLOWED.has(contentType)) {
    return NextResponse.json(
      { error: `Unsupported type: ${contentType}` },
      { status: 415 }
    );
  }

  const section = normalizeSection(
    String(form.get("section") || form.get("folder") || "")
  );
  const alt = form.get("alt") ? String(form.get("alt")).slice(0, 200) : null;
  const path = buildObjectPath(file.name || "upload.bin", section);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadToBunny({
      data: buffer,
      path,
      contentType,
    });

    const saved = await insertMedia({
      path: uploaded.path,
      url: uploaded.url,
      kind: kindFromMime(contentType),
      mime_type: contentType,
      size_bytes: uploaded.size,
      original_name: file.name,
      alt,
      folder: section,
    });

    return NextResponse.json({
      ok: true,
      id: saved.id,
      storedInDb: saved.ok,
      section,
      path: uploaded.path,
      url: uploaded.url,
      kind: kindFromMime(contentType),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("[api/media/upload]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
