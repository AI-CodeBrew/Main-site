import {
  addMemoryTurn,
  formatMemoryBlock,
  isMem0Enabled,
  resolveMemoryUserId,
  searchMemories,
} from "../src/lib/chat/memory";

function mask(v?: string | null) {
  if (!v) return "(missing)";
  return `${v.slice(0, 4)}…(${v.length})`;
}

async function main() {
  const openai = process.env.OPENAI_API_KEY?.trim();
  const supabaseUrl =
    process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  console.log("=== env ===");
  console.log("MEM0_ENABLED:", process.env.MEM0_ENABLED);
  console.log("isMem0Enabled():", isMem0Enabled());
  console.log("OPENAI_API_KEY:", mask(openai));
  console.log("SUPABASE_URL:", supabaseUrl ? new URL(supabaseUrl).host : "(missing)");
  console.log("SERVICE_ROLE:", mask(supabaseKey));

  if (!openai || !supabaseUrl || !supabaseKey) {
    console.error("FAIL: missing required env");
    process.exit(1);
  }

  console.log("\n=== supabase schema ===");
  const memRes = await fetch(`${supabaseUrl}/rest/v1/memories?select=id&limit=1`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });
  const memText = await memRes.text();
  console.log("memories table:", memRes.status, memRes.ok ? "OK" : memText.slice(0, 400));

  const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/match_vectors`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query_embedding: Array(1536).fill(0),
      match_count: 1,
      filter: {},
    }),
  });
  const rpcText = await rpcRes.text();
  console.log("match_vectors:", rpcRes.status, rpcRes.ok ? "OK" : rpcText.slice(0, 400));

  if (!memRes.ok || !rpcRes.ok) {
    console.error(
      "\nFAIL: migration 007 not applied (or wrong dims). Run 007_mem0_vector_store.sql in Supabase SQL editor.",
    );
    process.exit(2);
  }

  const userId = resolveMemoryUserId({
    sessionId: `mem0-selftest-${Date.now().toString(36)}`,
    visitorPhone: "+923001112233",
  });
  console.log("\n=== mem0 add/search ===");
  console.log("userId:", userId);

  await addMemoryTurn({
    userId: userId!,
    userText:
      "Hi, I am Ahmed from Karachi. I want a Shopify chatbot. Budget around 2500 USD. Timeline is next month.",
    assistantText:
      "Thanks Ahmed — noted Shopify chatbot, about $2500 budget, next month timeline.",
  });
  console.log("addMemoryTurn: done");

  await new Promise((r) => setTimeout(r, 2000));

  const hits = await searchMemories("What does Ahmed want to build and his budget?", userId!);
  console.log("search hits:", hits.length);
  for (const h of hits) {
    console.log(" -", h.score?.toFixed?.(3) ?? "?", h.memory.slice(0, 180));
  }
  console.log("\nformatted block:\n" + (formatMemoryBlock(hits) || "(empty)"));

  const ok = hits.some((h) => /shopify|2500|budget|ahmed|karachi|chatbot/i.test(h.memory));
  if (!ok) {
    console.error("FAIL: search did not recall test facts");
    process.exit(3);
  }

  console.log("\nPASS: Mem0 OSS add + search working");
}

main().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
