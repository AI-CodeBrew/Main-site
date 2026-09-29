"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { PROJECT_IMAGE } from "@/lib/projects/defaults";
import type { Project } from "@/lib/projects/store";

type FormState = {
  title: string;
  meta: string;
  image_url: string;
  href: string;
  sort_order: number;
  is_published: boolean;
};

const emptyForm: FormState = {
  title: "",
  meta: "",
  image_url: "",
  href: "",
  sort_order: 0,
  is_published: true,
};

type Size = { width: number; height: number };

type SizeCheck = { tone: "ok" | "warn" | "bad"; label: string };

/** Compare an image's real pixels with what the PROJECTS cards need. */
function checkSize({ width, height }: Size): SizeCheck {
  const ratio = width / height;
  const off = Math.abs(ratio - PROJECT_IMAGE.ratio) / PROJECT_IMAGE.ratio;
  if (width < PROJECT_IMAGE.minWidth || height < PROJECT_IMAGE.minHeight) {
    return { tone: "bad", label: "Too small — will look blurry" };
  }
  if (off > 0.03) {
    return {
      tone: "warn",
      label: ratio > PROJECT_IMAGE.ratio ? "Too wide — sides get cropped" : "Too tall — top/bottom get cropped",
    };
  }
  return { tone: "ok", label: "Good size" };
}

function readSize(src: string): Promise<Size> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

const TONE_CLASS: Record<SizeCheck["tone"], string> = {
  ok: "bg-green-50 text-green-700 border-green-200",
  warn: "bg-amber-50 text-amber-700 border-amber-200",
  bad: "bg-red-50 text-red-700 border-red-200",
};

/** Shows "1587 × 2245 px" plus an OK / warning badge for any image URL. */
function ImageSize({ src }: { src: string }) {
  // Tagged with the src it belongs to, so a stale result never shows for a new image.
  const [result, setResult] = useState<{ src: string; size: Size | null } | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    readSize(src)
      .then((size) => !cancelled && setResult({ src, size }))
      .catch(() => !cancelled && setResult({ src, size: null }));
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!src) return null;
  if (result?.src !== src) return <span className="text-xs text-gray-400">Reading size…</span>;
  const size = result.size;
  if (!size) return <span className="text-xs text-red-600">Image could not be loaded</span>;

  const check = checkSize(size);
  return (
    <span className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-mono text-gray-700">
        {size.width} × {size.height} px
      </span>
      <span className={`rounded-full border px-2 py-0.5 font-medium ${TONE_CLASS[check.tone]}`}>{check.label}</span>
    </span>
  );
}

