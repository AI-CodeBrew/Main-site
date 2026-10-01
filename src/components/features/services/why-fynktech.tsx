import Link from "next/link";
import { Bot, Boxes, Globe, Headset, Layers, Rocket } from "lucide-react";

const REASONS = [
  {
    icon: Layers,
    title: "One team, the whole stack",
    description:
      "Storefront, back-office systems and AI agents built by the same people, so nothing falls between vendors.",
  },
  {
    icon: Boxes,
    title: "Modular, not all-or-nothing",
    description:
      "Start with the module you need today — OMS, WMS, FMS or CRM — and switch on the rest as you grow.",
  },
  {
    icon: Bot,
    title: "AI built into the workflow",
    description:
      "Agents that answer customers, confirm orders and hand off to your team with the full history.",
  },
  {
    icon: Rocket,
    title: "Working demos, not big reveals",
    description:
      "Short build cycles with something you can click and react to, instead of waiting for a final handover.",
  },
  {
    icon: Globe,
    title: "Global clients, engineered in Lahore",
    description:
      "We work with teams selling internationally, from our delivery center in Lahore, Pakistan.",
  },
  {
    icon: Headset,
    title: "Support after launch",
    description:
      "Maintenance and iteration with scope agreed up front, so you know exactly what is covered.",
  },
] as const;

/** Why FynkTech: closing reasons + CTA on the e-commerce page, under the order flow. */
export function WhyFynkTech() {
  return (
    <section
      id="why-fynktech"
      className="relative overflow-hidden bg-white py-20 md:py-24"
      aria-labelledby="why-fynktech-heading"
    >
      <div className="container-page relative z-10">
        {/* Intro: same sizes and colours as the operations platform section. */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#6D5DF6]">
            Why FynkTech
          </p>
          <h2
            id="why-fynktech-heading"
            className="mb-4 text-2xl font-bold text-[#33363F] md:text-4xl"
          >
            One partner for your store and everything behind it
          </h2>
          <p className="text-sm text-[#6B7280] md:text-base">
            We build the storefront, the systems that run it and the AI that supports it — and stay
            on after launch.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-[#E5E7EB] bg-[#F5F5F8] p-6 transition-colors duration-200 hover:border-[#6D5DF6]/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A0045] text-white">
                <reason.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-[#111111]">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{reason.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link href="/contact" className="btn btn-primary">
            Talk to an expert
          </Link>
        </div>
      </div>
    </section>
  );
}
