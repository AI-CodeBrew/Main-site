"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { HandUnderline } from "@/components/ui/hand-underline";
import { cn } from "@/lib/utils";

const TEAM_AVATARS = [
  { src: "/team/avatar-1.webp", alt: "FynkTech team member" },
  { src: "/team/avatar-2.webp", alt: "FynkTech team member" },
  { src: "/team/avatar-3.webp", alt: "FynkTech team member" },
] as const;

function HighlightPill({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "mx-0.5 inline-flex items-center rounded-lg border border-[#D7D7DE] bg-transparent px-2 py-0.5",
        "text-[0.95em] font-semibold tracking-[-0.01em] text-[#5b5b66]",
        "transition-[background-color,border-color,color,box-shadow] duration-200",
        "hover:border-[#7DD8E8] hover:bg-[#7DD8E8] hover:text-[#141414] hover:shadow-[0_6px_18px_rgba(58,166,201,0.28)]",
      )}
    >
      {label}
    </span>
  );
}

/**
 * Editorial hero — LCP-safe: heading paints immediately (no opacity:0 entrance).
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1260px] flex-col items-center px-6 pb-10 pt-4 text-center md:pb-16 md:py-16">
        {/* No reveal-up on H1 — opacity:0 animations delay mobile LCP into red. */}
        <h1 className="heading-display mx-auto max-w-[1260px] text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[1.08] tracking-[-0.024em] text-[#141414]">
          <span className="block">AI Agents &amp; Automation</span>
          <span className="block">that make your business</span>
          <span className="block">
            <HandUnderline
              animate="mount"
              color="#3aa6c9"
              className="font-medium text-[#3aa6c9]"
            >
              scalable
            </HandUnderline>
          </span>
        </h1>

        <p className="reveal-up reveal-up-delay-1 mx-auto mt-6 max-w-[40rem] text-[1.125rem] font-normal leading-[1.75] text-[#5b5b66]">
          Custom <HighlightPill label="AI agents" />, <HighlightPill label="chatbots" /> and{" "}
          <HighlightPill label="workflow automations" /> that cut costs and scale your business, for
          clients worldwide.
        </p>

        <div className="reveal-up reveal-up-delay-2 mt-8 flex w-full items-center justify-center">
          <Link
            href="/contact?intent=strategy-call"
            className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#3aa6c9] py-2 pl-2 pr-5 shadow-[0_10px_28px_rgba(58,166,201,0.32)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#2f95b6] hover:shadow-[0_14px_32px_rgba(58,166,201,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3aa6c9] focus-visible:ring-offset-2 sm:gap-3.5 sm:pr-6"
            onClick={() =>
              trackEvent("cta_click", { cta: "book_call_with_team", location: "hero" })
            }
          >
            <span className="flex items-center pl-0.5" aria-hidden>
              {TEAM_AVATARS.map((avatar, i) => (
                <span
                  key={avatar.src}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-[2.5px] ring-[#3aa6c9] sm:h-10 sm:w-10"
                  style={{ marginLeft: i === 0 ? 0 : -10, zIndex: TEAM_AVATARS.length - i }}
                >
                  <Image
                    src={avatar.src}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover object-center"
                    quality={72}
                    /* Do not priority — competes with mobile LCP image/text */
                  />
                </span>
              ))}
            </span>
            <span className="pr-0.5 text-sm font-semibold tracking-[-0.01em] text-white sm:text-[0.9375rem]">
              Book a free call
            </span>
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
