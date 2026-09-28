export type LeadType = "audit" | "calculator" | "contact" | "chat";

export type SequenceEmail = {
  day: number;
  subject: string;
  body: string;
};

/** Draft copy for review — not sent automatically unless Resend is enabled (see TODO in send helper). */
export const emailSequences: Record<LeadType, SequenceEmail[]> = {
  audit: [
    {
      day: 0,
      subject: "Your store audit from Fynk Tech",
      body: "Thanks for requesting a free audit. Here is a summary of what we found and suggested next steps. TODO: attach personalized audit summary.",
    },
    {
      day: 2,
      subject: "Quick win from your audit",
      body: "One change from your audit that often improves conversion: TODO: pick top fix from their report.",
    },
    {
      day: 5,
      subject: "How we implement audit fixes",
      body: "Our process: discovery → scoped proposal → build. Reply if you want a walkthrough of the audit items.",
    },
    {
      day: 9,
      subject: "Case study: similar stores",
      body: "We help with Shopify/Woo launches and funnel work. TODO: link approved case studies only.",
    },
    {
      day: 14,
      subject: "Still planning improvements?",
      body: "Book a free strategy call when ready — no pressure. TODO: insert booking URL.",
    },
  ],
  calculator: [
    {
      day: 0,
      subject: "Your support ROI estimate",
      body: "Thanks for using our ROI calculator. Your inputs suggest meaningful time savings with AI automation — TODO: embed their summary.",
    },
    {
      day: 3,
      subject: "Assumptions behind the numbers",
      body: "We used your ticket volume, handle time, and automation %. Adjust anytime or talk through assumptions with us.",
    },
    {
      day: 6,
      subject: "Voice + chat automation overview",
      body: "Learn how AI agents hand off to humans: /ai-automation/voice-chat",
    },
    {
      day: 10,
      subject: "Pilot scope options",
      body: "Many teams start with one channel (e.g. web chat). TODO: define pilot packages when pricing approved.",
    },
    {
      day: 14,
      subject: "Book a ROI review call",
      body: "Want to validate the model with your real data? TODO: booking link.",
    },
  ],
  contact: [
    {
      day: 0,
      subject: "We received your message — Fynk Tech",
      body: "Thanks for reaching out. A team member will reply within our business hours. TODO: set SLA from siteConfig.",
    },
    {
      day: 2,
      subject: "Resources while you wait",
      body: "Explore our AI automation and e-commerce services on fynktech.com.",
    },
    {
      day: 5,
      subject: "Discovery call invitation",
      body: "A short discovery call helps us understand fit. TODO: booking URL.",
    },
    {
      day: 9,
      subject: "Questions we often cover",
      body: "Timeline, integrations, ownership, and support — see homepage FAQ.",
    },
    {
      day: 14,
      subject: "Still interested?",
      body: "Reply to this email or WhatsApp us if your project is still active.",
    },
  ],
  chat: [
    {
      day: 0,
      subject: "Following up on your chat",
      body: "Thanks for chatting with our assistant. Here is a recap and next steps from your conversation. TODO: inject transcript summary.",
    },
    {
      day: 2,
      subject: "Answers to your open questions",
      body: "We noted items that needed a human — our team follows up here. TODO: personalize.",
    },
    {
      day: 5,
      subject: "Book a strategy call",
      body: "Move from chat to a scoped plan on a quick call. TODO: booking URL.",
    },
    {
      day: 10,
      subject: "Privacy reminder",
      body: "We only use your contact details to respond to your inquiry. Privacy policy: /privacy",
    },
    {
      day: 14,
      subject: "Close the loop",
      body: "If you found another vendor or paused the project, reply 'pause' and we will stop follow-ups.",
    },
  ],
};

/**
 * TODO: When RESEND_API_KEY and RESEND_AUTOMATIONS_ENABLED=true, schedule sends via cron or workflow.
 */
export async function sendSequenceEmail(
  _leadType: LeadType,
  _email: string,
  _day: number,
): Promise<void> {
  // Intentionally no-op until product approves copy and Resend is configured.
}
