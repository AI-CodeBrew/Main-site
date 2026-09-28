/**
 * Central event helper — all key conversion actions go through here.
 * PostHog is initialized in `src/instrumentation-client.ts`.
 */
import posthog from "posthog-js";

export type TrackEventName =
  | "cta_click"
  | "chat_opened"
  | "lead_captured"
  | "human_handoff"
  | "booking"
  | "form_submit"
  | "calculator_used"
  | "whatsapp_click"
  | "admin_logged_in";

export type TrackEventProps = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: TrackEventName, props?: TrackEventProps): void {
  if (typeof window === "undefined") return;

  const payload = props ? { ...props } : undefined;

  if (process.env.NODE_ENV === "development") {
    console.debug("[trackEvent]", name, payload ?? {});
  }

  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

  try {
    posthog.capture(name, payload);
  } catch (err) {
    console.error("[trackEvent] PostHog capture failed", err);
  }
}
