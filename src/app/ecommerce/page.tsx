import type { Metadata } from "next";
import { Hero } from "@/components/common/hero";
import { ServicesGrid } from "@/components/features/services/services-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "E-commerce Solutions",
  description:
    "Shopify and WooCommerce stores, sourcing, marketing, funnels and AI support for Gulf, UK and US brands. Start with Fynk Tech.",
  path: "/ecommerce",
});

export default function EcommercePage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "E-commerce", path: "/ecommerce" },
        ])}
      />
      <Hero
        videos={["/videos/6719ad0ceed6d5aa24a83d61_67481679b9cd09200f69661b_mena-transcode.mp4"]}
        eyebrow="E-commerce"
        title="Online stores that launch fast, sell more and run themselves"
        description="Shopify and WooCommerce builds, product sourcing, marketing and AI support — everything your store needs to grow, from one team."
        trackingLocation="ecommerce_hero"
      />
      <ServicesGrid category="ecommerce" />
    </main>
  );
}
