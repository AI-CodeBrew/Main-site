"use client";

import Link from "next/link";
import { packagedOffers } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";

export function PackagedOffers() {
  return (
    <section className="py-16 md:py-24 bg-surface" aria-labelledby="offers-heading">
      <div className="container-page">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "rgba(1, 180, 210, 0.9)" }}>
            Packaged offers
          </p>
          <h2 id="offers-heading" className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--heading)' }}>
            Clear starting points
          </h2>
          <p className="text-lg text-body">
            Four ways teams usually start with us. Custom builds are available after discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packagedOffers.map((offer) => (
            <article
              key={offer.id}
              className="rounded-2xl border border-line p-6 md:p-8 flex flex-col"
              style={{ boxShadow: "0 12px 40px rgba(10,0,69,0.06)" }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
                {offer.name}
              </h3>
              <p className="text-sm text-subtle mb-3">
                <span className="font-medium text-body">For:</span> {offer.forWho}
              </p>
              <p className="text-base text-body mb-6 flex-1">{offer.outcome}</p>
              <p className="text-sm font-semibold mb-4" style={{ color: "#5A83FF" }}>
                {offer.startingPrice
                  ? `Starting from ${offer.startingPrice}`
                  : "TODO: Starting price — ask on discovery call"}
              </p>
              <Link
                href={offer.href}
                className="btn btn-primary inline-flex justify-center"
                onClick={() => trackEvent("cta_click", { cta: "offer_learn_more", offer: offer.id })}
              >
                Learn more
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/ai-automation" className="font-medium underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
            See all AI services
          </Link>
          <span className="mx-3 text-gray-300">·</span>
          <Link href="/ecommerce" className="font-medium underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
            See all e-commerce services
          </Link>
        </div>
      </div>
    </section>
  );
}
