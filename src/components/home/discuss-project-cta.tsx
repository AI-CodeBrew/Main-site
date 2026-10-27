"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

/**
 * Halo Lab final CTA — one section: spinning shot ring + copy/CTA layered
 * in the same container (not a separate image block then text below).
 */

/** Halo-style 4:3 WebP shots (640×480) for the spinning arc. */
const SHOT_POOL = [
  { src: "/cta/shot-01-dashboard.webp", alt: "Orders analytics dashboard" },
  { src: "/cta/shot-02-ai-hero.webp", alt: "AI insights landing page" },
  { src: "/cta/shot-03-lifestyle.webp", alt: "Lifestyle health product UI" },
  { src: "/cta/shot-04-welcome.webp", alt: "Welcome dashboard interface" },
  { src: "/cta/shot-05-biolab.webp", alt: "Biolab brand website" },
  { src: "/cta/shot-06-finance.webp", alt: "Finance product website" },
  { src: "/cta/shot-07-science.webp", alt: "Science research platform" },
] as const;

/** 14 slots = each of 7 shots twice, even spacing around the ring. */
const SLOT_COUNT = 14;
const ANGLE_STEP = 360 / SLOT_COUNT;
const START_ANGLE = 90;
/** Very slow — ~0.18°/s. */
const AUTO_DEG_PER_MS = 0.003;

const SHOTS = Array.from({ length: SLOT_COUNT }, (_, i) => ({
  ...SHOT_POOL[i % SHOT_POOL.length],
  angle: START_ANGLE + i * ANGLE_STEP,
  key: `shot-${i}`,
}));

export function DiscussProjectCta() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const inViewRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef(0);

  /** Paint rotation on the compositor — never through React state (avoids 60fps re-renders). */
  const applyRotation = useCallback((deg: number) => {
    rotationRef.current = deg;
    const rotor = rotorRef.current;
    if (rotor) rotor.style.transform = `rotate(${deg}deg) translateZ(0)`;
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!draggingRef.current) {
        applyRotation(rotationRef.current + AUTO_DEG_PER_MS * dt);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafRef.current) return;
      last = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        inViewRef.current = visible;
        if (visible) start();
        else stop();
      },
      { rootMargin: "15% 0px", threshold: 0 },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      stop();
    };
  }, [reduceMotion, applyRotation]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    draggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !lastPointerRef.current || !wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const prev = lastPointerRef.current;
    const a0 = Math.atan2(prev.y - cy, prev.x - cx);
    const a1 = Math.atan2(e.clientY - cy, e.clientX - cx);
    applyRotation(rotationRef.current + ((a1 - a0) * 180) / Math.PI);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    lastPointerRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-0 pb-6 pt-0 md:pb-14 [contain:layout_paint]"
      aria-labelledby="discuss-project-heading"
    >
      {/* Copy in the same section — sits in the open center of the full-width arc */}
      <div className="pointer-events-none relative z-[5] mx-auto flex w-full max-w-[82rem] flex-col items-center px-5 pt-[17rem] sm:pt-[18rem] md:px-8 md:pt-[30rem] lg:pt-[34rem]">
        <div className="pointer-events-none flex w-full max-w-3xl flex-col items-center gap-6 text-center md:gap-10">
          <div className="flex max-w-[40rem] flex-col items-center gap-3 md:gap-8">
            <h2
              id="discuss-project-heading"
              className="heading-display max-w-[15.25rem] text-2xl text-[#141414] sm:max-w-[18rem] md:max-w-[25rem] md:text-[2.5rem] lg:max-w-[40rem] lg:text-[3.5rem]"
            >
              Ready to discuss your project with us?
            </h2>
            <p className="mx-auto max-w-[14.75rem] text-xs font-medium leading-[1.6] text-[rgba(2,2,30,0.5)] md:max-w-[24rem] md:text-base md:text-[rgba(2,2,30,0.7)] lg:max-w-[35rem] lg:text-xl">
              Let&apos;s talk about how we can design, build, and grow AI agents
              and automation that put you ahead of the competition.
            </p>
          </div>

          <Link
            href="/contact"
            className={cn(
              "pointer-events-auto inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-5",
              "bg-[#5A83FF] text-xs font-medium uppercase tracking-[0.06em] text-white",
              "transition-colors duration-200 hover:bg-[#4A73F0]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A83FF] focus-visible:ring-offset-2",
              "md:h-12 md:px-6 md:text-sm",
            )}
            onClick={() =>
              trackEvent("cta_click", {
                cta: "get_in_touch",
                location: "discuss_project_cta",
              })
            }
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/*
        Full-bleed wheel. Only shots capture pointer (hand cursor) —
        empty center / text area stays default cursor.
        Mobile: wheel sits higher so the arc clears the copy without a tall empty band.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-8 z-0 overflow-hidden md:top-12"
        aria-hidden
      >
        <div
          ref={wheelRef}
          className={cn(
            "pointer-events-none absolute left-1/2",
            "aspect-square w-[max(128vw,85rem)] -translate-x-1/2",
            "bottom-[-22vw] md:bottom-[-52vw]",
            "touch-none select-none",
          )}
          style={
            {
              ["--orbit-y" as string]: "min(63.5vw, 42rem)",
            } as CSSProperties
          }
        >
          <div
            ref={rotorRef}
            className="relative h-full w-full will-change-transform [backface-visibility:hidden]"
          >
            {SHOTS.map((shot) => (
              <div
                key={shot.key}
                className={cn(
                  "group/shot pointer-events-auto absolute left-1/2 top-1/2 cursor-pointer",
                  "w-[5.75rem] md:w-[9rem] lg:w-[14.75rem]",
                  "aspect-[4/3]",
                  "rounded-[0.25rem]",
                  "shadow-[0_10px_28px_rgba(28,57,105,0.16)]",
                  "active:cursor-grabbing",
                )}
                style={{
                  transform: `translate3d(-50%, -50%, 0) rotate(${shot.angle}deg) translate3d(0, calc(var(--orbit-y) * -1), 0)`,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-[0.25rem] bg-white",
                    "transition-transform duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                    "group-hover/shot:scale-[1.04]",
                  )}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 92px, (max-width: 1024px) 144px, 236px"
                    className="pointer-events-none object-cover object-center"
                    quality={70}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
