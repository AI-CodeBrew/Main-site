/**
 * Run `callback` once the browser is idle (after first paint and the initial work), so
 * non-essential scripts never compete with the page becoming visible and interactive.
 * Falls back to a short timeout where `requestIdleCallback` is missing (Safari).
 * Returns a cancel function for effect cleanup.
 */
export function runWhenIdle(callback: () => void, timeoutMs = 2_000): () => void {
  if (typeof window === "undefined") return () => {};

  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(() => callback(), { timeout: timeoutMs });
    return () => w.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(callback, Math.min(timeoutMs, 1_500));
  return () => window.clearTimeout(id);
}
