"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HandUnderlineProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Stroke color for the underline. Default: light sky blue. */
  color?: string;
  /**
   * When to draw the lines in:
   * - `view` — when scrolled into view (default)
   * - `mount` — on first paint / load
   * - `false` — already drawn, no animation
   */
  animate?: "view" | "mount" | false;
};

/**
 * Thin pen-like double underline under inline heading text.
 * Almost-straight strokes with a subtle imperfect bow — not a thick swoosh.
 */
export function HandUnderline({
  children,
  className,
  style,
  color = "#5bb8f5",
  animate = "view",
}: HandUnderlineProps) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(animate === false || !!reduceMotion);

  useEffect(() => {
    if (animate === false || reduceMotion) {
      setDrawn(true);
      return;
    }

    if (animate === "mount") {
      const id = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(id);
    }

    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate, reduceMotion]);

  return (
    <span
      ref={wrapRef}
      className={cn("relative inline-block", className)}
      style={style}
    >
      {children}
      <svg
        className="pointer-events-none absolute left-0 top-full -mt-0.5 h-3.5 w-full overflow-visible"
        viewBox="0 0 300 14"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ color }}
      >
        <path
          d="M2 4 C 80 2.5, 200 2, 298 3.5"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: reduceMotion
              ? undefined
              : "stroke-dashoffset 0.8s ease-out",
          }}
        />
        <path
          d="M40 10 C 120 8.5, 220 8.5, 285 9.5"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.9}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: reduceMotion
              ? undefined
              : "stroke-dashoffset 0.8s ease-out 0.3s",
          }}
        />
      </svg>
    </span>
  );
}
