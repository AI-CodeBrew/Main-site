/** Case-study style fields rendered above/around the HTML body on /blogs/[slug]. */

export type BlogStat = {
  value: string;
  label: string;
};

export type BlogStory = {
  stats: BlogStat[];
  tldr: string;
  goals: string[];
  solutions: string[];
  quote: string;
  quote_author: string;
  website: string;
  location: string;
  industry: string;
  /** Channel labels shown in the sticky sidebar (e.g. WhatsApp, Web chat). */
  channels: string[];
};

export const EMPTY_STORY: BlogStory = {
  stats: [
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
  ],
  tldr: "",
  goals: ["", "", "", ""],
  solutions: ["", "", "", ""],
  quote: "",
  quote_author: "",
  website: "",
  location: "",
  industry: "",
  channels: ["", "", ""],
};

/** Defaults used on the public page when admin fields are empty. */
export const FYNK_STORY_DEFAULTS = {
  website: "fynktech.com",
  location: "Lahore, Pakistan",
  industry: "AI Agents & E-commerce",
  channels: ["WhatsApp", "Web chat", "Voice"],
} as const;

function asString(v: unknown, max = 2000): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function asStringList(v: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => asString(item, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

/** Normalize DB / form JSON into a safe BlogStory. */
export function parseBlogStory(raw: unknown): BlogStory {
  const src = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const statsRaw = Array.isArray(src.stats) ? src.stats : [];
  const stats: BlogStat[] = statsRaw
    .slice(0, 3)
    .map((s) => {
      const row = s && typeof s === "object" ? (s as Record<string, unknown>) : {};
      return { value: asString(row.value, 40), label: asString(row.label, 80) };
    })
    .filter((s) => s.value || s.label);

  while (stats.length < 3) stats.push({ value: "", label: "" });

  const goals = asStringList(src.goals, 8, 200);
  const solutions = asStringList(src.solutions, 8, 200);
  const channels = asStringList(src.channels, 6, 40);
  while (goals.length < 4) goals.push("");
  while (solutions.length < 4) solutions.push("");
  while (channels.length < 3) channels.push("");

  return {
    stats: stats.slice(0, 3),
    tldr: asString(src.tldr, 1200),
    goals,
    solutions,
    quote: asString(src.quote, 1000),
    quote_author: asString(src.quote_author, 160),
    website: asString(src.website, 200),
    location: asString(src.location, 120),
    industry: asString(src.industry, 120),
    channels,
  };
}

/** Compact payload for storage (drops empty rows). */
export function serializeBlogStory(story: BlogStory): Record<string, unknown> {
  const stats = story.stats
    .map((s) => ({ value: s.value.trim(), label: s.label.trim() }))
    .filter((s) => s.value || s.label)
    .slice(0, 3);
  const goals = story.goals.map((g) => g.trim()).filter(Boolean).slice(0, 8);
  const solutions = story.solutions.map((g) => g.trim()).filter(Boolean).slice(0, 8);
  const channels = story.channels.map((c) => c.trim()).filter(Boolean).slice(0, 6);

  return {
    stats,
    tldr: story.tldr.trim(),
    goals,
    solutions,
    quote: story.quote.trim(),
    quote_author: story.quote_author.trim(),
    website: story.website.trim(),
    location: story.location.trim(),
    industry: story.industry.trim(),
    channels,
  };
}

export function storyHasStats(story: BlogStory): boolean {
  return story.stats.some((s) => s.value);
}

export function storyHasGoals(story: BlogStory): boolean {
  return story.goals.some(Boolean);
}

export function storyHasSolutions(story: BlogStory): boolean {
  return story.solutions.some(Boolean);
}

export function storyHasMeta(story: BlogStory): boolean {
  return Boolean(story.website || story.location || story.industry || story.channels.some(Boolean));
}

/** Resolved sidebar values with Fynk defaults when empty. */
export function resolveStorySidebar(story: BlogStory, category?: string | null) {
  const channels = story.channels.filter(Boolean);
  return {
    website: story.website || FYNK_STORY_DEFAULTS.website,
    location: story.location || FYNK_STORY_DEFAULTS.location,
    industry: story.industry || category || FYNK_STORY_DEFAULTS.industry,
    channels: channels.length > 0 ? channels : [...FYNK_STORY_DEFAULTS.channels],
  };
}
