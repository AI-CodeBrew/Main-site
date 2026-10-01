/**
 * Mem0 long-term memory via mem0ai/oss + Supabase pgvector — same pattern as AI portal.
 * No Mem0 cloud API key. Soft-fails when unset (history/summary still work).
 *
 * Vector store: Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) or DATABASE_URL/pgvector.
 * Embeddings + extract LLM: OpenAI (OPENAI_API_KEY) — already used by website chat.
 */
import type { ChatConversation } from "./store";

const OPENAI_EMBEDDING_DIMS = 1536;
const OPENAI_EMBEDDING_MODEL = "text-embedding-3-small";

/** Recent messages kept in the OpenAI prompt when Mem0 is active (cost control). */
export const MEM0_RECENT_LIMIT = (() => {
  const n = Number(process.env.MEM0_RECENT_MESSAGES);
  return Number.isFinite(n) && n >= 2 && n <= 12 ? Math.round(n) : 4;
})();

const CUSTOM_INSTRUCTIONS = `Your Task: Extract durable sales / lead facts about the website visitor for FynkTech.

Information to Extract:
1. Identity: name, company, role, country/city, preferred contact (email or WhatsApp) when they share it
2. Business need: what they want to build or automate, industry, current tools/pain
3. Constraints: budget range, timeline, decision stage, must-haves
4. Preferences: services discussed, language preference, booking intent

Guidelines:
- Store concise facts only (one clear statement each)
- Prefer lasting facts over one-off chat fluff
- Update superseded facts instead of duplicating

Exclude:
- Passwords, payment card numbers, government IDs
- Exact full message transcripts
- Greetings, acknowledgements ("ok", "thanks"), privacy consent alone
- FynkTech marketing copy or generic service lists the bot already knows`;

const SKIP_ADD =
  /^(hi|hello|hey|salam|assalam|thanks|thank you|ok|okay|yes|no|sure|cool|great|nice|bye|i agree|privacy)\b[.!?]*$/i;

type MemoryInstance = {
  search: (
    query: string,
    opts: { topK?: number; filters?: { user_id?: string } },
  ) => Promise<{ results?: Array<{ id?: string; memory?: string; score?: number }> }>;
  add: (
    messages: Array<{ role: string; content: string }>,
    opts: { userId?: string },
  ) => Promise<unknown>;
};

let memoryPromise: Promise<MemoryInstance | null> | null = null;

