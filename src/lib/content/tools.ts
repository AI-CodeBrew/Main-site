export type FynkTool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  useCases: string[];
  /** Concise journey steps — read as: A → B → C → D */
  journey?: string[];
  audience: string;
  url: string;
  host: string;
  accent: string;
  image: string;
  tags: string[];
};

/**
 * Public FynkTech tools — linked from nav, footer, and /tools.
 */
export const fynkTools: FynkTool[] = [
  {
    id: "autolisting",
    name: "AutoListing",
    tagline: "Shopify product pages, made for you",
    description:
      "Connect Shopify, pick a template, add one image — AutoListing builds the listing.",
    useCases: [
      "Connect Shopify",
      "Pick a template",
      "Add one image",
      "Listing is ready",
    ],
    journey: ["Connect Shopify", "Pick a template", "Add one image", "Listing is ready"],
    audience: "Shopify merchants and catalog teams",
    url: "https://autolisting.fynktech.com",
    host: "autolisting.fynktech.com",
    accent: "#3aa6c9",
    image: "/tools/autolisting.webp?v=project",
    tags: ["Shopify", "Templates", "AI Listings"],
  },
  {
    id: "nichenet",
    name: "NicheNet",
    tagline: "Amazon to Etsy, filled out for you",
    description:
      "Connect Etsy, find the product on Amazon, hit list — live in about 2 minutes with images, title, and description filled in.",
    useCases: [
      "Connect Etsy",
      "Find it on Amazon",
      "Hit list",
      "Live in ~2 mins",
    ],
    journey: ["Connect Etsy", "Find it on Amazon", "Hit list", "Live in ~2 mins"],
    audience: "Etsy sellers sourcing and listing products",
    url: "https://nichenet.fynktech.com",
    host: "nichenet.fynktech.com",
    accent: "#5A83FF",
    image: "/tools/nichenet.webp?v=project",
    tags: ["Etsy", "Amazon", "Auto List"],
  },
  {
    id: "roarr",
    name: "Roarr AI",
    tagline: "Your Meta ads, read and acted on",
    description:
      "Connect Meta and Shopify, analyze the ads, then take the actions that matter.",
    useCases: [
      "Connect Meta",
      "Connect Shopify",
      "Analyze ads",
      "Take action",
    ],
    journey: ["Connect Meta", "Connect Shopify", "Analyze ads", "Take action"],
    audience: "E-commerce brands running Meta ads",
    url: "https://roarr.fynktech.com/",
    host: "roarr.fynktech.com",
    accent: "#0A0045",
    image: "/tools/roarr.webp?v=project",
    tags: ["Meta Ads", "Shopify", "AI Agent"],
  },
];
