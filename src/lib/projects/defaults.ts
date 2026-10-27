import { projects as companyProjects } from "@/lib/content/company";

export type ProjectCard = {
  title: string;
  meta: string;
  image: string;
  href: string;
};

/** Project images are square colored-canvas device cards. */
export const PROJECT_IMAGE = {
  width: 2048,
  height: 2048,
  minWidth: 1200,
  minHeight: 1200,
  ratio: 1,
} as const;

const dialcom = companyProjects.find((project) => project.id === "dialcom");

/** Shown until projects are added in /admin/projects (or if Supabase is unreachable). */
/** Cache-bust so browsers/CDN don't keep serving the old tall screenshots. */
const LIGHT = "?v=webp";

export const DEFAULT_PROJECTS: ProjectCard[] = [
  {
    title: dialcom?.name ?? "Dialcom",
    meta: "A voice agent that qualifies, calls, and books while your team sleeps.",
    image: `/projects/dialcom.webp${LIGHT}`,
    href: dialcom?.url ?? "/contact",
  },
  {
    title: "Arabia AI",
    meta: "Turn Every Whatsapp chat into a confirmed order.",
    image: `/projects/arabia-ai.webp${LIGHT}`,
    href: "/contact",
  },
  {
    title: "The Local Baba",
    meta: "A modern B2B marketplace connecting businesses with trending products and reliable wholesale sourcing.",
    image: `/projects/the-local-baba.webp${LIGHT}`,
    href: "/contact",
  },
];
