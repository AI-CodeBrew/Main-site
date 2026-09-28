"use client";

import { useState } from "react";

type LeadRow = Record<string, unknown>;

export function LeadsAdminClient({
  initialLeads,
  supabaseEnabled,
}: {
  initialLeads: LeadRow[];
  supabaseEnabled: boolean;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");

  async function refresh() {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (scoreFilter) params.set("lead_score", scoreFilter);
    const res = await fetch(`/api/admin/leads?${params}`);
    if (res.ok) {
      const data = (await res.json()) as { leads: LeadRow[] };
      setLeads(data.leads);
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {["new", "contacted", "qualified", "won", "lost"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All scores</option>
          {["hot", "warm", "cold"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={!supabaseEnabled}
          className="px-4 py-2 rounded-lg bg-[#0A0045] text-white text-sm disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-500 text-sm">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Created</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Type</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const id = String(lead.id ?? "");
                return (
                  <tr key={id} className="border-t">
                    <td className="p-3 whitespace-nowrap">
                      {lead.created_at ? String(lead.created_at).slice(0, 10) : "—"}
                    </td>
                    <td className="p-3">{String(lead.name ?? "—")}</td>
                    <td className="p-3">{String(lead.email ?? "—")}</td>
                    <td className="p-3">{String(lead.lead_type ?? "—")}</td>
                    <td className="p-3">{String(lead.lead_score ?? "—")}</td>
                    <td className="p-3">
                      <select
                        value={String(lead.status ?? "new")}
                        onChange={(e) => void updateStatus(id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {["new", "contacted", "qualified", "won", "lost"].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
