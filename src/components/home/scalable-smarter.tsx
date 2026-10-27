"use client";

import { useRef } from "react";
import {
  BarChart3,
  Globe,
  MessageCircle,
  MessageSquare,
  Mic,
  ShoppingBag,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STEPS = [
  { label: "Website", icon: Globe },
  { label: "Chatbot", icon: MessageSquare },
  { label: "WhatsApp Bot", icon: MessageCircle },
  { label: "Voice Agent", icon: Mic },
  { label: "CRM Sync", icon: Users },
  { label: "Shopify Store", icon: ShoppingBag },
  { label: "Workflows", icon: Workflow },
  { label: "Analytics", icon: BarChart3 },
  { label: "AI Agents", icon: Sparkles },
] as const;

export function ScalableSmarter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.5"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="relative hidden overflow-hidden bg-[#F4F5F7] md:block"
      aria-label="Your AI Automation Journey"
    >
      <div className="container-page py-12 md:py-16">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-[1.75rem] bg-white px-4 py-10 shadow-[0_1px_0_rgba(15,23,42,0.04)] md:px-8 md:py-12"
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
            System efficiency
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-[#0B1220] md:text-3xl">
            Your AI Automation Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-[#6B7280] md:text-base">
            Start with a site, then layer chat, voice, CRM and commerce — each step
            makes the system smarter.
          </p>

          {/* Desktop: all icons on one horizontal line */}
          <div className="relative mx-auto mt-12 hidden max-w-6xl md:block">
            <div className="pointer-events-none absolute inset-x-4 top-[4.25rem] z-0 h-[3px] overflow-hidden rounded-full bg-[#E8EEF5]">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#5A83FF] via-[#01B4D2] to-[#7CDB3A]"
                style={{ scaleX: lineProgress }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-9 gap-2 px-1">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                      delay: 0.06 + i * 0.05,
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E8EEF5] bg-gradient-to-b from-white to-[#F7FAFC] shadow-[0_12px_28px_-14px_rgba(15,23,42,0.35)] ring-1 ring-[#01B4D2]/10 transition duration-300 hover:-translate-y-1 hover:ring-[#01B4D2]/35">
                      <Icon className="h-6 w-6 text-[#0B1220]" strokeWidth={1.75} />
                    </div>

                    <span
                      className="mt-3 block h-5 w-px bg-gradient-to-b from-[#01B4D2]/40 to-[#01B4D2]"
                      aria-hidden
                    />
                    <span
                      className="relative z-10 -mt-px h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#5A83FF] to-[#01B4D2] shadow-[0_0_0_4px_rgba(1,180,210,0.15)]"
                      aria-hidden
                    />

                    <span className="mt-3 min-h-[2.5rem] max-w-[5.5rem] text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#4B5563]">
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical journey */}
          <ol className="relative mx-auto mt-10 max-w-sm space-y-0 md:hidden">
            <motion.div
              className="absolute bottom-3 left-[1.35rem] top-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#5A83FF] via-[#01B4D2] to-[#7CDB3A]"
              style={{ scaleY: lineProgress }}
              aria-hidden
            />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.label}
                  className="relative flex items-center gap-4 py-3 pl-2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ delay: 0.06 + i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8EEF5] bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-[#0B1220]" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold text-[#0B1220]">{step.label}</span>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
