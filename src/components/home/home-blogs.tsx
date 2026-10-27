"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const blogsHeadingFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export type HomeBlogCard = {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt?: string | null;
};

const FALLBACK: HomeBlogCard[] = [
  {
    slug: "ai-agents-that-qualify-leads",
    title: "AI Agents That Qualify Leads 24/7 — Without Losing the Human Touch",
    description: "How production voice and chat agents hand off cleanly to your team.",
    image: null,
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

function topicLabel(description: string | null | undefined) {
  const raw = (description || "").trim();
  if (!raw) return "Insights";
  // Short category-style descriptions stay as-is; longer blurbs become "Essay".
  if (raw.length <= 40 && !raw.includes(".")) return raw;
  return "Essay";
}

/**
 * Editorial homepage blogs — featured essay + more stories list.
 */
export function HomeBlogs({ posts = [] }: { posts?: HomeBlogCard[] }) {
  const cards = posts.length > 0 ? posts : FALLBACK;
  const featured = cards[0];
  const list = cards.slice(1, 5);
  const featuredDate = formatDate(featured.createdAt);
  const featuredRead = readMins(featured.description);
  const featuredTopic = topicLabel(featured.description);

  return (
    <section
      className="relative overflow-hidden bg-[#F4F5F7] py-14 md:py-20"
      aria-labelledby="home-blogs-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_rgba(1,180,210,0.12),_transparent_65%)]"
      />

      <div className="container-page relative">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-12">
          <div>
            <div className="flex items-center gap-3">
              <h2
                id="home-blogs-heading"
                className={cn(
                  blogsHeadingFont.className,
                  "text-5xl font-bold leading-none text-[#01B4D2] md:text-6xl",
                )}
              >
                Blogs
              </h2>
            </div>
            <p className="mt-2 text-sm text-[#6B7280] md:text-base">
              Practical notes on AI agents and e-commerce that ship
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden items-center gap-1.5 text-sm font-semibold text-[#0A0045] transition-colors hover:text-[#01B4D2] md:inline-flex"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-stretch">
          {/* Featured essay */}
          <article className="min-h-0">
            <Link
              href={hrefFor(featured.slug)}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#0A0045] px-6 py-7 text-white transition-transform duration-300 hover:-translate-y-0.5 md:px-8 md:py-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#01B4D2]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-[#5A83FF]/20 blur-3xl"
              />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
                  <span className="text-[#01B4D2]">Featured</span>
                  <span aria-hidden className="text-white/30">
                    ·
                  </span>
                  <span>{featuredTopic}</span>
                  {featuredDate ? (
                    <>
                      <span aria-hidden className="text-white/30">
                        ·
                      </span>
                      <span>{featuredDate}</span>
                    </>
                  ) : null}
                  <span aria-hidden className="text-white/30">
                    ·
                  </span>
                  <span>{featuredRead}</span>
                </div>

                <h3 className="mt-5 max-w-xl text-[1.55rem] font-bold leading-[1.2] tracking-tight text-white md:text-[1.85rem] md:leading-[1.18]">
                  {featured.title}
                </h3>

                {featured.description && featured.description.length > 40 ? (
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-[15px]">
                    {featured.description}
                  </p>
                ) : null}
              </div>

              <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
                <p className="text-sm text-white/60">
                  By <span className="font-semibold text-white">FynkTech</span>
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#01B4D2] transition-transform duration-300 group-hover:translate-x-0.5">
                  Read essay
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </article>

          {/* More stories */}
          <div className="flex min-h-0 flex-col">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
              More stories
            </p>
            <ol className="flex flex-1 flex-col divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {list.map((post, index) => {
                const n = String(index + 1).padStart(2, "0");
                const meta = topicLabel(post.description);
                const date = formatDate(post.createdAt);
                return (
                  <li key={post.slug + post.title} className="flex-1">
                    <Link
                      href={hrefFor(post.slug)}
                      className="group flex h-full items-start gap-4 py-4 transition-colors md:gap-5 md:py-5"
                    >
                      <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold tabular-nums text-[#01B4D2]/80">
                        {n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold leading-snug tracking-tight text-[#0A0045] transition-colors group-hover:text-[#01B4D2] md:text-base md:leading-snug">
                          {post.title}
                        </span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-[#9CA3AF]">
                          <span>{meta}</span>
                          {date ? (
                            <>
                              <span aria-hidden>·</span>
                              <span>{date}</span>
                            </>
                          ) : null}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-[#0A0045]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#01B4D2]"
                        strokeWidth={2.25}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A0045]"
          >
            View all blogs
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
