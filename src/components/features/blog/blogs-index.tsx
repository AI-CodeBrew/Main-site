"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

export type BlogIndexCard = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  card_image: string | null;
};

function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host.endsWith(".b-cdn.net") || host === "images.unsplash.com";
  } catch {
    return false;
  }
}

/** Order of the category pills in the featured-work bar. */
const PILL_ORDER = ["AI Agents", "E-commerce", "Automation"];

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
  // Only matters below lg — desktop filters with the featured-work bar instead.
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  // Pills follow PILL_ORDER; any other category from the posts is added after them.
  const pillCategories = useMemo(() => {
    const rank = (cat: string) => {
      const index = PILL_ORDER.indexOf(cat);
      return index === -1 ? PILL_ORDER.length : index;
    };
    return [...categories].sort((a, b) => rank(a) - rank(b));
  }, [categories]);

  const pillBase =
    "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200";
  const pillOn = "bg-[#0A0045] text-white";
  const pillOff = "text-[#111111] hover:bg-[#0A0045]/[0.08]";

  return (
    <>
      {/* Featured-work bar, desktop only: category pills drive the same `active` filter as the
          checkboxes, which are the phone / tablet version (Filter button below). */}
      {categories.length > 0 ? (
        <section className="hidden bg-[#F5F5F8] lg:block" aria-label="Filter stories by category">
          <div className="flex flex-col gap-3 px-5 py-4 md:min-h-[96px] md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-0 lg:px-[68px]">
            <h2 className="shrink-0 text-sm font-semibold uppercase tracking-[0.14em] text-[#0A0045] md:text-[15px]">
              Featured work
            </h2>
            {/* Phones / tablets: pills scroll sideways instead of wrapping. */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setActive([])}
                aria-pressed={active.length === 0}
                className={`${pillBase} ${active.length === 0 ? pillOn : pillOff}`}
              >
                All
              </button>
              {pillCategories.map((cat) => {
                const on = active.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive([cat])}
                    aria-pressed={on}
                    className={`${pillBase} ${on ? pillOn : pillOff}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      {categories.length > 0 ? (
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:gap-12">
          {/* Phones / tablets: filters sit behind a button on the right instead of taking the top of the page. */}
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <p className="text-sm text-subtle">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </p>
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="blog-filters"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-[#5A83FF] hover:text-[#5A83FF]"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filter
              {active.length > 0 ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5A83FF] px-1.5 text-xs font-semibold text-white">
                  {active.length}
                </span>
              ) : null}
            </button>
          </div>

          <aside
            id="blog-filters"
            className={`w-full shrink-0 lg:hidden ${
              filtersOpen ? "-mt-4 rounded-2xl border border-line p-5" : "hidden"
            }`}
          >
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
    </>
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
      {posts.map((post, index) => {
        const img = post.card_image || post.image;
        const category = post.description?.trim() || null;
        const aboveFold = index < 3;
        return (
          <li key={post.id}>
            <Link href={`/blogs/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-muted">
                {img ? (
                  <Image
                    src={img}
                    alt=""
                    fill
                    priority={aboveFold}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={!canOptimizeImage(img)}
                  />
                ) : null}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-4 pt-10 sm:px-5 sm:pb-5">
                  {category ? (
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/80">
                      {category}
                    </p>
                  ) : null}
                  <h2 className="line-clamp-3 text-base font-bold leading-snug tracking-tight text-white md:text-lg md:leading-snug">
                    {post.title}
                  </h2>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
