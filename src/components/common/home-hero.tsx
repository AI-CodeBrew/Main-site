"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Spotlight } from "@/components/ui/spotlight";
import { IntersectingRings } from "@/components/ui/intersecting-rings";

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

/**
 * The loader stays until the 3D robot has loaded. This is only a safety net for a robot that
 * never loads (blocked network, WebGL off), so visitors are never stuck on the loader.
 */
const MAX_LOADER_MS = 30_000;

const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * Spline's onLoad fires when the scene file is ready, a moment before the robot is actually
 * drawn and animating. Wait this long after its first frames so the loader never lifts early.
 */
const ROBOT_SETTLE_MS = 700;

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showRobot, setShowRobot] = useState(false);
  const [screenChecked, setScreenChecked] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [loaderTimedOut, setLoaderTimedOut] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setShowRobot(mq.matches);
      setScreenChecked(true);
    };
    sync();
    mq.addEventListener("change", sync);

    // The rest of the page (scripts, fonts, above-the-fold images) must be loaded too.
    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    let cancelled = false;
    void Promise.all([windowLoaded, document.fonts?.ready]).then(() => {
      if (!cancelled) setPageLoaded(true);
    });

    const timer = window.setTimeout(() => setLoaderTimedOut(true), MAX_LOADER_MS);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, []);

  // Start connecting to Spline's servers right away so the robot (and the loader) finish sooner.
  if (showRobot) preconnect("https://prod.spline.design");

  // After Spline says it's loaded, let it paint two frames and settle before lifting the loader.
  const onRobotLoad = () => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => window.setTimeout(() => setRobotLoaded(true), ROBOT_SETTLE_MS)),
    );
  };

  // Desktop: page + robot both ready, so hero and robot appear at the same moment.
  // Phones have no robot, so they only wait for the page.
  const heroReady =
    loaderTimedOut || (screenChecked && pageLoaded && (!showRobot || robotLoaded));

  // While the loading screen is up: keep the page at the top and block scrolling, so visitors
  // land on the hero when it appears. Capture-phase listeners run before Lenis's own.
  useEffect(() => {
    if (heroReady) return;
    const block = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);
    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) block(e);
    };
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    window.addEventListener("wheel", block, { capture: true, passive: false });
    window.addEventListener("touchmove", block, { capture: true, passive: false });
    window.addEventListener("keydown", blockKeys, { capture: true });
    return () => {
      html.style.overflow = previousOverflow;
      window.removeEventListener("wheel", block, { capture: true });
      window.removeEventListener("touchmove", block, { capture: true });
      window.removeEventListener("keydown", blockKeys, { capture: true });
    };
  }, [heroReady]);

  const scrollPastHero = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      // flex-1: the page wraps hero + ticker in one screen-tall column; the hero takes the space
      // left above the ticker (see app/page.tsx) and centers its content in it.
      className="relative flex flex-1 flex-col justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #12121f 0%, #0a0a12 55%, #000000 100%)",
      }}
    >
      {/* Website loading screen: covers the whole screen, menu bar and chat button included
          (also in the server HTML, so the half-loaded site never flashes) while the page and
          3D robot load behind it, then fades away to reveal the finished home page. */}
      <AnimatePresence>
        {!heroReady && (
          <motion.div
            key="site-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-6 bg-black"
            role="status"
            aria-label="Loading"
          >
            <IntersectingRings tone="light" size={96} />
            <span className="text-sm md:text-base font-medium uppercase tracking-[0.35em] text-white/60">
              Loading
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
        className={`container-page relative z-10 grid grid-cols-1 items-center gap-8 lg:gap-10 pt-8 pb-16 md:pt-10 lg:py-8 ${
          showRobot ? "lg:grid-cols-[1.05fr_1fr]" : ""
        }`}
      >
        <div className="text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-5"
          >
            AI &amp; E-commerce Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7 }}
            className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white"
          >
            AI &amp; E-commerce. Built to Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.15 }}
            className="mt-6 text-base md:text-lg max-w-xl leading-relaxed text-white/75"
          >
            AI agents, automation and e-commerce that save time and grow sales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : undefined}
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
            // Shrinks on short laptop screens so hero + ticker still fit in the first screen
            // (14rem ≈ menu bar + ticker + hero padding).
            className="relative mx-auto w-full h-[320px] sm:h-[400px] lg:h-[min(480px,calc(100svh-14rem))] cursor-default"
            aria-label="Interactive AI agent 3D preview"
          >
            <SplineScene
              scene={ROBOT_SCENE}
              className="w-full h-full"
              onLoad={onRobotLoad}
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
