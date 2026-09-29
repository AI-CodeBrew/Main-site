"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { runWhenIdle } from "@/lib/idle";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth wheel scrolling (Axtra-style).
 * Scroll-linked animations read the eased scroll position, so they glide
 * instead of jumping ~100px per wheel notch.
 *
 * The Lenis code is downloaded and started only once the browser is idle after the first
 * paint — native scrolling works in the meantime, so nothing is blocked on it.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const disabled = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let cancelled = false;

    const cancelIdle = runWhenIdle(() => {
      void import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        lenis = new LenisCtor({
          lerp: 0.1,
          autoRaf: true,
          anchors: true,
          // Chat window, menus, modals keep their own native scrolling.
          allowNestedScroll: true,
        });
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      lenis?.destroy();
    };
  }, [disabled]);

  return null;
}
