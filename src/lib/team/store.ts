export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type TeamMemberInput = Pick<TeamMember, "name" | "role" | "sort_order" | "is_published"> &
  Partial<Pick<TeamMember, "bio" | "photo_url" | "linkedin_url">>;

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

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
    console.error("[team/store]", res.status, text);
    return { ok: false, error: text.slice(0, 300) };
  }

  return { ok: true, data: (await res.json()) as T };
}

export async function listTeamMembers(opts?: { includeHidden?: boolean }): Promise<Result<TeamMember[]>> {
  const params = new URLSearchParams({ select: "*", order: "sort_order.asc,created_at.asc" });
  if (!opts?.includeHidden) params.set("is_published", "eq.true");
  return request<TeamMember[]>(`team_members?${params}`);
}

export async function createTeamMember(input: TeamMemberInput): Promise<Result<TeamMember>> {
  const res = await request<TeamMember[]>("team_members", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return res.ok ? { ok: true, data: res.data[0] } : res;
}

export async function updateTeamMember(
  id: string,
  patch: Partial<TeamMemberInput>
): Promise<Result<TeamMember>> {
  const res = await request<TeamMember[]>(`team_members?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) return res;
  if (!res.data[0]) return { ok: false, error: "Not found" };
  return { ok: true, data: res.data[0] };
}

export async function deleteTeamMember(id: string): Promise<Result<null>> {
  const res = await request<TeamMember[]>(`team_members?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return res.ok ? { ok: true, data: null } : res;
}
