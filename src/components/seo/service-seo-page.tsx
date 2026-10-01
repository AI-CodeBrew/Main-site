import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/features/services/service-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getService,
  type ServiceCategory,
  type ServiceSlug,
} from "@/lib/content/services";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  serviceJsonLd,
} from "@/lib/seo";

/** Shorter SEO titles when headlines are long (keep ~50–60 with brand). */
const SEO_TITLE: Partial<Record<`${ServiceCategory}/${ServiceSlug}`, string>> = {
  "ai/voice-chat": "AI Voice & Chat Agents",
  "ai/workflow": "Business Workflow Automation",
  "ai/sales-marketing": "AI Sales & Marketing",
  "ai/data-analytics": "AI Data & Analytics",
  "ai/custom-agents": "Custom AI Agents",
  "ai/web-development": "Web Development",
  "ai/mobile-development": "Mobile App Development",
  "ai/ui-ux": "UI/UX Design",
  "ai/cloud": "Cloud Application Development",
  "ai/qa-support": "QA, Maintenance & Support",
  "ecommerce/store-setup": "E-commerce Store Setup",
  "ecommerce/product-sourcing": "Product Sourcing & Supply Chain",
  "ecommerce/marketing-growth": "E-commerce Marketing & Growth",
  "ecommerce/sales-funnel": "Sales Funnel Optimization",
  "ecommerce/operations-automation": "E-commerce Operations Automation",
  "ecommerce/data-analytics": "E-commerce Data Analytics",
  "ecommerce/branding-creative": "Branding & Creative Production",
  "ecommerce/maintenance": "Store Maintenance & Management",
  "ecommerce/ai-solutions": "AI for E-commerce",
};

function ctaDescription(subheadline: string): string {
  const base = subheadline.replace(/\s+/g, " ").trim();
  const cta = " Book a free consultation with FynkTech.";
  if (base.length + cta.length <= 158) return base + cta;
  return `${base.slice(0, 158 - cta.length - 1).trimEnd()}…${cta}`;
}

export function servicePageMetadata(
  category: ServiceCategory,
  slug: ServiceSlug,
): Metadata {
  const service = getService(slug, category);
  const key = `${category}/${slug}` as const;
  const title = SEO_TITLE[key] ?? service.headline;
  return buildPageMetadata({
    title,
    description: ctaDescription(service.subheadline),
    path: service.path,
  });
}

export function ServiceSeoPage({
  category,
  slug,
}: {
  category: ServiceCategory;
  slug: ServiceSlug;
}) {
  const service = getService(slug, category);
  const hub =
    category === "ai"
      ? { name: "AI Automation", path: "/ai-automation" }
      : { name: "E-commerce", path: "/ecommerce" };
  const title =
    SEO_TITLE[`${category}/${slug}`] ?? service.headline;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          hub,
          { name: title, path: service.path },
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.headline,
          description: service.subheadline,
          path: service.path,
        })}
      />
      <ServiceTemplate service={service} />
    </>
  );
}
