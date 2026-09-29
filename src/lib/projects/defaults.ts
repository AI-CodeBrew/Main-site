import { projects as companyProjects } from "@/lib/content/company";

export type ProjectCard = {
  title: string;
  meta: string;
  image: string;
  href: string;
};

/** Project images are tall portraits (same shape as A4 paper). */
export const PROJECT_IMAGE = {
  width: 1587,
  height: 2245,
  /** Smallest size that stays sharp on retina screens (card is ~635px wide on desktop). */
  minWidth: 1270,
  minHeight: 1796,
  /** width / height */
  ratio: 1587 / 2245,
} as const;

const dialcom = companyProjects.find((project) => project.id === "dialcom");

/** Shown until projects are added in /admin/projects (or if Supabase is unreachable). */
export const DEFAULT_PROJECTS: ProjectCard[] = [
  {
    title: dialcom?.name ?? "Dialcom",
    meta: "AI receptionist · CRM · OMS",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    href: dialcom?.url ?? "/contact",
  },
  {
    title: "Store launch",
    meta: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    href: "/ecommerce/store-setup",
  },
  {
    title: "Support agent",
    meta: "Voice & chat",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/voice-chat",
  },
  {
    title: "Workflow system",
    meta: "Automation",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/workflow",
  },
  {
    title: "Sales funnel",
    meta: "Growth",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    href: "/ecommerce/sales-funnel",
  },
  {
    title: "Custom agent",
    meta: "AI product",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    href: "/ai-automation/custom-agents",
  },
];
