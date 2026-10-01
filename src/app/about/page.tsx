import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/common/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getProjectCards } from "@/lib/projects/store";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const PageOverview = dynamic(
  () => import("@/components/features/common/page-overview").then((m) => m.PageOverview),
  { loading: () => <div className="min-h-[24rem]" aria-hidden /> },
);

const About = dynamic(
  () => import("@/components/features/about/about").then((m) => m.About),
  { loading: () => <div className="min-h-[20rem]" aria-hidden /> },
);

const ClientLogos = dynamic(
  () => import("@/components/common/client-logos").then((m) => m.ClientLogos),
  { loading: () => <div className="min-h-[12rem]" aria-hidden /> },
);

const CaseStudies = dynamic(
  () =>
    import("@/components/features/contact/case-studies").then((m) => m.CaseStudies),
  { loading: () => <div className="min-h-[20rem]" aria-hidden /> },
);

const Contact = dynamic(
  () => import("@/components/features/contact/contact").then((m) => m.Contact),
  { loading: () => <div className="min-h-[16rem]" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Meet FynkTech — AI agents, automation and e-commerce systems for businesses worldwide. Delivery center in Lahore, Pakistan.",
  path: "/about",
});

const aboutOverview = {
  title: "AI automation and e-commerce for growing businesses",
  description:
    "FynkTech builds AI agents, workflow automation, and e-commerce systems for companies worldwide. We ship production software from Lahore — not slide decks.",
  features: [
    "AI voice & chat agents with human handoff",
    "CRM, OMS, and workflow automation",
    "Shopify / WooCommerce store builds and growth systems",
    "Global clients · delivery center in Lahore, Pakistan",
  ],
  image: "/about.jpeg",
  imageAlt: "FynkTech Team and Innovation",
};

export default async function AboutPage() {
  const projectCards = await getProjectCards();
  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        title="About FynkTech"
        subtitle="Build. Automate. Grow."
        description="Meet the team behind AI automation and e-commerce systems for businesses that need results, not hype."
        backgroundImage="/about.jpeg"
      />
      <PageOverview {...aboutOverview} />
      <About />
      <ClientLogos />
      <CaseStudies items={projectCards} />
      <Contact />
    </main>
  );
}
