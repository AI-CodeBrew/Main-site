"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status?: "done" | "in-progress" | "upcoming";
}

export interface RoadmapCardProps {
  title?: string;
  description?: string;
  items: RoadmapItem[];
  className?: string;
}

export function RoadmapCard({
  title = "Product Roadmap",
  description = "Upcoming features and releases",
  items,
  className,
}: RoadmapCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      // Only pan on narrow viewports where the track overflows.
      const overflow = track.scrollWidth - viewport.clientWidth;
      setMaxScroll(overflow > 8 ? overflow : 0);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  return (
    <div ref={sectionRef}>
    <Card
      className={cn(
        "w-full shadow-xl transition-all duration-300 hover:shadow-lg",
        className,
      )}
    >
      <CardHeader className="items-center text-center">
        <CardTitle className="text-[#0A0045]">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={viewportRef}
          className="relative overflow-hidden pb-2"
        >
          <motion.div
            ref={trackRef}
            style={maxScroll > 0 ? { x } : undefined}
            className="relative min-w-[40rem] will-change-transform md:min-w-0"
          >
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-4 h-px bg-[#6B7280]/70" />

            <div className="flex justify-between">
              {items.map((item, index) => {
                const active =
                  item.status === "done" || item.status === "in-progress";

                return (
                  <motion.div
                    key={`${item.quarter}-${item.title}`}
                    className="relative w-1/5 flex-1 px-1 pt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: index * 0.12 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={cn(
                        "absolute left-1/2 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full",
                        active ? "bg-primary" : "bg-muted",
                      )}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-background" />
                    </motion.div>

                    <Badge
                      variant={active ? "default" : "outline"}
                      className="mb-1 text-[11px]"
                    >
                      {item.quarter}
                    </Badge>

                    <h4 className="text-sm font-medium text-[#0A0045]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
