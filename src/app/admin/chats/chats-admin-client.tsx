"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ChatConversation, ChatMessageRow, ChatUsageRow, UsageTotals } from "@/lib/chat/store";
import { ChatSettingsDialog } from "./chat-settings-dialog";
import { ChatMarkdown } from "@/components/common/chat-markdown";

const LIST_POLL_MS = 10_000;
const THREAD_POLL_MS = 5_000;

function fmtCost(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "$0.00";
  if (n < 0.01) return `$${n.toFixed(5)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

function fmtTokens(n: number): string {
  return n.toLocaleString("en-US");
}

const PERIOD_LABEL: Record<UsageTotals["period"], string> = {
  today: "Today",
  month: "This month",
  all: "All time",
};

function displayName(c: ChatConversation): string {
  return c.visitor_name || c.visitor_email || c.visitor_whatsapp || `Visitor · ${c.session_id.slice(0, 4)}`;
}

function initials(c: ChatConversation): string {
  const name = c.visitor_name || c.visitor_email;
  if (!name) return "V";
  const parts = name.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "V";
}

function listTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

function bubbleTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" });
}

export function ChatsAdminClient({
  initialConversations,
}: {
  initialConversations: ChatConversation[];
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [active, setActive] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessageRow[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<ChatUsageRow[]>([]);
  const [totals, setTotals] = useState<UsageTotals[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  // Times are formatted in the admin's browser (their timezone + locale), never on the server,
  // otherwise the server and browser text differ and React reports a hydration error.
  const inBrowser = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const loadList = useCallback(async () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    const res = await fetch(`/api/admin/chats?${params}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { conversations: ChatConversation[] };
    setConversations(data.conversations);
  }, [search]);

  const loadThread = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/chats/${id}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as {
      conversation: ChatConversation;
      messages: ChatMessageRow[];
      usage?: ChatUsageRow[];
    };
    setActive(data.conversation);
    setUsage(data.usage ?? []);
    setMessages((prev) =>
      prev.length === data.messages.length && prev.at(-1)?.id === data.messages.at(-1)?.id
        ? prev
        : data.messages,
    );
    setConversations((list) =>
      list.map((c) => (c.id === id ? { ...data.conversation } : c)),
    );
  }, []);

  const loadTotals = useCallback(async () => {
    const res = await fetch("/api/admin/chats/usage", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { totals: UsageTotals[] };
    setTotals(data.totals);
  }, []);

  // Chat list + cost totals: reload on search change and every 10 s.
  useEffect(() => {
    const first = setTimeout(() => {
      void loadList();
      void loadTotals();
    }, search ? 300 : 0);
    const timer = setInterval(() => {
      void loadList();
      void loadTotals();
    }, LIST_POLL_MS);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [loadList, loadTotals, search]);

  // Open conversation: load now and every 5 s.
  useEffect(() => {
    if (!selectedId) return;
    void loadThread(selectedId);
    const timer = setInterval(() => void loadThread(selectedId), THREAD_POLL_MS);
    return () => clearInterval(timer);
  }, [selectedId, loadThread]);

  const usageByMessage = new Map(
    usage.filter((u) => u.message_id).map((u) => [u.message_id as string, u]),
  );

  // Scroll only the message pane (scrollIntoView would also scroll the whole page).
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function openConversation(c: ChatConversation) {
    setSelectedId(c.id);
    setActive(c);
    setMessages([]);
    setUsage([]);
    setShowSummary(false);
    setDraft("");
    setError(null);
    setConversations((list) => list.map((x) => (x.id === c.id ? { ...x, unread_count: 0 } : x)));
  }

  async function sendReply() {
    const content = draft.trim();
    if (!selectedId || !content || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/chats/${selectedId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        setError("Could not send. Try again.");
        return;
      }
      setDraft("");
      await loadThread(selectedId);
    } finally {
      setSending(false);
    }
  }

  async function setMode(mode: "bot" | "human") {
    if (!selectedId) return;
    await fetch(`/api/admin/chats/${selectedId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });
    await loadThread(selectedId);
  }

  return (
    <div className="flex h-[calc(100vh-10.5rem)] min-h-[520px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* ——— Chat list ——— */}
      <aside
        className={`${selectedId ? "hidden md:flex" : "flex"} w-full md:w-[340px] md:shrink-0 flex-col border-r border-gray-100`}
      >
        <div className="space-y-2.5 border-b border-gray-100 bg-[#f8f9fc] px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">AI cost</span>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-[#070643] hover:border-[#5A83FF]/50"
            >
              ⚙ Chat settings
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["today", "month", "all"] as const).map((period) => {
              const t = totals.find((x) => x.period === period);
              return (
                <div
                  key={period}
                  className="rounded-lg border border-gray-100 bg-white px-2 py-1.5"
                  title={
                    t
                      ? `${t.requests} AI requests · ${fmtTokens(Number(t.input_tokens))} tokens in (${fmtTokens(Number(t.cached_tokens))} cached) · ${fmtTokens(Number(t.output_tokens))} out`
                      : "Run supabase/migrations/005_chat_usage_settings.sql to track cost"
                  }
                >
                  <p className="text-[10px] text-gray-400">{PERIOD_LABEL[period]}</p>
                  <p className="text-sm font-semibold text-[#070643]">{t ? fmtCost(t.cost_usd) : "—"}</p>
                </div>
              );
            })}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, number or message"
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5A83FF]/30"
          />
        </div>
        <ul className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <li className="p-6 text-center text-sm text-gray-500">No chats yet.</li>
          ) : (
            conversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => openConversation(c)}
                  className={`flex w-full items-center gap-3 border-l-[3px] px-4 py-3 text-left transition-colors ${
                    c.id === selectedId
                      ? "border-[#5A83FF] bg-[#5A83FF]/10"
                      : "border-transparent hover:bg-[#f8f9fc]"
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0A0045] to-[#5A83FF] text-sm font-semibold text-white">
                    {initials(c)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-semibold text-[#070643]">{displayName(c)}</span>
                      <span
                        className={`shrink-0 text-xs ${c.unread_count > 0 ? "font-semibold text-[#5A83FF]" : "text-gray-400"}`}
                      >
                        {inBrowser ? listTime(c.last_message_at ?? c.created_at) : ""}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-sm text-gray-500">
                        {c.visitor_whatsapp ? (
                          <span className="text-[#070643]">{c.visitor_whatsapp}</span>
                        ) : null}
                        {c.visitor_whatsapp && c.last_message ? " · " : null}
                        {c.last_message ?? (c.visitor_whatsapp ? "" : "—")}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        {c.needs_human && (
                          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                            Needs human
                          </span>
                        )}
                        {c.mode === "human" && !c.needs_human && (
                          <span className="rounded-full bg-[#01B4D2]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0891a8]">
                            Human
                          </span>
                        )}
                        {c.unread_count > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5A83FF] px-1.5 text-[11px] font-semibold text-white">
                            {c.unread_count}
                          </span>
                        )}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* ——— Conversation ——— */}
      <section className={`${selectedId ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
        {!selectedId || !active ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-[#f8f9fc] p-8 text-center">
            <p className="text-lg font-semibold text-[#070643]">Fynk Tech Chats</p>
            <p className="mt-2 max-w-sm! text-sm text-gray-500">
              Select a chat to read the conversation. Replying takes the chat over from the bot.
            </p>
          </div>
        ) : (
          <>
            <header className="flex items-center gap-3 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] px-4 py-3 text-white">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="md:hidden -ml-1 p-1 text-xl leading-none"
                aria-label="Back to chats"
              >
                ←
              </button>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5A83FF] to-[#01B4D2] text-sm font-semibold ring-2 ring-white/20">
                {initials(active)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{displayName(active)}</p>
                <p className="truncate text-xs text-white/70">
                  {[
                    active.visitor_whatsapp && `Phone ${active.visitor_whatsapp}`,
                    active.visitor_email,
                    active.source_page && `from ${active.source_page}`,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "Website visitor"}
                </p>
              </div>
              {active.mode === "human" ? (
                <button
                  type="button"
                  onClick={() => void setMode("bot")}
                  className="shrink-0 rounded-full border border-white/40 px-3 py-1 text-xs hover:bg-white/10"
                >
                  Hand back to bot
                </button>
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Bot replying
                </span>
              )}
            </header>

            {(usage.length > 0 || active.summary) && (
              <div className="border-b border-gray-100 bg-white px-4 py-2 text-xs text-gray-500">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {usage.length > 0 && (
                    <span>
                      This chat: {usage.filter((u) => u.kind === "reply").length} bot replies
                      {usage.some((u) => u.kind === "summary")
                        ? ` + ${usage.filter((u) => u.kind === "summary").length} summaries`
                        : ""}{" "}
                      · {fmtTokens(usage.reduce((s, u) => s + u.input_tokens + u.output_tokens, 0))} tokens ·{" "}
                      <span className="font-semibold text-[#070643]">
                        {fmtCost(usage.reduce((s, u) => s + Number(u.cost_usd ?? 0), 0))}
                      </span>
                    </span>
                  )}
                  {active.summary && (
                    <button
                      type="button"
                      onClick={() => setShowSummary((v) => !v)}
                      className="font-medium text-[#5A83FF] hover:underline"
                    >
                      {showSummary ? "Hide summary" : `Summary of ${active.summarized_count} earlier messages`}
                    </button>
                  )}
                </div>
                {showSummary && active.summary && (
                  <p className="mt-2 whitespace-pre-wrap rounded-lg bg-[#f8f9fc] p-2.5 text-gray-700">
                    {active.summary}
                  </p>
                )}
              </div>
            )}

            <div ref={threadRef} className="flex-1 overflow-y-auto bg-[#f8f9fc] px-4 py-4 md:px-10">
              {messages.map((m, i) => {
                const prev = messages[i - 1];
                const newDay = !prev || new Date(prev.created_at).toDateString() !== new Date(m.created_at).toDateString();
                const outgoing = m.role !== "user";
                return (
                  <div key={m.id}>
                    {newDay && (
                      <div className="my-3 flex justify-center">
                        <span className="rounded-full border border-gray-100 bg-white px-3 py-1 text-xs text-gray-500">
                          {dayLabel(m.created_at)}
                        </span>
                      </div>
                    )}
                    <div className={`mb-2 flex ${outgoing ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%]! md:max-w-[65%]! rounded-2xl px-3 pb-1.5 pt-2 text-sm ${
                          m.role === "user"
                            ? "rounded-bl-md border border-gray-100 bg-white text-gray-800"
                            : m.role === "admin"
                              ? "rounded-br-md bg-[#0A0045] text-white"
                              : "rounded-br-md border border-[#5A83FF]/20 bg-[#5A83FF]/10 text-[#070643]"
                        }`}
                      >
                        {m.role !== "user" && (
                          <p className={`mb-0.5 text-[11px] font-semibold ${m.role === "admin" ? "text-[#80DFFF]" : "text-[#5A83FF]"}`}>
                            {m.role === "admin" ? "You" : "Bot"}
                          </p>
                        )}
                        {m.role === "user" ? (
                          <p className="whitespace-pre-wrap break-words">{m.content}</p>
                        ) : (
                          <ChatMarkdown text={m.content} />
                        )}
                        <div className="mt-1 flex items-end justify-between gap-3">
                          {usageByMessage.get(m.id) ? (
                            <UsageMeta u={usageByMessage.get(m.id)!} />
                          ) : (
                            <span />
                          )}
                          <span
                            className={`shrink-0 text-[10px] ${m.role === "admin" ? "text-white/60" : "text-gray-400"}`}
                          >
                            {bubbleTime(m.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendReply();
              }}
              className="flex items-end gap-2 border-t border-gray-100 bg-white px-3 py-3"
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendReply();
                  }
                }}
                rows={1}
                placeholder={active.mode === "human" ? "Type a reply…" : "Type a reply (takes over from the bot)…"}
                className="max-h-32 flex-1 resize-none rounded-xl border border-gray-200 bg-[#f8f9fc] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0A0045]/20"
              />
              <button
                type="submit"
                disabled={sending || !draft.trim()}
                className="rounded-xl bg-[#0A0045] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#070643] disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </form>
            {error && <p className="bg-white px-4 pb-2 text-xs text-red-600">{error}</p>}
          </>
        )}
      </section>

      {settingsOpen && <ChatSettingsDialog onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}

/** Token + cost line under each bot reply. */
function UsageMeta({ u }: { u: ChatUsageRow }) {
  return (
    <span
      className="text-[10px] text-[#5A83FF]"
      title={`${u.model ?? "model"} · ${fmtTokens(u.input_tokens - u.cached_tokens)} uncached + ${fmtTokens(u.cached_tokens)} cached input tokens · ${fmtTokens(u.output_tokens)} output tokens`}
    >
      {fmtTokens(u.input_tokens)} in ({fmtTokens(u.cached_tokens)} cached) · {fmtTokens(u.output_tokens)} out ·{" "}
      {fmtCost(u.cost_usd)}
    </span>
  );
}
