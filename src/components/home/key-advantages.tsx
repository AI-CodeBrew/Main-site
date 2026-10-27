"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HandUnderline } from "@/components/ui/hand-underline";
import { cn } from "@/lib/utils";

type Advantage = {
  title: string;
  description: string;
};

const ADVANTAGES: Advantage[] = [
  {
    title: "Team with industry depth",
    description:
      "AI specialists shipping production agents, voice bots, and ops systems for brands worldwide.",
  },
  {
    title: "Strategy before build",
    description:
      "Every engagement starts with discovery, channel fit, and clear goals — so we build what moves the needle.",
  },
  {
    title: "Custom-only approach",
    description:
      "No generic chat templates. Voice, WhatsApp, CRM, and workflows shaped around how your operations actually run.",
  },
  {
    title: "Expertise for complex needs",
    description:
      "We turn messy multi-channel ops into clear, scalable systems for sales, support, and internal teams.",
  },
  {
    title: "Clear, collaborative process",
    description:
      "Structured milestones, transparent updates, and shared ownership keep you aligned from kickoff to launch.",
  },
  {
    title: "Flexible value for any budget",
    description:
      "Scoped packages and adaptable timelines so you stay on budget without cutting quality where it matters.",
  },
];

/**
 * Light-theme “key advantages” — desktop 3×2 grid, mobile title rows.
 */
export function KeyAdvantages() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#F6F8FB] pb-0 pt-14 md:pb-0 md:pt-20"
      aria-labelledby="key-advantages-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(1,180,210,0.12),transparent_65%)]"
        aria-hidden
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <HandUnderline className="text-lg font-light text-[#6B7280] md:text-xl" color="#5bb8f5">
            Our key advantages
          </HandUnderline>
          <h2
            id="key-advantages-heading"
            className="heading-display mt-3 text-3xl text-[#141414] md:text-4xl lg:text-[2.75rem]"
          >
            6 reasons why clients choose{" "}
            <HandUnderline color="#3aa6c9" className="text-[#3aa6c9]">
              FynkTech
            </HandUnderline>
          </h2>
        </div>

        <ul className="mt-10 divide-y divide-[#0A0045]/10 border-y border-[#0A0045]/10 md:hidden">
          {ADVANTAGES.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="py-6">
                <p className="text-base font-semibold tracking-tight text-[#0A0045]">
                  {item.title}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <ul className="mt-14 hidden md:grid md:grid-cols-3">
          {ADVANTAGES.map((item, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            return (
              <motion.li
                key={item.title}
                className={cn(
                  "px-8 py-10",
                  col > 0 && "border-l border-[#0A0045]/10",
                  row > 0 && "border-t border-[#0A0045]/10",
                )}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="text-lg font-semibold tracking-tight text-[#0A0045]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
