"use client";

import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";

export function FinalCta() {
  const wa = whatsappLink("Hi Fynk Tech — I'd like to talk about a project.");

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="final-cta-heading">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0A0A3C 0%, #1E3296 40%, #0A0045 100%)",
        }}
      />
      <div className="container-page relative z-10 text-center text-white">
        <h2 id="final-cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
          Ready to grow with AI or e-commerce?
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Book a free strategy call, message us on WhatsApp, or get a free store audit.
        </p>

        <div className="max-w-3xl mx-auto mb-10 rounded-2xl bg-white/10 border border-white/20 p-6 md:p-8 text-left">
          {siteConfig.bookingUrl ? (
            <iframe
              src={siteConfig.bookingUrl}
              title="Book a strategy call"
              className="w-full min-h-[520px] rounded-xl bg-white"
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-white/90 mb-2 font-medium">Booking calendar</p>
              <p className="text-sm text-white/60 mb-6">
                TODO: Set NEXT_PUBLIC_BOOKING_URL (Cal.com / Calendly) to embed the calendar here.
              </p>
              <Link
                href="/contact?intent=strategy-call"
                className="btn btn-primary inline-flex"
                onClick={() => trackEvent("booking", { location: "final_cta", mode: "contact_fallback" })}
              >
                Book via contact form
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold bg-[#25D366] text-white hover:opacity-90"
              onClick={() => trackEvent("whatsapp_click", { location: "final_cta" })}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp us
            </a>
          ) : (
            <span className="text-sm text-white/50">TODO: Set NEXT_PUBLIC_WHATSAPP_NUMBER for WhatsApp CTA</span>
          )}
          <Link
            href="/free-audit"
            className="inline-flex items-center rounded-full px-7 py-3.5 font-semibold border-2 border-white text-white hover:bg-white hover:text-[#0A0045] transition-colors"
            onClick={() => trackEvent("cta_click", { cta: "free_audit", location: "final_cta" })}
          >
            Free store audit
          </Link>
        </div>
      </div>
    </section>
  );
}
