"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, RefreshCw } from "lucide-react";

type LeadRow = Record<string, unknown>;

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact form",
  "strategy-call": "Talk to an expert",
  chat: "Chat",
  calculator: "ROI calculator",
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-violet-50 text-violet-700 border-violet-200",
  won: "bg-green-50 text-green-700 border-green-200",
  lost: "bg-gray-100 text-gray-500 border-gray-200",
};

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : "");

function qualificationOf(lead: LeadRow): Record<string, unknown> {
  const q = lead.qualification;
  return q && typeof q === "object" ? (q as Record<string, unknown>) : {};
}

function messageOf(lead: LeadRow): string {
  return str(qualificationOf(lead).message);
}

function typeLabel(lead: LeadRow): string {
  const t = str(lead.lead_type);
  return TYPE_LABELS[t] ?? (t || "Lead");
}

function formatDate(value: unknown): string {
  const d = new Date(String(value ?? ""));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function timeAgo(value: unknown): string {
  const d = new Date(String(value ?? ""));
  if (Number.isNaN(d.getTime())) return "";
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days < 30 ? `${days}d ago` : d.toLocaleDateString();
}

/** wa.me needs digits only, with country code. Local "03xx…" Pakistani numbers become 92…. */
function whatsappUrl(raw: string, text: string): string | null {
  let digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `92${digits.slice(1)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Extra form answers worth showing besides the message (e.g. first/last name are skipped). */
const HIDDEN_QUALIFICATION_KEYS = new Set(["message", "firstName", "lastName", "phone"]);

export function LeadsAdminClient({ supabaseEnabled }: { supabaseEnabled: boolean }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  // True until the first load finishes, so an empty inbox isn't shown as "No messages yet".
  const [loading, setLoading] = useState(supabaseEnabled);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the inbox when this section opens (not before).
  useEffect(() => {
    if (!supabaseEnabled) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/admin/leads", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load leads");
        const data = (await res.json()) as { leads: LeadRow[] };
        if (!cancelled) setLeads(data.leads);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load leads");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [supabaseEnabled]);

  const visible = useMemo(
    () =>
      leads.filter(
        (l) =>
          (!typeFilter || str(l.lead_type) === typeFilter) &&
          (!statusFilter || str(l.status) === statusFilter),
      ),
    [leads, typeFilter, statusFilter],
  );
  const selected = visible.find((l) => String(l.id) === selectedId) ?? null;
  const newCount = leads.filter((l) => str(l.status) === "new").length;

  async function refresh() {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load leads");
      const data = (await res.json()) as { leads: LeadRow[] };
      setLeads(data.leads);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load leads");
    } finally {
      setRefreshing(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setError(null);
    // Update on screen right away; roll back if the save fails.
    const previous = leads;
    setLeads((all) => all.map((l) => (String(l.id) === id ? { ...l, status } : l)));
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!res.ok || !data.ok) {
      setLeads(previous);
      setError("Could not update status");
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All sources</option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={!supabaseEnabled || refreshing}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0A0045] px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden />
          Refresh
        </button>
        <span className="text-sm text-gray-500">
          {visible.length} shown · <strong className="text-blue-700">{newCount} new</strong>
        </span>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <ul className="space-y-2 md:max-w-[340px]" aria-busy="true" aria-label="Loading messages">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <span className="block h-3 w-1/2 animate-pulse rounded bg-gray-100" />
              <span className="mt-2 block h-3 w-1/3 animate-pulse rounded bg-gray-100" />
              <span className="mt-2 block h-3 w-5/6 animate-pulse rounded bg-gray-100" />
            </li>
          ))}
        </ul>
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          No messages yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-[340px_1fr]">
          {/* Inbox list (on phones it hides while a message is open) */}
          <ul
            className={`space-y-2 md:max-h-[75vh] md:overflow-y-auto md:pr-1 ${selected ? "hidden md:block" : ""}`}
          >
            {visible.map((lead) => {
              const id = String(lead.id);
              const isNew = str(lead.status) === "new";
              const snippet = messageOf(lead) || str(lead.services_interest) || str(lead.email);
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(id)}
                    className={`w-full rounded-xl border bg-white p-3 text-left shadow-sm transition-colors hover:border-[#5A83FF]/50 ${
                      id === selectedId ? "border-[#5A83FF] ring-1 ring-[#5A83FF]/30" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isNew && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-label="New" />}
                      <span
                        className={`truncate font-semibold ${isNew ? "text-[#070643]" : "text-gray-700"}`}
                      >
                        {str(lead.name) || str(lead.email) || "Unknown"}
                      </span>
                      <span className="ml-auto shrink-0 text-xs text-gray-400">{timeAgo(lead.created_at)}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                        {typeLabel(lead)}
                      </span>
                      {str(lead.services_interest) && (
                        <span className="truncate text-xs text-gray-500">{str(lead.services_interest)}</span>
                      )}
                    </div>
                    {snippet && <p className="mt-1.5 line-clamp-2 text-sm text-gray-600">{snippet}</p>}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Message detail */}
          <section
            className={`rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm ${
              selected ? "" : "hidden md:block"
            }`}
          >
            {!selected ? (
              <p className="py-16 text-center text-gray-400">Select a message to read it.</p>
            ) : (
              <LeadDetail
                lead={selected}
                onBack={() => setSelectedId(null)}
                onStatus={(status) => void updateStatus(String(selected.id), status)}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
}

function LeadDetail({
  lead,
  onBack,
  onStatus,
}: {
  lead: LeadRow;
  onBack: () => void;
  onStatus: (status: string) => void;
}) {
  const name = str(lead.name) || "there";
  const email = str(lead.email);
  const phone = str(lead.whatsapp) || str(qualificationOf(lead).phone);
  const message = messageOf(lead);
  const status = str(lead.status) || "new";
  const replyText = `Hi ${name}, thanks for contacting Fynk Tech.`;
  const wa = phone ? whatsappUrl(phone, replyText) : null;

  const extras = Object.entries(qualificationOf(lead)).filter(
    ([key, value]) => !HIDDEN_QUALIFICATION_KEYS.has(key) && value !== null && value !== "",
  );
  const details: [string, string][] = (
    [
      ["Company", str(lead.company)],
      ["Interested in", str(lead.services_interest)],
      ["Budget", str(lead.budget_range)],
      ["Timeline", str(lead.timeline)],
      ["Country", str(lead.country)],
      ["Page", str(lead.source_page)],
      ["Campaign", [str(lead.utm_source), str(lead.utm_medium), str(lead.utm_campaign)].filter(Boolean).join(" / ")],
      ["Score", str(lead.lead_score)],
    ] as [string, string][]
  ).filter(([, v]) => v);

  // Replying counts as contacting: move a "new" lead to "contacted".
  const markContacted = () => {
    if (status === "new") onStatus("contacted");
  };

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-3 text-sm text-[#5A83FF] md:hidden">
        ← All messages
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold" style={{ color: "#070643" }}>
            {str(lead.name) || "Unknown"}
          </h2>
          <p className="text-sm text-gray-500">
            {typeLabel(lead)} · {formatDate(lead.created_at)}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Status
          <select
            value={status}
            onChange={(e) => onStatus(e.target.value)}
            className={`rounded-full border px-3 py-1 text-sm font-medium ${STATUS_STYLES[status] ?? ""}`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Contact the person */}
      <div className="mt-5 flex flex-wrap gap-2">
        {email && (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Re: your message to Fynk Tech")}&body=${encodeURIComponent(`${replyText}\n\n`)}`}
            onClick={markContacted}
            className="inline-flex items-center gap-2 rounded-full bg-[#0A0045] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={markContacted}
            className="inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            onClick={markContacted}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Phone className="h-4 w-4" aria-hidden /> Call
          </a>
        )}
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {email && (
          <div className="min-w-0">
            <dt className="text-gray-400">Email</dt>
            <dd className="truncate text-gray-800">{email}</dd>
          </div>
        )}
        {phone && (
          <div>
            <dt className="text-gray-400">Phone / WhatsApp</dt>
            <dd className="text-gray-800">{phone}</dd>
          </div>
        )}
        {details.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-gray-400">{label}</dt>
            <dd className="break-words text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-500">Message</h3>
        {message ? (
          <p className="mt-2 whitespace-pre-wrap rounded-xl bg-[#f8f9fc] p-4 text-[15px] leading-relaxed text-gray-800">
            {message}
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-400">No message was written.</p>
        )}
      </div>

      {extras.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500">Other answers</h3>
          <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {extras.map(([key, value]) => (
              <div key={key} className="min-w-0">
                <dt className="text-gray-400">{key}</dt>
                <dd className="break-words text-gray-800">
                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
