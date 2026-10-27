"use client";

import Image from "next/image";
import { HandUnderline } from "@/components/ui/hand-underline";

type ClientLogo = {
  id: string;
  name: string;
  url: string;
  logo: string;
  /** Small mark — show name beside the logo. */
  icon?: boolean;
};

const CLIENTS: ClientLogo[] = [
  {
    id: "dialcom",
    name: "Dialcom AI",
    url: "https://dialcom.ai",
    logo: "/companylogos/dialcom.webp",
    icon: true,
  },
  {
    id: "arabia-ai",
    name: "Arabia AI",
    url: "https://arabiasalesbot.com",
    logo: "/companylogos/arabia-sales-bot.webp",
    icon: true,
  },
  {
    id: "lumenook",
    name: "Lumenook",
    url: "https://lumenook.com",
    logo: "/companylogos/lumenook.webp",
    icon: true,
  },
  {
    id: "the-local-baba",
    name: "The Local Baba",
    url: "https://thelocalbaba.com",
    logo: "/companylogos/localbaba.webp",
    icon: true,
  },
  {
    id: "everlooms",
    name: "Everlooms",
    url: "https://everlooms.com",
    logo: "/companylogos/everlooms.webp",
    icon: true,
  },
  {
    id: "use-and-keep",
    name: "Use & Keep",
    url: "https://useandkeep.com",
    logo: "/companylogos/useandkeep.webp",
  },
  {
    id: "maisonnor",
    name: "Maisonnor",
    url: "https://maisonnor.co",
    logo: "/companylogos/maisonnor.webp",
  },
  {
    id: "playback",
    name: "Playback",
    url: "https://theplaybackstore.com",
    logo: "/companylogos/playback.webp",
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
    logo: "/companylogos/one-stations-logo.webp",
  },
];

/** Eight brands only. Grayscale → brand color on hover. */
export function SelectedClients() {
  const visible = CLIENTS.slice(0, 8);

  return (
    <section
      aria-labelledby="selected-clients-heading"
      className="relative bg-transparent pb-8 pt-6 md:pb-20 md:pt-10"
    >
      <div className="container-page">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
          Selected clients
        </p>
        <h2
          id="selected-clients-heading"
          className="heading-display mt-2 text-center text-2xl text-[#141414] md:text-3xl"
        >
          Trusted by brands{" "}
          <HandUnderline color="#3aa6c9" className="text-[#3aa6c9]">
            worldwide
          </HandUnderline>
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
          {visible.map((client) => (
            <li key={client.id}>
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${client.name} (opens in a new tab)`}
                className="group flex h-[4.5rem] items-center justify-center rounded-2xl bg-white px-4 py-4 ring-1 ring-black/[0.06] transition-colors duration-300 hover:ring-black/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01B4D2] md:h-[5.25rem] md:px-6"
              >
                {client.icon ? (
                  <span className="flex max-w-full items-center gap-2.5">
                    <Image
                      src={client.logo}
                      alt=""
                      width={36}
                      height={36}
                      sizes="36px"
                      className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
                    />
                    <span className="truncate text-sm font-bold tracking-tight text-[#111111] md:text-base">
                      {client.name}
                    </span>
                  </span>
                ) : (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={48}
                    sizes="(max-width: 768px) 144px, 160px"
                    unoptimized={client.logo.endsWith(".svg")}
                    className="h-8 max-w-[9rem] object-contain md:h-9 md:max-w-[10rem]"
                    style={{ width: "auto" }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
