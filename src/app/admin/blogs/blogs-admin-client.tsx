"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import type { BlogListItem } from "@/lib/blogs/store";

export function BlogsAdminClient() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/blogs?all=1");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setBlogs(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function patchOrder(id: string, sort_order: number) {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sort_order }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Reorder failed");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const current = blogs[index];
    const other = blogs[index + direction];
    if (!other) return;
    setBusyId(current.id);
    setError(null);
    try {
      // Swap positions; if both share an order value, fall back to their list positions.
      const same = current.sort_order === other.sort_order;
      await Promise.all([
        patchOrder(current.id, same ? index + direction : other.sort_order),
        patchOrder(other.id, same ? index : current.sort_order),
      ]);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reorder failed");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(blog: BlogListItem) {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    setBusyId(blog.id);
    setError(null);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  const btn = "rounded-lg border border-gray-200 px-3 py-1 text-sm disabled:opacity-30";

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-sm text-[#5A83FF] hover:underline">
              ← Admin
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: "#070643" }}>
              Blogs
            </h1>
            <p className="text-gray-600 mt-1">Create, edit, reorder and publish blog posts.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blogs/new"
              className="rounded-full px-5 py-2.5 text-white font-semibold"
              style={{ background: "#0A0045" }}
            >
              New Blog
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-600 whitespace-pre-wrap">
            {error}
            {/blogs|PGRST205|schema cache/i.test(error) ? (
              <>
                {"\n"}
                Run <code>supabase/migrations/005_blogs.sql</code> in the Supabase SQL Editor, then reload.
              </>
            ) : null}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600 mb-4">No blogs yet.</p>
            <Link href="/admin/blogs/new" className="text-[#5A83FF] font-medium hover:underline">
              Write the first one →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog, index) => (
                  <tr key={blog.id} className={busyId === blog.id ? "opacity-50" : undefined}>
                    <td className="px-4 py-3">
                      <div className="h-12 w-20 overflow-hidden rounded-md bg-gray-100">
                        {blog.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={blog.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: "#070643" }}>
                      {blog.title}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{blog.slug}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          blog.status === "published" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {blog.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="w-8 text-gray-500">{blog.sort_order}</span>
                        <button type="button" className={btn} onClick={() => move(index, -1)} disabled={index === 0 || busyId !== null} aria-label="Move up">
                          ↑
                        </button>
                        <button
                          type="button"
                          className={btn}
                          onClick={() => move(index, 1)}
                          disabled={index === blogs.length - 1 || busyId !== null}
                          aria-label="Move down"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {blog.status === "published" && (
                          <Link href={`/blog/${blog.slug}`} target="_blank" className={btn}>
                            View
                          </Link>
                        )}
                        <Link href={`/admin/blogs/${blog.slug}/edit`} className={`${btn} text-[#5A83FF]`}>
                          Edit
                        </Link>
                        <button type="button" onClick={() => remove(blog)} disabled={busyId !== null} className={`${btn} border-red-100 text-red-600`}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
