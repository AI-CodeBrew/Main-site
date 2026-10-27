"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Github } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { HandwritingText } from "@/components/ui/handwriting-text";

type FloatingIcon =
  | { name: string; src: string; kind: "img"; top: string; left?: string; right?: string; size: number; rotate: number; delay: number; hideOnMobile?: boolean }
  | { name: string; kind: "github"; top: string; left?: string; right?: string; size: number; rotate: number; delay: number; hideOnMobile?: boolean };

/** Fixed “random” placement so SSR stays stable and icons stay clear of the copy. */
const FLOATING_ICONS: FloatingIcon[] = [
  { name: "GitHub", kind: "github", top: "16%", left: "8%", size: 40, rotate: -8, delay: 0.1 },
  { name: "Supabase", src: "/Logos/supabase.svg", kind: "img", top: "20%", right: "9%", size: 40, rotate: 10, delay: 0.2 },
  { name: "Shopify", src: "/brands/shopify.svg", kind: "img", top: "40%", left: "5%", size: 36, rotate: 6, delay: 0.35, hideOnMobile: true },
  { name: "AWS", src: "/Logos/aws.svg", kind: "img", top: "46%", right: "6%", size: 42, rotate: -6, delay: 0.45 },
  { name: "Zapier", src: "/Logos/zapier.svg", kind: "img", top: "64%", left: "9%", size: 34, rotate: 12, delay: 0.55, hideOnMobile: true },
  { name: "Slack", src: "/brands/slack.svg", kind: "img", top: "28%", left: "14%", size: 32, rotate: -4, delay: 0.25, hideOnMobile: true },
  { name: "Stripe", src: "/Logos/cc-stripe.svg", kind: "img", top: "70%", right: "11%", size: 34, rotate: 8, delay: 0.6 },
  { name: "Node.js", src: "/Logos/Node.js_idBSZu62Vz_1.svg", kind: "img", top: "74%", left: "15%", size: 36, rotate: -10, delay: 0.7, hideOnMobile: true },
  { name: "Google", src: "/brands/google.svg", kind: "img", top: "36%", right: "14%", size: 32, rotate: 5, delay: 0.4, hideOnMobile: true },
  { name: "Flutter", src: "/Logos/flutter.svg", kind: "img", top: "58%", left: "17%", size: 32, rotate: -7, delay: 0.5, hideOnMobile: true },
];

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
      <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden>
        {FLOATING_ICONS.map((icon) => (
          <motion.div
            key={icon.name}
            initial={{ opacity: 0, scale: 0.7, y: 8, rotate: icon.rotate }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
              rotate: icon.rotate,
            }}
            transition={{
              opacity: { duration: 0.5, delay: icon.delay },
              scale: { duration: 0.5, delay: icon.delay },
              y: {
                duration: 4.5 + icon.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: icon.delay,
              },
            }}
            className="absolute flex items-center justify-center rounded-xl border border-black/[0.06] bg-white/90 shadow-[0_6px_20px_rgba(10,0,69,0.06)] backdrop-blur-sm"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              width: icon.size + 14,
              height: icon.size + 14,
            }}
          >
            {icon.kind === "github" ? (
              <Github className="text-[#0A0045]" style={{ width: icon.size * 0.55, height: icon.size * 0.55 }} strokeWidth={1.75} />
            ) : (
              <Image
                src={icon.src}
                alt=""
                width={icon.size}
                height={icon.size}
                className="object-contain"
                style={{ width: icon.size * 0.62, height: icon.size * 0.62 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-16 pt-4 text-center md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="heading-display max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-[#0A0045] sm:text-6xl"
        >
          <span className="block">AI Agents &amp; Automation</span>
          <span className="mt-1 block sm:mt-2">that make your business</span>
          <span className="mt-1 block">
            <HandwritingText
              words={["faster.", "smarter.", "scalable."]}
              fontUrl="/fonts/handwriting.ttf"
              className="text-[#01B4D2]"
              height="1.1em"
              interval={3200}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#6B7280] md:text-lg"
        >
          Custom AI agents, chatbots and workflow automation that cut costs and scale your business
          — built in Pakistan for clients worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
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
        </motion.div>
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
