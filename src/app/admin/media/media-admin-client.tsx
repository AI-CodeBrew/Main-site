"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MEDIA_SECTIONS, type MediaSectionId } from "@/lib/media/sections";
import { AdminPage, AdminPageHeader } from "@/components/admin/admin-page";

type MediaItem = {
  id: string;
  path: string;
  url: string;
  kind: string;
  folder?: string | null;
  original_name?: string | null;
  created_at?: string;
};

export function MediaAdminClient() {
  const [section, setSection] = useState<MediaSectionId>("hero");
  const [alt, setAlt] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (folder: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/media?folder=${encodeURIComponent(folder)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setItems((data.items as MediaItem[]) || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load media");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(section);
  }, [section, load]);

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setMessage(null);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("section", section);
    if (alt) fd.set("alt", alt);

    try {
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setMessage(
        `Saved to Bunny folder "${data.section}"${data.storedInDb ? " + Supabase" : " (DB save failed — run 002_media.sql?)"}: ${data.url}`
      );
      form.reset();
      setAlt("");
      await load(section);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AdminPage width="wide">
      <AdminPageHeader
        title="Media library"
        description={
          <>
            Files go to Bunny as <code className="text-xs">uploads/&#123;section&#125;/…</code> and URLs are stored in
            Supabase.
          </>
        }
      />

      <form
        onSubmit={onUpload}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mb-8 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-gray-700">Section folder</span>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value as MediaSectionId)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
            >
              {MEDIA_SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.id})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-gray-700">Alt text (optional)</span>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Describe the image"
            />
          </label>
        </div>
        <label className="block text-sm">
          <span className="font-medium text-gray-700">File (image or video)</span>
          <input
            name="file"
            type="file"
            required
            accept="image/*,video/mp4,video/webm,video/quicktime"
            className="mt-1 block w-full text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="rounded-full px-6 py-2.5 text-white font-semibold disabled:opacity-60"
          style={{ background: "#0A0045" }}
        >
          {uploading ? "Uploading…" : "Upload to Bunny"}
        </button>
        {message && <p className="text-sm text-green-700 break-all">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <div className="flex flex-wrap gap-2 mb-4">
        {MEDIA_SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            className={`rounded-full px-3 py-1.5 text-sm border ${
              section === s.id
                ? "bg-[#0A0045] text-white border-[#0A0045]"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4" style={{ color: "#070643" }}>
        Section: {section} {loading ? "(loading…)" : `(${items.length})`}
      </h2>

      {items.length === 0 && !loading ? (
        <p className="text-gray-500 text-sm">No files in this section yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm overflow-hidden"
            >
              {item.kind === "image" ? (
                <div className="relative aspect-video mb-2 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.original_name || item.path}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : item.kind === "video" ? (
                <video src={item.url} controls className="w-full rounded-lg mb-2 aspect-video bg-black" />
              ) : (
                <div className="aspect-video mb-2 flex items-center justify-center bg-gray-50 rounded-lg text-sm text-gray-500">
                  File
                </div>
              )}
              <p className="text-xs text-gray-500 truncate mb-1">{item.original_name || item.path}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#5A83FF] break-all hover:underline"
              >
                {item.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
