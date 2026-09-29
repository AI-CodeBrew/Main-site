"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth wheel scrolling (Axtra-style).
 * Scroll-linked animations read the eased scroll position, so they glide
 * instead of jumping ~100px per wheel notch.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const disabled = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      anchors: true,
      // Chat window, menus, modals keep their own native scrolling.
      allowNestedScroll: true,
    });

    return () => lenis.destroy();
  }, [disabled]);

  return null;
}
