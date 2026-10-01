import type { Metadata } from "next";
import { Hero } from "@/components/common/hero";
import { ServicesGrid } from "@/components/features/services/services-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation & Agents",
  description:
    "AI voice and chat agents, workflow automation, sales AI and custom agents for businesses worldwide. Talk to Fynk Tech.",
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
    </main>
  );
}
