/**
 * Lazy PostHog client — the SDK (~165 KB gz) only downloads after the browser is idle,
 * so it never competes with first paint. Calls made before load are queued and flushed
 * once init finishes. Session recording and surveys stay off to avoid their extra scripts.
 */
import { runWhenIdle } from "@/lib/idle";

type PostHogClient = Awaited<typeof import("posthog-js")>["default"];

let client: PostHogClient | null = null;
let loadPromise: Promise<PostHogClient | null> | null = null;
let idleStarted = false;
const pending: Array<(ph: PostHogClient) => void> = [];

function flushQueue(ph: PostHogClient) {
  while (pending.length > 0) {
    const fn = pending.shift();
    try {
      fn?.(ph);
    } catch (err) {
      console.error("[posthog] queued call failed", err);
    }
  }
}

/**
 * Dynamically import and init PostHog. Safe to call many times; only loads once.
 */
export function loadPostHog(): Promise<PostHogClient | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (client) return Promise.resolve(client);
  if (loadPromise) return loadPromise;

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!token || !host) {
    if (process.env.NODE_ENV === "development") {
      const missing = token ? "NEXT_PUBLIC_POSTHOG_HOST" : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN";
      console.warn(
        `[posthog] ${missing} is missing — events will not be sent. This warning stops once it is configured.`,
      );
    }
    loadPromise = Promise.resolve(null);
    return loadPromise;
  }

  loadPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token, {
        api_host: host,
        defaults: "2025-05-24",
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: "identified_only",
        // Keep analytics; skip the heavy recorder + survey bundles.
        disable_session_recording: true,
        disable_surveys: true,
        disable_surveys_automatic_display: true,
        disable_external_dependency_loading: true,
      });
      client = posthog;
      flushQueue(posthog);
      return posthog;
    })
    .catch((err) => {
      console.error("[posthog] failed to load", err);
      loadPromise = null;
      return null;
    });

  return loadPromise;
}

/** Schedule the PostHog download for after first paint (idempotent). */
export function schedulePostHogLoad(timeoutMs = 2_500): () => void {
  if (typeof window === "undefined" || idleStarted) return () => {};
  idleStarted = true;
  return runWhenIdle(() => {
    void loadPostHog();
  }, timeoutMs);
}

/**
 * Run `fn` once PostHog is ready. Queues the call if the SDK is still downloading.
 * If an early interaction happens before idle fires, we still kick off load so the
 * event is not lost.
 */
export function withPostHog(fn: (ph: PostHogClient) => void): void {
  if (typeof window === "undefined") return;
  if (client) {
    try {
      fn(client);
    } catch (err) {
      console.error("[posthog] call failed", err);
    }
    return;
  }
  pending.push(fn);
  void loadPostHog();
}

/** Current client, or null if not loaded yet. Prefer `withPostHog` for writes. */
export function getPostHog(): PostHogClient | null {
  return client;
}
