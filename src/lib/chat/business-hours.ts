import { siteConfig } from "@/lib/content/site";

/**
 * Loose parser for NEXT_PUBLIC_BUSINESS_HOURS e.g. "Mon–Sat, 10:00–19:00".
 * Falls back to Mon–Fri 09:00–18:00 in site timezone if unparseable.
 */
export function isWithinBusinessHours(now = new Date()): boolean {
  const tz = siteConfig.timezone || "UTC";
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const minutes = hour * 60 + minute;

  const raw = siteConfig.businessHours;
  const rangeMatch = raw.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  let startMin = 9 * 60;
  let endMin = 18 * 60;
  if (rangeMatch) {
    startMin = Number(rangeMatch[1]) * 60 + Number(rangeMatch[2]);
    endMin = Number(rangeMatch[3]) * 60 + Number(rangeMatch[4]);
  }

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dayNum = dayMap[weekday.slice(0, 3)] ?? 1;

  // Mon–Sat → days 1–6; Mon–Fri → 1–5; default weekdays
  let openDays = new Set([1, 2, 3, 4, 5]);
  if (/sat/i.test(raw) && !/sun/i.test(raw)) {
    openDays = new Set([1, 2, 3, 4, 5, 6]);
  }
  if (/mon.*sun/i.test(raw) || /7.?day/i.test(raw)) {
    openDays = new Set([0, 1, 2, 3, 4, 5, 6]);
  }

  if (!openDays.has(dayNum)) return false;
  return minutes >= startMin && minutes < endMin;
}
