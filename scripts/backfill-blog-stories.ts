/**
 * Apply blogs.story column + backfill the AI Agents case-study fields.
 * Run after 009_blogs_story.sql is applied:
 *   npx tsx --env-file=.env.local scripts/backfill-blog-stories.ts
 */
import { listBlogs, updateBlog } from "../src/lib/blogs/store";

const AI_STORY = {
  stats: [
    { value: "24/7", label: "lead response coverage" },
    { value: "3×", label: "faster first reply" },
    { value: "90%", label: "routine questions handled by AI" },
  ],
  tldr: "Teams lose deals when leads wait. FynkTech AI agents qualify on WhatsApp, web chat, and voice — then hand off clean context to humans so sales stays focused on buyers who are ready.",
  goals: [
    "Qualify inbound leads before sales follow-up",
    "Answer after-hours without hiring a night shift",
    "Keep one conversation thread across channels",
    "Push clean lead data into the CRM",
  ],
  solutions: [
    "AI agents that greet, ask, and score intent",
    "Human handoff with full chat context",
    "WhatsApp, web, and voice in one flow",
    "CRM sync so nothing falls through",
  ],
  quote: "We needed something that sounded human, qualified properly, and never slept. That is exactly what we shipped with FynkTech.",
  quote_author: "FynkTech delivery team",
  website: "fynktech.com",
  location: "Lahore, Pakistan",
  industry: "AI Agents",
};

async function main() {
  const listed = await listBlogs({ includeDrafts: true });
  if (!listed.ok) {
    console.error(listed.error);
    process.exit(1);
  }
  const ai = listed.data.find((b) => b.slug === "ai-agents-that-qualify-leads-24-7");
  if (!ai) {
    console.error("AI Agents blog not found");
    process.exit(1);
  }
  const result = await updateBlog(ai.id, {
    story: AI_STORY,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=675&q=80",
    card_image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=720&q=80",
  });
  if (!result.ok) {
    console.error(result.error);
    console.error("Did you run supabase/migrations/009_blogs_story.sql?");
    process.exit(1);
  }
  console.log("updated story for", result.data.slug);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
