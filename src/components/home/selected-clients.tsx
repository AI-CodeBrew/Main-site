"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ClientLogo = {
  id: string;
  name: string;
  url: string;
  logo: string;
  /** Icon-only logos (not a wordmark) keep their colours and show the brand name beside them. */
  icon?: boolean;
};

const CLIENTS: ClientLogo[] = [
  {
    id: "dialcom",
    name: "Dialcom AI",
    url: "https://dialcom.ai",
    logo: "/companylogos/dialcom.png",
    icon: true,
  },
  {
    id: "arabia-ai",
    name: "Arabia AI",
    url: "https://arabiasalesbot.com",
    logo: "/companylogos/arabia-ai.svg",
    icon: true,
  },
  {
    id: "lumenook",
    name: "Lumenook",
    url: "https://lumenook.com",
    logo: "/companylogos/lumenook.png",
    icon: true,
  },
  {
    id: "the-local-baba",
    name: "The Local Baba",
    url: "https://thelocalbaba.com",
    logo: "/companylogos/localbaba.png",
    icon: true,
  },
  {
    id: "everlooms",
    name: "Everlooms",
    url: "https://everlooms.com",
    logo: "/companylogos/everlooms.png",
    icon: true,
  },
  {
    id: "use-and-keep",
    name: "Use & Keep",
    url: "https://useandkeep.com",
    logo: "/companylogos/useandkeep.png",
  },
  {
    id: "maisonnor",
    name: "Maisonnor",
    url: "https://maisonnor.co",
    logo: "/companylogos/maisonnor.png",
  },
  {
    id: "playback",
    name: "Playback",
    url: "https://theplaybackstore.com",
    logo: "/companylogos/playback.png",
    icon: true,
  },
  {
    id: "halora",
    name: "Halora",
    url: "https://shophalora.com",
    logo: "/companylogos/halora.svg",
  },
  {
    id: "one-stations",
    name: "One Stations",
    url: "https://onestations.com",
    logo: "/companylogos/one-stations-logo.png",
  },
];

/** Selected-clients row — tinted link cards, scrolls with prev/next arrows when brands overflow. */
export function SelectedClients() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  // One click moves exactly one brand card (card width + gap).
  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
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
                  {client.icon ? (
                    <span className="flex min-w-0 items-center gap-2 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
                      <Image
                        src={client.logo}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized={client.logo.endsWith(".svg")}
                        className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8"
                      />
                      <span className="truncate text-base font-bold tracking-tight text-[#111111] md:text-lg">
                        {client.name}
                      </span>
                    </span>
                  ) : (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={140}
                      height={40}
                      unoptimized={client.logo.endsWith(".svg")}
                      className="h-7 w-auto max-w-full object-contain opacity-85 brightness-0 transition-opacity duration-300 group-hover:opacity-100 md:h-8"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Same arrow style as the "Why FynkTech?" carousel. */}
          <div className="mt-4 flex justify-center gap-1 md:justify-end">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous brands"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:text-[#0B1220]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
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
