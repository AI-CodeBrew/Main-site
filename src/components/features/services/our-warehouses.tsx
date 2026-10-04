import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
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

/** Our warehouses: one card per city, photo cards on a white section. */
export function OurWarehouses() {
  return (
    <section
      id="warehouses"
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby="warehouses-heading"
    >
      <div className="container-page relative z-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
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

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {WAREHOUSES.map((warehouse) => (
            <li key={warehouse.city}>
              <a
                href={mapsHref(warehouse.city, warehouse.lines)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80DFFF]"
              >
                <Image
                  src={warehouse.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: "#80DFFF" }}
                  >
                    View on map
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
