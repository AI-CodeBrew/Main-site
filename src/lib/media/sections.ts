/** Canonical section folders for Bunny uploads (path: uploads/{section}/...) */
export const MEDIA_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "case-studies", label: "Case studies" },
  { id: "services", label: "Services" },
  { id: "ai-automation", label: "AI automation" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
  { id: "logos", label: "Logos / brands" },
  { id: "videos", label: "Videos" },
  { id: "misc", label: "Misc" },
] as const;

export type MediaSectionId = (typeof MEDIA_SECTIONS)[number]["id"];

const SECTION_IDS = new Set(MEDIA_SECTIONS.map((s) => s.id));

export function isMediaSection(value: string): value is MediaSectionId {
  return SECTION_IDS.has(value as MediaSectionId);
}

export function normalizeSection(value: string | null | undefined): MediaSectionId {
  const v = (value || "").trim().toLowerCase();
  if (isMediaSection(v)) return v;
  return "misc";
}
