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
    meta: "A voice agent that qualifies, calls, and books while your team sleeps.",
    image: "/projects/dialcom.jpg",
    href: dialcom?.url ?? "/contact",
  },
  {
    title: "Arabia AI",
    meta: "Turn Every Whatsapp chat into a confirmed order.",
    image: "/projects/arabia-ai.jpg",
    href: "/contact",
  },
  {
    title: "The Local Baba",
    meta: "A modern B2B marketplace connecting businesses with trending products and reliable wholesale sourcing.",
    image: "/projects/the-local-baba.jpg",
    href: "/contact",
  },
  {
    title: "Workflow system",
    meta: "Automation",
    image: "/projects/workflow-system.jpg",
    href: "/ai-automation/workflow",
  },
  {
    title: "Sales funnel",
    meta: "Growth",
    image: "/projects/sales-funnel.jpg",
    href: "/ecommerce/sales-funnel",
  },
  {
    title: "Custom agent",
    meta: "AI product",
    image: "/projects/custom-agent.jpg",
    href: "/ai-automation/custom-agents",
  },
];
