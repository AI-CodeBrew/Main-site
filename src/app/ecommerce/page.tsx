import type { Metadata } from "next";
import { Hero } from "@/components/common/hero";
import { ClientLogos } from "@/components/common/client-logos";
import { ServicesGrid } from "@/components/features/services/services-grid";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "E-commerce Solutions",
  description:
    "Fynk Tech launches and grows online stores — Shopify and WooCommerce builds, product sourcing, marketing, funnels and AI support for businesses in the Gulf, UK and US.",
};

export default function EcommercePage() {
  return (
    <main className="min-h-screen">
      <Hero
        videos={["/videos/6719ad0ceed6d5aa24a83d61_67481679b9cd09200f69661b_mena-transcode.mp4"]}
        eyebrow="E-commerce"
        title="Online stores that launch fast, sell more and run themselves"
        description="Shopify and WooCommerce builds, product sourcing, marketing and AI support — everything your store needs to grow, from one team."
        trackingLocation="ecommerce_hero"
      />
      <ServicesGrid category="ecommerce" />
      <ClientLogos />
      <FinalCta />
    </main>
  );
}
