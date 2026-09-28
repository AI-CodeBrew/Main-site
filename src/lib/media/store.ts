import { kindFromMime } from "@/lib/bunny/storage";

export type MediaInsert = {
  path: string;
  url: string;
  kind?: "image" | "video" | "other";
  mime_type?: string | null;
  size_bytes?: number | null;
  original_name?: string | null;
  alt?: string | null;
  folder?: string | null;
};

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function insertMedia(
  row: MediaInsert
): Promise<{ id: string | null; ok: boolean }> {
  const url = supabaseUrl();
  const key = supabaseKey();

  const payload = {
    ...row,
    kind: row.kind ?? kindFromMime(row.mime_type || ""),
  };

  if (!url || !key) {
    console.log("[insertMedia] Supabase not configured — media payload:", payload);
    return { id: null, ok: false };
  }

  const res = await fetch(`${url}/rest/v1/media`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("[insertMedia] Supabase error", res.status, await res.text());
    return { id: null, ok: false };
  }

  const data = (await res.json()) as { id: string }[];
  return { id: data[0]?.id ?? null, ok: true };
}

export async function listMedia(filters?: {
  kind?: "image" | "video" | "other";
  folder?: string;
}): Promise<Record<string, unknown>[]> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return [];

  const params = new URLSearchParams({ order: "created_at.desc", select: "*" });
  if (filters?.kind) params.set("kind", `eq.${filters.kind}`);
  if (filters?.folder) params.set("folder", `eq.${filters.folder}`);

  const res = await fetch(`${url}/rest/v1/media?${params}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return (await res.json()) as Record<string, unknown>[];
}
