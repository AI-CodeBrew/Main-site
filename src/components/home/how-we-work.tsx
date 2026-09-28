import Timeline8 from "@/components/ui/c-timeline-8";

export function HowWeWork() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24"
      aria-labelledby="process-heading"
    >
      <div className="container-page relative">
        <div className="relative text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base text-[#6B7280] mb-3">Workflow</p>
          <h2
            id="process-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#070643]"
          >
            How we work
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#374151] text-base md:text-lg leading-relaxed">
            A clear path from discovery to launch — demos along the way, not a big reveal at the end.
          </p>
        </div>

        <div className="relative rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-10 md:px-10 md:py-14">
          <Timeline8 />
        </div>
      </div>
    </section>
  );
}
