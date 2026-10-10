"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ClientLogo = {
  id: string;
  name: string;
  url: string;
  /** Brands without a logo file render their name as a wordmark. */
  logo?: string;
};

const CLIENTS: ClientLogo[] = [
  {
    id: "arabia-ai",
    name: "Arabia AI",
    url: "https://arabiasalesbot.com",
    logo: "/companylogos/Arabia_ai_Minimalist_White_Logo-removebg-preview.png",
  },
  {
    id: "dialcom",
    name: "Dialcom",
    url: "https://dialcom.ai",
    logo: "/companylogos/Minimalist%20Dialcom%20Wordmark.png",
  },
  {
    id: "playback",
    name: "Playback",
    url: "https://theplaybackstore.com",
    logo: "/companylogos/Bold_Playback_Wordmark-removebg-preview.png",
  },
  {
    id: "halora",
    name: "Halora",
    url: "https://shophalora.com",
    logo: "/companylogos/HALORA_Minimalist_Wordmark-removebg-preview.png",
  },
  {
    id: "samsfood",
    name: "Samsfood",
    url: "https://samsfood.com.pk",
    logo: "/companylogos/Samsfood_White_Wordmark_on_Black-removebg-preview.png",
  },
  { id: "the-local-baba", name: "The Local Baba", url: "https://thelocalbaba.com" },
  { id: "everlooms", name: "Everlooms", url: "https://everlooms.com" },
  { id: "use-and-keep", name: "Use and Keep", url: "https://useandkeep.com" },
  { id: "maison-nor", name: "Maison Nor", url: "https://maisonnor.co" },
  { id: "one-stations", name: "One Stations", url: "https://onestations.com" },
];

/** Selected-clients row — tinted link cards, scrolls with prev/next arrows when brands overflow. */
export function SelectedClients() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollByPage = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  return (
    <section
      aria-labelledby="selected-clients-heading"
      className="relative bg-white pb-14 pt-6 md:pb-20 md:pt-8"
    >
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
          Selected clients
        </p>
        <h2
          id="selected-clients-heading"
          className="mt-2 text-center text-2xl font-bold tracking-tight text-[#111111] md:text-3xl"
        >
          Trusted by brands worldwide.
        </h2>

        <div className="relative mt-8 md:mt-10">
          <ul
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            {CLIENTS.map((client) => (
              <li
                key={client.id}
                className="w-[calc((100%-0.75rem)/2)] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
              >
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${client.name} (opens in a new tab)`}
                  className="group relative flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-[#5A83FF]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A83FF] md:h-[4.5rem] md:px-5"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0A0045] via-[#5A83FF] to-[#01B4D2]"
                  />
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={140}
                      height={40}
                      className="h-7 w-auto max-w-full object-contain opacity-85 brightness-0 transition-opacity duration-300 group-hover:opacity-100 md:h-8"
                    />
                  ) : (
                    <span className="truncate text-base font-bold tracking-tight text-[#111111] opacity-85 transition-opacity duration-300 group-hover:opacity-100 md:text-lg">
                      {client.name}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Same arrow style as the "Why FynkTech?" carousel. */}
          <div className="mt-4 flex justify-center gap-1 md:justify-end">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Previous brands"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:text-[#0B1220]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Next brands"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:text-[#0B1220]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
