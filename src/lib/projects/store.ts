import { DEFAULT_PROJECTS, type ProjectCard } from "./defaults";

export type Project = {
  id: string;
  title: string;
  meta: string | null;
  image_url: string;
  href: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = Pick<Project, "title" | "image_url" | "sort_order" | "is_published"> &
  Partial<Pick<Project, "meta" | "href">>;

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function request<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate: number } },
): Promise<Result<T>> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return { ok: false, error: "Supabase not configured" };

  const res = await fetch(`${url}/rest/v1/${path}`, {
    cache: init?.next ? undefined : "no-store",
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[projects/store]", res.status, text);
    return { ok: false, error: text.slice(0, 300) };
  }

  return { ok: true, data: (await res.json()) as T };
}

export async function listProjects(opts?: { includeHidden?: boolean }): Promise<Result<Project[]>> {
  const params = new URLSearchParams({ select: "*", order: "sort_order.asc,created_at.asc" });
  if (!opts?.includeHidden) params.set("is_published", "eq.true");
  return request<Project[]>(`projects?${params}`);
}

/**
 * Cards for the public PROJECTS section. Cached for a minute, so admin edits show up
 * within ~60s without making every page view hit Supabase. Falls back to the defaults.
 */
export async function getProjectCards(): Promise<ProjectCard[]> {
  const params = new URLSearchParams({
    select: "*",
    order: "sort_order.asc,created_at.asc",
    is_published: "eq.true",
  });
  const result = await request<Project[]>(`projects?${params}`, { next: { revalidate: 60 } });
  if (!result.ok || result.data.length === 0) return DEFAULT_PROJECTS;
  return result.data.map(toCard);
}

export function toCard(project: Project): ProjectCard {
  return {
    title: project.title,
    meta: project.meta ?? "",
    image: project.image_url,
    href: project.href || "/contact",
  };
}

export async function createProject(input: ProjectInput): Promise<Result<Project>> {
  const res = await request<Project[]>("projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return res.ok ? { ok: true, data: res.data[0] } : res;
}

export async function updateProject(id: string, patch: Partial<ProjectInput>): Promise<Result<Project>> {
  const res = await request<Project[]>(`projects?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) return res;
  if (!res.data[0]) return { ok: false, error: "Not found" };
  return { ok: true, data: res.data[0] };
}

export async function deleteProject(id: string): Promise<Result<null>> {
  const res = await request<Project[]>(`projects?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  return res.ok ? { ok: true, data: null } : res;
}
