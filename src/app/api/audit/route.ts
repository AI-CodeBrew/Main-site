import { NextRequest, NextResponse } from "next/server";
import { analyzeHtml, fetchPublicHtml } from "@/lib/audit/fetch-html";
import { insertLead } from "@/lib/leads/store";
import { notifyTeam } from "@/lib/chat/handoff";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const e = rateLimit.get(ip);
  if (!e || now > e.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { url?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url, email } = body;
  if (!url || !email) {
    return NextResponse.json({ error: "url and email required" }, { status: 400 });
  }

  let html: string;
  try {
    html = await fetchPublicHtml(url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Fetch failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const checks = analyzeHtml(html);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  let fixes: string[] = [];
  let summary = "Automated checks complete. Configure ANTHROPIC_API_KEY for AI-written recommendations.";

  if (apiKey) {
    const prompt = `You are an e-commerce / conversion auditor. Based ONLY on these extracted signals (not live browsing), list exactly 5 prioritized fixes. Be specific and actionable. Do not invent traffic or revenue numbers.

URL: ${url}
Title: ${checks.title ?? "missing"}
Meta description: ${checks.metaDescription ?? "missing"}
H1: ${checks.h1 ?? "missing"}
Viewport meta: ${checks.hasViewport}
Images missing alt (count): ${checks.imagesWithoutAlt}
Trust-related words found: ${checks.trustKeywords.join(", ") || "none"}
CTA-related words found: ${checks.ctaKeywords.join(", ") || "none"}

Respond as JSON: { "summary": string, "fixes": string[5] }`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as { content?: { type: string; text?: string }[] };
      const text = data.content?.find((c) => c.type === "text")?.text ?? "";
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as { summary?: string; fixes?: string[] };
          summary = parsed.summary ?? summary;
          fixes = parsed.fixes?.slice(0, 5) ?? [];
        }
      } catch {
        fixes = text.split("\n").filter(Boolean).slice(0, 5);
      }
    }
  }

  if (fixes.length === 0) {
    fixes = [
      checks.title ? "Refine page title for clarity and primary keyword." : "Add a descriptive <title> tag.",
      checks.metaDescription
        ? "Improve meta description with a clear value prop and CTA."
        : "Add a meta description.",
      checks.h1 ? "Ensure H1 matches user intent on landing." : "Add a single clear H1.",
      checks.hasViewport ? "Confirm mobile layout and tap targets." : "Add viewport meta for mobile.",
      checks.imagesWithoutAlt > 0
        ? `Add alt text to ${checks.imagesWithoutAlt} image(s).`
        : "Add trust signals (reviews, policies) near primary CTA.",
    ];
  }

  await insertLead({
    email,
    lead_type: "audit",
    source_page: "/free-audit",
    qualification: { url, checks, fixes },
    services_interest: "ecommerce-audit",
  });

  await notifyTeam({
    sessionId: `audit-${Date.now()}`,
    email,
    message: `Free audit requested for ${url}`,
    subject: `[Fynk Tech] Free audit — ${url}`,
  });

  return NextResponse.json({
    summary,
    fixes,
    checks,
  });
}
