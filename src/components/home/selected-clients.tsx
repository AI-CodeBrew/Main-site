import Image from "next/image";

type ClientLogo = {
  id: string;
  name: string;
  logo: string;
};

const CLIENTS: ClientLogo[] = [
  {
    id: "arabia-ai",
    name: "Arabia AI",
    logo: "/companylogos/Arabia_ai_Minimalist_White_Logo-removebg-preview.png",
  },
  {
    id: "dialcom",
    name: "Dialcom",
    logo: "/companylogos/Minimalist%20Dialcom%20Wordmark.png",
  },
  {
    id: "playback",
    name: "Playback",
    logo: "/companylogos/Bold_Playback_Wordmark-removebg-preview.png",
  },
  {
    id: "halora",
    name: "Halora",
    logo: "/companylogos/HALORA_Minimalist_Wordmark-removebg-preview.png",
  },
  {
    id: "samsfood",
    name: "Samsfood",
    logo: "/companylogos/Samsfood_White_Wordmark_on_Black-removebg-preview.png",
  },
];

/** Simple selected-clients grid — tinted cards, logos only (no marquee). */
export function SelectedClients() {
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
          Trusted by teams worldwide.
        </h2>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-5">
          {CLIENTS.map((client) => (
            <li
              key={client.id}
              className="relative flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.04] md:h-[4.5rem] md:px-5"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0A0045] via-[#5A83FF] to-[#01B4D2]"
              />
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={40}
                className="h-7 w-auto max-w-full object-contain opacity-85 brightness-0 md:h-8"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
