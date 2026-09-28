import Image from "next/image";
import { techWeWorkWith } from "@/lib/content/company";

/**
 * Tech stack strip — NOT client logos.
 * Shown when we have fewer than 3 public client logos.
 */
export function ClientLogos() {
  const items = [...techWeWorkWith, ...techWeWorkWith];

  return (
    <section className="py-16 relative" style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="tech-strip-heading">
      <div className="container-page relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "rgba(1, 180, 210, 0.8)" }}>
            Capabilities
          </p>
          <h2 id="tech-strip-heading" className="text-2xl font-semibold mb-2" style={{ color: 'var(--heading)' }}>
            Tech we work with
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Platforms and tools we use to build AI agents, automation, and e-commerce systems — not a client list.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-scroll-left">
            {items.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="flex-shrink-0 mx-8 flex flex-col items-center">
                {/* Brand logos are dark artwork, so give them a light tile in the dark theme. */}
                <div className="relative w-20 h-16 mb-3 rounded-lg dark:bg-white/95">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    fill
                    className="object-contain dark:p-2"
                    sizes="80px"
                  />
                </div>
                <span className="text-xs font-medium text-center leading-tight" style={{ color: 'var(--heading)' }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
