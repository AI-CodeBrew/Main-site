"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type PlatformModule = {
  id: string;
  name: string;
  summary: string;
  connects: string;
  /** Optional product screenshot shown faintly behind the module card. */
  image?: string;
  features: { title: string; description: string }[];
};

const MODULES: PlatformModule[] = [
  {
    id: "OMS",
    name: "Order Management System",
    summary:
      "Every order from every channel in one queue — validated, routed and tracked from checkout to doorstep.",
    connects: "Storefronts, marketplaces, WMS, FMS, couriers",
    image: "/platform/oms-dashboard.png",
    features: [
      {
        title: "Multi-channel order capture",
        description: "Shopify, WooCommerce, Amazon, Noon and custom stores into one queue.",
      },
      {
        title: "Smart order routing",
        description: "Send orders to the right warehouse automatically; split or merge shipments.",
      },
      {
        title: "COD & payment verification",
        description: "Confirm cash-on-delivery orders and flag risky ones before they ship.",
      },
      {
        title: "Status tracking & notifications",
        description: "Customers get SMS, email or WhatsApp updates at every stage.",
      },
      {
        title: "Returns & exchanges (RMA)",
        description: "Raise, approve and restock returns without leaving the system.",
      },
    ],
  },
  {
    id: "WMS",
    name: "Warehouse Management System",
    summary:
      "Know where every unit sits and move it faster — from receiving at the dock to the packed parcel.",
    connects: "OMS, FMS, barcode scanners, couriers",
    features: [
      {
        title: "Receiving & putaway",
        description: "Scan inbound stock against purchase orders and get a suggested bin for each item.",
      },
      {
        title: "Bin & location tracking",
        description: "Zones, racks and bins mapped so any SKU can be found in seconds.",
      },
      {
        title: "Pick, pack & dispatch",
        description: "Batch and wave picking with scan checks that stop wrong items leaving.",
      },
      {
        title: "Cycle counts",
        description: "Count by zone on a schedule instead of closing the warehouse for a full stock take.",
      },
      {
        title: "Multi-warehouse control",
        description: "Run several sites from one screen and transfer stock between them.",
      },
    ],
  },
  {
    id: "FMS",
    name: "Finance Management System",
    summary:
      "Every order's money accounted for — payments, courier remittances and margin reconciled without spreadsheets.",
    connects: "OMS, WMS, couriers, payment gateways",
    features: [
      {
        title: "COD reconciliation",
        description: "Match courier remittances against delivered orders and spot shortfalls.",
      },
      {
        title: "Payment gateway settlements",
        description: "Card and wallet payouts matched to orders, with fees separated out.",
      },
      {
        title: "Order-level margin",
        description: "Product cost, shipping, fees and returns booked against each order.",
      },
      {
        title: "Courier & vendor payables",
        description: "Check courier invoices against shipped parcels before you pay them.",
      },
      {
        title: "Finance reports",
        description: "Revenue, refunds and outstanding COD by channel, courier or date range.",
      },
    ],
  },
  {
    id: "CRM",
    name: "Customer Relationship Management",
    summary:
      "Every customer, conversation and order in one profile — so sales and support always have context.",
    connects: "OMS, WhatsApp, email, AI agents",
    features: [
      {
        title: "Unified customer profile",
        description: "Order history, messages and notes together, whichever channel they came from.",
      },
      {
        title: "Lead & pipeline tracking",
        description: "Follow B2B and wholesale leads from first enquiry to repeat order.",
      },
      {
        title: "Segments & campaigns",
        description: "Group customers by spend or behaviour and message them on WhatsApp, SMS or email.",
      },
      {
        title: "Support tickets",
        description: "Complaints and requests assigned, tracked and closed with a clear owner.",
      },
      {
        title: "AI agent handoff",
        description: "AI answers the routine questions and passes the rest to your team with full history.",
      },
    ],
  },
];

/** Rise-in from below, same feel as the service cards. */
const riseIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
} as const;

/** Operations platform: one tab per back-office module, shown under the e-commerce services grid. */
export function OperationsPlatform() {
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0];

  return (
    <section
      id="operations-platform"
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby="operations-platform-heading"
    >
      <div className="container-page relative z-10">
        {/* Intro: same type classes as the services grid above, in dark-on-white colours. */}
        <motion.div
          {...riseIn}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#6D5DF6]">
            Operations Platform
          </p>
          <h2
            id="operations-platform-heading"
            className="mb-4 text-2xl font-bold text-[#33363F] md:text-4xl"
          >
            OMS, WMS, FMS and more — built to run high order volumes.
          </h2>
          <p className="text-sm text-[#6B7280] md:text-base">
            Modular back-office software that works on its own or as one connected system. Start
            with the module you need today and switch on the rest as you grow.
          </p>
        </motion.div>

        {/* Phones: tabs scroll sideways instead of wrapping. */}
        <div
          role="tablist"
          aria-label="Platform modules"
          className="-mx-4 mt-10 flex gap-2.5 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {MODULES.map((module) => {
            const selected = module.id === active.id;
            return (
              <button
                key={module.id}
                type="button"
                role="tab"
                id={`platform-tab-${module.id}`}
                aria-selected={selected}
                aria-controls="platform-panel"
                onClick={() => {
                  setActiveId(module.id);
                  trackEvent("cta_click", {
                    cta: `platform_${module.id.toLowerCase()}`,
                    location: "ecommerce_operations_platform",
                  });
                }}
                className={`shrink-0 rounded-full border px-5 py-2.5 font-mono text-sm tracking-wide transition-colors duration-200 ${
                  selected
                    ? "border-[#0A0045] bg-[#0A0045] text-white"
                    : "border-[#D4D4D8] text-[#111111] hover:border-[#6D5DF6] hover:text-[#6D5DF6]"
                }`}
              >
                {module.id}
              </button>
            );
          })}
        </div>

        <div
          id="platform-panel"
          role="tabpanel"
          aria-labelledby={`platform-tab-${active.id}`}
          className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {/* Same look as the service cards above: picture on top, dark fade, text at the bottom. */}
          {/* Keyed by module, so the cards rise in again each time the tab changes. */}
          <motion.div
            key={`card-${active.id}`}
            {...riseIn}
            transition={{ duration: 0.55 }}
            className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[#07060F] p-7 md:min-h-[30rem] md:p-9"
          >
            {active.image ? (
              <>
                {/* Anchored top-left, so the account menu on the right of the screenshot is cropped out. */}
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 92vw, 600px"
                  className="-z-20 object-cover object-left-top"
                />
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/80 to-black/15"
                  aria-hidden
                />
              </>
            ) : null}
            <span className="flex h-12 min-w-12 items-center justify-center self-start rounded-xl border border-white/20 bg-white/10 px-3 font-mono text-sm font-semibold tracking-wide text-white backdrop-blur-sm">
              {active.id}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white md:text-[1.75rem]">{active.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-white/80">{active.summary}</p>
            <p className="mt-5 text-sm text-white/60">
              Connects with: <span className="text-white">{active.connects}</span>
            </p>
          </motion.div>

          <motion.ul
            key={`features-${active.id}`}
            {...riseIn}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#07060F] px-7 py-3 md:px-10 md:py-5"
          >
            {active.features.map((feature) => (
              <li key={feature.title} className="flex gap-4 py-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#6D5DF6]" aria-hidden />
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65 md:text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
