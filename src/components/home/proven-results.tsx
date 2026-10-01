import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, ShoppingBag, Sparkles } from "lucide-react";

const CARDS = [
  {
    tag: "AI Automation",
    icon: Sparkles,
    title: "AI Agents & Voice Automation",
    description:
      "Intelligent agents that handle conversations, qualify leads and automate your workflows.",
    image: "/Business-Cards/AI Voice & Chat Automation.png",
    href: "/ai-automation/voice-chat",
  },
  {
    tag: "E-commerce",
    icon: ShoppingBag,
    title: "B2B E-commerce Platforms",
    description:
      "Modern marketplaces that connect businesses with trending products and reliable sourcing.",
    image: "/Business-Cards/StoreSetup&Development.png",
    href: "/ecommerce/store-setup",
  },
  {
    tag: "Custom Software",
    icon: Code2,
    title: "Web & Mobile Applications",
    description:
      "Scalable, high-performance applications built for your unique business needs.",
    image: "/Business-Cards/webdevelopment.png",
    href: "/ai-automation/web-development",
  },
] as const;

/** Featured work: heading + three service cards on the home page's black / purple backdrop. */
export function ProvenResults() {
  return (
    <section
      className="relative overflow-hidden bg-black py-16 md:py-24"
      aria-labelledby="proven-results-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(90,131,255,0.25) 45%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full opacity-50 blur-[120px]"
        style={{ background: "rgba(124,58,237,0.6)" }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#A78BFA]">
              Featured work
              <span className="h-px w-10 bg-[#A78BFA]/60" aria-hidden />
            </p>
            <h2
              id="proven-results-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-[44px] md:leading-[1.12] md:tracking-[-0.02em]"
            >
              Built for businesses ready to <span className="text-[#A855F7]">move faster.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              We build AI-powered solutions, modern e-commerce platforms, and custom software that
              help businesses automate, grow and scale.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#A855F7] hover:bg-[#A855F7]/10 md:self-auto"
          >
            Explore our work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {CARDS.map((card) => (
            <li key={card.title}>
              <Link
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D0718] transition-colors duration-300 hover:border-[#A855F7]/60"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 92vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Purple wash so the three photos read as one set, fading into the card body. */}
                  <div
                    className="absolute inset-0 bg-[#6D28D9]/45 mix-blend-multiply"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D0718] via-[#0D0718]/20 to-transparent"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-1">
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#A855F7]/40 bg-[#A855F7]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#C4B5FD]">
                    <card.icon className="h-3 w-3" aria-hidden />
                    {card.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{card.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C4B5FD] transition-colors group-hover:text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current">
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                    Learn more
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
