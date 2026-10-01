import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Contact } from "@/components/features/contact/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/lib/content/company";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description:
    "Selected Fynk Tech client work, starting with Dialcom. See how we build AI and e-commerce systems — then talk to us.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const dialcom = projects[0];

  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <PageHero
        title="Case Studies"
        subtitle="Selected work"
        description="Projects we can name publicly. We add metrics only when clients approve them."
        backgroundImage="/case study.jpeg"
        showButtons={true}
      />

      <section className="py-24 bg-surface">
        <div className="container-page max-w-4xl">
          <article className="rounded-2xl border border-line p-8 md:p-12 shadow-sm">
            <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "rgba(1, 180, 210, 0.8)" }}>
              Client project
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
              {dialcom.name}
            </h2>
            <p className="text-lg text-body mb-8 leading-relaxed">{dialcom.summary}</p>

            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--heading)' }}>
              What we delivered
            </h3>
            <ul className="grid gap-3 sm:grid-cols-3 mb-8">
              {dialcom.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-xl px-4 py-3 text-center font-medium"
                  style={{ backgroundColor: "rgba(10,0,69,0.06)", color: 'var(--heading)' }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm italic text-subtle mb-8">
              TODO: Problem statement, process, and measurable results pending client approval.
            </p>

            <a
              href={dialcom.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Visit dialcom.ai
              <ExternalLink className="w-4 h-4" />
            </a>
          </article>

          <p className="mt-10 text-center text-subtle">
            Want a similar build?{" "}
            <Link href="/contact" className="font-medium underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
              Get in touch
            </Link>
          </p>
        </div>
      </section>

      <Contact />
    </main>
  );
}
