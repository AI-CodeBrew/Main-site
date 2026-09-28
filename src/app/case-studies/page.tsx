import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Contact } from "@/components/features/contact/contact";
import { projects } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected Fynk Tech projects — real client work we can name publicly, starting with Dialcom.",
};

export default function CaseStudiesPage() {
  const dialcom = projects[0];

  return (
    <main className="min-h-screen">
      <PageHero
        title="Case Studies"
        subtitle="Selected work"
        description="Projects we can name publicly. We add metrics only when clients approve them."
        backgroundImage="/case study.jpeg"
        showButtons={true}
      />

      <section className="py-24 bg-white">
        <div className="container-page max-w-4xl">
          <article className="rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm">
            <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "rgba(1, 180, 210, 0.8)" }}>
              Client project
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#070643" }}>
              {dialcom.name}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{dialcom.summary}</p>

            <h3 className="text-xl font-semibold mb-4" style={{ color: "#070643" }}>
              What we delivered
            </h3>
            <ul className="grid gap-3 sm:grid-cols-3 mb-8">
              {dialcom.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-xl px-4 py-3 text-center font-medium"
                  style={{ backgroundColor: "rgba(10,0,69,0.06)", color: "#070643" }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm italic text-gray-400 mb-8">
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

          <p className="mt-10 text-center text-gray-500">
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
