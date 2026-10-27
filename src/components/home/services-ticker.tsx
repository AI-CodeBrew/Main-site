import Link from "next/link";

const services = [
  { label: "AI Agents", href: "/ai-automation/custom-agents" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Voice AI Agents", href: "/ai-automation/voice-chat" },
  { label: "AI Chatbots", href: "/ai-automation/voice-chat" },
  { label: "Workflow Automation", href: "/ai-automation/workflow" },
  { label: "Shopify Stores", href: "/ecommerce/store-setup" },
  { label: "E-commerce Development", href: "/ecommerce" },
  { label: "SEO", href: "/ecommerce/marketing-growth" },
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
            className="whitespace-nowrap px-8 text-xl font-medium text-white transition-colors hover:text-white/80 md:px-12"
          >
            {service.label}
          </Link>
          <span className="text-[#01B4D2]" aria-hidden>
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
      className="relative overflow-hidden bg-[#1E293B] py-5"
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
