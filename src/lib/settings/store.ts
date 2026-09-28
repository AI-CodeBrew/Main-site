export type SiteHoursSettings = {
  businessHours: string;
  timezone: string;
  offlineReplyPromise: string;
};

export const SITE_SETTING_KEYS = [
  "business_hours",
  "timezone",
  "offline_reply_promise",
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

const DEFAULTS: SiteHoursSettings = {
  businessHours:
    process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat, 10:00–19:00",
  timezone: process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Karachi",
  offlineReplyPromise:
    process.env.NEXT_PUBLIC_OFFLINE_REPLY_PROMISE ||
    "We will reply within 2 business hours.",
};

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

let cache: { at: number; data: SiteHoursSettings } | null = null;
const CACHE_MS = 30_000;

function mapRow(rows: { key: string; value: string }[]): SiteHoursSettings {
  const map = new Map(rows.map((r) => [r.key, r.value]));
  return {
    businessHours: map.get("business_hours")?.trim() || DEFAULTS.businessHours,
    timezone: map.get("timezone")?.trim() || DEFAULTS.timezone,
    offlineReplyPromise:
      map.get("offline_reply_promise")?.trim() || DEFAULTS.offlineReplyPromise,
  };
}

export async function getSiteHoursSettings(
  opts?: { bypassCache?: boolean }
): Promise<SiteHoursSettings> {
  if (!opts?.bypassCache && cache && Date.now() - cache.at < CACHE_MS) {
    return cache.data;
  }

  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) {
    return DEFAULTS;
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/site_settings?select=key,value&key=in.(business_hours,timezone,offline_reply_promise)`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("[getSiteHoursSettings]", res.status, await res.text());
      return DEFAULTS;
    }

    const rows = (await res.json()) as { key: string; value: string }[];
    const data = mapRow(rows);
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.error("[getSiteHoursSettings]", err);
    return DEFAULTS;
  }
}

export async function upsertSiteHoursSettings(
  patch: Partial<SiteHoursSettings>
): Promise<{ ok: boolean; data: SiteHoursSettings; error?: string }> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) {
    return { ok: false, data: DEFAULTS, error: "Supabase not configured" };
  }

  const entries: { key: SiteSettingKey; value: string }[] = [];
  if (patch.businessHours !== undefined) {
    entries.push({ key: "business_hours", value: patch.businessHours.trim() });
  }
  if (patch.timezone !== undefined) {
    entries.push({ key: "timezone", value: patch.timezone.trim() });
  }
  if (patch.offlineReplyPromise !== undefined) {
    entries.push({
      key: "offline_reply_promise",
      value: patch.offlineReplyPromise.trim(),
    });
  }

  if (entries.length === 0) {
    return { ok: true, data: await getSiteHoursSettings({ bypassCache: true }) };
  }

  const rows = entries.map((e) => ({
    key: e.key,
    value: e.value,
    updated_at: new Date().toISOString(),
  }));

  const res = await fetch(`${url}/rest/v1/site_settings`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[upsertSiteHoursSettings]", res.status, err);
    return { ok: false, data: DEFAULTS, error: err.slice(0, 300) };
  }

  cache = null;
  const data = await getSiteHoursSettings({ bypassCache: true });
  return { ok: true, data };
}

export function clearSiteSettingsCache() {
  cache = null;
}
