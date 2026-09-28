/**
 * Site-wide config. Hours / timezone / offline reply are editable in /admin
 * (Supabase site_settings) — use getSiteHoursSettings() or GET /api/settings/hours.
 * Env values below are fallbacks only.
 */

export const siteConfig = {
  name: "Fynk Tech",
  url: "https://www.fynktech.com",
  email: "team@fynktech.com",
  /** TODO: WhatsApp Business number e.g. 923XXXXXXXXX (digits only for wa.me) */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  /** TODO: Cal.com / Calendly booking URL */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /** @deprecated Prefer getSiteHoursSettings() — env fallback only */
  businessHours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat, 10:00–19:00",
  /** @deprecated Prefer getSiteHoursSettings() — env fallback only */
  timezone: process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Karachi",
  /** @deprecated Prefer getSiteHoursSettings() — env fallback only */
  offlineReplyPromise:
    process.env.NEXT_PUBLIC_OFFLINE_REPLY_PROMISE ||
    "We will reply within 2 business hours.",
  /** TODO: voice agent demo phone, or leave empty for coming-soon */
  voiceDemoNumber: process.env.NEXT_PUBLIC_VOICE_DEMO_NUMBER || "",
} as const;

export function whatsappLink(prefill?: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}

/** Packaged offers for homepage — prices pending your approval */
export const packagedOffers = [
  {
    id: "ai-support-agent",
    name: "AI Support Agent",
    forWho: "Teams drowning in chat, WhatsApp, and phone support",
    outcome: "24/7 chat + voice coverage with human handoff",
    startingPrice: null as string | null, // TODO: starting price
    href: "/ai-automation/voice-chat",
  },
  {
    id: "ai-workflow-sales",
    name: "AI Workflow & Sales Automation",
    forWho: "Businesses with repetitive ops and lead follow-up",
    outcome: "Fewer manual tasks, faster response, cleaner pipeline",
    startingPrice: null as string | null, // TODO: starting price
    href: "/ai-automation/workflow",
  },
  {
    id: "shopify-launch",
    name: "Shopify Store Launch",
    forWho: "Brands launching or rebuilding on Shopify / Woo",
    outcome: "Conversion-ready store live and ready to sell",
    startingPrice: null as string | null, // TODO: starting price
    href: "/ecommerce/store-setup",
  },
  {
    id: "ecommerce-growth",
    name: "E-commerce Growth & Funnel Optimization",
    forWho: "Stores with traffic but weak conversion or retention",
    outcome: "Stronger funnel, clearer CTAs, measurable lift plan",
    startingPrice: null as string | null, // TODO: starting price
    href: "/ecommerce/sales-funnel",
  },
] as const;

export const howWeWork = [
  {
    step: 1,
    title: "Discovery call",
    description: "We map your goals, systems, and constraints — then agree what success looks like.",
  },
  {
    step: 2,
    title: "Proposal & build",
    description: "Clear scope, timeline, and deliverables. We build in short cycles with demos you can react to.",
  },
  {
    step: 3,
    title: "Launch & optimize",
    description: "Go live with monitoring, handoff docs, and a plan to improve from real usage.",
  },
] as const;

export const homepageFaq = [
  {
    q: "How much do projects cost?",
    a: "Pricing depends on scope, integrations, and timeline. We share a clear proposal after discovery. TODO: publish starting prices once approved.",
  },
  {
    q: "How long does a typical project take?",
    a: "Smaller agents and store launches often ship in weeks; larger CRM/OMS builds take longer. We give a timeline in the proposal after discovery.",
  },
  {
    q: "What does your process look like?",
    a: "Discovery call → proposal & build → launch & optimize. You get demos during build, not a big reveal at the end.",
  },
  {
    q: "What tech do you use?",
    a: "We pick the stack that fits the job — commonly Shopify/Woo, Node, NestJS, Supabase, AWS, LangChain/CrewAI, and voice/chat stacks. See our tech strip for examples.",
  },
  {
    q: "Do you support after launch?",
    a: "Yes. We offer maintenance and iteration retainers. Scope is agreed up front so you know what is covered.",
  },
  {
    q: "Who owns the code and accounts?",
    a: "You own your IP, repos, and vendor accounts. We build in your environments (or hand everything over at launch).",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. We’re based in Lahore and work with clients in the Gulf, UK, and US (remote-first).",
  },
  {
    q: "Can we start with a free audit or strategy call?",
    a: "Yes — book a free strategy call or request a free store audit. We’ll tell you honestly if we’re not the right fit.",
  },
] as const;
