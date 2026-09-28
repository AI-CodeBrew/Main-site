/**
 * Bunny Storage uploads via regional HTTP API.
 * Zone: fynktech-website · Region: Singapore (sg)
 *
 * Env:
 *  BUNNY_STORAGE_ZONE
 *  BUNNY_STORAGE_HOST (default sg.storage.bunnycdn.com)
 *  BUNNY_STORAGE_API_KEY (storage password / secret access key)
 *  BUNNY_CDN_URL (Pull Zone base, e.g. https://xxx.b-cdn.net)
 *  BUNNY_UPLOAD_PREFIX (optional, default uploads)
 *  BUNNY_S3_ENDPOINT (optional reference: https://sg-s3.storage.bunnycdn.com)
 */

export type BunnyUploadResult = {
  path: string;
  url: string;
  size: number;
  contentType: string;
};

function toUint8Array(data: ArrayBuffer | Buffer | Uint8Array): Uint8Array {
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (data instanceof Uint8Array) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  return new Uint8Array(data);
}

function required(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export function bunnyConfigured(): boolean {
  return Boolean(
    process.env.BUNNY_STORAGE_ZONE &&
      process.env.BUNNY_STORAGE_API_KEY &&
      process.env.BUNNY_CDN_URL
  );
}

function storageHost(): string {
  return (process.env.BUNNY_STORAGE_HOST || "sg.storage.bunnycdn.com").replace(
    /^https?:\/\//,
    ""
  );
}

function cdnBase(): string {
  return required("BUNNY_CDN_URL").replace(/\/$/, "");
}

function prefix(): string {
  return (process.env.BUNNY_UPLOAD_PREFIX || "uploads").replace(/^\/|\/$/g, "");
}

/** Sanitize filename and build zone-relative path. */
export function buildObjectPath(originalName: string, folder?: string): string {
  const safe = originalName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const parts = [prefix()];
  if (folder) parts.push(folder.replace(/^\/|\/$/g, ""));
  parts.push(`${stamp}-${safe || "file"}`);
  return parts.join("/");
}

export function publicUrlForPath(path: string): string {
  return `${cdnBase()}/${path.replace(/^\//, "")}`;
}

/**
 * Upload bytes to Bunny Storage (PUT).
 * @see https://docs.bunny.net/reference/put_-storagezonename_-path_-filename_
 */
export async function uploadToBunny(opts: {
  data: ArrayBuffer | Buffer | Uint8Array;
  path: string;
  contentType: string;
}): Promise<BunnyUploadResult> {
  const zone = required("BUNNY_STORAGE_ZONE");
  const apiKey = required("BUNNY_STORAGE_API_KEY");
  const host = storageHost();
  const path = opts.path.replace(/^\//, "");
  const endpoint = `https://${host}/${zone}/${path}`;

  const bytes = toUint8Array(opts.data);
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const body = new Blob([ab as ArrayBuffer], {
    type: opts.contentType || "application/octet-stream",
  });

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: {
      AccessKey: apiKey,
      "Content-Type": opts.contentType || "application/octet-stream",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Bunny upload failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return {
    path,
    url: publicUrlForPath(path),
    size: bytes.byteLength,
    contentType: opts.contentType,
  };
}

export async function deleteFromBunny(path: string): Promise<boolean> {
  const zone = required("BUNNY_STORAGE_ZONE");
  const apiKey = required("BUNNY_STORAGE_API_KEY");
  const host = storageHost();
  const clean = path.replace(/^\//, "");
  const endpoint = `https://${host}/${zone}/${clean}`;

  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: { AccessKey: apiKey },
  });
  return res.ok || res.status === 404;
}

export function kindFromMime(mime: string): "image" | "video" | "other" {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "other";
}
