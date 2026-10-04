import Image from "next/image";

const POINTS = [
  "Pull orders from Shopify, marketplaces and custom stores into one queue.",
  "Verify COD and payments, then route each order to the right warehouse.",
  "Track status to the door with SMS, email or WhatsApp updates.",
  "Handle returns and exchanges without leaving the system.",
] as const;

/** Our OMS: copy on the left, dashboard preview filling the right column. */
export function OurOms() {
  return (
    <section
      id="our-oms"
      className="relative overflow-hidden bg-white py-14 md:py-16 lg:py-20"
      aria-labelledby="our-oms-heading"
    >
      <div className="container-page relative z-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center py-2 lg:py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#01B4D2]">
              Order Management
            </p>
            <h2
              id="our-oms-heading"
              className="text-2xl font-bold tracking-tight text-[#0A0045] md:text-3xl lg:text-4xl"
            >
              Our OMS
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4B5563] md:text-base">
              Every order from every channel in one place — validated, routed and tracked from
              checkout to doorstep.
            </p>

            <ul className="mt-7 space-y-3.5">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-[#374151] md:text-[15px]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01B4D2]"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl bg-[#0A0045] shadow-[0_20px_50px_-20px_rgba(10,0,69,0.35)] ring-1 ring-[#0A0045]/10 sm:min-h-[22rem] lg:min-h-[24rem]">
            <Image
              src="/platform/oms-dashboard.png"
              alt="FynkTech OMS dashboard showing order KPIs and orders-over-time chart"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
