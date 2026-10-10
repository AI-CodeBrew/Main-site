"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Globe2,
  Headphones,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ResultsBlogCard = {
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
};

/** Three homepage stats — FynkTech facts only (no invented KPIs). */
const STATS: {
  value: string;
  label: string;
  icon: LucideIcon;
  iconClass: string;
  ringClass: string;
}[] = [
  {
    value: "15+",
    label: "Trusted by brands worldwide",
    icon: Users,
    iconClass: "text-[#1E3A5F]",
    ringClass: "bg-[#E8EEF8]",
  },
  {
    value: "24/7",
    label: "AI agents that qualify and hand off",
    icon: Headphones,
    iconClass: "text-[#0D9488]",
    ringClass: "bg-[#DCF5F2]",
  },
  {
    value: "Global",
    label: "Global Vision. Engineering Excellence.",
    icon: Globe2,
    iconClass: "text-[#7C3AED]",
    ringClass: "bg-[#F0E9FF]",
  },
];

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

function canOptimize(src: string | null | undefined): boolean {
  if (!src) return false;
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
    <section className="relative py-12 md:py-16" aria-labelledby="proven-results-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[#F3F4F6] px-5 py-12 md:px-8 md:py-16">
          <div
            className="pointer-events-none absolute -left-16 top-0 h-[18rem] w-[18rem] rounded-full opacity-50 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(148, 163, 184, 0.35) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto w-full max-w-[1200px]">
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="proven-results-heading"
                className="text-2xl font-semibold tracking-tight text-[#0B1220] md:text-[36px] md:leading-[44px] md:tracking-[-0.02em]"
              >
                Why FynkTech?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                Practical guides on AI agents, Shopify, and automation — written from real client work.
              </p>
            </div>

            <div className="relative mt-10 lg:mt-14">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5">
                <aside
                  className={`w-full shrink-0 overflow-hidden rounded-2xl bg-[#1E293B] ring-1 ring-white/10 lg:w-[300px] ${CARD_H}`}
                >
                  <ul className="flex h-full flex-col justify-center gap-9 px-7 py-8">
                    {STATS.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <li key={stat.label} className="flex items-center gap-5">
                          <span
                            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.ringClass}`}
                            aria-hidden
                          >
                            <Icon className={`h-5 w-5 ${stat.iconClass}`} strokeWidth={2} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xl font-bold leading-none tracking-tight text-white">
                              {stat.value}
                            </p>
                            <p className="mt-1.5 text-sm leading-snug text-slate-300">{stat.label}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </aside>

                <div className="min-w-0 flex-1">
                  <div className="relative">
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l from-[#F3F4F6]/70 to-transparent md:w-14"
                      aria-hidden
                    />
                    <ul
                      ref={scrollerRef}
                      className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
                    >
                      {cards.map((card) => {
                        const href = cardHref(card);
                        const img =
                          card.image ||
                          FALLBACK_CARDS[0].image ||
                          "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80";
                        const label = card.description?.trim() || null;

                        return (
                          <li
                            key={card.slug + card.title}
                            className="w-[min(300px,82vw)] shrink-0 snap-start"
                          >
                            <Link
                              href={href}
                              className={`group relative isolate block ${CARD_H} overflow-hidden rounded-2xl ring-1 ring-black/10`}
                            >
                              <Image
                                src={img}
                                alt=""
                                fill
                                unoptimized={!canOptimize(img)}
                                sizes="300px"
                                className="object-cover transition-[filter] duration-500 group-hover:brightness-[0.4]"
                              />

                              {/* Grey bottom gradient — keeps title readable like story cards */}
                              <div
                                className="absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent"
                                aria-hidden
                              />

                              {/* Hover dim */}
                              <div
                                className="absolute inset-0 z-[1] bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
                                <h3 className="line-clamp-3 text-base font-medium leading-snug text-white">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:text-[#0B1220]"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next stories"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:text-[#0B1220]"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
