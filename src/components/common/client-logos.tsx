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
      </div>

      {/* Full screen width like the services ticker; edges fade out instead of cutting logos off. */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {/* w-max + max-w-none: globals.css caps every element at max-width 100%, which squeezed
            this track to screen width and made the -50% loop jump. */}
        <div className="flex w-max max-w-none animate-scroll-right">
          {items.map((tech, index) => {
            const isDuplicate = index >= techWeWorkWith.length;
            return (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex flex-col items-center"
              aria-hidden={isDuplicate || undefined}
            >
              {/* Brand logos are dark artwork, so give them a light tile in the dark theme. */}
              <div className="relative w-20 h-16 mb-3 rounded-lg dark:bg-white/95">
                <Image
                  src={tech.logo}
                  alt={isDuplicate ? "" : tech.name}
                  fill
                  className="object-contain dark:p-2"
                  sizes="80px"
                />
              </div>
              <span className="text-xs font-medium text-center leading-tight" style={{ color: 'var(--heading)' }}>
                {tech.name}
              </span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
