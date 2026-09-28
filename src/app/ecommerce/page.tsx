import { PageHero } from "@/components/common/page-hero";
import { Ecommerce } from "@/components/features/services/ecommerce";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

export default function EcommercePage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="E-commerce Solutions"
        subtitle="Next-Gen Online Store Operations"
        description="Managed stores, in-house brands, performance marketing, and AI-driven insights to maximize your e-commerce success."
      />
      <Ecommerce />
      <CaseStudies />
      <Contact />
    </main>
  );
}
