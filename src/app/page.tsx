import type { Metadata } from "next";
import { HomeHero } from "@/components/common/home-hero";
import { ClientLogos } from "@/components/common/client-logos";
import { PackagedOffers } from "@/components/home/packaged-offers";
import { HowWeWork } from "@/components/home/how-we-work";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { VoiceDemoSection } from "@/components/home/voice-demo-section";
import { HomepageFaq } from "@/components/home/homepage-faq";
import { FinalCta } from "@/components/home/final-cta";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";

export const metadata: Metadata = {
  title: "AI Agents & E-commerce Systems",
  description:
    "Fynk Tech builds AI agents and e-commerce stores that grow revenue for businesses in the Gulf, UK and US. Book a free strategy call or get a free store audit.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeHero />
      <ClientLogos />
      <SplineSceneBasic />
      <PackagedOffers />
      <HowWeWork />
      <CaseStudies />
      <VoiceDemoSection />
      <HomepageFaq />
      <FinalCta />
    </main>
  );
}
