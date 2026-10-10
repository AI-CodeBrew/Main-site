const STEPS = [
  {
    title: "Audit",
    description: "We map your repetitive tasks and find the ones worth automating first.",
  },
  {
    title: "Design",
    description:
      "We sketch the workflow and agree on what the AI decides and what stays human.",
  },
  {
    title: "Build and test",
    description: "We connect your tools, train the AI step and test it on your real cases.",
  },
  {
    title: "Launch and improve",
    description: "We go live, monitor results and keep tuning as your business changes.",
  },
] as const;

/** How it works: the four delivery steps on the AI automation page, styled like the e-commerce order flow. */
export function AutomationSteps() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white pb-14 pt-4 md:pb-24 md:pt-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-page relative z-10">
        <div className="rounded-3xl bg-[#F3F4F6] px-5 py-8 md:px-10 md:py-16 lg:px-14">
          <div className="mb-8 text-center md:mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#01B4D2]">
              How it works
            </p>
            <h2
              id="how-it-works-heading"
              className="mb-4 text-3xl font-bold text-[#0A0045] md:text-5xl"
            >
              From first call to live automation
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#6B7280] md:text-lg">
              A clear path from your first conversation with us to an AI workflow running in your
              business.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0A0045] via-[#5A83FF] to-[#01B4D2]"
                />
                <span className="text-sm font-semibold text-[#01B4D2]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#0A0045]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
