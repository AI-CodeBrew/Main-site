import { PageHero } from "@/components/common/page-hero";
import { AiAutomation } from "@/components/features/services/ai-automation";
import { Process } from "@/components/features/services/process";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

export default function AiAutomationPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="AI Automation & Intelligent Agents"
        subtitle="Transform Your Business with Smart Automation"
        description="Custom AI agents, SaaS solutions, and intelligent automation tools that streamline workflows and accelerate growth."
      />
      <AiAutomation />
      <Process />
      <CaseStudies />
      <Contact />
    </main>
  );
}
