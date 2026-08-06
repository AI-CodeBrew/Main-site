import { Hero } from "@/components/common/hero";
import { ClientLogos } from "@/components/common/client-logos";
import { FeaturedIn } from "@/components/common/featured-in";
import { TransformBusiness } from "@/components/features/services/transform-business";
import { IndustriesImpact } from "@/components/features/industries/industries-impact";
import { StoriesTransformations } from "@/components/features/about/stories-transformations";
import { Achievements } from "@/components/features/about/achievements";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ClientLogos />
      <FeaturedIn />
      <TransformBusiness />
      <IndustriesImpact />
      <CaseStudies />
      <Achievements />
      <Contact />
    </main>
  );
}
