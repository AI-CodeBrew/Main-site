import { ChevronRight } from "lucide-react";

const STEPS = [
  { system: "Store", title: "Customer orders", description: "Website or marketplace" },
  { system: "OMS", title: "Order verified", description: "Routed to a warehouse" },
  { system: "IMS", title: "Stock reserved", description: "Synced to all channels" },
  { system: "WMS", title: "Picked & packed", description: "Scan-checked, labelled" },
  { system: "TMS", title: "Shipped", description: "Tracked to the door" },
  { system: "FMS", title: "Reconciled", description: "Payment & margin booked" },
] as const;

/** How an order moves through the platform, shown under the operations platform section. */
export function OrderFlow() {
  return (
    <section
      id="order-flow"
      // Same black and intro styling as the services grid.
      className="relative overflow-hidden bg-[#121212] py-20 md:py-24"
      aria-labelledby="order-flow-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(255, 255, 255, 0.06) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p
            className="mb-3 text-xs font-medium uppercase tracking-[0.12em]"
            style={{ color: "#80DFFF" }}
          >
            One connected system
          </p>
          <h2 id="order-flow-heading" className="mb-4 text-3xl font-bold text-white md:text-5xl">
            How an order flows
          </h2>
          <p className="text-base text-white/75 md:text-lg">
            From checkout to reconciled payment, each step hands over to the next without anyone
            retyping the order.
          </p>
        </div>

        <ol className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {STEPS.map((step, index) => (
            <li
              key={step.system}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wide text-[#80DFFF]">
                  {step.system}
                </span>
                <span className="text-xs font-semibold text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{step.description}</p>

              {/* Desktop: arrow over the gap to the next step. */}
              {index < STEPS.length - 1 ? (
                <span
                  className="absolute -right-[13px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#121212] text-[#80DFFF] lg:flex"
                  aria-hidden
                >
                  <ChevronRight className="h-3 w-3" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
