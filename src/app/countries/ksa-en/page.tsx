import { RegionHero } from "@/components/common/region-hero";
import { ClientLogos } from "@/components/common/client-logos";
import { TransformBusiness } from "@/components/features/services/transform-business";
import { IndustriesImpact } from "@/components/features/industries/industries-impact";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

export default function KSAEnglishPage() {
  return (
    <main className="min-h-screen">
      <RegionHero region="ksa-en" />
      <ClientLogos />
      <TransformBusiness />
      <IndustriesImpact />
      <CaseStudies />
      <Contact />
    </main>
  );
}
