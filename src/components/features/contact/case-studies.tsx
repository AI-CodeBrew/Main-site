"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content/company";

const pad = (n: number) => String(n).padStart(2, "0");

export function CaseStudies() {
  const total = projects.length;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-surface-muted" aria-labelledby="projects-heading">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mb-10 md:mb-12"
        >
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase leading-tight tracking-tight mb-5"
            style={{ color: 'var(--heading)' }}
          >
            Real projects we&apos;ve built
          </h2>
          <p className="text-base md:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--body)' }}>
            AI agents, CRMs and e-commerce systems shipped for real businesses. We only show work we can name publicly.
          </p>
        </motion.div>
      </div>

      {/* Cards bleed off the right edge and scroll horizontally, like a carousel. */}
      <div className="relative z-10">
        <ul
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          // Left edge lines up with .container-page (max 1400px, 1rem gutter); right side runs to the viewport edge.
          style={{
            paddingLeft: "max(1rem, calc((100vw - 1400px) / 2 + 1rem))",
            scrollPaddingLeft: "max(1rem, calc((100vw - 1400px) / 2 + 1rem))",
          }}
        >
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[42vw] lg:w-[34vw] max-w-[560px]"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — ${project.category}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-md"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 34vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  // Branded stand-in until a real project image is added.
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0A0A3C 0%, #1E3296 55%, #5A83FF 100%)" }}
                  >
                    <span className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-white/90 uppercase">
                      {project.name}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                  <p className="text-sm text-white/80 mb-1">
                    {pad(index + 1)}/{pad(total)}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold uppercase tracking-wide">{project.category}</h3>
                  <p className="text-sm text-white/80 mt-0.5">{project.name}</p>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="container-page relative z-10 mt-6">
        <Link href="/case-studies" className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
          View case studies →
        </Link>
      </div>
    </section>
  );
}
