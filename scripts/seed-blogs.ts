/**
 * Seed three published homepage blog posts (same path as /admin/blogs create).
 * Run: npx tsx --env-file=.env.local scripts/seed-blogs.ts
 */
import { createBlog, listBlogs } from "../src/lib/blogs/store";

const POSTS = [
  {
    slug: "ai-agents-that-qualify-leads-24-7",
    title: "AI Agents That Qualify Leads 24/7 — Without Losing the Human Touch",
    description: "AI Agents",
    meta_title: "AI Lead Qualification Agents | Fynk Tech",
    meta_description:
      "How AI voice and chat agents qualify leads around the clock, hand off to humans, and shorten sales cycles for teams that sell worldwide.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=675&q=80",
    card_image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=720&q=80",
    story: {
      stats: [
        { value: "24/7", label: "lead response coverage" },
        { value: "3×", label: "faster first reply" },
        { value: "90%", label: "routine questions handled by AI" },
      ],
      tldr: "Teams lose deals when leads wait. Fynk Tech AI agents qualify on WhatsApp, web chat, and voice — then hand off clean context to humans so sales stays focused on buyers who are ready.",
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
      quote: "We needed something that sounded human, qualified properly, and never slept. That is exactly what we shipped with Fynk Tech.",
      quote_author: "Fynk Tech delivery team",
      website: "fynktech.com",
      location: "Lahore, Pakistan",
      industry: "AI Agents",
    },
    sort_order: 1,
    content: `
<h2>Why lead response time still decides deals</h2>
<p>Most teams lose pipeline in the first minutes — after hours, weekends, and busy midday spikes. An AI agent on WhatsApp, web chat, or voice can greet, ask the right questions, and book the next step while your team sleeps.</p>
<h2>What a Fynk Tech agent actually does</h2>
<ul>
<li>Answers FAQs in English, Urdu, or Arabic</li>
<li>Qualifies budget, timeline, and use case</li>
<li>Hands complex cases to a human with full context</li>
<li>Connects to your CRM so nothing falls through</li>
</ul>
<h2>Where to start</h2>
<p>Begin with one channel (often WhatsApp or website chat), train on your real FAQs, then expand. Book a free consultation at <a href="/contact">fynktech.com/contact</a> if you want a scoped plan.</p>
`.trim(),
  },
  {
    slug: "shopify-stores-built-to-convert",
    title: "Shopify Stores Built to Convert — Not Just Look Pretty",
    description: "E-commerce",
    meta_title: "Conversion-Ready Shopify Stores | Fynk Tech",
    meta_description:
      "Launch or rebuild a Shopify store with clear funnels, payments, and growth systems — for brands selling worldwide.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&h=900&q=80",
    card_image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=720&q=80",
    sort_order: 2,
    content: `
<h2>Pretty stores still lose carts</h2>
<p>Design matters, but conversion comes from clarity: product pages, checkout friction, trust signals, and post-purchase flows. We build Shopify (and WooCommerce) stores with that stack in mind from day one.</p>
<h2>What we typically ship</h2>
<ul>
<li>Theme and UX tuned for mobile-first shoppers</li>
<li>Payments, shipping, and tracking wired correctly</li>
<li>Email/SMS hooks for recovery and retention</li>
<li>Analytics so you know what to improve next</li>
</ul>
<h2>Next step</h2>
<p>See our <a href="/ecommerce/store-setup">store setup service</a> or talk to the team via <a href="/contact">contact</a>.</p>
`.trim(),
  },
  {
    slug: "workflow-automation-that-cuts-busywork",
    title: "Workflow Automation That Cuts Busywork Across Your Tools",
    description: "Automation",
    meta_title: "Business Workflow Automation | Fynk Tech",
    meta_description:
      "Connect CRM, support, and ops tools with reliable automations — fewer manual steps, faster handoffs, clearer pipelines.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&h=900&q=80",
    card_image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=720&q=80",
    sort_order: 3,
    content: `
<h2>Copy-paste ops do not scale</h2>
<p>When leads sit in spreadsheets and tickets bounce between apps, revenue leaks. Workflow automation connects the tools you already use — CRM, helpdesk, WhatsApp, finance — so the right action happens every time.</p>
<h2>Examples we build often</h2>
<ul>
<li>New lead → CRM + Slack + follow-up sequence</li>
<li>Support ticket → triage, tags, and escalation rules</li>
<li>Order events → inventory, shipping, and customer messages</li>
</ul>
<h2>Talk to us</h2>
<p>Explore <a href="/ai-automation/workflow">workflow automation</a> or <a href="/contact">book a call</a> with Fynk Tech.</p>
`.trim(),
  },
] as const;

async function main() {
  const existing = await listBlogs({ includeDrafts: true });
  const slugs = new Set(existing.ok ? existing.data.map((b) => b.slug) : []);

  for (const post of POSTS) {
    if (slugs.has(post.slug)) {
      console.log("skip (exists):", post.slug);
      continue;
    }
    const result = await createBlog({
      ...post,
      status: "published",
    });
    if (!result.ok) {
      console.error("FAIL", post.slug, result.error);
      process.exitCode = 1;
      continue;
    }
    console.log("created:", result.data.slug, result.data.id);
  }

  const listed = await listBlogs();
  console.log(
    "\npublished blogs:",
    listed.ok ? listed.data.map((b) => b.slug).join(", ") : listed.error,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