export function ProjectsAdminClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileNote, setFileNote] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects?all=1");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setProjects(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function startNew() {
    setEditingId(null);
    const nextOrder = projects.length ? Math.max(...projects.map((p) => p.sort_order)) + 1 : 0;
    setForm({ ...emptyForm, sort_order: nextOrder });
    setFileNote(null);
    setMessage(null);
    setError(null);
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      meta: project.meta ?? "",
      image_url: project.image_url,
      href: project.href ?? "",
      sort_order: project.sort_order,
      is_published: project.is_published,
    });
    setFileNote(null);
    setMessage(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onUpload(file: File) {
    setUploading(true);
    setError(null);
    setFileNote(null);
    try {
      // Tell the admin about the size before it goes live; still allow the upload.
      const localUrl = URL.createObjectURL(file);
      try {
        const size = await readSize(localUrl);
        const check = checkSize(size);
        if (check.tone !== "ok") {
          setFileNote(`Selected file is ${size.width} × ${size.height} px — ${check.label.toLowerCase()}.`);
        }
      } finally {
        URL.revokeObjectURL(localUrl);
      }

      const body = new FormData();
      body.append("file", file);
      body.append("section", "case-studies");
      body.append("alt", form.title || "Project");
      const res = await fetch("/api/media/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((f) => ({ ...f, image_url: data.url }));
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
      const res = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage(
        `${editingId ? "Project updated." : "Project added."} The website shows the change within about a minute.`,
      );
      setEditingId(null);
      setForm(emptyForm);
      setFileNote(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function patch(id: string, body: Partial<FormState>) {
    const res = await fetch(`/api/projects/${id}`, {
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
    const other = projects[index + direction];
    const current = projects[index];
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

  async function togglePublished(project: Project) {
    setError(null);
    try {
      await patch(project.id, { is_published: !project.is_published });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function remove(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      if (editingId === project.id) {
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
              Projects
            </h1>
            <p className="text-gray-600 mt-1">
              Add, replace, reorder and hide the project images in the PROJECTS section of the{" "}
              <Link href="/" target="_blank" className="text-[#5A83FF] hover:underline">
                home page
              </Link>
              .
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="mb-8 rounded-2xl border border-[#5A83FF]/30 bg-[#5A83FF]/5 p-5 text-sm text-gray-700">
          <p className="font-semibold" style={{ color: "#070643" }}>
            Image size
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              Recommended:{" "}
              <strong className="font-mono">
                {PROJECT_IMAGE.width} × {PROJECT_IMAGE.height} px
              </strong>{" "}
              — tall portrait (same shape as A4 paper, 1 : 1.414).
            </li>
            <li>
              Minimum:{" "}
              <strong className="font-mono">
                {PROJECT_IMAGE.minWidth} × {PROJECT_IMAGE.minHeight} px
              </strong>{" "}
              — smaller images look blurry on sharp screens.
            </li>
            <li>JPG or WebP, under ~1 MB. Other shapes are cropped to fit — check the preview below.</li>
          </ul>
        </div>

        <form
          onSubmit={onSave}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5 mb-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: "#070643" }}>
              {editingId ? "Edit project" : "Add project"}
            </h2>
            {editingId && (
              <button type="button" onClick={startNew} className="text-sm text-[#5A83FF] hover:underline">
                Cancel edit
              </button>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Title</span>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Dialcom"
                required
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Short description</span>
              <input
                value={form.meta}
                onChange={(e) => setForm((f) => ({ ...f, meta: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                maxLength={160}
                placeholder="AI receptionist · CRM · OMS"
              />
            </label>
          </div>

          <div className="block text-sm">
            <span className="font-medium text-gray-700">Image</span>
            <div className="mt-1 flex items-start gap-4">
              {/* Same shape as the website card, so the admin sees the real crop. */}
              <div className="aspect-[1587/2245] w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {form.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image_url} alt="" className="h-full w-full object-cover" />
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
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="…or paste an image URL"
                  required
                />
                <ImageSize src={form.image_url} />
                {fileNote && <span className="block text-xs text-amber-700">{fileNote}</span>}
                <span className="text-xs text-gray-400 block">
                  {uploading
                    ? "Uploading…"
                    : `Upload a ${PROJECT_IMAGE.width} × ${PROJECT_IMAGE.height} px image. Uploads go to Bunny under case-studies/.`}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Link (optional)</span>
              <input
                value={form.href}
                onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="https://client-site.com or /case-studies"
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
            Show on the website
          </label>

          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-full px-6 py-2.5 text-white font-semibold disabled:opacity-60"
            style={{ background: "#0A0045" }}
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add project"}
          </button>

          {message && <p className="text-sm text-green-700">{message}</p>}
          {error && (
            <p className="text-sm text-red-600 whitespace-pre-wrap">
              {error}
              {/projects|PGRST205|schema cache/i.test(error) ? (
                <>
                  {"\n"}
                  Run <code>supabase/migrations/006_projects.sql</code> in the Supabase SQL Editor, then try again.
                </>
              ) : null}
            </p>
          )}
        </form>

        <h2 className="text-lg font-semibold mb-4" style={{ color: "#070643" }}>
          Projects ({projects.length})
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">
            No projects yet — the website is showing its built-in placeholder projects. Add the first one above.
          </p>
        ) : (
          <ul className="space-y-3">
            {projects.map((project, index) => (
              <li
                key={project.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="aspect-[1587/2245] w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image_url} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-semibold truncate" style={{ color: "#070643" }}>
                    {project.title}
                    {!project.is_published && (
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                        Hidden
                      </span>
                    )}
                  </p>
                  {project.meta && <p className="text-sm text-gray-500 truncate">{project.meta}</p>}
                  <ImageSize src={project.image_url} />
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
                    disabled={index === projects.length - 1}
                    className="rounded-lg border border-gray-200 px-2 py-1 disabled:opacity-30"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublished(project)}
                    className="rounded-lg border border-gray-200 px-3 py-1"
                  >
                    {project.is_published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(project)}
                    className="rounded-lg border border-gray-200 px-3 py-1 text-[#5A83FF]"
                  >
                    Replace / edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(project)}
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
