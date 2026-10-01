"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type BlogIndexCard = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  card_image: string | null;
};

/**
 * Customers-style listing: category filters + image / tag / title cards.
 * Layout inspired by respond.io/customers, in Fynk colors.
 */
export function BlogsIndex({ posts }: { posts: BlogIndexCard[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const post of posts) {
      const label = post.description?.trim();
      if (label) set.add(label);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const [active, setActive] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (active.length === 0) return posts;
    return posts.filter((p) => {
      const label = p.description?.trim();
      return label ? active.includes(label) : false;
    });
  }, [posts, active]);

  function toggle(cat: string) {
    setActive((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      {categories.length > 0 ? (
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:gap-12">
          <aside className="w-full shrink-0 lg:w-52">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-heading">Filter by</h2>
              {active.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setActive([])}
                  className="text-xs text-subtle hover:text-[#5A83FF]"
                >
                  Clear filters
                </button>
              ) : null}
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-subtle">Category</p>
            <ul className="mt-3 space-y-2.5">
              {categories.map((cat) => {
                const checked = active.includes(cat);
                return (
                  <li key={cat}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-body">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(cat)}
                        className="h-4 w-4 rounded border-line text-[#5A83FF] focus:ring-[#5A83FF]"
                      />
                      {cat}
                    </label>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="min-w-0 flex-1">
            <StoryGrid posts={filtered} />
          </div>
        </div>
      ) : (
        <StoryGrid posts={filtered} />
      )}
    </div>
  );
}

function StoryGrid({ posts }: { posts: BlogIndexCard[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
        <p className="text-lg font-medium text-heading">No stories match these filters</p>
        <p className="mt-2 text-sm text-subtle">Clear filters or check back for new posts.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3">
      {posts.map((post) => {
        const img = post.card_image || post.image;
        const category = post.description?.trim() || null;
        return (
          <li key={post.id}>
            <Link href={`/blogs/${post.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-surface-muted">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              {category ? (
                <p className="mt-4 text-sm font-semibold text-[#5A83FF]">{category}</p>
              ) : (
                <div className="mt-4" />
              )}
              <h2 className="mt-1.5 text-base font-bold leading-snug tracking-tight text-heading transition-colors group-hover:text-[#5A83FF] md:text-lg md:leading-snug">
                {post.title}
              </h2>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
