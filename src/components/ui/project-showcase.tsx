"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { HandUnderline } from "@/components/ui/hand-underline";
import { runWhenIdle } from "@/lib/idle";
import { cn } from "@/lib/utils";

export type ShowcaseProject = {
  title: string;
  description: string;
  year?: string;
  link: string;
  image: string;
  tags?: string[];
  statusColor?: string;
};

type ProjectShowcaseProps = {
  eyebrow?: string;
  title?: string;
  projects: ShowcaseProject[];
  className?: string;
};

function projectImageSrc(src: string, mobile = false): string {
  const fallback = mobile
    ? "/projects/dialcom-mobile.webp"
    : "/projects/dialcom.webp";
  if (!src) return `${fallback}?v=webp`;
  const bare = src.split("?")[0].replace(/\.(jpe?g|png)$/i, ".webp");
  const webp = mobile ? bare.replace(/\.webp$/i, "-mobile.webp") : bare;
  return `${webp}?v=webp`;
}

function AnimatedProjectImage({
  src,
  mobileSrc,
  className,
  active = true,
}: {
  src: string;
  mobileSrc?: string;
  className?: string;
  active?: boolean;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        srcSet={mobileSrc ? `${mobileSrc} 400w, ${src} 640w` : undefined}
        sizes={mobileSrc ? "(max-width: 768px) 400px, 300px" : undefined}
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

export function ProjectShowcase({
  eyebrow = "Selected Work",
  title = "Projects",
  projects,
  className,
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(0);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const updatePreviewPos = (index: number) => {
    const dot = dotRefs.current[index];
    if (!dot) return;
    const rect = dot.getBoundingClientRect();
    // Image center and status-dot center share the same point.
    setPreviewPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  // Warm the desktop hover previews in the background so the first hover is instant.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Previews are desktop-only (`hidden md:block`).
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const urls = [
      ...new Set(projects.map((p) => projectImageSrc(p.image)).filter(Boolean)),
    ];
    if (urls.length === 0) return;

    return runWhenIdle(() => {
      for (const url of urls) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = url;
      }
    }, 2_500);
  }, [projects]);

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

  const active = hoveredIndex !== null ? projects[hoveredIndex] : null;
  const activeColor = active?.statusColor || "#01B4D2";

  return (
    <section
      className={cn("container-page relative pb-10 pt-4 md:py-20", className)}
      aria-labelledby="project-showcase-heading"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="project-showcase-heading"
            className="heading-display text-5xl leading-none text-[#141414] md:text-6xl"
          >
            <HandUnderline color="#3aa6c9" className="text-[#3aa6c9]">
              {title}
            </HandUnderline>
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] md:text-base">{eyebrow}</p>
        </div>
      </div>

      {/* Floating preview — expands from the dot, centers stay locked together */}
      <AnimatePresence>
        {hoveredIndex !== null && active ? (
          <motion.div
            key={`preview-${hoveredIndex}`}
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
              <AnimatedProjectImage
                src={projectImageSrc(active.image)}
                mobileSrc={projectImageSrc(active.image, true)}
                active
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Desktop list */}
      <div className="mt-10 hidden md:block">
        {projects.map((project, index) => {
          const open = hoveredIndex === index;
          const color = project.statusColor || "#01B4D2";

          return (
            <Link
              key={`${project.title}-${index}`}
              href={project.link}
              className="group relative block"
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(index)}
              onBlur={handleLeave}
            >
              <div
                className={cn(
                  "grid grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.6fr)_minmax(0,0.9fr)] items-center gap-6 border-t border-black/[0.08] py-7 transition-colors",
                  open ? "bg-[#F8F9FA]" : "bg-transparent",
                )}
              >
                <h3 className="text-2xl font-semibold tracking-tight text-[#111111] lg:text-3xl">
                  {project.title}
                </h3>

                <div className="relative z-20 mx-auto flex h-10 w-10 items-center justify-center">
                  <motion.span
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="relative z-10 block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={
                      open
                        ? {
                            scale: [1, 1.65, 1.25],
                            boxShadow: `0 0 0 10px ${color}33`,
                          }
                        : {
                            scale: 1,
                            boxShadow: `0 0 0 0px ${color}00`,
                          }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                </div>

                <p className="text-sm leading-relaxed text-[#4B5563] lg:text-[15px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-end gap-2">
                  {(project.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#EFEFEF] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#4B5563]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
        <div className="border-t border-black/[0.08]" />
      </div>

      {/* Mobile accordion */}
      <div className="mt-8 md:hidden">
        {projects.map((project, index) => {
          const open = openMobileIndex === index;
          return (
            <div key={`${project.title}-m-${index}`} className="border-t border-black/[0.08]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open}
                onClick={() => setOpenMobileIndex(open ? null : index)}
              >
                <span className="text-xl font-semibold tracking-tight text-[#111111]">
                  {project.title}
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] shadow-sm">
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
                  <div className="pb-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#EFEFEF] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#4B5563]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-[#4B5563]">
                      {project.description}
                    </p>
                    <Link
                      href={project.link}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#111111] shadow-sm"
                    >
                      View case
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-black/[0.08]" />
      </div>
    </section>
  );
}
