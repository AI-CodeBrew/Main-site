"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import type { TeamMember } from "@/lib/team/store";

type FormState = {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url: string;
  sort_order: number;
  is_published: boolean;
};

const emptyForm: FormState = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  linkedin_url: "",
  sort_order: 0,
  is_published: true,
};

export function TeamAdminClient() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/team?all=1");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setMembers(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load team");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startNew() {
    setEditingId(null);
    const nextOrder = members.length ? Math.max(...members.map((m) => m.sort_order)) + 1 : 0;
    setForm({ ...emptyForm, sort_order: nextOrder });
    setMessage(null);
    setError(null);
  }

  function startEdit(member: TeamMember) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio ?? "",
      photo_url: member.photo_url ?? "",
      linkedin_url: member.linkedin_url ?? "",
      sort_order: member.sort_order,
      is_published: member.is_published,
    });
    setMessage(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("section", "team");
      body.append("alt", form.name || "Team member");
      const res = await fetch("/api/media/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((f) => ({ ...f, photo_url: data.url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(editingId ? `/api/team/${editingId}` : "/api/team", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage(editingId ? "Member updated." : "Member added.");
      setEditingId(null);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function patch(id: string, body: Partial<FormState>) {
    const res = await fetch(`/api/team/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Update failed");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const other = members[index + direction];
    const current = members[index];
    if (!other) return;
    setError(null);
    try {
      // Swap positions; if both share an order value, fall back to their list positions.
      const a = current.sort_order === other.sort_order ? index : current.sort_order;
      const b = current.sort_order === other.sort_order ? index + direction : other.sort_order;
      await Promise.all([patch(current.id, { sort_order: b }), patch(other.id, { sort_order: a })]);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reorder failed");
    }
  }

  async function togglePublished(member: TeamMember) {
    setError(null);
    try {
      await patch(member.id, { is_published: !member.is_published });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function remove(member: TeamMember) {
    if (!window.confirm(`Delete ${member.name}? This cannot be undone.`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/team/${member.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      if (editingId === member.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-sm text-[#5A83FF] hover:underline">
              ← Admin
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: "#070643" }}>
              Team
            </h1>
            <p className="text-gray-600 mt-1">
              Add, edit, reorder and hide the people shown on the{" "}
              <Link href="/team" target="_blank" className="text-[#5A83FF] hover:underline">
                Team page
              </Link>
              .
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <form
          onSubmit={onSave}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5 mb-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: "#070643" }}>
              {editingId ? "Edit member" : "Add member"}
            </h2>
            {editingId && (
              <button type="button" onClick={startNew} className="text-sm text-[#5A83FF] hover:underline">
                Cancel edit
              </button>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Umer Khan"
                required
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Role</span>
              <input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Chief Executive Officer"
                required
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-gray-700">Short bio</span>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[88px]"
              maxLength={600}
              placeholder="Experience, focus areas, notable work…"
            />
          </label>

          <div className="block text-sm">
            <span className="font-medium text-gray-700">Photo</span>
            <div className="mt-1 flex items-start gap-4">
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {form.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.photo_url} alt="" className="h-full w-full object-cover object-top" />
                ) : null}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onUpload(file);
                    e.target.value = "";
                  }}
                  className="block w-full text-sm"
                />
                <input
                  value={form.photo_url}
                  onChange={(e) => setForm((f) => ({ ...f, photo_url: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="…or paste an image URL"
                />
                <span className="text-xs text-gray-400 block">
                  {uploading ? "Uploading…" : "Portrait photos work best (about 4:5). Uploads go to Bunny under team/."}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">LinkedIn URL (optional)</span>
              <input
                value={form.linkedin_url}
                onChange={(e) => setForm((f) => ({ ...f, linkedin_url: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="https://www.linkedin.com/in/…"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Order</span>
              <input
                type="number"
                min={0}
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
            />
            Show on the Team page
          </label>

          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-full px-6 py-2.5 text-white font-semibold disabled:opacity-60"
            style={{ background: "#0A0045" }}
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add member"}
          </button>

          {message && <p className="text-sm text-green-700">{message}</p>}
          {error && (
            <p className="text-sm text-red-600 whitespace-pre-wrap">
              {error}
              {/team_members|PGRST205|schema cache/i.test(error) ? (
                <>
                  {"\n"}
                  Run <code>supabase/migrations/004_team_members.sql</code> in the Supabase SQL Editor, then try
                  again.
                </>
              ) : null}
            </p>
          )}
        </form>

        <h2 className="text-lg font-semibold mb-4" style={{ color: "#070643" }}>
          Members ({members.length})
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500">No team members yet. Add the first one above.</p>
        ) : (
          <ul className="space-y-3">
            {members.map((member, index) => (
              <li
                key={member.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {member.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photo_url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate" style={{ color: "#070643" }}>
                    {member.name}
                    {!member.is_published && (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                        Hidden
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{member.role}</p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-lg border border-gray-200 px-2 py-1 disabled:opacity-30"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === members.length - 1}
                    className="rounded-lg border border-gray-200 px-2 py-1 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublished(member)}
                    className="rounded-lg border border-gray-200 px-3 py-1"
                  >
                    {member.is_published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(member)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-[#5A83FF]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(member)}
                    className="rounded-lg border border-red-100 px-3 py-1 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
