"use client";

import type { ServiceContent } from "@/lib/content/services";
import { siteConfig, whatsappLink } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ServiceTemplateProps = {
  service: ServiceContent;
};

export function ServiceTemplate({ service }: ServiceTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wa = whatsappLink(
    `Hi Fynk Tech — I'm interested in ${service.headline}.`,
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1 — Outcome headline */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,0,69,0.92) 0%, rgba(10,0,69,0.55) 45%, rgba(10,0,69,0.35) 100%)",
            }}
          />
        </div>
        <div className="container-page relative z-10 py-20 md:py-28 min-h-[70vh] flex flex-col justify-end">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3 text-[#01B4D2]"
          >
            {service.category === "ai" ? "AI & Automation" : "E-commerce"}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
            {service.headline}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            {service.subheadline}
          </p>
        </div>
      </section>

      {/* 2 — Who this is for */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0A0045" }}>
            Who this is for
          </h2>
          <ul className="space-y-4">
            {service.whoFor.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-gray-700 leading-relaxed"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: "#5A83FF" }}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — Problem */}
      <section className="py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#0A0045" }}>
            The problem
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{service.problem}</p>
        </div>
      </section>

      {/* 4 — Deliverables */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0A0045" }}>
            What you get
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-gray-700 text-sm md:text-base leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Process + timeline */}
      <section className="py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#0A0045" }}>
            How we work
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            <span className="font-semibold text-gray-800">Typical timeline: </span>
            {service.timeline}
          </p>
          <ol className="space-y-8">
            {service.process.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold text-sm"
                  style={{ backgroundColor: "#5A83FF" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#0A0045" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — Tech stack */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#0A0045" }}>
            Tech we often use
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: "#0A0045" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Case study or TODO */}
      <section className="py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#0A0045" }}>
            Related work
          </h2>
          {service.relatedCaseStudy ? (
            <div className="rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#0A0045" }}>
                {service.relatedCaseStudy.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.relatedCaseStudy.note}
              </p>
              <Link
                href={service.relatedCaseStudy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#5A83FF] hover:underline"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "case_study",
                    service: service.slug,
                    href: service.relatedCaseStudy!.href,
                  })
                }
              >
                Visit dialcom.ai
                <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <p className="text-gray-600 rounded-xl border border-dashed border-gray-200 p-6 leading-relaxed">
              TODO: add a named case study for this service when client approval is available.
              Dialcom is our public reference for voice, agents, and workflow — see{" "}
              <Link href="/case-studies" className="text-[#5A83FF] hover:underline">
                case studies
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* 8 — Pricing */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#0A0045" }}>
            Pricing
          </h2>
          {service.pricing.startingFrom ? (
            <p className="text-2xl font-bold mb-4" style={{ color: "#01B4D2" }}>
              Starting from {service.pricing.startingFrom}
            </p>
          ) : (
            <p className="text-lg text-gray-700 mb-4">
              Starting price: TODO — we share a clear quote after discovery.
            </p>
          )}
          <p className="text-gray-600 mb-4 font-medium">What affects your quote:</p>
          <ul className="space-y-2">
            {service.pricing.factors.map((f) => (
              <li key={f} className="flex gap-2 text-gray-600">
                <span className="text-[#5A83FF]" aria-hidden>
                  •
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="py-14 md:py-20" aria-labelledby={`faq-${service.slug}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="container-page max-w-3xl">
          <h2
            id={`faq-${service.slug}`}
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: "#0A0045" }}
          >
            FAQ
          </h2>
          <div className="space-y-3">
            {service.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full text-left px-5 py-4 font-semibold flex justify-between gap-4"
                    style={{ color: "#0A0045" }}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className="text-gray-400 shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-gray-600 leading-relaxed">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 — CTA */}
      <section
        className="py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #0A0045 0%, #1a1a5e 100%)" }}
      >
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to talk?
          </h2>
          <p className="text-gray-200 mb-8 leading-relaxed">
            Book a free strategy call, message us on WhatsApp
            {siteConfig.whatsappNumber ? "" : " (number coming soon)"}, or use the site chat
            when available — we will reply as soon as we are online.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "#5A83FF" }}
              onClick={() =>
                trackEvent("booking", {
                  label: "service_cta_contact",
                  service: service.slug,
                })
              }
            >
              Book a call
            </Link>
            {wa ? (
              <Link
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-[#01B4D2] text-[#01B4D2] hover:bg-[#01B4D2]/10 transition-colors"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    label: "service_cta",
                    service: service.slug,
                  })
                }
              >
                WhatsApp
              </Link>
            ) : null}
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Prefer chat? Open the assistant on any page — we will follow up using our published reply promise when offline.
          </p>
        </div>
      </section>
    </main>
  );
}
