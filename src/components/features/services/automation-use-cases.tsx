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
        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-black px-5 py-8 md:px-10 md:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[#80DFFF]">
              Use cases
            </p>
            <h2
              id="use-cases-heading"
              className="mb-4 text-3xl font-bold text-white md:text-5xl"
            >
              Where teams save the most time
            </h2>
            <p className="text-base text-white/70 md:text-lg">
              Not sure where to start? These are the usual first wins.
            </p>
            <Link
              href="/contact?intent=strategy-call"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#80DFFF]"
            >
              Find your first win
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ul className="divide-y divide-white/10">
            {USE_CASES.map((useCase, index) => (
              <li
                key={useCase.title}
                className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0 md:gap-5 md:py-6"
              >
                <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0A0045]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {useCase.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/70 md:text-base">
                    {useCase.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
