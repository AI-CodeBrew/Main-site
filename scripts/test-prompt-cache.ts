/**
 * Two identical-prefix OpenAI calls to measure prompt caching on CHAT_SYSTEM_PROMPT.
 * Run: npx tsx --env-file=.env.local scripts/test-prompt-cache.ts
 */
import { CHAT_SYSTEM_PROMPT } from "../src/lib/chat/system-prompt";
import { callOpenAI, chatModel } from "../src/lib/chat/openai";

async function one(label: string, userText: string) {
  const started = performance.now();
  const result = await callOpenAI(
    [
      { role: "system", content: `${CHAT_SYSTEM_PROMPT}\n\nRETRIEVED CONTEXT:\n(test)\n` },
      { role: "user", content: userText },
    ],
    80,
  );
  const ms = Math.round(performance.now() - started);
  if (!result.ok) {
    console.error(label, "FAIL", result.status, result.error.slice(0, 200));
    return null;
  }
  const { inputTokens, cachedTokens, outputTokens, costUsd, model } = result.usage;
  const uncached = inputTokens - cachedTokens;
  const cachePct = inputTokens ? Math.round((cachedTokens / inputTokens) * 100) : 0;
  console.log(`\n=== ${label} ===`);
  console.log({ model, ms, inputTokens, cachedTokens, uncachedInput: uncached, outputTokens, cachePct: `${cachePct}%`, costUsd });
  return result.usage;
}

async function main() {
  console.log("model:", chatModel());
  console.log("system prompt chars:", CHAT_SYSTEM_PROMPT.length);
  console.log("Note: OpenAI auto-caches identical prompt prefixes (typically ≥1024 tokens).");

  const a = await one("request-1 (cold)", "Say hi in one short sentence.");
  // Brief pause — cache is usually available immediately after first hit
  await new Promise((r) => setTimeout(r, 1500));
  const b = await one("request-2 (same system prefix)", "Say thanks in one short sentence.");

  console.log("\n=== verdict ===");
  if (!a || !b) {
    console.log("Could not complete both calls.");
    process.exit(1);
  }
  if (b.cachedTokens > 0) {
    console.log(
      `YES — prompt caching is active. Request 2 reused ${b.cachedTokens} cached input tokens (${Math.round((b.cachedTokens / b.inputTokens) * 100)}% of prompt).`,
    );
    console.log(
      "Your code already reads prompt_tokens_details.cached_tokens and bills cached tokens cheaper in costForUsage.",
    );
  } else if (a.inputTokens < 1024) {
    console.log("NO cache expected — total prompt under ~1024 tokens (OpenAI minimum for auto-cache).");
  } else {
    console.log(
      "NO cached_tokens on request 2. Prefix may have differed, model may not auto-cache this route yet, or cache not warm. System prompt itself is large enough to qualify.",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
