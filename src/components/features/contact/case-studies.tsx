"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
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

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`relative z-10 block ${index % 2 === 1 ? "md:mt-[22rem]" : ""}`}
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
    </a>
  );
}

function smoothstep(amount: number) {
  const t = Math.min(1, Math.max(0, amount));
  return t * t * (3 - 2 * t);
}

export function CaseStudies() {
  const trackRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pinTop = useMotionValue(0);
  const viewport = useMotionValue(900);
  const intro = useMotionValue(1000);
  const stack = useMotionValue(2400);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const lead = introRef.current;
    const grid = gridRef.current;
    if (!track || !lead || !grid) return;

    const metrics = { sectionTop: 0, max: 1 };
    let frame = 0;

    const measure = () => {
      const vh = window.innerHeight;
      viewport.set(vh);
      intro.set(Math.max(lead.offsetHeight, 1));
      stack.set(grid.offsetHeight);
      metrics.sectionTop = track.getBoundingClientRect().top + window.scrollY;
      metrics.max = Math.max(track.offsetHeight - vh, 1);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrolled = window.scrollY - metrics.sectionTop;
        pinTop.set(Math.min(Math.max(scrolled, 0), metrics.max));
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    const observer = new ResizeObserver(onResize);
    observer.observe(grid);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [intro, pinTop, stack, viewport]);

  const wordScale = useTransform([pinTop, viewport, intro, stack], ([scrolled, vh, introHeight, stackHeight]) => {
    const distance = Number(scrolled);
    const height = Number(vh);
    const lead = Number(introHeight);
    const grid = Number(stackHeight);
    const zoomInStart = height * 0.08;
    const zoomInEnd = Math.max(zoomInStart + 1, lead * 0.72);
    const zoomOutStart = lead + grid - height * 0.2;
    const zoomOutEnd = zoomOutStart + height * 0.62;

    if (distance <= zoomInStart) return 1;
    if (distance < zoomInEnd) return 1 + 0.85 * smoothstep((distance - zoomInStart) / (zoomInEnd - zoomInStart));
    if (distance <= zoomOutStart) return 1.85;
    if (distance < zoomOutEnd) return 1.85 - 0.85 * smoothstep((distance - zoomOutStart) / (zoomOutEnd - zoomOutStart));
    return 1;
  });

  return (
    <section
      ref={trackRef}
      className="relative bg-[#111111]"
      style={{ overflow: "hidden" }}
      aria-labelledby="projects-heading"
    >
      <motion.div
        style={{ y: pinTop }}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[100dvh] items-center justify-center will-change-transform"
      >
        <motion.h2
          id="projects-heading"
          style={{ scale: wordScale }}
          className="text-center text-[clamp(4.75rem,17vw,15rem)] font-semibold uppercase leading-none tracking-[-0.045em] text-white"
        >
          work
        </motion.h2>
      </motion.div>

      <div className="relative z-10">
        <div ref={introRef} className="h-[112dvh]" aria-hidden />
        <div
          ref={gridRef}
          className="container-page grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 md:gap-y-16"
        >
          {workItems.map((item, index) => (
            <WorkCard key={item.title} item={item} index={index} />
          ))}
        </div>
        <div className="h-[92dvh]" aria-hidden />
      </div>
    </section>
  );
}
