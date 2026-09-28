"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

const TIMEZONES = [
  "Asia/Karachi",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "UTC",
];

type HoursForm = {
  businessHours: string;
  timezone: string;
  offlineReplyPromise: string;
};

export function SettingsAdminClient() {
  const [form, setForm] = useState<HoursForm>({
    businessHours: "",
    timezone: "Asia/Karachi",
    offlineReplyPromise: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings/hours");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setForm({
          businessHours: data.businessHours || "",
          timezone: data.timezone || "Asia/Karachi",
          offlineReplyPromise: data.offlineReplyPromise || "",
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/settings/hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setForm({
        businessHours: data.businessHours,
        timezone: data.timezone,
        offlineReplyPromise: data.offlineReplyPromise,
      });
      setMessage("Saved. Chat and handoff will use these values within ~30 seconds.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-sm text-[#5A83FF] hover:underline">
              ← Admin
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: "#070643" }}>
              Site hours & replies
            </h1>
            <p className="text-gray-600 mt-1">
              Controls business hours, timezone, and the offline reply promise used by chat handoff.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <form
            onSubmit={onSave}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5"
          >
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Public business hours</span>
              <input
                value={form.businessHours}
                onChange={(e) =>
                  setForm((f) => ({ ...f, businessHours: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Mon–Sat, 10:00–19:00"
                required
              />
              <span className="text-xs text-gray-400 mt-1 block">
                Example: Mon–Sat, 10:00–19:00 (used for open/closed checks)
              </span>
            </label>

            <label className="block text-sm">
              <span className="font-medium text-gray-700">Timezone</span>
              <select
                value={form.timezone}
                onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              >
                {!TIMEZONES.includes(form.timezone) && form.timezone ? (
                  <option value={form.timezone}>{form.timezone}</option>
                ) : null}
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-400 mt-1 block">
                Or type an IANA zone in the field below if needed.
              </span>
            </label>

            <label className="block text-sm">
              <span className="font-medium text-gray-700">Custom timezone (optional)</span>
              <input
                value={form.timezone}
                onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Asia/Karachi"
              />
            </label>

            <label className="block text-sm">
              <span className="font-medium text-gray-700">Offline reply promise</span>
              <textarea
                value={form.offlineReplyPromise}
                onChange={(e) =>
                  setForm((f) => ({ ...f, offlineReplyPromise: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[88px]"
                placeholder="We will reply within 2 business hours."
                required
              />
              <span className="text-xs text-gray-400 mt-1 block">
                Shown when chat handoff is outside hours or no agent is available.
              </span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full px-6 py-2.5 text-white font-semibold disabled:opacity-60"
              style={{ background: "#0A0045" }}
            >
              {saving ? "Saving…" : "Save settings"}
            </button>

            {message && <p className="text-sm text-green-700">{message}</p>}
            {error && (
              <p className="text-sm text-red-600 whitespace-pre-wrap">
                {error}
                {/site_settings|PGRST205|schema cache/i.test(error) ? (
                  <>
                    {"\n"}
                    Run <code>supabase/migrations/003_site_settings.sql</code> in the
                    Supabase SQL Editor, then try again.
                  </>
                ) : null}
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
