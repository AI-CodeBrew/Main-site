import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Contact } from "@/components/features/contact/contact";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, e-commerce growth, and building systems that scale — from the Fynk Tech team.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="Blog"
        subtitle="Insights"
        description="Practical notes on AI agents, automation, and e-commerce. New posts will appear here as we publish them."
        backgroundImage="/about.jpeg"
        showButtons={false}
      />

      <section className="py-20 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#070643" }}>
            Posts coming soon
          </h2>
          <p className="text-lg mb-8" style={{ color: "#6B7280" }}>
            We&apos;re preparing original articles. No placeholder posts — only real content when it&apos;s ready.
          </p>
          <p className="text-sm mb-8 italic" style={{ color: "#9CA3AF" }}>
            TODO: Add first blog posts (titles, authors, publish dates).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Talk to us
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-[#0A0045] text-[#0A0045] hover:bg-[#0A0045] hover:text-white transition-colors"
            >
              See case studies
            </Link>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
