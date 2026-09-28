import { lookup } from "dns/promises";

const FETCH_TIMEOUT_MS = 15_000;

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1") return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;
  const m = /^172\.(\d+)\./.exec(ip);
  if (m) {
    const n = Number(m[1]);
    if (n >= 16 && n <= 31) return true;
  }
  if (ip.startsWith("169.254.")) return true;
  if (ip.startsWith("fc") || ip.startsWith("fd")) return true;
  return false;
}

export async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
  } catch {
    throw new Error("Invalid URL");
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http(s) URLs allowed");
  }
  const host = parsed.hostname;
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "[::1]"
  ) {
    throw new Error("Private hosts not allowed");
  }

  const records = await lookup(host, { all: true });
  for (const r of records) {
    if (isPrivateIp(r.address)) {
      throw new Error("URL resolves to a private IP");
    }
  }
  return parsed;
}

export async function fetchPublicHtml(url: string): Promise<string> {
  const parsed = await assertPublicUrl(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: { "User-Agent": "FynkTech-AuditBot/1.0 (+https://www.fynktech.com)" },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (text.length > 1_500_000) return text.slice(0, 1_500_000);
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export type HtmlChecks = {
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  hasViewport: boolean;
  imagesWithoutAlt: number;
  trustKeywords: string[];
  ctaKeywords: string[];
};

export function analyzeHtml(html: string): HtmlChecks {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const metaMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesWithoutAlt = imgTags.filter((t) => !/\balt=["'][^"']+["']/i.test(t)).length;

  const trustWords = ["review", "testimonial", "trusted", "certified", "secure", "privacy"];
  const ctaWords = ["book", "contact", "get started", "free", "demo", "call", "shop", "buy"];
  const lower = html.toLowerCase();

  return {
    title: titleMatch?.[1]?.trim() ?? null,
    metaDescription: metaMatch?.[1]?.trim() ?? null,
    h1: h1Match?.[1]?.replace(/<[^>]+>/g, "").trim() ?? null,
    hasViewport,
    imagesWithoutAlt,
    trustKeywords: trustWords.filter((w) => lower.includes(w)),
    ctaKeywords: ctaWords.filter((w) => lower.includes(w)),
  };
}
