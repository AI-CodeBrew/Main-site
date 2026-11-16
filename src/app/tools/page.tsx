import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { HandUnderline } from "@/components/ui/hand-underline";
import { ToolsShowcase } from "@/components/ui/tools-showcase";
import { fynkTools } from "@/lib/content/tools";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tools",
  description:
    "Explore FynkTech tools: AutoListing for Shopify drafts, NicheNet for handmade listings, and Roarr AI for store and Meta ads.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />

      <section className="relative overflow-hidden pt-14 pb-4 md:pt-24 md:pb-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(58,166,201,0.12),transparent_65%)] md:h-72"
          aria-hidden
        />
        <div className="container-page relative mx-auto max-w-4xl text-center">
          <h1 className="heading-display text-4xl leading-none text-[#141414] sm:text-5xl md:text-6xl lg:text-7xl">
            <HandUnderline color="#3aa6c9" className="text-[#3aa6c9]">
              Tools
            </HandUnderline>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#5b5b66] md:mt-5 md:max-w-2xl md:text-lg">
            <span className="md:hidden">Open a tool to see the flow — then go use it.</span>
            <span className="hidden md:inline">
              Hover a tool to preview it. Click to open — each one keeps you in control before
              anything goes live.
            </span>
          </p>
        </div>
      </section>

      <ToolsShowcase tools={fynkTools} hideTitle />

      <section className="pb-8 pt-6 md:pb-12 md:pt-2">
        <div className="container-page mx-auto max-w-5xl text-center">
          <p className="text-sm text-[#5b5b66] md:text-base">
            Need a custom agent or automation instead?
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#3aa6c9] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2f95b6] md:mt-4"
          >
            Talk to an expert
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
