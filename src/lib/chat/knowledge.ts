import { siteConfig, homepageFaq, packagedOffers } from "@/lib/content/site";
import { companyAddress, projects } from "@/lib/content/company";
import { navItems } from "@/lib/constants";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
};

/** Brief service summaries aligned with main nav (no services.ts module yet). */
function serviceSummariesFromNav(): string[] {
  const lines: string[] = [];
  for (const item of navItems) {
    if (!item.dropdown) continue;
    for (const d of item.dropdown) {
      lines.push(`${d.label}: see ${d.href} on fynktech.com for scope details.`);
    }
  }
  return lines;
}

function buildSiteChunks(): KnowledgeChunk[] {
  return [
    {
      id: "site-about",
      topic: "company",
      text: `${siteConfig.name} (${siteConfig.url}). Contact: ${siteConfig.email}. Business hours: ${siteConfig.businessHours}. Timezone: ${siteConfig.timezone}.`,
    },
    {
      id: "site-address",
      topic: "location",
      text: `${companyAddress.label}: ${companyAddress.line1}, ${companyAddress.line2}, ${companyAddress.country}. Email: ${companyAddress.email}.`,
    },
    {
      id: "site-offers",
      topic: "offers",
      text: packagedOffers
        .map(
          (o) =>
            `${o.name} — for ${o.forWho}. Outcome: ${o.outcome}. Learn more: ${o.href}.`,
        )
        .join(" "),
    },
    {
      id: "site-process",
      topic: "process",
      text: "Process: Discovery call → Proposal & build → Launch & optimize. Demos during build.",
    },
  ];
}

function buildProjectChunks(): KnowledgeChunk[] {
  return projects.map((p) => ({
    id: `project-${p.id}`,
    topic: "case-study",
    text: `${p.name} (${p.url}): ${p.summary} Deliverables: ${p.deliverables.join(", ")}.`,
  }));
}

function buildFaqChunks(): KnowledgeChunk[] {
  return homepageFaq.map((f, i) => ({
    id: `faq-${i}`,
    topic: "faq",
    text: `Q: ${f.q} A: ${f.a}`,
  }));
}

function buildServiceChunks(): KnowledgeChunk[] {
  const summaries = serviceSummariesFromNav();
  const chunks: KnowledgeChunk[] = [];
  for (let i = 0; i < summaries.length; i += 3) {
    chunks.push({
      id: `services-${i}`,
      topic: "services",
      text: summaries.slice(i, i + 3).join(" "),
    });
  }
  return chunks;
}

/** All RAG chunks for keyword retrieval. */
export const knowledgeChunks: KnowledgeChunk[] = [
  ...buildSiteChunks(),
  ...buildProjectChunks(),
  ...buildFaqChunks(),
  ...buildServiceChunks(),
];
