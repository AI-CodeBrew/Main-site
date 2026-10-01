"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ResultsBlogCard = {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
};

const STATS = [
  { value: "60%", label: "faster sales cycle" },
  { value: "81%", label: "conversion rate with AI Agents" },
  { value: "42.5x", label: "more ROI" },
] as const;

const FALLBACK_CARDS: ResultsBlogCard[] = [
  {
    slug: "case-studies",
    title: "How we build AI receptionists, CRM and OMS for lending platforms",
    description: "Dialcom",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ai-automation/voice-chat",
    title: "AI voice & chat agents that qualify leads and hand off cleanly",
    description: "AI Agents",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ecommerce/store-setup",
    title: "Shopify and WooCommerce stores built to convert and scale",
    description: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
];

const CARD_H = "h-[358px]";

function cardHref(card: ResultsBlogCard): string {
  if (card.slug.includes("/")) return `/${card.slug}`;
  if (card.slug === "case-studies") return "/case-studies";
  return `/blogs/${card.slug}`;
}

function canOptimize(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host.endsWith(".b-cdn.net") || host === "images.unsplash.com";
  } catch {
    return false;
  }
}

/**
 * Proven-results + story carousel.
 * Default (img 1): bright photo, title only — no button.
 * Hover (img 2): image dims, white “Read More >” pill appears.
 */
export function ProvenResults({ posts = [] }: { posts?: ResultsBlogCard[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const cards = posts.length > 0 ? posts : FALLBACK_CARDS;

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(320, el.clientWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-black py-16 md:py-24"
      aria-labelledby="proven-results-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(90,131,255,0.25) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-6">
        <h2
          id="proven-results-heading"
          className="max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-[36px] md:leading-[44px] md:tracking-[-0.02em]"
        >
          Proven results from businesses like yours
        </h2>

        <div className="relative mt-10 lg:mt-14">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5">
            <aside
              className={`w-full shrink-0 overflow-hidden rounded-2xl bg-[#121213] lg:w-[300px] ${CARD_H}`}
            >
              <div className="flex h-full flex-col justify-center gap-6 px-8 py-6">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[3.25rem] leading-none tracking-[-0.04em] text-white md:text-[3.75rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-[#CDCDCF]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-black to-transparent md:w-36"
                  aria-hidden
                />
                <ul
                  ref={scrollerRef}
                  className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
                >
                  {cards.map((card) => {
                    const href = cardHref(card);
                    const img = card.image ?? FALLBACK_CARDS[0].image!;
                    const label = card.description?.trim() || null;

                    return (
                      <li
                        key={card.slug + card.title}
                        className="w-[min(300px,82vw)] shrink-0 snap-start"
                      >
                        <Link
                          href={href}
                          className={`group relative isolate block ${CARD_H} overflow-hidden rounded-2xl ring-1 ring-[#3D3D40]`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            unoptimized={!canOptimize(img)}
                            sizes="300px"
                            className="object-cover transition-[filter] duration-500 group-hover:brightness-[0.4]"
                          />

                          {/* Default bottom fade for title readability */}
                          <div
                            className="absolute inset-x-0 bottom-0 z-[1] h-[45%] bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                            aria-hidden
                          />

                          {/* Hover dim (img 2) */}
                          <div
                            className="absolute inset-0 z-[1] bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            aria-hidden
                          />

                          {label ? (
                            <div className="absolute left-0 top-0 z-[2] p-6 transition-transform duration-500 group-hover:-translate-y-[120%]">
                              <span className="text-lg font-semibold tracking-tight text-white drop-shadow-md md:text-xl">
                                {label}
                              </span>
                            </div>
                          ) : null}

                          <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col items-start gap-3 px-6 pb-6">
                            <h3 className="line-clamp-4 text-base font-medium leading-snug text-white">
                              {card.title}
                            </h3>

                            {/* Default: no button. Hover: Read More pill (img 2). Touch: always show. */}
                            <span className="inline-flex max-h-10 items-center gap-2 overflow-hidden rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#212123] opacity-100 transition-all duration-500 ease-out [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:py-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:max-h-10 [@media(hover:hover)]:group-hover:py-1.5 [@media(hover:hover)]:group-hover:opacity-100">
                              Read More
                              <ChevronRight className="h-4 w-4" aria-hidden />
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="w-3 shrink-0" aria-hidden />
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile: below carousel, centered. Desktop: above, right-aligned with heading. */}
          <div className="mt-4 flex justify-center gap-1 lg:absolute lg:right-0 lg:top-0 lg:z-30 lg:mt-0 lg:justify-end lg:-translate-y-[calc(100%+0.35rem)]">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous stories"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:text-[#96BDFF]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next stories"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:text-[#96BDFF]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
