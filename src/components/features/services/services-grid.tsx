"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Database,
  Filter,
  Globe,
  MessageSquare,
  PackageSearch,
  Palette,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getAllServices, type ServiceCategory, type ServiceSlug } from "@/lib/content/services";
import { trackEvent } from "@/lib/analytics";

type Visual = { icon: LucideIcon; image: string };

type GridConfig = {
  eyebrow: string;
  title: string;
  description: string;
  /** Card order. Featured (wide) cards are placed so the 4-column grid fills evenly. */
  order: ServiceSlug[];
  featured: ServiceSlug[];
  visuals: Partial<Record<ServiceSlug, Visual>>;
};

const configs: Record<ServiceCategory, GridConfig> = {
  ai: {
    eyebrow: "What we build",
    title: "AI automation services",
    description:
      "From AI receptionists to full custom agents — pick the system your business needs, or let us map it with you on a free call.",
    // UI/UX, Cloud and QA are hidden on this grid (their pages still exist).
    // Same 6-column layout as e-commerce → rows of F·s / s·s·s / F·s
    order: [
      "voice-chat",
      "workflow",
      "sales-marketing",
      "data-analytics",
      "web-development",
      "custom-agents",
      "mobile-development",
    ],
    featured: ["voice-chat", "custom-agents"],
    visuals: {
      "voice-chat": { icon: MessageSquare, image: "/Business-Cards/AI Voice & Chat Automation.png" },
      workflow: { icon: Workflow, image: "/Business-Cards/Business Workflow Automation.png" },
      "sales-marketing": { icon: TrendingUp, image: "/Business-Cards/AI Sales & Marketing Automation.avif" },
      "data-analytics": { icon: Database, image: "/Business-Cards/Data Analytics & Scaling Roadmaps.png" },
      "web-development": { icon: Globe, image: "/Business-Cards/webdevelopment.png" },
      "custom-agents": { icon: Bot, image: "/Business-Cards/Custom AI Agent Development.webp" },
      "mobile-development": { icon: Smartphone, image: "/Business-Cards/mobiledevelopment.avif" },
      "ui-ux": { icon: Palette, image: "/Business-Cards/UI-UXDesign.png" },
      cloud: { icon: Cloud, image: "/Business-Cards/Cloud Application.png" },
      "qa-support": { icon: Wrench, image: "/Business-Cards/quality-control.png" },
    },
  },
  ecommerce: {
    eyebrow: "What we build",
    title: "E-commerce services",
    description:
      "Store launch, sourcing, funnels, operations and brand — the core build blocks to sell online.",
    order: [
      "store-setup",
      "product-sourcing",
      "sales-funnel",
      "operations-automation",
      "branding-creative",
    ],
    featured: ["store-setup"],
    visuals: {
      "store-setup": { icon: ShoppingCart, image: "/Business-Cards/StoreSetup&Development.png" },
      "product-sourcing": { icon: PackageSearch, image: "/Business-Cards/Product Sourcing & Supply Chain Management.png" },
      "sales-funnel": { icon: Filter, image: "/Business-Cards/SalesFunnelOptimization.png" },
      "operations-automation": {
        icon: Workflow,
        image: "/Business-Cards/Operations & Automation(AI + Workflow + Support).png",
      },
      "branding-creative": { icon: Palette, image: "/Business-Cards/Branding & Creative Production.png" },
    },
  },
};

export function ServicesGrid({ category }: { category: ServiceCategory }) {
  const config = configs[category];
  const services = getAllServices()
    .filter((s) => s.category === category && config.order.includes(s.slug))
    .sort((a, b) => config.order.indexOf(a.slug) - config.order.indexOf(b.slug));
  const headingId = `${category}-services-heading`;
  const smallSlugs = services.filter((s) => !config.featured.includes(s.slug)).map((s) => s.slug);
  const smallCount = smallSlugs.length;
  const lastSmallSlug = smallSlugs[smallCount - 1];
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-service-card]");
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section
      id={`${category}-services`}
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby={headingId}
    >
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#01B4D2]">
            {config.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mb-4 text-3xl font-bold text-[#0A0045] md:text-5xl"
          >
            {config.title}
          </h2>
          <p className="text-base text-[#6B7280] md:text-lg">
            {config.description}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll + centered arrows */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 pl-2 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, index) => {
              const visual = config.visuals[service.slug];
              const Icon = visual?.icon ?? Bot;

              return (
                <div
                  key={service.path}
                  data-service-card
                  className="w-[min(300px,82vw)] shrink-0 snap-start"
                >
                  <Link
                    href={service.path}
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta: `service_${service.slug}`,
                        location: `${category}_services_grid`,
                      })
                    }
                    className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F3F4F6] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01B4D2]"
                  >
                    {visual ? (
                      <Image
                        src={visual.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    ) : null}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent"
                      aria-hidden
                    />
                    <span className="absolute right-5 top-5 text-sm font-semibold text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10 p-6">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-[#80DFFF]" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {service.headline}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-white/75">
                        {service.subheadline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#80DFFF]">
                        Explore service
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous services"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0045] shadow-sm transition-colors hover:border-[#0A0045]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next services"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0045] shadow-sm transition-colors hover:border-[#0A0045]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-4 sm:grid-cols-2 md:grid lg:grid-cols-6 lg:gap-5">
          {services.map((service, index) => {
            const visual = config.visuals[service.slug];
            const Icon = visual?.icon ?? Bot;
            const isFeatured = config.featured.includes(service.slug);

            // An odd count of small cards would leave one alone on the 2-column tablet grid,
            // so the last small card stretches across the row there.
            const isLastOddSmall =
              !isFeatured && smallCount % 2 === 1 && service.slug === lastSmallSlug;
            const spanClass = isFeatured
              ? "sm:col-span-2 lg:col-span-4"
              : isLastOddSmall
                ? "sm:col-span-2 lg:col-span-2"
                : "lg:col-span-2";

            return (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                className={spanClass}
              >
                <Link
                  href={service.path}
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta: `service_${service.slug}`,
                      location: `${category}_services_grid`,
                    })
                  }
                  className={`group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F3F4F6] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01B4D2] md:h-80 lg:h-full ${
                    isFeatured ? "lg:min-h-[22rem]" : "lg:min-h-80"
                  }`}
                >
                  {visual && (
                    <Image
                      src={visual.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={
                        isFeatured
                          ? "(max-width: 640px) 100vw, 66vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                    />
                  )}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-transparent"
                    aria-hidden
                  />

                  <span className="absolute right-5 top-5 text-sm font-semibold text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-[#80DFFF]" />
                    </div>
                    <h3
                      className={`mb-2 font-semibold text-white ${
                        isFeatured ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {service.headline}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed text-white/75 ${
                        isFeatured ? "line-clamp-3 max-w-lg" : "line-clamp-2"
                      }`}
                    >
                      {service.subheadline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#80DFFF]">
                      Explore service
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center md:mt-14">
          <p className="mb-5 text-[#6B7280]">
            Not sure which service fits your business?
          </p>
          <Link
            href="/contact?intent=strategy-call"
            className="btn btn-primary px-7 py-3.5 text-base"
            onClick={() =>
              trackEvent("cta_click", {
                cta: "book_strategy_call",
                location: `${category}_services_grid`,
              })
            }
          >
            Talk to an expert
            <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
