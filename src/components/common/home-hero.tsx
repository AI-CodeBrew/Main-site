"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { DotGlobe } from "./dot-globe";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollPastHero = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Dotted grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 pt-10 md:pt-14 pb-20 md:pb-24">
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-5"
          >
            AI Automation &amp; E-commerce Agency
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white"
          >
            Automate the busywork.
            <br />
            <span className="text-white/55">Grow the revenue.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-base md:text-lg max-w-xl leading-relaxed text-white/75"
          >
            We build AI agents, workflow automation and high-converting online stores for businesses in Pakistan, the
            Gulf, the UK and the US — so your team saves time and your sales keep climbing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <Link
              href="/contact?intent=strategy-call"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base md:text-lg font-semibold bg-white text-black hover:bg-white/85 transition-colors"
              onClick={() => trackEvent("cta_click", { cta: "book_strategy_call", location: "hero" })}
            >
              Book a Free Strategy Call
            </Link>
            <Link
              href="/free-audit"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base md:text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
              onClick={() => trackEvent("cta_click", { cta: "free_audit", location: "hero" })}
            >
              Get a Free Audit
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-5 text-sm text-white/50"
          >
            Free consultation · No obligation · You own everything we build
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[440px] aspect-square"
        >
          <DotGlobe className="absolute inset-0 h-full w-full" />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollPastHero}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 p-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
