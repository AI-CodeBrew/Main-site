"use client";

import React from "react";
import { motion } from "framer-motion";

type IntersectingRingsProps = {
  /**
   * "auto" (default) follows the visitor's light/dark system theme, as in the original component.
   * "light" always draws white rings — use it on dark backgrounds like the home hero, where
   * dark rings would be invisible for visitors in light mode.
   */
  tone?: "auto" | "light";
  /** Outer size in px (default 48, as in the original). The rings are drawn at 10/12 of it. */
  size?: number;
};

const RING_COLORS = {
  auto: [
    "border-t-zinc-800 dark:border-t-white border-r-zinc-800/30 dark:border-r-white/30 border-b-zinc-800/10 dark:border-b-white/10 border-l-transparent",
    "border-b-zinc-800 dark:border-b-white border-t-zinc-800/30 dark:border-t-white/30 border-l-zinc-800/10 dark:border-l-white/10 border-r-transparent",
  ],
  light: [
    "border-t-white border-r-white/30 border-b-white/10 border-l-transparent",
    "border-b-white border-t-white/30 border-l-white/10 border-r-transparent",
  ],
} as const;

export const IntersectingRings = ({ tone = "auto", size = 48 }: IntersectingRingsProps) => {
  const [first, second] = RING_COLORS[tone];
  const ring = Math.round((size * 10) / 12);
  // Keep the stroke in proportion: 2px at the original 48px.
  const ringStyle = {
    width: ring,
    height: ring,
    borderWidth: Math.max(2, Math.round(size / 24)),
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div
      className="relative flex items-center justify-center [perspective:800px]"
      style={{ width: size, height: size }}
    >
      <motion.div
        className={`absolute rounded-full border-solid ${first}`}
        style={ringStyle}
        animate={{ rotateX: 360, rotateY: 180 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute rounded-full border-solid ${second}`}
        style={ringStyle}
        animate={{ rotateX: 180, rotateY: 360 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default IntersectingRings;
