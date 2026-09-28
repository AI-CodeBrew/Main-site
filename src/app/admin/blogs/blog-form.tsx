"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { RichTextEditor } from "@/components/admin/blog-editor/rich-text-editor";
import { slugify, SLUG_PATTERN } from "@/lib/blogs/slug";
import type { Blog, BlogStatus } from "@/lib/blogs/store";

type FormState = {
  slug: string;
  status: BlogStatus;
  sort_order: number;
  title: string;
  meta_title: string;
  description: string;
  meta_description: string;
  image: string;
  content: string;
};

async function uploadBlogImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/blogs/upload-image", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

function CharHint({ value, ideal, max }: { value: string; ideal: [number, number]; max: number }) {
  const n = value.length;
  const inRange = n >= ideal[0] && n <= ideal[1];
  return (
    <span className={`mt-1 block text-xs ${n === 0 ? "text-gray-400" : inRange ? "text-green-700" : "text-amber-600"}`}>
      {n}/{max} characters · aim for {ideal[0]}–{ideal[1]}
    </span>
  );
}

const inputClass = "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2";

export function BlogForm({ blog }: { blog?: Blog }) {
  const router = useRouter();
  const isEdit = Boolean(blog);
  const [form, setForm] = useState<FormState>({
    slug: blog?.slug ?? "",
    status: blog?.status ?? "published",
    sort_order: blog?.sort_order ?? 0,
    title: blog?.title ?? "",
    meta_title: blog?.meta_title ?? "",
    description: blog?.description ?? "",
    meta_description: blog?.meta_description ?? "",
    image: blog?.image ?? "",
    content: blog?.content ?? "",
  });
  // On create, the slug follows the title until the author edits it by hand.
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [coverUploading, setCoverUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const slugValid = SLUG_PATTERN.test(form.slug);
  const slugChanged = isEdit && form.slug !== blog?.slug;
  const coverValid = form.image === "" || /^https:\/\//i.test(form.image);

  async function onCoverFile(file: File) {
    setCoverUploading(true);
    setError(null);
    try {
      set("image", await uploadBlogImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setCoverUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slugValid || !coverValid) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(isEdit ? `/api/blogs/${blog!.id}` : "/api/blogs", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <Link href="/admin/blogs" className="text-sm text-[#5A83FF] hover:underline">
              ← Blogs
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: "#070643" }}>
              {isEdit ? "Edit blog" : "New blog"}
            </h1>
          </div>
          <AdminLogoutButton />
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Title</span>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
                }}
                className={inputClass}
                maxLength={300}
                required
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-[1fr_180px_120px]">
              <label className="block text-sm">
                <span className="font-medium text-gray-700">Slug</span>
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value.toLowerCase());
                  }}
                  onBlur={() => set("slug", slugify(form.slug))}
                  className={inputClass}
                  placeholder="my-blog-post"
                  required
                />
                <span className="mt-1 block text-xs text-gray-400">/blog/{form.slug || "…"}</span>
                {form.slug && !slugValid && (
                  <span className="mt-1 block text-xs text-red-600">Use lowercase letters, numbers and dashes only.</span>
                )}
                {slugChanged && (
                  <span className="mt-1 block text-xs text-amber-600">
                    Changing the slug breaks existing links to /blog/{blog!.slug}.
                  </span>
                )}
              </label>
              <label className="block text-sm">
                <span className="font-medium text-gray-700">Status</span>
                <select value={form.status} onChange={(e) => set("status", e.target.value as BlogStatus)} className={inputClass}>
                  <option value="published">Published (Live)</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-medium text-gray-700">Sort order</span>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
                  className={inputClass}
                />
                <span className="mt-1 block text-xs text-gray-400">Lower shows first</span>
              </label>
            </div>

            <label className="block text-sm">
              <span className="font-medium text-gray-700">Description</span>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputClass} min-h-[80px]`}
                maxLength={1000}
                placeholder="Short intro shown on blog cards"
              />
            </label>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
            <h2 className="font-semibold" style={{ color: "#070643" }}>
              SEO
            </h2>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Meta title (optional)</span>
              <input value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} className={inputClass} maxLength={200} />
              <CharHint value={form.meta_title} ideal={[50, 60]} max={200} />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Meta description (optional)</span>
              <textarea
                value={form.meta_description}
                onChange={(e) => set("meta_description", e.target.value)}
                className={`${inputClass} min-h-[80px]`}
                maxLength={500}
              />
              <CharHint value={form.meta_description} ideal={[150, 160]} max={500} />
            </label>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
            <h2 className="font-semibold" style={{ color: "#070643" }}>
              Cover image
            </h2>
            {form.image && coverValid && (
              <div className="relative overflow-hidden rounded-xl bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Cover preview" className="max-h-72 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => set("image", "")}
                  className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-red-600 shadow"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={coverUploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onCoverFile(file);
                e.target.value = "";
              }}
              className="block w-full text-sm"
            />
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value.trim())}
              className={inputClass}
              placeholder="…or paste an https:// image URL"
            />
            <span className={`block text-xs ${coverValid ? "text-gray-400" : "text-red-600"}`}>
              {coverUploading
                ? "Uploading…"
                : coverValid
                  ? "JPEG, PNG, WebP or GIF up to 3 MB. Uploaded to Bunny CDN."
                  : "Cover image must be an https:// URL."}
            </span>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
            <h2 className="font-semibold" style={{ color: "#070643" }}>
              Content
            </h2>
            <RichTextEditor value={form.content} onChange={(html) => set("content", html)} onUploadImage={uploadBlogImage} />
          </section>

          {error && (
            <p className="text-sm text-red-600 whitespace-pre-wrap">
              {error}
              {/blogs|PGRST205|schema cache/i.test(error) ? (
                <>
                  {"\n"}
                  Run <code>supabase/migrations/005_blogs.sql</code> in the Supabase SQL Editor, then try again.
                </>
              ) : null}
            </p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving || coverUploading || !slugValid || !coverValid}
              className="rounded-full px-7 py-3 text-white font-semibold disabled:opacity-60"
              style={{ background: "#0A0045" }}
            >
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create blog"}
            </button>
            <Link href="/admin/blogs" className="text-sm text-gray-600 hover:underline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
