import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/common/hero";
import { AutomationSteps } from "@/components/features/services/automation-steps";
import { AutomationUseCases } from "@/components/features/services/automation-use-cases";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const ServicesGrid = dynamic(
  () => import("@/components/features/services/services-grid").then((m) => m.ServicesGrid),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation & Agents",
  description:
    "AI voice and chat agents, workflow automation, sales AI and custom agents for businesses worldwide. Talk to FynkTech.",
  path: "/ai-automation",
});

export default function AiAutomationPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI Automation", path: "/ai-automation" },
        ])}
      />
      <Hero
        videos={["/videos/220941_small.mp4"]}
        eyebrow="AI Automation"
        title="AI agents and automation that answer customers, run workflows and grow revenue"
        description="Voice and chat agents, workflow automation, sales AI and custom agents — built into your CRM and tools, with humans in the loop where it matters."
        trackingLocation="ai_automation_hero"
      />
      <ServicesGrid category="ai" />
      <AutomationSteps />
      <AutomationUseCases />
    </main>
  );
}
