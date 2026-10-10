import Link from "next/link";
import { ArrowRight } from "lucide-react";

const USE_CASES = [
  {
    title: "Lead follow-up",
    description: "Reply and book meetings the moment a lead comes in",
  },
  {
    title: "Invoice handling",
    description: "Read, check and log invoices without manual typing",
  },
  {
    title: "Customer support",
    description: "Sort tickets, draft answers, escalate the hard ones",
  },
  {
    title: "Reporting",
    description: "Pull numbers together and send a weekly summary",
  },
  {
    title: "Content and social",
    description: "Draft posts in your brand voice and schedule them across channels",
  },
] as const;

/** Use cases on the AI automation page — black panel with light text. */
export function AutomationUseCases() {
  return (
    <section
      id="use-cases"
      className="relative overflow-hidden bg-white pb-14 pt-4 md:pb-24 md:pt-8"
      aria-labelledby="use-cases-heading"
    >
      <div className="container-page relative z-10">
        <div className="rounded-3xl bg-black px-5 py-8 md:px-10 md:py-16 lg:px-14">
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#80DFFF]">
              Use cases
            </p>
            <h2
              id="use-cases-heading"
              className="mb-4 text-3xl font-bold text-white md:text-5xl"
            >
              Where teams save the most time
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
              Not sure where to start? These are the usual first wins.
            </p>
          </div>

          {/* Horizontal row like the e-commerce order journey: a line with a dot above each item. */}
          <div className="relative mx-auto max-w-6xl">
            <div
              className="absolute left-[10%] right-[10%] top-[7px] hidden h-px bg-white/25 lg:block"
              aria-hidden
            />
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {USE_CASES.map((useCase, index) => (
                <li
                  key={useCase.title}
                  className="relative flex flex-col items-center text-center"
                >
                  <span
                    className="relative z-10 hidden h-[15px] w-[15px] items-center justify-center rounded-full bg-white lg:flex"
                    aria-hidden
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-black" />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0A0045] lg:mt-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{useCase.title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/70">
                    {useCase.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center md:mt-14">
            <Link
              href="/contact?intent=strategy-call"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#80DFFF]"
            >
              Find your first win
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
