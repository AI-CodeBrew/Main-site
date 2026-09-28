// Decides which saved messages are sent to the AI, based on the admin chat settings:
// - history limit off: the whole chat,
// - history limit on: the last N messages,
// - summaries on: older messages are folded into a running summary every `summaryEvery` messages,
//   so the bot keeps the visitor's context without resending everything.

import { callOpenAI } from "./openai";
import type { ChatSettings } from "./settings";
import { addChatUsage, updateConversation, type ChatConversation, type ChatMessageRow } from "./store";

const SUMMARY_PROMPT = `You keep a running summary of a website chat between a visitor and Fynk Tech's assistant.
Update the summary with the new messages. Keep only what helps continue the conversation:
- who the visitor is (name, company, country, email or WhatsApp they shared)
- their business and what they want to build or fix
- budget, timeline, and decisions made
- services discussed or recommended, and links shared
- open questions and anything the team promised
Write plain text, at most 120 words. Do not invent details.`;

const SPEAKER: Record<ChatMessageRow["role"], string> = {
  user: "Visitor",
  assistant: "Assistant",
  admin: "Fynk team",
};

async function summarize(conversationId: string, previous: string | null, messages: ChatMessageRow[]) {
  const transcript = messages.map((m) => `${SPEAKER[m.role]}: ${m.content}`).join("\n");
  const result = await callOpenAI(
    [
      { role: "system", content: SUMMARY_PROMPT },
      {
        role: "user",
        content: `Current summary:\n${previous || "(none yet)"}\n\nNew messages:\n${transcript}`,
      },
    ],
    300,
  );
  if (!result.ok || !result.text.trim()) {
    if (!result.ok) console.error("[chat summary] OpenAI error", result.status, result.error);
    return null;
  }
  await addChatUsage({
    conversation_id: conversationId,
    message_id: null,
    kind: "summary",
    model: result.usage.model,
    input_tokens: result.usage.inputTokens,
    cached_tokens: result.usage.cachedTokens,
    output_tokens: result.usage.outputTokens,
    cost_usd: result.usage.costUsd,
  });
  return result.text.trim();
}

export async function prepareHistory(
  conversation: ChatConversation,
  all: ChatMessageRow[],
  settings: ChatSettings,
): Promise<{ history: ChatMessageRow[]; summary: string | null }> {
  if (!settings.historyLimitEnabled) return { history: all, summary: null };
  // `summarized_count` is missing until 005_chat_usage_settings.sql is run; without it a summary
  // could not be saved and would be re-generated (and paid for) on every message.
  const canSummarize = settings.summaryEnabled && typeof conversation.summarized_count === "number";
  if (!canSummarize) return { history: all.slice(-settings.historyLimit), summary: null };

  let summary = conversation.summary;
  let summarized = Math.min(conversation.summarized_count ?? 0, all.length);
  const keepFrom = all.length - settings.historyLimit;

  // Enough messages have left the window: fold them into the summary.
  if (keepFrom - summarized >= settings.summaryEvery) {
    const updated = await summarize(conversation.id, summary, all.slice(summarized, keepFrom));
    if (updated) {
      summary = updated;
      summarized = keepFrom;
      await updateConversation(conversation.id, { summary, summarized_count: summarized });
    }
  }

  // Everything not yet summarized is sent (between N and N + summaryEvery - 1 messages).
  return { history: all.slice(summarized), summary };
}
