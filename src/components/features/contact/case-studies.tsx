"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  easeInOut,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { DEFAULT_PROJECTS, type ProjectCard } from "@/lib/projects/defaults";

type WorkItem = ProjectCard;

/** Hosts next.config allows next/image to optimize; anything else (a pasted URL) is shown as-is. */
function canOptimize(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host.endsWith(".b-cdn.net") || host === "images.unsplash.com";
  } catch {
    return false;
  }
}

/**
 * Axtra portfolio item: starts at perspective(4000px) rotateX(90deg) scale(0.5),
 * opacity 0.7 and scrubs to flat / full size.
 * ScrollTrigger: start "top bottom", end "bottom center", scrub 2.
 * Trigger stays on an untransformed wrapper so layout height doesn't collapse.
 */
function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  // 0 when the card's top enters the bottom of the screen, 1 when its bottom does.
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end end"],
  });

  // Short catch-up so it glides but lands promptly, without overshoot.
  const progress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 38,
    mass: 1,
    restDelta: 0.0005,
  });

  // Fully flat, full size and opaque by 85% — the card is stable once it has fully appeared.
  const rotateX = useTransform(progress, [0, 0.85], [90, 0]);
  const scale = useTransform(progress, [0, 0.85], [0.5, 1]);
  const opacity = useTransform(progress, [0, 0.85], [0.7, 1]);

  const external = item.href.startsWith("http");

  return (
    <div
      ref={triggerRef}
      // Axtra `.portfolio__item:nth-child(2n) { top: 50% }` — right column sits half a card lower.
      className={`group relative pb-[30px] ${index % 2 === 1 ? "md:top-1/2" : ""}`}
    >
      <motion.div
        className="will-change-transform"
        style={{ rotateX, scale, opacity, transformPerspective: 4000 }}
      >
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="block"
        >
          <div className="relative aspect-[1587/2245] overflow-hidden bg-[#1c1c1c]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              loading="lazy"
              unoptimized={!canOptimize(item.image)}
              sizes="(max-width: 768px) 92vw, 640px"
              className="object-cover"
            />
          </div>
        </a>

        {/* Title card — always visible, top-right on all breakpoints */}
        <div className="pointer-events-none absolute right-[5%] top-0 z-[9] bg-black/85 px-4 py-3 backdrop-blur-sm sm:px-[30px] sm:py-5">
          <h4 className="pb-[5px] text-base font-medium leading-tight text-white sm:text-xl">{item.title}</h4>
          <p className="text-xs text-white sm:text-sm">{item.meta}</p>
        </div>
      </motion.div>
    </div>
  );
}

/** PROJECTS is rendered at full-screen width and scaled down, so it stays sharp at its largest. */
const WORD_MIN_SCALE = 0.45;
const WORD_END_SCALE = 0.55;
/** Phones: the word is already small at 17vw, so it barely shrinks and doesn't leave an empty block. */
const WORD_END_SCALE_MOBILE = 0.85;
/** Share of the outro scroll after which the heading starts shrinking. */
const SHRINK_START = 0.73;

/**
 * `items` come from /admin/projects. Server pages pass them in; client-only parents
 * (service pages) leave it out and the list is fetched after mount.
 */
export function CaseStudies({ items }: { items?: WorkItem[] }) {
  const [fetched, setFetched] = useState<WorkItem[] | null>(null);

  useEffect(() => {
    if (items) return;
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { cards?: WorkItem[] } | null) => {
        if (!cancelled && data?.cards?.length) setFetched(data.cards);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [items]);

  const workItems = items ?? fetched ?? DEFAULT_PROJECTS;

  const trackRef = useRef<HTMLElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  // Below Tailwind's md breakpoint. A ref, so the scroll transform reads it without re-subscribing.
  const isMobileRef = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => {
      isMobileRef.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Grow: 0 when the section's top enters the bottom of the screen, 1 when it reaches the top.
  const { scrollYProgress: enterProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "start start"],
  });

  // Shrink: 0 when the last card's bottom is at the bottom of the screen, 1 when the section
  // ends at the 60% line, where the pinned heading block lets go and the next section follows.
  const { scrollYProgress: outroProgress } = useScroll({
    target: outroRef,
    offset: ["start end", "end 60%"],
  });

  // One transform over both scroll values, so it always reacts to either of them — even when
  // the page jumps straight to the end (anchor link, fast scroll, reload mid-page).
  const targetScale = useTransform([enterProgress, outroProgress], ([enter, outro]: number[]) => {
    // Shrink: starts only once the last card has moved above the word,
    // so the shrinking word is never hidden behind pictures.
    if (outro > SHRINK_START) {
      const t = easeInOut(Math.min(1, (outro - SHRINK_START) / (1 - SHRINK_START)));
      const endScale = isMobileRef.current ? WORD_END_SCALE_MOBILE : WORD_END_SCALE;
      return 1 + (endScale - 1) * t;
    }
    // Grow: spread over the whole entry so the zoom-in is gradual.
    const t = easeInOut(Math.min(1, Math.max(0, enter)));
    return WORD_MIN_SCALE + (1 - WORD_MIN_SCALE) * t;
  });

  // Light follow so zoom in and out glide instead of tracking every scroll step. No overshoot.
  const wordScale = useSpring(targetScale, {
    stiffness: 110,
    damping: 28,
    mass: 0.6,
    restDelta: 0.0005,
  });

  return (
    <section
      ref={trackRef}
      className="relative bg-black"
      style={{ overflow: "clip" }}
      aria-labelledby="projects-heading"
    >
      {/* Atmosphere — soft black + grid + glows (not flat solid) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% 0%, #12121f 0%, #0a0a12 40%, #000000 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 30%, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 30%, black 15%, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(90,131,255,0.2) 45%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(30,64,175,0.35) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Browser-native pin (Axtra pins its heading with pinSpacing: false): cards scroll over it. */}
      {/* 60dvh block: the word sits ~30% down the screen, and when the section ends the next
          section shows in the bottom 40% instead of a screen of empty dark space.
          Phones: 36dvh, pushed below the fixed header — the word is much shorter there, so a 60dvh
          block was mostly empty black. */}
      <div className="pointer-events-none sticky top-0 z-[1] flex h-[36dvh] items-center justify-center overflow-hidden pt-14 md:h-[60dvh] md:pt-0">
        {/* 17vw keeps all 8 letters inside the screen width at full size, on phones too. */}
        <motion.h2
          id="projects-heading"
          style={{ scale: wordScale }}
          className="whitespace-nowrap text-center text-[17vw] font-medium uppercase leading-none tracking-tight text-white"
        >
          PROJECTS
        </motion.h2>
      </div>

      <div className="relative z-[2] mx-auto -mt-[36dvh] w-full max-w-[1320px] px-4 md:-mt-[60dvh] md:px-3">
        {/* Axtra: the list starts right under the heading block. */}
        <div className="h-[36dvh] md:h-[350px]" aria-hidden />

        {/* md bottom padding = half a card: the right column is pushed down by `top: 50%`,
            which layout doesn't count, so reserve that space or the last card overlaps the outro. */}
        <div className="mx-auto grid max-w-[440px] grid-cols-1 gap-x-[30px] md:max-w-none md:grid-cols-2 md:pb-[calc((100%-30px)*0.3537)]">
          {workItems.map((item, index) => (
            <WorkCard key={`${index}-${item.title}`} item={item} index={index} />
          ))}
        </div>

        {/* Outro: 3/4 of a screen so the last card clears the word before it shrinks, then the section ends. */}
        <div ref={outroRef} className="h-[75dvh]" aria-hidden />
      </div>
    </section>
  );
}
