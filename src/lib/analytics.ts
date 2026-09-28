/**
 * Central event helper. No-op for now — PostHog (or similar) plugs in here later.
 * Call this at every key conversion action so instrumentation stays in one place.
 */
export type TrackEventName =
  | "cta_click"
  | "chat_opened"
  | "lead_captured"
  | "human_handoff"
  | "booking"
  | "form_submit"
  | "audit_submit"
  | "calculator_used"
  | "whatsapp_click";

export type TrackEventProps = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: TrackEventName, props?: TrackEventProps): void {
  if (process.env.NODE_ENV === "development") {
    // Keep quiet in production until a provider is connected
    console.debug("[trackEvent]", name, props ?? {});
  }
  // TODO: PostHog — posthog.capture(name, props)
}
