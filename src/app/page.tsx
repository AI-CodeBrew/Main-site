import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/common/home-hero";
import { PlatformShowcase } from "@/components/home/platform-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import { getProjectCards } from "@/lib/projects/store";
import {
  buildPageMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const SelectedClients = dynamic(
  () => import("@/components/home/selected-clients").then((m) => m.SelectedClients),
  { loading: () => <div className="min-h-[14rem] bg-white" aria-hidden /> },
);

const CaseStudies = dynamic(
  () =>
    import("@/components/features/contact/case-studies").then((m) => m.CaseStudies),
  { loading: () => <div className="min-h-[12rem] bg-white md:min-h-[20rem]" aria-hidden /> },
);

const KeyAdvantages = dynamic(
  () => import("@/components/home/key-advantages").then((m) => m.KeyAdvantages),
  { loading: () => <div className="min-h-[22rem] bg-[#F7F8FA] md:min-h-[28rem]" aria-hidden /> },
);

const DiscussProjectCta = dynamic(
  () =>
    import("@/components/home/discuss-project-cta").then((m) => m.DiscussProjectCta),
  { loading: () => <div className="min-h-[22rem] bg-white md:min-h-[32rem]" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation Agency in Pakistan | AI Agents – FynkTech",
  absoluteTitle: "AI Automation Agency in Pakistan | AI Agents – FynkTech",
  description:
    "FynkTech builds custom AI agents, voice bots and workflow automation for businesses in Pakistan. Automate sales, support and ops. Book a free demo.",
  path: "/",
});

export default async function Home() {
  const projectCards = await getProjectCards();

  return (
    <main className="min-h-screen">
      {/* Warm mobile LCP candidate early (platform mockup sits in first viewport on phones). */}
      <link
        rel="preload"
        as="image"
        href="/platform/project-dialcom-mobile.webp"
        type="image/webp"
      />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <div className="flex flex-col md:min-h-[calc(100svh-4rem)]">
        <HomeHero />
      </div>
      <PlatformShowcase />
      <SelectedClients />
      <CaseStudies items={projectCards} />
      <KeyAdvantages />
      <DiscussProjectCta />
    </main>
  );
}
