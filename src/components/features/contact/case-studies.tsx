"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/content/company";
import { ExternalLink } from "lucide-react";

export function CaseStudies() {
  const dialcom = projects[0];

  return (
    <section className="py-16 md:py-24 relative" style={{ backgroundColor: "#FFFFFF" }} aria-labelledby="projects-heading">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "rgba(1, 180, 210, 0.8)" }}>
            Selected work
          </p>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#070643" }}>
            Real projects we&apos;ve built
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            We only list work we can name publicly. More case studies with metrics will be added as clients approve them.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm"
          style={{ background: "linear-gradient(135deg, rgba(90,131,255,0.04) 0%, rgba(255,255,255,1) 50%)" }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#070643" }}>
                {dialcom.name}
              </h3>
              <p className="text-base md:text-lg mb-6 max-w-2xl" style={{ color: "#4A5568" }}>
                {dialcom.summary}
              </p>
              <ul className="flex flex-wrap gap-2 mb-6">
                {dialcom.deliverables.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ backgroundColor: "rgba(10,0,69,0.06)", color: "#070643" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm italic" style={{ color: "#9CA3AF" }}>
                TODO: Measurable results pending client approval for public use.
              </p>
            </div>
            <a
              href={dialcom.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-2 shrink-0"
            >
              Visit dialcom.ai
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.article>

        <div className="mt-8">
          <Link href="/case-studies" className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
            View case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
