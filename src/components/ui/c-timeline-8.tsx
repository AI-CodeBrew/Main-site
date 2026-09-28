"use client";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/c-timeline-8-utils/timeline";
import { howWeWork } from "@/lib/content/site";

const steps = howWeWork.map((item) => ({
  id: item.step,
  date: `Step ${String(item.step).padStart(2, "0")}`,
  title: item.title,
  description: item.description,
}));

export function Pattern() {
  return (
    <Timeline
      defaultValue={steps.length}
      orientation="horizontal"
      className="w-full max-w-4xl mx-auto"
    >
      {steps.map((item) => (
        <TimelineItem
          key={item.id}
          step={item.id}
          className="group-data-[orientation=horizontal]/timeline:mt-0 cursor-pointer"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=horizontal]/timeline:top-8 bg-[#5A83FF]/25 group-data-completed/timeline-item:bg-[#5A83FF]" />
            <TimelineDate className="mb-10 text-[#6B7280]">{item.date}</TimelineDate>
            <TimelineTitle className="text-base md:text-lg font-semibold text-[#070643]">
              {item.title}
            </TimelineTitle>
            <TimelineIndicator className="group-data-[orientation=horizontal]/timeline:top-8 border-[#5A83FF]/30 bg-white group-data-completed/timeline-item:border-[#5A83FF] group-data-completed/timeline-item:bg-[#5A83FF]" />
          </TimelineHeader>
          <TimelineContent className="mt-2 text-[#374151] text-sm md:text-base leading-relaxed">
            {item.description}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default Pattern;
