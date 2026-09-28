// OpenAI Chat Completions call shared by the chat bot and conversation summaries,
// returning token usage and cost for every request.

export type OpenAIMessage = { role: "system" | "user" | "assistant"; content: string };

export type RequestUsage = {
  model: string;
  inputTokens: number;
  cachedTokens: number;
  outputTokens: number;
  /** USD, null when the model is not in PRICES_PER_MILLION. */
  costUsd: number | null;
};

// USD per 1M tokens. Update when OpenAI changes prices: https://openai.com/api/pricing
const PRICES_PER_MILLION: Record<string, { input: number; cached: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15, cached: 0.075, output: 0.6 },
  "gpt-4o": { input: 2.5, cached: 1.25, output: 10 },
  "gpt-4.1-nano": { input: 0.1, cached: 0.025, output: 0.4 },
  "gpt-4.1-mini": { input: 0.4, cached: 0.1, output: 1.6 },
  "gpt-4.1": { input: 2, cached: 0.5, output: 8 },
};

export function chatModel(): string {
  return process.env.OPENAI_MODEL || "gpt-4o-mini";
}

/** Matches dated names too (e.g. gpt-4o-mini-2024-07-18) by the longest known prefix. */
export function costForUsage(model: string, input: number, cached: number, output: number): number | null {
  const key = Object.keys(PRICES_PER_MILLION)
    .filter((k) => model === k || model.startsWith(`${k}-`))
    .sort((a, b) => b.length - a.length)[0];
  if (!key) return null;
  const p = PRICES_PER_MILLION[key];
  return ((input - cached) * p.input + cached * p.cached + output * p.output) / 1_000_000;
}

export async function callOpenAI(
  messages: OpenAIMessage[],
  maxTokens: number,
): Promise<{ ok: true; text: string; usage: RequestUsage } | { ok: false; status: number; error: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { ok: false, status: 0, error: "missing OPENAI_API_KEY" };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: chatModel(),
      max_completion_tokens: maxTokens,
      messages,
    }),
  });

  if (!res.ok) {
    return { ok: false, status: res.status, error: await res.text() };
  }

  const data = (await res.json()) as {
    model?: string;
    choices?: { message?: { content?: string | null } }[];
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      prompt_tokens_details?: { cached_tokens?: number };
    };
  };

  const model = data.model ?? chatModel();
  const inputTokens = data.usage?.prompt_tokens ?? 0;
  const cachedTokens = data.usage?.prompt_tokens_details?.cached_tokens ?? 0;
  const outputTokens = data.usage?.completion_tokens ?? 0;

  return {
    ok: true,
    text: data.choices?.[0]?.message?.content ?? "",
    usage: {
      model,
      inputTokens,
      cachedTokens,
      outputTokens,
      costUsd: costForUsage(model, inputTokens, cachedTokens, outputTokens),
    },
  };
}
