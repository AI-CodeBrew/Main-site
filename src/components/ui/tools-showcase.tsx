"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Minus, Plus } from "lucide-react";
import { HandUnderline } from "@/components/ui/hand-underline";
import { runWhenIdle } from "@/lib/idle";
import { cn } from "@/lib/utils";
import type { FynkTool } from "@/lib/content/tools";

type ToolsShowcaseProps = {
  tools: FynkTool[];
  eyebrow?: string;
  title?: string;
  hideTitle?: boolean;
  className?: string;
};

/** Same motion language as ProjectShowcase hover previews */
function AnimatedToolImage({
  src,
  active = true,
  className,
}: {
  src: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        loading="eager"
        decoding="async"
        fetchPriority="low"
        animate={
          active
            ? {
                scale: [1, 1.08, 1.03, 1.1, 1],
                x: ["0%", "-2%", "1.5%", "-1%", "0%"],
                y: ["0%", "1.5%", "-1%", "2%", "0%"],
              }
            : { scale: 1, x: "0%", y: "0%" }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        animate={active ? { x: ["-140%", "420%"] } : { x: "-140%" }}
        transition={{
          duration: 2.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2.2,
        }}
      />
    </div>
  );
}

/** Concise spoken path: Connect Shopify → Pick a template → … → Result */
function JourneyLine({
  steps,
  accent,
  className,
}: {
  steps: string[];
  accent: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[15px] leading-snug tracking-tight md:text-base",
        className,
      )}
    >
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <span key={step} className="inline-flex items-center gap-2">
            <span
              className={cn(
                "font-medium",
                last ? "font-semibold text-[#0A0045]" : "text-[#374151]",
              )}
              style={last ? { color: accent === "#0A0045" ? "#0A0045" : accent } : undefined}
            >
              {step}
            </span>
            {!last ? (
              <span className="select-none text-[#C4C9D1]" aria-hidden>
                →
              </span>
            ) : null}
          </span>
        );
      })}
    </p>
  );
}

export function ToolsShowcase({
  tools,
  eyebrow,
  title = "Tools",
  hideTitle = false,
  className,
}: ToolsShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const updatePreviewPos = (index: number) => {
    const dot = dotRefs.current[index];
    if (!dot) return;
    const rect = dot.getBoundingClientRect();
    setPreviewPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const urls = [...new Set(tools.map((t) => t.image).filter(Boolean))];
    if (urls.length === 0) return;

    return runWhenIdle(() => {
      for (const url of urls) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = url;
      }
    }, 2_500);
  }, [tools]);

  useEffect(() => {
    if (hoveredIndex === null) return;
    const onScrollOrResize = () => updatePreviewPos(hoveredIndex);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [hoveredIndex]);

  const handleEnter = (index: number) => {
    updatePreviewPos(index);
    setHoveredIndex(index);
  };

  const handleLeave = () => setHoveredIndex(null);

  const active = hoveredIndex !== null ? tools[hoveredIndex] : null;
  const activeColor = active?.accent || "#01B4D2";

  return (
    <section
      className={cn("container-page relative pb-4 pt-2 md:pb-8 md:pt-4", className)}
      {...(hideTitle
        ? { "aria-label": title }
        : { "aria-labelledby": "tools-showcase-heading" })}
    >
      {!hideTitle ? (
        <div className="text-center">
          <h2
            id="tools-showcase-heading"
            className="heading-display text-5xl leading-none text-[#141414] md:text-6xl"
          >
            <HandUnderline color="#3aa6c9" className="text-[#3aa6c9]">
              {title}
            </HandUnderline>
          </h2>
          {eyebrow ? (
            <p className="mt-2 text-sm text-[#6B7280] md:text-base">{eyebrow}</p>
          ) : null}
        </div>
      ) : null}

      <AnimatePresence>
        {hoveredIndex !== null && active ? (
          <motion.div
            key={`tool-preview-${hoveredIndex}`}
            className="pointer-events-none fixed z-50 hidden md:block"
            style={{
              left: previewPos.x,
              top: previewPos.y,
            }}
            initial={{ opacity: 0, scale: 0.08, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.08, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 460, damping: 30, mass: 0.7 }}
          >
            <div
              className="relative aspect-square w-[240px] overflow-hidden rounded-2xl ring-1 ring-black/10 lg:w-[300px]"
              style={{
                boxShadow: `0 28px 70px -18px rgba(10,0,69,0.38), 0 0 0 1px ${activeColor}55`,
              }}
            >
              <AnimatedToolImage src={active.image} active />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Desktop — name + journey | center hover-dot | open */}
      <div className={cn("hidden md:block", !hideTitle && "mt-10")}>
        {tools.map((tool, index) => {
          const open = hoveredIndex === index;
          const color = tool.accent || "#01B4D2";
          const steps = tool.journey?.length ? tool.journey : null;

          return (
            <div
              key={tool.id}
              className={cn(
                "group relative border-t border-black/[0.08] py-8 transition-colors",
                open && "bg-[#F8F9FA]/40",
              )}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_2.5rem_13.5rem] items-center gap-6 lg:gap-10">
                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#111111] lg:text-[1.85rem]">
                    {tool.name}
                  </h3>
                  {steps ? (
                    <JourneyLine steps={steps} accent={color} className="mt-3" />
                  ) : (
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4B5563]">
                      {tool.description}
                    </p>
                  )}
                </div>

                <div className="relative z-20 flex h-10 w-10 items-center justify-center justify-self-center">
                  <motion.span
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="relative z-10 block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={
                      open
                        ? {
                            scale: [1, 1.45, 1.2],
                            boxShadow: `0 0 0 8px ${color}22`,
                          }
                        : {
                            scale: 1,
                            boxShadow: `0 0 0 0px ${color}00`,
                          }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0045] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#070643]"
                >
                  Open {tool.name}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                </a>
              </div>
            </div>
          );
        })}
        <div className="border-t border-black/[0.08]" />
      </div>

      {/* Mobile — compact cards, subtle image, clear journey + CTA */}
      <div className={cn("md:hidden", !hideTitle && "mt-8")}>
        <div className="space-y-3">
          {tools.map((tool, index) => {
            const open = openMobileIndex === index;
            return (
              <div
                key={`${tool.id}-m`}
                className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white/80"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenMobileIndex(open ? null : index)}
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold tracking-tight text-[#111111]">
                      {tool.name}
                    </span>
                    {!open && tool.journey?.length ? (
                      <span className="mt-1 block truncate text-sm text-[#6B7280]">
                        {tool.journey.join(" → ")}
                      </span>
                    ) : null}
                  </span>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111]">
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 px-4 pb-4">
                      <div className="overflow-hidden rounded-xl ring-1 ring-black/10">
                        <div className="relative aspect-square w-full">
                          <AnimatedToolImage src={tool.image} active={open} />
                        </div>
                      </div>
                      {tool.journey?.length ? (
                        <JourneyLine
                          steps={tool.journey}
                          accent={tool.accent}
                          className="text-sm"
                        />
                      ) : (
                        <p className="text-sm leading-relaxed text-[#4B5563]">
                          {tool.description}
                        </p>
                      )}
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0045] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
                      >
                        Open {tool.name}
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