export function isMem0Enabled(): boolean {
  const flag = process.env.MEM0_ENABLED?.trim().toLowerCase();
  if (flag === "0" || flag === "false" || flag === "off") return false;
  // Default on when vector backend + OpenAI key exist (same soft-enable idea as AI portal)
  if (flag && flag !== "true" && flag !== "1" && flag !== "on") return false;

  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY?.trim());
  const hasSupabase = Boolean(
    (process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
  const hasDb = Boolean(process.env.DATABASE_URL?.trim());
  if (!hasOpenAI) return false;
  if (!hasSupabase && !hasDb) return false;
  // Explicit false already handled; missing MEM0_ENABLED → enable when deps present
  if (!flag) return true;
  return true;
}

function buildVectorStoreConfig(): Record<string, unknown> | null {
  const supabaseUrl =
    process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (supabaseUrl && supabaseKey) {
    return {
      provider: "supabase",
      config: {
        supabaseUrl,
        supabaseKey,
        tableName: "memories",
        embeddingModelDims: OPENAI_EMBEDDING_DIMS,
      },
    };
  }

  const connectionString = process.env.DATABASE_URL?.trim();
  if (connectionString) {
    return {
      provider: "pgvector",
      config: {
        connectionString,
        collectionName: "mem0_memories",
        embeddingModelDims: OPENAI_EMBEDDING_DIMS,
        hnsw: true,
      },
    };
  }

  return null;
}

async function getMemory(): Promise<MemoryInstance | null> {
  if (!isMem0Enabled()) return null;
  if (memoryPromise) return memoryPromise;

  memoryPromise = (async () => {
    const vectorStore = buildVectorStoreConfig();
    if (!vectorStore) {
      console.warn("[mem0] Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or DATABASE_URL)");
      return null;
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      console.warn("[mem0] OPENAI_API_KEY required for embeddings — memory disabled");
      return null;
    }

    const extractModel = process.env.MEM0_EXTRACT_MODEL?.trim() || process.env.OPENAI_MODEL || "gpt-4o-mini";

    try {
      const mod = await import("mem0ai/oss");
      const MemoryCtor = (mod as { Memory: new (cfg: unknown) => MemoryInstance }).Memory;

      return new MemoryCtor({
        version: "v1.1",
        vectorStore,
        disableHistory: true,
        customInstructions: CUSTOM_INSTRUCTIONS,
        embedder: {
          provider: "openai",
          config: {
            apiKey,
            model: OPENAI_EMBEDDING_MODEL,
            embeddingDims: OPENAI_EMBEDDING_DIMS,
          },
        },
        llm: {
          provider: "openai",
          config: {
            apiKey,
            model: extractModel,
          },
        },
      });
    } catch (err) {
      console.warn("[mem0] init failed:", err instanceof Error ? err.message : err);
      return null;
    }
  })();

  return memoryPromise;
}

/** Stable Mem0 user id: phone/email when known, else anonymous session. */
export function resolveMemoryUserId(input: {
  sessionId?: string | null;
  visitorPhone?: string | null;
  visitorEmail?: string | null;
  conversation?: Pick<ChatConversation, "visitor_whatsapp" | "visitor_email" | "session_id"> | null;
}): string | null {
  const phone = (input.visitorPhone ?? input.conversation?.visitor_whatsapp ?? "")
    .replace(/[^\d+]/g, "")
    .slice(0, 20);
  if (phone.length >= 8) return `wa:${phone}`;

  const email = (input.visitorEmail ?? input.conversation?.visitor_email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
  if (email.includes("@") && email.length >= 5) return `email:${email}`;

  const session = input.sessionId ?? input.conversation?.session_id ?? null;
  if (session && /^[\w-]{8,100}$/.test(session)) return `session:${session}`;
  return null;
}

export type MemoryHit = { memory: string; score?: number };

/** Retrieve a few relevant long-term facts (fail-open). */
export async function searchMemories(query: string, userId: string): Promise<MemoryHit[]> {
  if (!query.trim()) return [];
  const topK = (() => {
    const n = Number(process.env.MEM0_SEARCH_TOP_K);
    return Number.isFinite(n) && n >= 1 && n <= 10 ? Math.round(n) : 5;
  })();

  const minScore = (() => {
    const n = Number(process.env.MEM0_SEARCH_THRESHOLD);
    return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.35;
  })();

  try {
    const memory = await getMemory();
    if (!memory) return [];

    // Fetch a few extra, then drop weak / tiny fragments (OSS sometimes returns junk).
    const res = await memory.search(query.slice(0, 500), {
      topK: Math.min(topK + 4, 12),
      filters: { user_id: userId },
    });
    return (res?.results ?? [])
      .map((r) => ({
        memory: (r.memory ?? "").trim(),
        score: typeof r.score === "number" ? r.score : undefined,
      }))
      .filter(
        (r) =>
          r.memory.length >= 12 &&
          (r.score === undefined || r.score >= minScore),
      )
      .slice(0, topK);
  } catch (err) {
    console.warn("[mem0] search failed:", err);
    return [];
  }
}

export function formatMemoryBlock(hits: MemoryHit[]): string {
  if (hits.length === 0) return "";
  const lines = hits.map((h) => `- ${h.memory.slice(0, 180)}`);
  return `KNOWN FACTS ABOUT THIS VISITOR (from long-term memory — use naturally, do not invent beyond these):\n${lines.join("\n")}\n\n`;
}

export function shouldPersistMemory(userText: string): boolean {
  const t = userText.replace(/\s+/g, " ").trim();
  if (t.length < 12) return false;
  if (SKIP_ADD.test(t)) return false;
  return true;
}

/** Extract + store facts from the latest turn. Call from `after()` so TTFB stays fast. */
export async function addMemoryTurn(input: {
  userId: string;
  userText: string;
  assistantText: string;
  sessionId?: string | null;
  conversationId?: string | null;
}): Promise<void> {
  if (!shouldPersistMemory(input.userText)) return;
  if (!input.assistantText.trim()) return;

  try {
    const memory = await getMemory();
    if (!memory) return;

    await memory.add(
      [
        { role: "user", content: input.userText.slice(0, 2_000) },
        { role: "assistant", content: input.assistantText.slice(0, 2_000) },
      ],
      { userId: input.userId },
    );
  } catch (err) {
    console.warn("[mem0] add failed:", err);
  }
}
