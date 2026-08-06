"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ServiceDetailsProps {
  title: string;
  description: string;
  sections: {
    title: string;
    description: string;
    features: string[];
  }[];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export function ServiceDetails({ title, description, sections }: ServiceDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const isScrollingRef = useRef(false);
  const metricsRef = useRef<{ cardTop: number; cardHeight: number; gapY: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // IntersectionObserver to attach/detach scroll handler
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    // Initialize metrics when items are rendered
    const firstItem = itemRefs.current[0];
    if (firstItem) {
      const rect = firstItem.getBoundingClientRect();
      metricsRef.current = {
        cardTop: listEl.getBoundingClientRect().top,
        cardHeight: rect.height,
        gapY: 12, // vertical gap between stacked cards in px (reduced)
      };
    }

    const animateStackCards = () => {
      const list = listRef.current;
      const metrics = metricsRef.current;
      if (!list || !metrics) return;

      const { cardTop, cardHeight, gapY } = metrics;
      const topNow = list.getBoundingClientRect().top;
      let lastFixed = -1;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const item = itemRefs.current[i];
        if (!item) continue;
        const scrolling = cardTop - topNow - i * (cardHeight + gapY);

        // base translate for stacking spacing
        const baseTranslate = gapY * i;

        if (scrolling > 0) {
          const scale = Math.max((cardHeight - scrolling * 0.05) / cardHeight, 0.82);
          item.style.transform = `translateY(${baseTranslate}px) scale(${scale})`;
          lastFixed = i;
        } else {
          item.style.transform = `translateY(${baseTranslate}px) scale(1)`;
        }
      }

      if (lastFixed !== -1 && lastFixed !== activeIndex) {
        setActiveIndex(lastFixed);
      }

      isScrollingRef.current = false;
    };

    const onScroll = () => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      window.requestAnimationFrame(animateStackCards);
    };

    const io = new IntersectionObserver((entries) => {
      const isInView = entries[0]?.isIntersecting;
      if (isInView) {
        if (!scrollListenerRef.current) {
          scrollListenerRef.current = onScroll;
          window.addEventListener("scroll", onScroll, { passive: true });
          // run once to set initial transforms
          animateStackCards();
        }
      } else {
        if (scrollListenerRef.current) {
          window.removeEventListener("scroll", scrollListenerRef.current);
          scrollListenerRef.current = null;
        }
      }
    });

    io.observe(listEl);

    return () => {
      io.disconnect();
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
    };
  }, [sections.length]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #0A0A3C 0%, #1E3296 30%, #2A2A6A 70%, #0A0A3C 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(30, 50, 150, 0.3) 0%, transparent 60%)",
          filter: "blur(1px)",
        }}
      />

      <div className="container-page">
        {/* Header */}
        <motion.div {...fadeUp} className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-zinc-200">{description}</p>
        </motion.div>

        {/* Stacking Cards (sticky + IntersectionObserver like CodyHouse) */}
        <ul ref={listRef} className="stack-cards js-stack-cards relative" style={{ paddingBlock: "6rem" }}>
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            return (
              <li
                key={index}
                ref={(el) => { if (el) itemRefs.current[index] = el; }}
                className="stack-cards__item js-stack-cards__item will-change-transform"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative grid grid-cols-1 items-stretch gap-8 rounded-3xl border border-white/15 bg-white/5 p-6 md:grid-cols-12 md:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
                  animate={index === activeIndex ? { scale: 1.015, boxShadow: "0 25px 80px -30px rgba(0,0,0,0.55)" } : { scale: 1, boxShadow: "0 10px 40px -15px rgba(0,0,0,0.35)" }}
                  style={{ transformOrigin: "center top" }}
                >
                  {/* glossy top bar */}
                  <div className="pointer-events-none absolute inset-x-4 top-3 h-8 rounded-xl bg-gradient-to-r from-white/15 via-white/5 to-transparent blur-sm" />
                  <motion.div
                    className="absolute -top-6 left-6 select-none rounded-full bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] px-5 py-2 text-base md:text-lg font-bold text-white shadow-lg"
                    animate={index === activeIndex ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0.85 }}
                    transition={{ duration: 0.25 }}
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </motion.div>

                  {/* left: section title & copy */}
                  <div className={`md:col-span-6 md:col-start-1`}>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">{section.title}</h3>
                    <p className="mt-3 text-zinc-200 leading-relaxed">{section.description}</p>
                  </div>

                  {/* right: feature chips */}
                  <div className={`md:col-span-6 md:col-start-7`}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {section.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                          transition={{ duration: 0.25, delay: featureIndex * 0.05 }}
                          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-[#1E2A8A]/30 px-4 py-3 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="mt-0.5 rounded-full bg-gradient-to-r from-[#4A4A9A] to-[#2A2A6A] p-1.5 text-white">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <p className="leading-relaxed text-zinc-100">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Minimal CSS for stacking behavior */}
      <style jsx>{`
        .stack-cards__item {
          position: sticky;
          top: 2rem; /* similar to var(--space-sm) */
          transform-origin: center top;
          margin-bottom: 0; /* we'll control spacing via translateY */
          transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  );
}
