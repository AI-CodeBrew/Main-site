import type { Metadata } from "next";
import { siteConfig, socialLinks } from "@/lib/content/site";

export const SITE_URL = siteConfig.url; // https://www.fynktech.com
export const OG_IMAGE_PATH = "/og.png";
export const LOGO_SQUARE_PATH = "/icon-192.png";

/** Absolute URL helper */
export function absUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

function clampDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

type PageMetaInput = {
  /** Page topic only — template appends "| Fynk Tech" unless absoluteTitle is set */
  title: string;
  description: string;
  path: string;
  /** Full document title, e.g. homepage starting with "Fynk Tech" */
  absoluteTitle?: string;
  ogType?: "website" | "article";
  image?: string;
  noIndex?: boolean;
};

/** Idiomatic Next.js Metadata for a public page */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  ogType = "website",
  image = OG_IMAGE_PATH,
  noIndex = false,
}: PageMetaInput): Metadata {
  const desc = clampDescription(description);
  const canonical = path === "/" ? absUrl("/") : absUrl(path);
  const ogTitle = absoluteTitle ?? `${title} | Fynk Tech`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: canonical,
      siteName: "Fynk Tech",
      type: ogType,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Fynk Tech",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fynk Tech",
    alternateName: ["FynkTech", "fynktech.com"],
    url: absUrl("/"),
    logo: absUrl(LOGO_SQUARE_PATH),
    email: siteConfig.email,
    sameAs: [
      socialLinks.facebook,
      socialLinks.instagram,
      socialLinks.linkedin,
      // TODO: add YouTube / X (Twitter) profile URLs when available
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${siteConfig.whatsappNumber}`,
        availableLanguage: ["English", "Urdu", "Arabic"],
        // WhatsApp is primary chat channel
        url: `https://wa.me/${siteConfig.whatsappNumber}`,
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fynk Tech",
    alternateName: ["FynkTech", "fynktech.com"],
    url: absUrl("/"),
    publisher: { "@type": "Organization", name: "Fynk Tech", url: absUrl("/") },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: clampDescription(input.description, 300),
    url: absUrl(input.path),
    provider: {
      "@type": "Organization",
      name: "Fynk Tech",
      url: absUrl("/"),
    },
    areaServed: ["AE", "SA", "GB", "US", "PK", "QA", "KW", "BH", "OM"],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Static public paths for sitemap (blog posts added dynamically). */
export const STATIC_PUBLIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/case-studies",
  "/roi-calculator",
  "/privacy",
  "/terms",
  "/ai-automation",
  "/ai-automation/voice-chat",
  "/ai-automation/workflow",
  "/ai-automation/sales-marketing",
  "/ai-automation/data-analytics",
  "/ai-automation/custom-agents",
  "/ai-automation/web-development",
  "/ai-automation/mobile-development",
  "/ai-automation/ui-ux",
  "/ai-automation/cloud",
  "/ai-automation/qa-support",
  "/ecommerce",
  "/ecommerce/store-setup",
  "/ecommerce/product-sourcing",
  "/ecommerce/marketing-growth",
  "/ecommerce/sales-funnel",
  "/ecommerce/operations-automation",
  "/ecommerce/data-analytics",
  "/ecommerce/branding-creative",
  "/ecommerce/maintenance",
  "/ecommerce/ai-solutions",
] as const;
