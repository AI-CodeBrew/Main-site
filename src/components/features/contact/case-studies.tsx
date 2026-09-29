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
              loading="eager"
              unoptimized={!canOptimize(item.image)}
              sizes="(max-width: 768px) 92vw, 640px"
              className="object-cover"
            />
          </div>
        </a>

        {/* Axtra `.portfolio__content-6`: title card revealed on hover (desktop) */}
        <div className="pointer-events-none invisible absolute right-[5%] top-0 z-[9] hidden bg-[#121212] px-[30px] py-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 md:block">
          <h4 className="pb-[5px] text-xl font-medium leading-tight text-white">{item.title}</h4>
          <p className="text-sm text-white">{item.meta}</p>
        </div>

        {/* Phones have no hover, so the title sits under the image. */}
        <div className="pt-3 md:hidden">
          <h4 className="text-lg font-medium leading-tight text-white">{item.title}</h4>
          <p className="text-sm text-white/70">{item.meta}</p>
        </div>
      </motion.div>
    </div>
  );
}

/** PROJECTS is rendered at full-screen width and scaled down, so it stays sharp at its largest. */
const WORD_MIN_SCALE = 0.45;
const WORD_END_SCALE = 0.55;

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

  // Spread over the whole entry so the zoom-in is gradual.
  const growScale = useTransform(enterProgress, [0, 1], [WORD_MIN_SCALE, 1], {
    ease: easeInOut,
  });
  // Starts only once the last card has moved above the word,
  // so the shrinking word is never hidden behind pictures.
  const SHRINK_START = 0.73;
  const shrinkScale = useTransform(outroProgress, [SHRINK_START, 1], [1, WORD_END_SCALE], {
    ease: easeInOut,
  });

  const targetScale = useTransform(() =>
    outroProgress.get() > SHRINK_START ? shrinkScale.get() : growScale.get(),
  );

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
      className="relative bg-[#121212]"
      style={{ overflow: "clip" }}
      aria-labelledby="projects-heading"
    >
      {/* Browser-native pin (Axtra pins its heading with pinSpacing: false): cards scroll over it. */}
      {/* 60dvh block: the word sits ~30% down the screen, and when the section ends the next
          section shows in the bottom 40% instead of a screen of empty dark space. */}
      <div className="pointer-events-none sticky top-0 z-[1] flex h-[60dvh] items-center justify-center overflow-hidden">
        {/* 17vw keeps all 8 letters inside the screen width at full size, on phones too. */}
        <motion.h2
          id="projects-heading"
          style={{ scale: wordScale }}
          className="whitespace-nowrap text-center text-[17vw] font-medium uppercase leading-none tracking-tight text-white"
        >
          projects
        </motion.h2>
      </div>

      <div className="relative z-[2] mx-auto -mt-[60dvh] w-full max-w-[1320px] px-4 md:px-3">
        {/* Axtra: the list starts right under the heading block. */}
        <div className="h-[45dvh] md:h-[350px]" aria-hidden />

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
