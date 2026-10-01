import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/common/hero";
import { OrderFlow } from "@/components/features/services/order-flow";
import { OurWarehouses } from "@/components/features/services/our-warehouses";
import { WhyFynkTech } from "@/components/features/services/why-fynktech";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const ServicesGrid = dynamic(
  () => import("@/components/features/services/services-grid").then((m) => m.ServicesGrid),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> },
);

const OperationsPlatform = dynamic(
  () =>
    import("@/components/features/services/operations-platform").then((m) => m.OperationsPlatform),
  { loading: () => <div className="min-h-[36rem] bg-white" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "E-commerce Solutions",
  description:
    "Shopify and WooCommerce stores, sourcing, marketing, funnels and AI support for brands worldwide. Start with FynkTech.",
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
      <OperationsPlatform />
      <OrderFlow />
      <WhyFynkTech />
      <OurWarehouses />
    </main>
  );
}
