import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const POINTS = [
  {
    title: "One order queue",
    body: "Shopify, marketplaces and custom stores land in a single live queue.",
  },
  {
    title: "Verify, then route",
    body: "Confirm COD and payments, then send each order to the right warehouse.",
  },
  {
    title: "Track to the door",
    body: "Status updates by SMS, email or WhatsApp — returns handled in-system.",
  },
] as const;

/** Our OMS: copy left, PC mockup right — no white frame. */
export function OurOms() {
  return (
    <section
      id="our-oms"
      className="relative overflow-hidden bg-[#121212] pb-14 pt-6 md:pb-16 md:pt-8 lg:pb-20"
      aria-labelledby="our-oms-heading"
    >
      <div className="container-page relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#80DFFF]">
              Order Management
            </p>
            <h2
              id="our-oms-heading"
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              Our OMS
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">
              Every order from every channel in one place — validated, routed and tracked from
              checkout to doorstep.
            </p>

            <ul className="mt-7 space-y-5 border-t border-white/10 pt-7">
              {POINTS.map((point, index) => (
                <li key={point.title} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white md:text-[15px]">
                      {point.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{point.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/ecommerce/operations-automation"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#80DFFF] transition-colors hover:text-white"
            >
              See how operations run
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="relative aspect-[16/10] w-full lg:col-span-7">
            <Image
              src="/platform/oms-pc.png"
              alt="OMS dashboard shown on a laptop"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain object-center"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
