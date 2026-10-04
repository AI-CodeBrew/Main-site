"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { companyAddress } from "@/lib/content/company";

const WAREHOUSES = [
  {
    city: "Lahore",
    lines: [companyAddress.line1, companyAddress.line2],
    image: "/warehouses/lahore.jpg",
  },
  {
    city: "Karachi",
    lines: ["Shop No 217, Capital Society", "Scheme 33, Karachi"],
    image: "/warehouses/karachi.jpg",
  },
] as const;

function mapsHref(city: string, lines: readonly string[]): string {
  const query = encodeURIComponent(`${lines.join(", ")}, ${city}, Pakistan`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function WarehouseCard({
  warehouse,
}: {
  warehouse: (typeof WAREHOUSES)[number];
}) {
  return (
    <a
      href={mapsHref(warehouse.city, warehouse.lines)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-2xl border border-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01B4D2]"
    >
      <Image
        src={warehouse.image}
        alt=""
        fill
        sizes="(max-width: 768px) 85vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20 transition-colors duration-300 group-hover:via-black/85" />

      <div className="relative z-10 p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
          <MapPin className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="mt-4 text-2xl font-bold text-white">{warehouse.city}</h3>
        <address className="mt-2 text-sm not-italic leading-relaxed text-white/80 md:text-base">
          {warehouse.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#80DFFF]">
          View on map
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}

/** Our warehouses: one card per city; mobile scroll + centered arrows. */
export function OurWarehouses() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-warehouse-card]");
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section
      id="warehouses"
      className="relative overflow-hidden bg-white pb-8 pt-16 md:py-24"
      aria-labelledby="warehouses-heading"
    >
      <div className="container-page relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#01B4D2]">
            Where we ship from
          </p>
          <h2
            id="warehouses-heading"
            className="mb-4 text-3xl font-bold text-[#0A0045] md:text-5xl"
          >
            Our Warehouses
          </h2>
          <p className="text-base text-[#6B7280] md:text-lg">
            Two warehouses in Pakistan —{" "}
            <strong className="font-bold text-[#0A0045]">Lahore</strong> and{" "}
            <strong className="font-bold text-[#0A0045]">Karachi</strong> — so stock sits
            closer to your customers.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 pl-2 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WAREHOUSES.map((warehouse) => (
              <div
                key={warehouse.city}
                data-warehouse-card
                className="w-[min(300px,82vw)] shrink-0 snap-start"
              >
                <WarehouseCard warehouse={warehouse} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous warehouse"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0045] shadow-sm transition-colors hover:border-[#0A0045]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next warehouse"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0A0045] shadow-sm transition-colors hover:border-[#0A0045]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Desktop: two-column grid */}
        <ul className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2">
          {WAREHOUSES.map((warehouse) => (
            <li key={warehouse.city}>
              <WarehouseCard warehouse={warehouse} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
