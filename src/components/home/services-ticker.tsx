import Link from "next/link";

const services = [
  { label: "AI Agents", href: "/ai-automation/custom-agents" },
  { label: "Voice & Chat Bots", href: "/ai-automation/voice-chat" },
  { label: "Workflow Automation", href: "/ai-automation/workflow" },
  { label: "Store Setup", href: "/ecommerce/store-setup" },
  { label: "Sales Funnels", href: "/ecommerce/sales-funnel" },
  { label: "Digital Marketing", href: "/ecommerce/marketing-growth" },
  { label: "Branding", href: "/ecommerce/branding-creative" },
  { label: "Web Dev", href: "/ai-automation/web-development" },
  { label: "App Dev", href: "/ai-automation/mobile-development" },
  { label: "UI & UX", href: "/ai-automation/ui-ux" },
  { label: "Cloud", href: "/ai-automation/cloud" },
  { label: "Data Analytics", href: "/ai-automation/data-analytics" },
];

function TickerRow({ hidden = false }: { hidden?: boolean }) {
  return (
    // max-w-none: globals.css caps every element at max-width 100%, which squeezed this
    // row to screen width and made the words spill into each other.
    <ul className="flex w-max max-w-none shrink-0 items-center" aria-hidden={hidden || undefined}>
      {services.map((service) => (
        <li key={service.label} className="flex max-w-none shrink-0 items-center">
          <Link
            href={service.href}
            tabIndex={hidden ? -1 : undefined}
            className="whitespace-nowrap px-8 md:px-12 text-base md:text-xl font-medium text-[#2B2B2B] transition-colors hover:text-black"
          >
            {service.label}
          </Link>
          <span className="text-[#9A9A9A]" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Right-to-left services ticker under the home hero. Pauses on hover. */
export function ServicesTicker() {
  return (
    <section
      aria-label="Our services"
      className="relative overflow-hidden border-y border-[#D4D4D4] bg-[#E6E6E6] py-5 md:py-6"
    >
      {/* Two identical rows; the track moves -50% so the loop is seamless. */}
      <div
        className="animate-scroll-left flex w-max max-w-none motion-reduce:[animation:none]"
        style={{ animationDuration: "40s" }}
      >
        <TickerRow />
        <TickerRow hidden />
      </div>
    </section>
  );
}
