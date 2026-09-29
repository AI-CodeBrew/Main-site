"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { runWhenIdle } from "@/lib/idle";

const VercelAnalytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics), {
  ssr: false,
});

/**
 * Vercel Analytics, mounted only once the browser is idle after the first paint.
 * The page view is still recorded (Analytics sends it on mount), it just no longer
 * competes with the content for bandwidth and main-thread time.
 */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => runWhenIdle(() => setReady(true)), []);

  return ready ? <VercelAnalytics /> : null;
}
