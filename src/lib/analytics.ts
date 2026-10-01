/**
 * Central event helper — all key conversion actions go through here.
 * PostHog loads after idle via `src/lib/posthog-client.ts` (scheduled from
 * `instrumentation-client.ts`); early events are queued until init finishes.
 */
import { withPostHog } from "@/lib/posthog-client";

/**
 * Named product events for the FynkTech marketing site.
 * Keep names stable — PostHog dashboards and insights key off these.
 */
export type TrackEventName =
  | "cta_click"
  | "nav_click"
  | "chat_icon_clicked"
  | "chat_opened"
  | "chat_started"
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

  withPostHog((ph) => {
    ph.capture(name, payload);
  });
}
