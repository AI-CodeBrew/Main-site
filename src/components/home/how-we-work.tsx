import { howWeWork } from "@/lib/content/site";

const pad = (n: number) => String(n).padStart(2, "0");

// Tailwind needs literal class names, so map step counts to grid columns.
const gridCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-surface py-16 md:py-24" aria-labelledby="process-heading">
      <div className="container-page relative">
        {/* Faint vertical guide lines, as in the section design */}
        <div className="pointer-events-none absolute inset-y-[-6rem] left-4 right-4 hidden border-x border-line md:block" aria-hidden="true">
          <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
        </div>

        <div className="relative text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base text-subtle mb-3">Workflow</p>
          <h2 id="process-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-heading">
            How we work
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line through the dot centers on desktop: 24px label + 24px gap + 7px (half the dot) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[55px] hidden h-px bg-heading/80 md:block" aria-hidden="true" />

          <ol className={`relative grid grid-cols-1 gap-12 md:gap-0 ${gridCols[howWeWork.length] ?? "md:grid-cols-3"}`}>
          {howWeWork.map((item) => (
            <li key={item.step} className="relative flex flex-col items-center px-6 text-center">
              <span className="text-base leading-6 font-medium text-heading">Step {pad(item.step)}</span>

              {/* Dot sits on the line; the surface-colored ring leaves a small gap either side. */}
              <span
                className="mt-6 h-3.5 w-3.5 rounded-full ring-8 ring-[var(--surface)]"
                style={{ background: "linear-gradient(135deg, #5A83FF, #01B4D2)" }}
                aria-hidden="true"
              />

              <span
                className="mt-6 select-none text-7xl md:text-8xl font-bold leading-none text-heading/[0.06]"
                aria-hidden="true"
              >
                {pad(item.step)}
              </span>

              <h3 className="-mt-6 md:-mt-8 text-2xl font-semibold text-heading">{item.title}</h3>
              <p className="mt-4 max-w-xs text-body leading-relaxed">{item.description}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
