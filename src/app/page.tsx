import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/common/home-hero";
import { PlatformShowcase } from "@/components/home/platform-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import { listBlogs } from "@/lib/blogs/store";
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

const HomeBlogs = dynamic(
  () => import("@/components/home/home-blogs").then((m) => m.HomeBlogs),
  { loading: () => <div className="min-h-[24rem] bg-white" aria-hidden /> },
);

const ScalableSmarter = dynamic(
  () => import("@/components/home/scalable-smarter").then((m) => m.ScalableSmarter),
  { loading: () => <div className="hidden min-h-[28rem] bg-[#F4F5F7] md:block" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation Agency in Pakistan | AI Agents – FynkTech",
  absoluteTitle: "AI Automation Agency in Pakistan | AI Agents – FynkTech",
  description:
    "FynkTech builds custom AI agents, voice bots and workflow automation for businesses in Pakistan. Automate sales, support and ops. Book a free demo.",
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
        createdAt: b.created_at,
      }))
    : [];

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
      <ScalableSmarter />
      <HomeBlogs posts={blogPosts} />
    </main>
  );
}
