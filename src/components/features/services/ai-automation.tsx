import { Brain, Cog, Cable } from "lucide-react";

const features = [
  { icon: Brain, title: "Custom AI Agents SaaS", desc: "Tailored tools for workflow automation and client engagement." },
  { icon: Cog, title: "AI MVP Development", desc: "Rapid prototype‑to‑launch system for startups." },
  { icon: Cable, title: "Integrations", desc: "CRM, APIs, NLP, Computer Vision." },
];

export function AiAutomation() {
  return (
    <section id="ai" className="py-24 section-white dark:bg-black dark:text-white">
      <div className="container-page">
        <h2 className="heading-title text-3xl md:text-4xl mb-8">AI Automation & Intelligent Agents</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 card-gradient transition-shadow hover:shadow-[0_0_0_1px_#5A83FF,0_8px_30px_rgba(90,131,255,0.25)]">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{desc}</p>
              <div className="mt-3 text-xs text-[var(--color-accent)]">SaaS · Healthcare · Retail</div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-4 mt-8 flex justify-center">
          <a href="#contact" className="btn btn-primary">Schedule a Free Demo</a>
        </div>
      </div>
    </section>
  );
}


