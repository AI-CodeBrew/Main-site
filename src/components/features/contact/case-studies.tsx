"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects } from "@/lib/content/company";

type WorkItem = {
  title: string;
  meta: string;
  image: string;
  href: string;
};

const dialcom = projects.find((project) => project.id === "dialcom");

/** Visual stand-ins until real project screenshots are added. Dialcom is the only named client. */
const workItems: WorkItem[] = [
  {
    title: dialcom?.name ?? "Dialcom",
    meta: "AI receptionist · CRM · OMS",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    href: dialcom?.url ?? "/contact",
  },
  {
    title: "Store launch",
    meta: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    href: "/ecommerce/store-setup",
  },
  {
    title: "Support agent",
    meta: "Voice & chat",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/voice-chat",
  },
  {
    title: "Workflow system",
    meta: "Automation",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/workflow",
  },
  {
    title: "Sales funnel",
    meta: "Growth",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    href: "/ecommerce/sales-funnel",
  },
  {
    title: "Custom agent",
    meta: "AI product",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/custom-agents",
  },
];

/**
 * Axtra: scrub 2, start top/bottom, end bottom/center,
 * rotateX 90→0, scale 0.5→1, opacity 0.7→1.
 * Trigger stays on an untransformed wrapper so layout height doesn't collapse.
 */
function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end center"],
  });

  // GSAP scrub: 2 — catch up smoothly, no bounce
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 32,
    mass: 0.85,
    restDelta: 0.0004,
  });

  const rotateX = useTransform(progress, [0, 1], [90, 0]);
  const scale = useTransform(progress, [0, 1], [0.5, 1]);
  const opacity = useTransform(progress, [0, 1], [0.7, 1]);

  return (
    <div
      ref={triggerRef}
      className={`relative z-[999] ${index % 2 === 1 ? "md:mt-[28rem]" : ""}`}
    >
      <motion.a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block will-change-transform"
        style={{
          rotateX,
          scale,
          opacity,
          transformPerspective: 4000,
          transformOrigin: "center center",
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#1c1c1c]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 92vw, 42vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{item.title}</h3>
            <p className="mt-1 text-sm md:text-base text-white/75">{item.meta}</p>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

function smoothstep(amount: number) {
  const t = Math.min(1, Math.max(0, amount));
  return t * t * (3 - 2 * t);
}

export function CaseStudies() {
  const trackRef = useRef<HTMLElement>(null);
  const pinTop = useMotionValue(0);
  const sectionProgress = useMotionValue(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const metrics = { sectionTop: 0, max: 1 };
    let frame = 0;

    const measure = () => {
      const vh = window.innerHeight;
      metrics.sectionTop = track.getBoundingClientRect().top + window.scrollY;
      metrics.max = Math.max(track.offsetHeight - vh, 1);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrolled = window.scrollY - metrics.sectionTop;
        const clamped = Math.min(Math.max(scrolled, 0), metrics.max);
        pinTop.set(clamped);
        sectionProgress.set(clamped / metrics.max);
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pinTop, sectionProgress]);

  // Axtra WORK text scrub: 1
  const smoothSection = useSpring(sectionProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.7,
    restDelta: 0.0004,
  });

  // Axtra: zoom to 3, hold, zoom back to 1
  const wordScale = useTransform(smoothSection, (value) => {
    if (value <= 0.05) return 1;
    if (value < 0.2) return 1 + 2 * smoothstep((value - 0.05) / 0.15);
    if (value <= 0.78) return 3;
    if (value < 0.95) return 3 - 2 * smoothstep((value - 0.78) / 0.17);
    return 1;
  });

  return (
    <section
      ref={trackRef}
      className="relative bg-[#111111]"
      style={{ overflow: "clip" }}
      aria-labelledby="projects-heading"
    >
      <motion.div
        style={{ y: pinTop }}
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex h-[100dvh] items-center justify-center will-change-transform"
      >
        <motion.h2
          id="projects-heading"
          style={{ scale: wordScale }}
          className="text-center text-[clamp(5rem,10.5vw,9.375rem)] font-medium uppercase leading-none tracking-tight text-white will-change-transform"
        >
          work
        </motion.h2>
      </motion.div>

      <div className="relative z-[999] h-[85dvh]" aria-hidden />

      <div
        className="relative z-[999] container-page grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-[30px] md:gap-y-16"
        style={{ perspective: "4000px" }}
      >
        {workItems.map((item, index) => (
          <WorkCard key={item.title} item={item} index={index} />
        ))}
      </div>

      <div className="relative z-[999] h-[120dvh]" aria-hidden />
    </section>
  );
}
