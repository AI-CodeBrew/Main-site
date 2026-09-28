import { siteConfig, homepageFaq, packagedOffers } from "@/lib/content/site";
import { companyAddress, projects } from "@/lib/content/company";
import { navItems } from "@/lib/constants";
import { getSiteHoursSettings } from "@/lib/settings/store";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
};

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

function buildStaticChunks(): KnowledgeChunk[] {
  const offerChunk: KnowledgeChunk = {
    id: "site-offers",
    topic: "offers",
    text: packagedOffers
      .map(
        (o) =>
          `${o.name} — for ${o.forWho}. Outcome: ${o.outcome}. Learn more: ${o.href}.`
      )
      .join(" "),
  };

  const address: KnowledgeChunk = {
    id: "site-address",
    topic: "location",
    text: `${companyAddress.label}: ${companyAddress.line1}, ${companyAddress.line2}, ${companyAddress.country}. Email: ${companyAddress.email}.`,
  };

  const process: KnowledgeChunk = {
    id: "site-process",
    topic: "process",
    text: "Process: Discovery call → Proposal & build → Launch & optimize. Demos during build.",
  };

  const projectsChunks = projects.map((p) => ({
    id: `project-${p.id}`,
    topic: "case-study",
    text: `${p.name} (${p.url}): ${p.summary} Deliverables: ${p.deliverables.join(", ")}.`,
  }));

  const faqChunks = homepageFaq.map((f, i) => ({
    id: `faq-${i}`,
    topic: "faq",
    text: `Q: ${f.q} A: ${f.a}`,
  }));

  const summaries = serviceSummariesFromNav();
  const serviceChunks: KnowledgeChunk[] = [];
  for (let i = 0; i < summaries.length; i += 3) {
    serviceChunks.push({
      id: `services-${i}`,
      topic: "services",
      text: summaries.slice(i, i + 3).join(" "),
    });
  }

  return [offerChunk, address, process, ...projectsChunks, ...faqChunks, ...serviceChunks];
}

/** Dynamic RAG chunks including admin-editable hours settings. */
export async function getKnowledgeChunks(): Promise<KnowledgeChunk[]> {
  const hours = await getSiteHoursSettings();
  const about: KnowledgeChunk = {
    id: "site-about",
    topic: "company",
    text: `${siteConfig.name} (${siteConfig.url}). Contact: ${siteConfig.email}. Business hours: ${hours.businessHours}. Timezone: ${hours.timezone}. Offline reply: ${hours.offlineReplyPromise}.`,
  };
  return [about, ...buildStaticChunks()];
}

/** @deprecated Prefer getKnowledgeChunks() for live hours */
export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "site-about",
    topic: "company",
    text: `${siteConfig.name} (${siteConfig.url}). Contact: ${siteConfig.email}. Business hours: ${siteConfig.businessHours}. Timezone: ${siteConfig.timezone}.`,
  },
  ...buildStaticChunks(),
];
