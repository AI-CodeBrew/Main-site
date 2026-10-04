import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/common/home-hero";
import { ServicesTicker } from "@/components/home/services-ticker";
import { JsonLd } from "@/components/seo/json-ld";
import { listBlogs } from "@/lib/blogs/store";
import { getProjectCards } from "@/lib/projects/store";
import {
  buildPageMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const ClientLogos = dynamic(
  () => import("@/components/common/client-logos").then((m) => m.ClientLogos),
  { loading: () => <div className="min-h-[12rem]" aria-hidden /> },
);

const HowWeWork = dynamic(
  () => import("@/components/home/how-we-work").then((m) => m.HowWeWork),
  { loading: () => <div className="min-h-[16rem]" aria-hidden /> },
);

const SelectedClients = dynamic(
  () => import("@/components/home/selected-clients").then((m) => m.SelectedClients),
  { loading: () => <div className="min-h-[14rem] bg-white" aria-hidden /> },
);

const CaseStudies = dynamic(
  () =>
    import("@/components/features/contact/case-studies").then((m) => m.CaseStudies),
  { loading: () => <div className="min-h-[20rem] bg-black" aria-hidden /> },
);

const ProvenResults = dynamic(
  () => import("@/components/home/proven-results").then((m) => m.ProvenResults),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> },
);

const FinalCta = dynamic(
  () => import("@/components/home/final-cta").then((m) => m.FinalCta),
  { loading: () => <div className="min-h-[12rem] bg-black" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "AI Agents & E-commerce",
  absoluteTitle: "FynkTech | AI Agents & E-commerce Stores for Global Growth",
  description:
    "FynkTech builds AI agents and e-commerce stores for businesses worldwide. Delivery center in Lahore, Pakistan. Talk to an expert or WhatsApp us today.",
  path: "/",
});

export default async function Home() {
  const [projectCards, blogsResult] = await Promise.all([
    getProjectCards(),
    listBlogs(),
  ]);
  const blogPosts = blogsResult.ok
    ? blogsResult.data.slice(0, 12).map((b) => ({
        slug: b.slug,
        title: b.title,
        description: b.description,
        image: b.card_image || b.image,
      }))
    : [];

  return (
    <main className="min-h-screen">
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <div className="flex min-h-[calc(100svh-4rem)] flex-col">
        <HomeHero />
        <ServicesTicker />
      </div>
      <ClientLogos />
      <HowWeWork />
      <SelectedClients />
      <CaseStudies items={projectCards} />
      <ProvenResults posts={blogPosts} />
      <FinalCta />
    </main>
  );
}
