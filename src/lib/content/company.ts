/**
 * Canonical company facts — only verified data.
 * Do not invent clients, stats, addresses, or results here.
 */

export const companyAddress = {
  label: "Pakistan (Delivery Center)",
  line1: "206-CCA2-6C Phase 6 DHA",
  line2: "Lahore 54792",
  country: "Pakistan",
  email: "umer@fynktech.com",
} as const;

/** Real client projects we may name publicly. No invented metrics. */
export const projects = [
  {
    id: "dialcom",
    name: "Dialcom",
    url: "https://dialcom.ai/",
    category: "Lending & Finance",
    image: "/projects/dialcom.jpg" as string | null,
    summary:
      "CRM and voice AI platform for lenders — AI receptionist, CRM, and OMS.",
    deliverables: ["AI receptionist", "CRM", "OMS"] as const,
    /** TODO: add measurable results when client approves public numbers */
    result: null,
  },
] as const;

export const techWeWorkWith = [
  { name: "Shopify", logo: "/brands/shopify.svg" },
  { name: "WooCommerce", logo: "/Logos/logo-ecommerce/WooCommerce_Logo_0.svg" },
  { name: "Supabase", logo: "/Logos/supabase.svg" },
  { name: "AWS", logo: "/Logos/aws.svg" },
  { name: "Zapier", logo: "/Logos/zapier.svg" },
  { name: "Node.js", logo: "/Logos/Node.js_idBSZu62Vz_1.svg" },
  { name: "NestJS", logo: "/Logos/NestJS_id4Zjs7PVZ_1.svg" },
  { name: "LangChain", logo: "/Logos/LangChain_idUYyy_A3P_1.svg" },
  { name: "CrewAI", logo: "/Logos/CrewAI_ids_ENJUEa_1.svg" },
  { name: "Stripe", logo: "/Logos/cc-stripe.svg" },
  { name: "PayPal", logo: "/Logos/cc-paypal.svg" },
  { name: "Flutter", logo: "/Logos/flutter.svg" },
] as const;
