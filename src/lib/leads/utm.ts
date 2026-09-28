const UTM_KEY = "fynk_utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type UtmParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>;

export function captureUtmsFromSearch(search: string): UtmParams | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};
  let found = false;
  for (const key of UTM_PARAMS) {
    const v = params.get(key);
    if (v) {
      utm[key] = v;
      found = true;
    }
  }
  if (!found) return null;
  try {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    /* ignore */
  }
  return utm;
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}
