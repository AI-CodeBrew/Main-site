import { howWeWork } from "@/lib/content/site";

export function HowWeWork() {
  return (
    <section className="relative bg-white pt-8 md:pt-10 pb-16 md:pb-24" aria-labelledby="process-heading">
      <div className="container-page">
        <div className="text-center">
          <p className="text-sm text-[#6B7280]">Workflow</p>
          <h2
            id="process-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl"
          >
            How we work
          </h2>
        </div>

        <div className="relative mt-14 hidden md:block">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.55rem] h-px bg-[#D4D4D8]"
          />
          <ol className="grid grid-cols-4 gap-6">
          {howWeWork.map((item) => (
            <li key={item.step} className="flex flex-col items-center px-2 text-center">
              <p className="text-sm font-medium text-[#111111]">
                Step {String(item.step).padStart(2, "0")}
              </p>
              <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-[#C8F24A] ring-4 ring-white" />
              <span
                aria-hidden
                className="mt-6 text-6xl font-bold leading-none tracking-tight text-[#111111]/[0.07] lg:text-7xl"
              >
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-[#111111]">{item.title}</h3>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            </li>
          ))}
          </ol>
        </div>

        <ol className="mt-10 space-y-8 md:hidden">
          {howWeWork.map((item, index) => (
            <li key={item.step} className="relative pl-8">
              {/* Dotted connector from this dot down to the next step's dot (spans the space-y-8 gap). */}
              {index < howWeWork.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute -bottom-8 left-[5px] top-5 border-l-2 border-dotted border-[#C4C4CC]"
                />
              ) : null}
              <span className="absolute left-0 top-1 z-10 h-3 w-3 rounded-full bg-[#C8F24A]" />
              <p className="text-sm font-medium text-[#111111]">
                Step {String(item.step).padStart(2, "0")}
              </p>
              <span aria-hidden className="mt-2 block text-5xl font-bold leading-none text-[#111111]/[0.07]">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-bold text-[#111111]">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
