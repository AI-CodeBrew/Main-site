import { scoreLead, type LeadScore } from "./score";

export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type LeadInsert = {
  name?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  country?: string | null;
  company?: string | null;
  source_page?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  lead_type?: string | null;
  services_interest?: string | null;
  qualification?: Record<string, unknown> | null;
  budget_range?: string | null;
  timeline?: string | null;
  chat_transcript_ref?: string | null;
  lead_score?: LeadScore | null;
  status?: LeadStatus;
};

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function insertLead(lead: LeadInsert): Promise<{ id: string | null; ok: boolean }> {
  const url = supabaseUrl();
  const key = supabaseKey();

  const lead_score =
    lead.lead_score ?? scoreLead(lead);
  const row = {
    ...lead,
    lead_score,
    status: lead.status ?? "new",
  };

  if (!url || !key) {
    console.log("[insertLead] Supabase not configured — lead payload:", row);
    return { id: null, ok: false };
  }

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[insertLead] Supabase error", res.status, err);
    return { id: null, ok: false };
  }

  const data = (await res.json()) as { id: string }[];
  return { id: data[0]?.id ?? null, ok: true };
}

export async function listLeads(filters?: {
  status?: LeadStatus;
  lead_score?: LeadScore;
}): Promise<Record<string, unknown>[]> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return [];

  const params = new URLSearchParams({ order: "created_at.desc", select: "*" });
  if (filters?.status) params.set("status", `eq.${filters.status}`);
  if (filters?.lead_score) params.set("lead_score", `eq.${filters.lead_score}`);

  const res = await fetch(`${url}/rest/v1/leads?${params}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return (await res.json()) as Record<string, unknown>[];
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return false;

  const res = await fetch(`${url}/rest/v1/leads?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ status }),
  });
  return res.ok;
}
