"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { HandwritingText } from "@/components/ui/handwriting-text";

/**
 * Hero paints immediately (no opacity:0 entrance) so mobile LCP isn't blocked on JS.
 * Handwriting word still cycles after mount.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollPastHero = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-1 flex-col justify-start overflow-hidden bg-transparent pt-6 md:min-h-[85vh] md:justify-center md:pt-0"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-16 pt-4 text-center md:py-16">
        <h1 className="heading-display max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-[#0A0045] sm:text-6xl">
          <span className="block">AI Agents &amp; Automation</span>
          <span className="mt-1 block sm:mt-2">that make your business</span>
          <span className="mt-1 block">
            <HandwritingText
              words={["faster.", "smarter.", "scalable."]}
              className="text-[#01B4D2]"
              height="1.1em"
              interval={3200}
            />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6B7280] md:text-lg">
          Custom AI agents, chatbots and workflow automation that cut costs and scale your business
          — built in Pakistan for clients worldwide.
        </p>

        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact?intent=strategy-call"
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#0A0045] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#070643]"
            onClick={() =>
              trackEvent("cta_click", { cta: "book_free_demo", location: "hero" })
            }
          >
            Book a Free Demo
            <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.25} aria-hidden />
          </Link>
          <Link
            href="/ai-automation"
            className="hidden cursor-pointer items-center justify-center rounded-full border border-black/[0.1] bg-white px-4 py-2 text-sm font-semibold text-[#0A0045] transition-colors hover:bg-[#F3F4F6] md:inline-flex"
            onClick={() =>
              trackEvent("cta_click", { cta: "our_services", location: "hero" })
            }
          >
            Our Services
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPastHero}
        aria-label="Scroll to next section"
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer p-2 text-[#6B7280] transition-colors hover:text-[#0A0045] md:block"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
