import { howWeWork } from "@/lib/content/site";

export function HowWeWork() {
  return (
    <section className="relative pb-6 pt-12 md:pb-8 md:pt-16" aria-labelledby="process-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[#F3F4F6] px-6 py-14 md:px-10 md:py-20">
          <div
            className="pointer-events-none absolute -left-16 top-0 h-[20rem] w-[20rem] rounded-full opacity-60 blur-[80px] md:h-[26rem] md:w-[26rem]"
            style={{
              background:
                "radial-gradient(circle, rgba(148, 163, 184, 0.35) 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-12 bottom-0 h-[16rem] w-[16rem] rounded-full opacity-50 blur-[70px]"
            style={{
              background:
                "radial-gradient(circle, rgba(203, 213, 225, 0.5) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#01B4D2]">
                Workflow
              </p>
              <h2
                id="process-heading"
                className="mt-3 text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl"
              >
                How we work
              </h2>
            </div>

            <div className="relative mt-14 hidden md:block">
              <div
                aria-hidden
                className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.55rem] h-px bg-slate-300"
              />
              <ol className="grid grid-cols-4 gap-6">
                {howWeWork.map((item) => (
                  <li key={item.step} className="flex flex-col items-center px-2 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      Step {String(item.step).padStart(2, "0")}
                    </p>
                    <span className="relative z-10 mt-4 h-3 w-3 rounded-full bg-[#C8F24A] ring-4 ring-[#F3F4F6]" />
                    <span
                      aria-hidden
                      className="mt-6 text-6xl font-bold leading-none tracking-tight text-slate-900/[0.06] lg:text-7xl"
                    >
                      {String(item.step).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-[#0B1220]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <ol className="mt-10 space-y-8 md:hidden">
              {howWeWork.map((item, index) => (
                <li key={item.step} className="relative pl-8">
                  {index < howWeWork.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute -bottom-8 left-[5px] top-5 border-l-2 border-dotted border-slate-300"
                    />
                  ) : null}
                  <span className="absolute left-0 top-1 z-10 h-3 w-3 rounded-full bg-[#C8F24A]" />
                  <p className="text-sm font-medium text-slate-600">
                    Step {String(item.step).padStart(2, "0")}
                  </p>
                  <span
                    aria-hidden
                    className="mt-2 block text-5xl font-bold leading-none text-slate-900/[0.06]"
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#0B1220]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
