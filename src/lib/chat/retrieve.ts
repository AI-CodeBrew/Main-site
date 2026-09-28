import { getKnowledgeChunks, knowledgeChunks, type KnowledgeChunk } from "./knowledge";

const STOP = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may", "might",
  "must", "can", "this", "that", "these", "those", "i", "you", "we", "they",
  "it", "what", "how", "when", "where", "why", "who", "me", "my", "your", "our",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function termFreq(tokens: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tokens) {
    m.set(t, (m.get(t) ?? 0) + 1);
  }
  return m;
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  const chunkTokens = tokenize(chunk.text + " " + chunk.topic);
  const tf = termFreq(chunkTokens);
  let score = 0;
  for (const q of queryTokens) {
    const hits = tf.get(q) ?? 0;
    if (hits > 0) score += 1 + Math.log1p(hits);
    for (const ct of chunkTokens) {
      if (ct.includes(q) || q.includes(ct)) score += 0.25;
    }
  }
  return score;
}

function rank(query: string, chunks: KnowledgeChunk[], topK: number): string {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return chunks
      .slice(0, 3)
      .map((c) => c.text)
      .join("\n\n");
  }

  const ranked = chunks
    .map((c) => ({ c, score: scoreChunk(queryTokens, c) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (ranked.length === 0) {
    return chunks
      .slice(0, 3)
      .map((c) => c.text)
      .join("\n\n");
  }

  return ranked.map((r) => r.c.text).join("\n\n");
}

export async function retrieveContext(query: string, topK = 6): Promise<string> {
  const chunks = await getKnowledgeChunks();
  return rank(query, chunks, topK);
}

/** Sync fallback using static chunks (env hours). */
export function retrieveContextSync(query: string, topK = 6): string {
  return rank(query, knowledgeChunks, topK);
}
