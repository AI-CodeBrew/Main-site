import type { Metadata } from "next";
import { Hero } from "@/components/common/hero";
import { ClientLogos } from "@/components/common/client-logos";
import { ServicesGrid } from "@/components/features/services/services-grid";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "AI Automation & Intelligent Agents",
  description:
    "Fynk Tech builds AI voice and chat agents, workflow automation, sales AI and custom agents for businesses in the Gulf, UK and US. Book a free strategy call.",
};

export default function AiAutomationPage() {
  return (
    <main className="min-h-screen">
      <Hero
        videos={["/videos/220941_small.mp4"]}
        eyebrow="AI Automation"
        title="AI agents and automation that answer customers, run workflows and grow revenue"
        description="Voice and chat agents, workflow automation, sales AI and custom agents — built into your CRM and tools, with humans in the loop where it matters."
        trackingLocation="ai_automation_hero"
      />
      <ServicesGrid category="ai" />
      <ClientLogos />
      <FinalCta />
    </main>
  );
}
