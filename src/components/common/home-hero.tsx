"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Spotlight } from "@/components/ui/spotlight";

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" aria-hidden>
        <span className="loader" />
      </div>
    ),
  },
);

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShowRobot(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scrollPastHero = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #12121f 0%, #0a0a12 55%, #000000 100%)",
      }}
    >
      <Spotlight className="z-[1]" size={320} fill="white" />

      {/* Fine line grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
        }}
      />

      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(90,131,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className={`container-page relative z-10 grid grid-cols-1 items-center gap-8 lg:gap-10 pt-10 md:pt-14 pb-20 md:pb-24 ${
          showRobot ? "lg:grid-cols-[1.05fr_1fr]" : ""
        }`}
      >
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-5"
          >
            AI &amp; E-commerce Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white"
          >
            AI &amp; E-commerce. Built to Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-base md:text-lg max-w-xl leading-relaxed text-white/75"
          >
            AI agents, automation and e-commerce that save time and grow sales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <Link
              href="/contact?intent=strategy-call"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base md:text-lg font-semibold bg-white text-black hover:bg-white/85 transition-colors cursor-pointer"
              onClick={() => trackEvent("cta_click", { cta: "book_strategy_call", location: "hero" })}
            >
              Talk to an expert
            </Link>
          </motion.div>
        </div>

        {showRobot ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto w-full h-[320px] sm:h-[400px] lg:h-[480px] cursor-default"
            aria-label="Interactive AI agent 3D preview"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={scrollPastHero}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
