"use client";

import { RoadmapCard } from "@/components/ui/roadmap-card";

const ORDER_STEPS = [
  {
    quarter: "Store",
    title: "Customer orders",
    description: "Website or marketplace",
    status: "done" as const,
  },
  {
    quarter: "OMS",
    title: "Order verified",
    description: "Routed to a warehouse",
    status: "done" as const,
  },
  {
    quarter: "WMS",
    title: "Picked & packed",
    description: "Scan-checked, labelled",
    status: "done" as const,
  },
  {
    quarter: "TMS",
    title: "Shipped",
    description: "Tracked to the door",
    status: "done" as const,
  },
  {
    quarter: "FMS",
    title: "Reconciled",
    description: "Payment & margin booked",
    status: "done" as const,
  },
];

/** How an order moves through the platform — roadmap timeline under warehouses. */
export function OrderFlow() {
  return (
    <section
      id="order-flow"
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby="order-flow-heading"
    >
      <div className="container-page relative z-10">
        <div className="rounded-3xl bg-[#F3F4F6] px-6 py-12 md:px-10 md:py-16 lg:px-14">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#01B4D2]">
              One connected system
            </p>
            <h2
              id="order-flow-heading"
              className="mb-4 text-3xl font-bold text-[#0A0045] md:text-5xl"
            >
              How an order flows
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#6B7280] md:text-lg">
              From checkout to reconciled payment, each step hands over to the next without anyone
              retyping the order.
            </p>
          </div>

          <RoadmapCard
            title="Order journey"
            description="Five connected systems from checkout to cash"
            items={ORDER_STEPS}
            className="mx-auto max-w-5xl border-0 bg-transparent shadow-none hover:shadow-none"
          />
        </div>
      </div>
    </section>
  );
}
