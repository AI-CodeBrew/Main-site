"use client";

import Link from "next/link";

export type HomeBlogCard = {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt?: string | null;
};

/** Editorial stat card — shorter so it lines up with the 5-item list. */
function FeaturedStatCard({ index = 1 }: { index?: number }) {
  const no = String(index).padStart(2, "0");
  return (
    <div className="flex min-h-[11.5rem] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-[#01B4D2] px-5 py-4 text-white shadow-[0_20px_48px_-24px_rgba(1,180,210,0.45)] md:min-h-[13rem] md:rounded-[1.5rem] md:px-6 md:py-5">
      <div className="flex items-center justify-between gap-4 border-b border-white/25 pb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/85">
          The AI automation ledger
        </p>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
          No. {no}
        </p>
      </div>

      <div className="py-3 md:py-4">
        <p className="text-[1.85rem] font-bold uppercase leading-[0.95] tracking-tight text-white md:text-[2.35rem]">
          By year three
        </p>
        <span
          className="mt-2.5 block h-[3px] w-14 rounded-full bg-white md:w-16"
          aria-hidden
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/25 pt-3">
        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/80">
            Avg. hours saved / week with AI agents
          </p>
          <p className="mt-1 text-xl font-bold tracking-tight text-white md:text-2xl">
            40+ hrs
          </p>
        </div>
        <p className="max-w-[10rem] text-right font-mono text-[9px] leading-snug text-white/75">
          FynkTech · production AI systems, 2026
        </p>
      </div>
    </div>
  );
}

const FALLBACK: HomeBlogCard[] = [
  {
    slug: "ai-agents-that-qualify-leads",
    title: "AI Agents That Qualify Leads 24/7 — Without Losing the Human Touch",
    description: "How production voice and chat agents hand off cleanly to your team.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-08-09",
  },
  {
    slug: "best-ai-tools-2026",
    title: "The 20 Best AI Tools in 2026 That Actually Grow Your Business",
    description: "AI Tools",
    image: null,
    createdAt: "2026-07-20",
  },
  {
    slug: "shopify-stores-built-to-convert",
    title: "Shopify Stores Built to Convert — Not Just Look Pretty",
    description: "E-commerce",
    image: null,
    createdAt: "2026-07-01",
  },
  {
    slug: "shopify-dropshipping-pakistan",
    title: "Shopify Dropshipping in Pakistan: Stores to Learn From in 2026",
    description: "E-commerce",
    image: null,
    createdAt: "2026-06-12",
  },
  {
    slug: "cod-shopify-pakistan",
    title: "Cash on Delivery for Shopify in Pakistan: Cut Fake Orders in 2026",
    description: "Shopify & E-commerce",
    image: null,
    createdAt: "2026-05-28",
  },
];

function hrefFor(slug: string) {
  if (slug.includes("/")) return `/${slug}`;
  return `/blogs/${slug}`;
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function readMins(description: string | null | undefined) {
  const words = (description || "").trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(4, Math.min(12, Math.round(words / 40) || 5));
  return `${mins} min read`;
}

/**
 * Desktop: featured essay + numbered list (reference layout).
 * Mobile: stacked featured + list.
 */
export function HomeBlogs({ posts = [] }: { posts?: HomeBlogCard[] }) {
  const cards = posts.length > 0 ? posts : FALLBACK;
  const featured = cards[0];
  const list = cards.slice(0, 5);
  const featuredDate = formatDate(featured.createdAt);
  const featuredRead = readMins(featured.description);

  return (
    <section
      className="relative bg-white py-12 md:py-16"
      aria-labelledby="home-blogs-heading"
    >
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              Ideas that ship
            </p>
            <h2
              id="home-blogs-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#0B1220] md:text-3xl"
            >
              Blogs
            </h2>
          </div>
          <Link
            href="/blogs"
            className="hidden text-sm font-semibold text-[#01B4D2] transition-colors hover:text-[#0B7A8C] md:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-start">
          {/* Featured */}
          <article>
            <Link href={hrefFor(featured.slug)} className="group block">
              <FeaturedStatCard index={1} />

              <div className="mt-4 flex items-center justify-between gap-3 border-b border-black/[0.08] pb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
                <span className="text-[#01B4D2]">Featured essay</span>
                <span className="flex items-center gap-3 text-[#9CA3AF]">
                  {featuredDate ? <span>{featuredDate}</span> : null}
                  <span>{featuredRead}</span>
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[#0B1220] transition-colors group-hover:text-[#01B4D2] md:text-[1.55rem] md:leading-[1.3]">
                {featured.title}
              </h3>

              {featured.description ? (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
                  {featured.description}
                </p>
              ) : null}

              <p className="mt-4 text-sm text-[#6B7280]">
                Written by <span className="font-semibold text-[#0B1220]">FynkTech</span>
                <span className="mx-1.5 text-[#D1D5DB]">·</span>
                AI &amp; E-commerce
              </p>
            </Link>
          </article>

          {/* Numbered list */}
          <ol className="divide-y divide-black/[0.08] border-y border-black/[0.08] lg:min-h-0">
            {list.map((post, index) => {
              const n = String(index + 1).padStart(2, "0");
              const meta = post.description?.trim() || "Insights";
              return (
                <li key={post.slug + post.title}>
                  <Link
                    href={hrefFor(post.slug)}
                    className="group flex gap-4 py-3.5 transition-colors md:gap-5 md:py-4"
                  >
                    <span className="mt-0.5 shrink-0 text-sm font-semibold tabular-nums text-[#01B4D2]">
                      {n}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold leading-snug tracking-tight text-[#0B1220] transition-colors group-hover:text-[#01B4D2] md:text-base">
                        {post.title}
                      </span>
                      <span className="mt-1.5 block text-xs text-[#9CA3AF]">
                        {meta}
                        <span className="mx-1.5">·</span>
                        {readMins(post.description)}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/blogs"
            className="inline-flex text-sm font-semibold text-[#01B4D2]"
          >
            View all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
