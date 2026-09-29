import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/common/home-hero";
import { ServicesTicker } from "@/components/home/services-ticker";
import { getProjectCards } from "@/lib/projects/store";

const ClientLogos = dynamic(
  () => import("@/components/common/client-logos").then((m) => m.ClientLogos),
  { loading: () => <div className="min-h-[12rem]" aria-hidden /> },
);

const HowWeWork = dynamic(
  () => import("@/components/home/how-we-work").then((m) => m.HowWeWork),
  { loading: () => <div className="min-h-[16rem]" aria-hidden /> },
);

const CaseStudies = dynamic(
  () =>
    import("@/components/features/contact/case-studies").then((m) => m.CaseStudies),
  { loading: () => <div className="min-h-[20rem]" aria-hidden /> },
);

const FinalCta = dynamic(
  () => import("@/components/home/final-cta").then((m) => m.FinalCta),
  { loading: () => <div className="min-h-[12rem]" aria-hidden /> },
);

export const metadata: Metadata = {
  title: "AI Agents & E-commerce Systems",
  description:
    "Fynk Tech builds AI agents and e-commerce stores that grow revenue for businesses in the Gulf, UK and US. Talk to an expert or message us on WhatsApp.",
};

export default async function Home() {
  const projectCards = await getProjectCards();

  return (
    <main className="min-h-screen">
      <HomeHero />
      <ServicesTicker />
      <ClientLogos />
      <HowWeWork />
      <CaseStudies items={projectCards} />
      <FinalCta />
    </main>
  );
}
