"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PROJECTS, type ProjectCard } from "@/lib/projects/defaults";
import { ProjectShowcase } from "@/components/ui/project-showcase";

type WorkItem = ProjectCard;

const HIDDEN_TITLES = new Set([
  "sales funnel",
  "workflow system",
  "workflow",
  "custom agent",
]);

const HIDDEN_HREF_PARTS = [
  "/ai-automation/workflow",
  "/ecommerce/sales-funnel",
  "/ai-automation/custom-agents",
];

const PROJECT_META: Record<
  string,
  { tags: string[]; statusColor: string }
> = {
  dialcom: { tags: ["AI", "Voice", "CRM"], statusColor: "#F5C518" },
  "arabia ai": { tags: ["AI", "WhatsApp", "Sales"], statusColor: "#5A83FF" },
  "the local baba": { tags: ["B2B", "Marketplace", "Platform"], statusColor: "#22C55E" },
};

function enrich(item: WorkItem) {
  const key = item.title.trim().toLowerCase();
  const meta = PROJECT_META[key] ?? {
    tags: ["Product"],
    statusColor: "#01B4D2",
  };
  return {
    title: item.title,
    description: item.meta,
    link: item.href || "/contact",
    image: item.image,
    tags: meta.tags,
    statusColor: meta.statusColor,
  };
}

/**
 * `items` come from /admin/projects. Server pages pass them in; client-only parents
 * (service pages) leave it out and the list is fetched after mount.
 */
export function CaseStudies({ items }: { items?: WorkItem[] }) {
  const [fetched, setFetched] = useState<WorkItem[] | null>(null);

  useEffect(() => {
    if (items) return;
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { cards?: WorkItem[] } | null) => {
        if (!cancelled && data?.cards?.length) setFetched(data.cards);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [items]);

  const workItems = useMemo(() => {
    const source = items ?? fetched ?? DEFAULT_PROJECTS;
    return source.filter((item) => {
      const title = item.title.trim().toLowerCase();
      const href = (item.href || "").toLowerCase();
      if (HIDDEN_TITLES.has(title)) return false;
      if (title.includes("workflow")) return false;
      if (HIDDEN_HREF_PARTS.some((part) => href.includes(part))) return false;
      return true;
    });
  }, [items, fetched]);

  return (
    <section
      className="relative overflow-visible bg-white"
      aria-labelledby="project-showcase-heading"
    >
      <div className="relative z-10">
        <ProjectShowcase
          eyebrow="Products we designed and built"
          title="Projects"
          projects={workItems.map(enrich)}
        />
      </div>
    </section>
  );
}
