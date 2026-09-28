export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  image: string | null;
  content: string | null;
  status: BlogStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogInput = Pick<Blog, "slug" | "title" | "status" | "sort_order"> &
  Partial<Pick<Blog, "description" | "meta_title" | "meta_description" | "image" | "content">>;

/** Columns for list views — skips the (potentially large) HTML content. */
const LIST_COLUMNS = "id,slug,title,description,image,status,sort_order,created_at,updated_at";

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export type Result<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };

async function request<T>(path: string, init?: RequestInit): Promise<Result<T>> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return { ok: false, error: "Supabase not configured" };

  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[blogs/store]", res.status, text);
    // 23505 = unique violation (slug already taken)
    if (text.includes("23505")) return { ok: false, error: "That slug is already used by another blog.", status: 409 };
    return { ok: false, error: text.slice(0, 300), status: 502 };
  }

  return { ok: true, data: (await res.json()) as T };
}

export type BlogListItem = Omit<Blog, "content" | "meta_title" | "meta_description">;

export async function listBlogs(opts?: { includeDrafts?: boolean }): Promise<Result<BlogListItem[]>> {
  const params = new URLSearchParams({
    select: LIST_COLUMNS,
    order: "sort_order.asc,created_at.desc",
  });
  if (!opts?.includeDrafts) params.set("status", "eq.published");
  return request<BlogListItem[]>(`blogs?${params}`);
}

export async function getBlogBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean }
): Promise<Result<Blog | null>> {
  const params = new URLSearchParams({ select: "*", slug: `eq.${slug}`, limit: "1" });
  if (!opts?.includeDrafts) params.set("status", "eq.published");
  const res = await request<Blog[]>(`blogs?${params}`);
  return res.ok ? { ok: true, data: res.data[0] ?? null } : res;
}

export async function createBlog(input: BlogInput): Promise<Result<Blog>> {
  const res = await request<Blog[]>("blogs", { method: "POST", body: JSON.stringify(input) });
  return res.ok ? { ok: true, data: res.data[0] } : res;
}

export async function updateBlog(id: string, patch: Partial<BlogInput>): Promise<Result<Blog>> {
  const res = await request<Blog[]>(`blogs?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) return res;
  if (!res.data[0]) return { ok: false, error: "Not found", status: 404 };
  return { ok: true, data: res.data[0] };
}

export async function deleteBlog(id: string): Promise<Result<null>> {
  const res = await request<Blog[]>(`blogs?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
  return res.ok ? { ok: true, data: null } : res;
}
