export type CtaAlign = "left" | "center" | "right";

export type CtaOptions = {
  label: string;
  href: string;
  bg: string;
  text: string;
  showIcon: boolean;
  iconColor: string;
  align: CtaAlign;
};

export const CTA_DEFAULTS: CtaOptions = {
  label: "",
  href: "",
  bg: "#2E3B78",
  text: "#ffffff",
  showIcon: true,
  iconColor: "#FCD64C",
  align: "center",
};

export const CTA_BG_PRESETS = [
  { name: "Navy", value: "#2E3B78" },
  { name: "Gold", value: "#FCD64C" },
  { name: "Green", value: "#16a34a" },
  { name: "Red", value: "#dc2626" },
  { name: "Teal", value: "#0d9488" },
  { name: "Purple", value: "#9333ea" },
  { name: "Black", value: "#111827" },
  { name: "Orange", value: "#ea580c" },
];

export const CTA_TEXT_PRESETS = [
  { name: "White", value: "#ffffff" },
  { name: "Navy", value: "#2E3B78" },
  { name: "Black", value: "#111827" },
  { name: "Gold", value: "#FCD64C" },
];

export const CTA_ICON_PRESETS = [
  { name: "Gold", value: "#FCD64C" },
  { name: "White", value: "#ffffff" },
  { name: "Navy", value: "#2E3B78" },
  { name: "Black", value: "#111827" },
];

const HEX = /^#[0-9a-f]{3,8}$/i;

/** Only hex colors reach inline styles, so a pasted value can't inject CSS. */
export function safeColor(value: string, fallback: string): string {
  return HEX.test(value.trim()) ? value.trim() : fallback;
}

/** Adds https:// when the URL has no scheme (keeps mailto:, tel:, relative and anchor links). */
export function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^(https?:|mailto:|tel:)/i.test(v) || v.startsWith("/") || v.startsWith("#")) return v;
  return `https://${v}`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ARROW_PATH = "M5 12h14M13 6l6 6-6 6";

export function buildCtaHtml(options: CtaOptions): string {
  const bg = safeColor(options.bg, CTA_DEFAULTS.bg);
  const text = safeColor(options.text, CTA_DEFAULTS.text);
  const icon = safeColor(options.iconColor, CTA_DEFAULTS.iconColor);
  const href = escapeHtml(normalizeUrl(options.href));
  const label = escapeHtml(options.label.trim());

  const iconHtml = options.showIcon
    ? `<svg class="blog-cta-icon" style="--cta-icon-color:${icon}; color:${icon}; width:1em; height:1em; flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ARROW_PATH}"/></svg>`
    : "";

  return (
    `<div class="blog-cta-wrap" style="text-align: ${options.align}; margin: 1.25rem 0;">` +
    `<a class="blog-cta-btn" href="${href}" target="_blank" rel="noopener noreferrer"` +
    ` data-cta-bg="${bg}" data-cta-text="${text}" data-cta-icon="${options.showIcon ? icon : ""}" data-cta-align="${options.align}"` +
    ` style="--cta-bg-color:${bg}; --cta-text-color:${text}; background-color:${bg}; color:${text}; display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem; border-radius:9999px; font-weight:600; text-decoration:none; line-height:1.2;">` +
    `<span>${label}</span>${iconHtml}</a></div>`
  );
}

/** Reads a CTA back out of an existing `.blog-cta-btn` element for editing. */
export function parseCta(anchor: HTMLAnchorElement): CtaOptions {
  const wrap = anchor.closest(".blog-cta-wrap") as HTMLElement | null;
  const align = (anchor.dataset.ctaAlign || wrap?.style.textAlign || "center") as CtaAlign;
  const icon = anchor.dataset.ctaIcon;
  return {
    label: anchor.querySelector("span")?.textContent ?? anchor.textContent ?? "",
    href: anchor.getAttribute("href") ?? "",
    bg: anchor.dataset.ctaBg || CTA_DEFAULTS.bg,
    text: anchor.dataset.ctaText || CTA_DEFAULTS.text,
    showIcon: icon !== undefined ? icon !== "" : Boolean(anchor.querySelector(".blog-cta-icon")),
    iconColor: icon || CTA_DEFAULTS.iconColor,
    align: ["left", "center", "right"].includes(align) ? align : "center",
  };
}
