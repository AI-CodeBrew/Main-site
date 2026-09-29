/**
 * Kick off PostHog only after the browser is idle so its ~165 KB bundle (and any
 * remote extras) never block first paint. See `src/lib/posthog-client.ts`.
 */
import { schedulePostHogLoad } from "@/lib/posthog-client";

schedulePostHogLoad();
