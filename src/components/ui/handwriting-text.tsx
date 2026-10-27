"use client";

import { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";

/**
 * Lightweight cycling script text — no CDN / opentype.js.
 * Keeps the hero word rotation without blocking homepage load.
 */
const scriptFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  // Don't compete with Plus Jakarta (hero LCP font) on the critical request path.
  preload: false,
});

export interface HandwritingTextProps {
  text?: string;
  words?: string[];
  interval?: number;
  /** Kept for API compatibility; unused. */
  fontUrl?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  fill?: boolean;
  height?: string;
  className?: string;
}

export function HandwritingText({
  text,
  words,
  interval = 3200,
  height = "1.15em",
  className,
}: HandwritingTextProps) {
  const cycle = Boolean(words && words.length > 0);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const current = cycle ? words![index % words!.length] : (text ?? "");

  useEffect(() => {
    if (!cycle) return undefined;
    const id = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => i + 1);
        setVisible(true);
      }, 220);
    }, interval);
    return () => clearInterval(id);
  }, [cycle, interval]);

  // Keep first paint fully opaque — fading the cycling word would delay LCP text.
  return (
    <span
      className={cn(scriptFont.className, "inline-block", className)}
      style={{
        height,
        lineHeight: 1,
        opacity: visible ? 1 : 0.35,
        transform: visible ? "translateY(0)" : "translateY(0.08em)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
      }}
      aria-live="polite"
    >
      {current}
    </span>
  );
}

export default HandwritingText;
