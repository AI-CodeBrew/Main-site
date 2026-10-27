"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const SLIDES = [
  {
    id: "dialcom",
    src: "/platform/project-dialcom.webp",
    alt: "Dialcom voice AI CRM — laptop and mobile product mockup",
  },
  {
    id: "fynktech",
    src: "/platform/project-fynktech-v5.webp",
    alt: "FynkTech AI platform with agents, automation and analytics",
  },
  {
    id: "arabia",
    src: "/platform/project-arabia-sales-bot.webp",
    alt: "Arabia Sales Bot WhatsApp AI — laptop and mobile product mockup",
  },
] as const;

const INTERVAL_MS = 8000;

/** Compressed mobile LCP asset (~25KB, 750w) — separate from desktop collage. */
const MOBILE_HERO = {
  src: "/platform/project-fynktech-mobile-hero-lcp.webp",
  alt: "FynkTech AI platform dashboard — revenue, orders and automation overview",
  width: 750,
  height: 1000,
} as const;

/**
 * Mobile: static compressed LCP image (priority).
 * Desktop: scroll-reveal carousel — lazy, never priority (won't steal mobile LCP bandwidth).
 */
export function PlatformShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "start 0.3"],
  });

  const clipRounded = useTransform(scrollYProgress, [0, 1], [320, 16]);
  const frameWidth = useTransform(scrollYProgress, [0, 1], ["78%", "100%"]);
  const clipPath = useMotionTemplate`inset(0 round ${clipRounded}px)`;

  return (
    <section
      ref={sectionRef}
      aria-label="Featured projects"
      className="relative z-10 w-full px-4 pb-0 pt-6 sm:px-6 md:pt-10"
    >
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        {/* Mobile LCP */}
        <div className="relative w-full max-w-md pb-8 md:hidden">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={MOBILE_HERO.src}
              alt={MOBILE_HERO.alt}
              width={MOBILE_HERO.width}
              height={MOBILE_HERO.height}
              className="h-auto w-full object-contain object-center"
              sizes="(max-width: 448px) 100vw, 28rem"
              quality={72}
              priority
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Desktop carousel — lazy, no priority */}
        <motion.div
          style={{
            width: frameWidth,
            clipPath,
            WebkitClipPath: clipPath,
          }}
          className="relative hidden aspect-[16/9] w-full max-w-6xl will-change-[clip-path,width] md:block"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 72rem"
                quality={78}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
