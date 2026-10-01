"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminPage, AdminPageHeader } from "@/components/admin/admin-page";
import { RichTextEditor } from "@/components/admin/blog-editor/rich-text-editor";
import { slugify, SLUG_PATTERN } from "@/lib/blogs/slug";
import type { Blog, BlogStatus } from "@/lib/blogs/store";
import { EMPTY_STORY, parseBlogStory, type BlogStory } from "@/lib/blogs/story";

type FormState = {
  slug: string;
  status: BlogStatus;
  sort_order: number;
  title: string;
  meta_title: string;
  description: string;
  meta_description: string;
  image: string;
  card_image: string;
  story: BlogStory;
  content: string;
};

/** Exact pixel targets so uploaded assets match the public layouts. */
const COVER_SIZE = { w: 1200, h: 675, label: "Story image" } as const;
const TILE_SIZE = { w: 600, h: 720, label: "Tile card" } as const;

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

function isHttpsUrl(value: string) {
  return value === "" || /^https:\/\//i.test(value);
}

function ImageUploadField({
  title,
  hint,
  size,
  value,
  uploading,
  onChange,
  onUpload,
  onClear,
  previewClassName,
}: {
  title: string;
  hint: string;
  size: { w: number; h: number };
  value: string;
  uploading: boolean;
  onChange: (url: string) => void;
  onUpload: (file: File) => void;
  onClear: () => void;
  previewClassName: string;
}) {
  const valid = isHttpsUrl(value);
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold" style={{ color: "#070643" }}>
          {title}
        </h2>
        <p className="rounded-md bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#0A0045]">
          Exact size: {size.w} × {size.h} px
        </p>
      </div>
      <p className="text-xs text-gray-500">
        {hint} Create the image at <strong className="font-semibold text-gray-700">{size.w} × {size.h} pixels</strong>{" "}
        (JPEG, PNG, WebP or GIF, max 3 MB).
      </p>
      {value && valid && (
        <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${previewClassName}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={`${title} preview`} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-red-600 shadow"
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
        className="block w-full text-sm"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        className={inputClass}
        placeholder="…or paste an https:// image URL"
      />
      <span className={`block text-xs ${valid ? "text-gray-400" : "text-red-600"}`}>
        {uploading ? "Uploading…" : valid ? "Uploaded to Bunny CDN." : "Image must be an https:// URL."}
      </span>
    </section>
  );
}

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
    card_image: blog?.card_image ?? "",
    story: blog
      ? parseBlogStory(blog.story)
      : {
          ...EMPTY_STORY,
          stats: EMPTY_STORY.stats.map((s) => ({ ...s })),
          goals: [...EMPTY_STORY.goals],
          solutions: [...EMPTY_STORY.solutions],
          channels: [...EMPTY_STORY.channels],
        },
    content: blog?.content ?? "",
  });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [coverUploading, setCoverUploading] = useState(false);
  const [tileUploading, setTileUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const setStory = <K extends keyof BlogStory>(key: K, value: BlogStory[K]) =>
    setForm((f) => ({ ...f, story: { ...f.story, [key]: value } }));

  const slugValid = SLUG_PATTERN.test(form.slug);
  const slugChanged = isEdit && form.slug !== blog?.slug;
  const coverValid = isHttpsUrl(form.image);
  const tileValid = isHttpsUrl(form.card_image);
  const anyUploading = coverUploading || tileUploading;

  async function onImageFile(kind: "image" | "card_image", file: File) {
    const setBusy = kind === "image" ? setCoverUploading : setTileUploading;
    setBusy(true);
    setError(null);
    try {
      set(kind, await uploadBlogImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slugValid || !coverValid || !tileValid) return;
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
    <AdminPage>
      <AdminPageHeader title={isEdit ? "Edit blog" : "New blog"} back={{ href: "/admin/blogs", label: "Blogs" }} />

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
              <span className="mt-1 block text-xs text-gray-400">/blogs/{form.slug || "…"}</span>
              {form.slug && !slugValid && (
                <span className="mt-1 block text-xs text-red-600">Use lowercase letters, numbers and dashes only.</span>
              )}
              {slugChanged && (
                <span className="mt-1 block text-xs text-amber-600">
                  Changing the slug breaks existing links to /blogs/{blog!.slug}.
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
            <span className="font-medium text-gray-700">Category label</span>
            <input
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputClass}
              maxLength={1000}
              placeholder="e.g. AI Agents — shown above the title and on cards"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
          <div>
            <h2 className="font-semibold" style={{ color: "#070643" }}>
              Story layout
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Matches the customer-story page structure (stats, TL;DR, goals, solutions, quote, meta). Leave blank to hide a block.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Stats (up to 3)</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {form.story.stats.map((stat, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-3 space-y-2">
                  <input
                    value={stat.value}
                    onChange={(e) => {
                      const stats = form.story.stats.map((s, idx) => (idx === i ? { ...s, value: e.target.value } : s));
                      setStory("stats", stats);
                    }}
                    className={inputClass}
                    placeholder="e.g. 2.5x"
                    maxLength={40}
                  />
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const stats = form.story.stats.map((s, idx) => (idx === i ? { ...s, label: e.target.value } : s));
                      setStory("stats", stats);
                    }}
                    className={inputClass}
                    placeholder="higher conversion rate"
                    maxLength={80}
                  />
                </div>
              ))}
            </div>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-gray-700">TL;DR</span>
            <textarea
              value={form.story.tldr}
              onChange={(e) => setStory("tldr", e.target.value)}
              className={`${inputClass} min-h-[100px]`}
              maxLength={1200}
              placeholder="One short summary paragraph"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-700">Goals</p>
              {form.story.goals.map((goal, i) => (
                <input
                  key={i}
                  value={goal}
                  onChange={(e) => {
                    const goals = form.story.goals.map((g, idx) => (idx === i ? e.target.value : g));
                    setStory("goals", goals);
                  }}
                  className={inputClass}
                  placeholder={`Goal ${i + 1}`}
                  maxLength={200}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Solutions</p>
              {form.story.solutions.map((item, i) => (
                <input
                  key={i}
                  value={item}
                  onChange={(e) => {
                    const solutions = form.story.solutions.map((g, idx) => (idx === i ? e.target.value : g));
                    setStory("solutions", solutions);
                  }}
                  className={inputClass}
                  placeholder={`Solution ${i + 1}`}
                  maxLength={200}
                />
              ))}
            </div>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-gray-700">Quote</span>
            <textarea
              value={form.story.quote}
              onChange={(e) => setStory("quote", e.target.value)}
              className={`${inputClass} min-h-[80px]`}
              maxLength={1000}
              placeholder="Optional customer or team quote"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-gray-700">Quote author / subtitle</span>
            <input
              value={form.story.quote_author}
              onChange={(e) => setStory("quote_author", e.target.value)}
              className={inputClass}
              maxLength={160}
              placeholder="Name, role — also shown under the hero title"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Website</span>
              <input
                value={form.story.website}
                onChange={(e) => setStory("website", e.target.value)}
                className={inputClass}
                placeholder="fynktech.com"
                maxLength={200}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Location</span>
              <input
                value={form.story.location}
                onChange={(e) => setStory("location", e.target.value)}
                className={inputClass}
                placeholder="Lahore, Pakistan"
                maxLength={120}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-gray-700">Industry</span>
              <input
                value={form.story.industry}
                onChange={(e) => setStory("industry", e.target.value)}
                className={inputClass}
                placeholder="AI Agents"
                maxLength={120}
              />
            </label>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Channels</p>
            <p className="mt-1 text-xs text-gray-500">Shown in the sticky sidebar. Defaults to WhatsApp, Web chat, Voice if empty.</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {form.story.channels.map((ch, i) => (
                <input
                  key={i}
                  value={ch}
                  onChange={(e) => {
                    const channels = form.story.channels.map((c, idx) => (idx === i ? e.target.value : c));
                    setStory("channels", channels);
                  }}
                  className={inputClass}
                  placeholder={i === 0 ? "WhatsApp" : i === 1 ? "Web chat" : "Voice"}
                  maxLength={40}
                />
              ))}
            </div>
          </div>
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

        <ImageUploadField
          title={COVER_SIZE.label}
          hint="Shown mid-article at a compact height (not full-bleed)."
          size={COVER_SIZE}
          value={form.image}
          uploading={coverUploading}
          onChange={(url) => set("image", url)}
          onUpload={(file) => void onImageFile("image", file)}
          onClear={() => set("image", "")}
          previewClassName="aspect-[16/9] max-h-52 max-w-xl"
        />

        <ImageUploadField
          title={`${TILE_SIZE.label} image`}
          hint="Used on the homepage Proven Results carousel tile (portrait)."
          size={TILE_SIZE}
          value={form.card_image}
          uploading={tileUploading}
          onChange={(url) => set("card_image", url)}
          onUpload={(file) => void onImageFile("card_image", file)}
          onClear={() => set("card_image", "")}
          previewClassName="mx-auto aspect-[5/6] max-h-80 w-full max-w-[240px]"
        />

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-3">
          <h2 className="font-semibold" style={{ color: "#070643" }}>
            Article body
          </h2>
          <RichTextEditor value={form.content} onChange={(html) => set("content", html)} onUploadImage={uploadBlogImage} />
        </section>

        {error && (
          <p className="text-sm text-red-600 whitespace-pre-wrap">
            {error}
            {/blogs|PGRST205|schema cache|card_image|story/i.test(error) ? (
              <>
                {"\n"}
                Run <code>supabase/migrations/008_blogs_card_image.sql</code> and{" "}
                <code>supabase/migrations/009_blogs_story.sql</code> in the Supabase SQL Editor, then try again.
              </>
            ) : null}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving || anyUploading || !slugValid || !coverValid || !tileValid}
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
    </AdminPage>
  );
}
