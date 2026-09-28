"use client";

import { homepageFaq } from "@/lib/content/site";
import { useState } from "react";

export function HomepageFaq() {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-page max-w-3xl">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: "#070643" }}>
          FAQ
        </h2>
        <div className="space-y-3">
          {homepageFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 font-semibold flex justify-between gap-4"
                  style={{ color: "#070643" }}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
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
  );
}
