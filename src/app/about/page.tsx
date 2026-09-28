import { PageHero } from "@/components/common/page-hero";
import { PageOverview } from "@/components/features/common/page-overview";
import { About } from "@/components/features/about/about";
import { ClientLogos } from "@/components/common/client-logos";
import { CaseStudies } from "@/components/features/contact/case-studies";
import { Contact } from "@/components/features/contact/contact";

const aboutOverview = {
  title: "AI automation and e-commerce for growing businesses",
  description:
    "Fynk Tech builds AI agents, workflow automation, and e-commerce systems for companies in Pakistan, the Gulf, the UK and the US. We ship production software — not slide decks.",
  features: [
    "AI voice & chat agents with human handoff",
    "CRM, OMS, and workflow automation",
    "Shopify / WooCommerce store builds and growth systems",
    "Based in Lahore, serving regional and international clients",
  ],
  image: "/about.jpeg",
  imageAlt: "Fynk Tech Team and Innovation",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="About Fynk Tech"
        subtitle="Build. Automate. Grow."
        description="Meet the team behind AI automation and e-commerce systems for businesses that need results, not hype."
        backgroundImage="/about.jpeg"
      />
      <PageOverview {...aboutOverview} />
      <About />
      <ClientLogos />
      <CaseStudies />
      <Contact />
    </main>
  );
}
