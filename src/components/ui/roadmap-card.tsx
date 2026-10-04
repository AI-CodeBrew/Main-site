"use client";

import { motion } from "framer-motion";
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
  return (
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
        <div className="relative">
          {/* Mobile: vertical timeline — dots centered on the line */}
          <div className="relative md:hidden">
            <div className="absolute bottom-2 left-4 top-2 w-px -translate-x-1/2 bg-[#6B7280]/70" />
            <div className="flex flex-col gap-6">
              {items.map((item, index) => {
                const active =
                  item.status === "done" || item.status === "in-progress";

                return (
                  <motion.div
                    key={`${item.quarter}-${item.title}`}
                    className="relative flex gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    <div className="relative z-10 flex w-8 shrink-0 justify-center pt-1">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full",
                          active ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-background" />
                      </div>
                    </div>
                    <div className="min-w-0 text-left">
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
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-4 h-px bg-[#6B7280]/70" />

            <div className="flex justify-between">
              {items.map((item, index) => {
                const active =
                  item.status === "done" || item.status === "in-progress";

                return (
                  <motion.div
                    key={`${item.quarter}-${item.title}`}
                    className="relative flex-1 px-1 pt-8 text-center"
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
