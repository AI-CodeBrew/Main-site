// Admin-editable chat settings, stored in Supabase `site_settings` (see 005_chat_usage_settings.sql).

export type ChatSettings = {
  /** Start a new chat after this many minutes without activity. */
  sessionTimeoutEnabled: boolean;
  sessionTimeoutMinutes: number;
  /** Send only the most recent messages to the AI instead of the whole chat. */
  historyLimitEnabled: boolean;
  historyLimit: number;
  /** Summarize older messages (needs historyLimitEnabled) so the bot keeps the visitor's context. */
  summaryEnabled: boolean;
  summaryEvery: number;
};

export const CHAT_SETTINGS_LIMITS = {
  sessionTimeoutMinutes: { min: 5, max: 10080 },
  historyLimit: { min: 2, max: 50 },
  summaryEvery: { min: 2, max: 50 },
} as const;

export const CHAT_SETTINGS_DEFAULTS: ChatSettings = {
  sessionTimeoutEnabled: true,
  sessionTimeoutMinutes: 60,
  historyLimitEnabled: true,
  historyLimit: 10,
  summaryEnabled: true,
  summaryEvery: 10,
};

const KEYS: Record<keyof ChatSettings, string> = {
  sessionTimeoutEnabled: "chat_session_timeout_enabled",
  sessionTimeoutMinutes: "chat_session_timeout_minutes",
  historyLimitEnabled: "chat_history_limit_enabled",
  historyLimit: "chat_history_limit",
  summaryEnabled: "chat_summary_enabled",
  summaryEvery: "chat_summary_every",
};

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

let cache: { at: number; data: ChatSettings } | null = null;
const CACHE_MS = 30_000;

function clampInt(value: unknown, limits: { min: number; max: number }, fallback: number): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(limits.max, Math.max(limits.min, n));
}

/** Validates and fills defaults; used for both stored rows and admin input. */
export function normalizeChatSettings(input: Partial<Record<keyof ChatSettings, unknown>>): ChatSettings {
  const bool = (v: unknown, fallback: boolean) =>
    v === undefined || v === null || v === "" ? fallback : v === true || v === "true";
  const d = CHAT_SETTINGS_DEFAULTS;
  const L = CHAT_SETTINGS_LIMITS;
  return {
    sessionTimeoutEnabled: bool(input.sessionTimeoutEnabled, d.sessionTimeoutEnabled),
    sessionTimeoutMinutes: clampInt(input.sessionTimeoutMinutes, L.sessionTimeoutMinutes, d.sessionTimeoutMinutes),
    historyLimitEnabled: bool(input.historyLimitEnabled, d.historyLimitEnabled),
    historyLimit: clampInt(input.historyLimit, L.historyLimit, d.historyLimit),
    summaryEnabled: bool(input.summaryEnabled, d.summaryEnabled),
    summaryEvery: clampInt(input.summaryEvery, L.summaryEvery, d.summaryEvery),
  };
}

export async function getChatSettings(opts?: { bypassCache?: boolean }): Promise<ChatSettings> {
  if (!opts?.bypassCache && cache && Date.now() - cache.at < CACHE_MS) {
    return cache.data;
  }

  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return CHAT_SETTINGS_DEFAULTS;

  try {
    const res = await fetch(
      `${url}/rest/v1/site_settings?select=key,value&key=in.(${Object.values(KEYS).join(",")})`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error("[getChatSettings]", res.status, await res.text());
      return CHAT_SETTINGS_DEFAULTS;
    }
    const rows = (await res.json()) as { key: string; value: string }[];
    const map = new Map(rows.map((r) => [r.key, r.value]));
    const raw = Object.fromEntries(
      (Object.keys(KEYS) as (keyof ChatSettings)[]).map((k) => [k, map.get(KEYS[k])]),
    );
    const data = normalizeChatSettings(raw);
    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.error("[getChatSettings]", err);
    return CHAT_SETTINGS_DEFAULTS;
  }
}

export async function saveChatSettings(
  settings: ChatSettings,
): Promise<{ ok: boolean; data: ChatSettings; error?: string }> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) {
    return { ok: false, data: CHAT_SETTINGS_DEFAULTS, error: "Supabase not configured" };
  }

  const now = new Date().toISOString();
  const rows = (Object.keys(KEYS) as (keyof ChatSettings)[]).map((k) => ({
    key: KEYS[k],
    value: String(settings[k]),
    updated_at: now,
  }));

  const res = await fetch(`${url}/rest/v1/site_settings`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[saveChatSettings]", res.status, err);
    return { ok: false, data: settings, error: err.slice(0, 300) };
  }

  cache = null;
  return { ok: true, data: await getChatSettings({ bypassCache: true }) };
}
