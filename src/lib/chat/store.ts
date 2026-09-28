export type ChatRole = "user" | "assistant" | "admin";
export type ChatMode = "bot" | "human";

export type ChatConversation = {
  id: string;
  session_id: string;
  source_page: string | null;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_whatsapp: string | null;
  mode: ChatMode;
  needs_human: boolean;
  unread_count: number;
  message_count: number;
  last_message: string | null;
  last_message_at: string | null;
  summary: string | null;
  summarized_count: number;
  total_tokens: number;
  total_cost_usd: number | string;
  created_at: string;
};

export type ChatUsageRow = {
  id: string;
  conversation_id: string;
  message_id: string | null;
  kind: "reply" | "summary";
  model: string | null;
  input_tokens: number;
  cached_tokens: number;
  output_tokens: number;
  cost_usd: number | string | null;
  created_at: string;
};

export type UsageTotals = {
  period: "today" | "month" | "all";
  requests: number;
  input_tokens: number;
  cached_tokens: number;
  output_tokens: number;
  cost_usd: number | string;
};

export type ChatMessageRow = {
  id: string;
  conversation_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
};

export type ConversationPatch = Partial<
  Pick<
    ChatConversation,
    | "visitor_name"
    | "visitor_email"
    | "visitor_whatsapp"
    | "mode"
    | "needs_human"
    | "unread_count"
    | "summary"
    | "summarized_count"
  >
>;

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isChatStoreConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseKey());
}

async function rest(path: string, init?: RequestInit): Promise<Response | null> {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return null;

  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[chat store] Supabase error", res.status, path, await res.text());
    return null;
  }
  return res;
}

export async function getConversationBySession(sessionId: string): Promise<ChatConversation | null> {
  const params = new URLSearchParams({ session_id: `eq.${sessionId}`, select: "*", limit: "1" });
  const res = await rest(`chat_conversations?${params}`);
  if (!res) return null;
  const rows = (await res.json()) as ChatConversation[];
  return rows[0] ?? null;
}

export async function getOrCreateConversation(
  sessionId: string,
  sourcePage: string | null,
): Promise<ChatConversation | null> {
  const existing = await getConversationBySession(sessionId);
  if (existing) return existing;

  const res = await rest("chat_conversations?on_conflict=session_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify({ session_id: sessionId, source_page: sourcePage }),
  });
  if (!res) return null;
  const rows = (await res.json()) as ChatConversation[];
  // Empty when a parallel request created it first.
  return rows[0] ?? (await getConversationBySession(sessionId));
}

export async function addChatMessage(
  conversationId: string,
  role: ChatRole,
  content: string,
): Promise<ChatMessageRow | null> {
  const res = await rest("chat_messages", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ conversation_id: conversationId, role, content }),
  });
  if (!res) return null;
  const rows = (await res.json()) as ChatMessageRow[];
  return rows[0] ?? null;
}

export async function updateConversation(id: string, patch: ConversationPatch): Promise<boolean> {
  const res = await rest(`chat_conversations?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  });
  return Boolean(res);
}

export async function getConversation(id: string): Promise<ChatConversation | null> {
  const params = new URLSearchParams({ id: `eq.${id}`, select: "*", limit: "1" });
  const res = await rest(`chat_conversations?${params}`);
  if (!res) return null;
  const rows = (await res.json()) as ChatConversation[];
  return rows[0] ?? null;
}

export async function listConversations(search?: string): Promise<ChatConversation[]> {
  const params = new URLSearchParams({
    select: "*",
    order: "last_message_at.desc.nullslast,created_at.desc",
    limit: "200",
  });
  const q = search?.trim().replace(/[,()*]/g, " ");
  if (q) {
    params.set(
      "or",
      `(visitor_name.ilike.*${q}*,visitor_email.ilike.*${q}*,visitor_whatsapp.ilike.*${q}*,last_message.ilike.*${q}*)`,
    );
  }
  const res = await rest(`chat_conversations?${params}`);
  if (!res) return [];
  return (await res.json()) as ChatConversation[];
}

export async function getConversationMessages(conversationId: string): Promise<ChatMessageRow[]> {
  const params = new URLSearchParams({
    conversation_id: `eq.${conversationId}`,
    select: "*",
    order: "created_at.asc",
  });
  const res = await rest(`chat_messages?${params}`);
  if (!res) return [];
  return (await res.json()) as ChatMessageRow[];
}

/** New admin replies for a visitor's session, used by the website widget to poll. */
export async function getAdminMessagesSince(
  sessionId: string,
  afterIso: string | null,
): Promise<{ mode: ChatMode; messages: ChatMessageRow[] }> {
  const conversation = await getConversationBySession(sessionId);
  if (!conversation) return { mode: "bot", messages: [] };

  const params = new URLSearchParams({
    conversation_id: `eq.${conversation.id}`,
    role: "eq.admin",
    select: "*",
    order: "created_at.asc",
  });
  if (afterIso) params.append("created_at", `gt.${afterIso}`);

  const res = await rest(`chat_messages?${params}`);
  const messages = res ? ((await res.json()) as ChatMessageRow[]) : [];
  return { mode: conversation.mode, messages };
}

export async function addChatUsage(row: {
  conversation_id: string;
  message_id: string | null;
  kind: "reply" | "summary";
  model: string;
  input_tokens: number;
  cached_tokens: number;
  output_tokens: number;
  cost_usd: number | null;
}): Promise<boolean> {
  const res = await rest("chat_usage", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  return Boolean(res);
}

export async function getConversationUsage(conversationId: string): Promise<ChatUsageRow[]> {
  const params = new URLSearchParams({
    conversation_id: `eq.${conversationId}`,
    select: "*",
    order: "created_at.asc",
  });
  const res = await rest(`chat_usage?${params}`);
  if (!res) return [];
  return (await res.json()) as ChatUsageRow[];
}

/** Token + cost totals for today, this month and all time (days counted in `timezone`). */
export async function getUsageTotals(timezone: string): Promise<UsageTotals[]> {
  const res = await rest("rpc/chat_usage_totals", {
    method: "POST",
    body: JSON.stringify({ tz: timezone }),
  });
  if (!res) return [];
  return (await res.json()) as UsageTotals[];
}

/** Full message history for a visitor's session, used to restore the widget after a page reload. */
export async function getSessionHistory(
  sessionId: string,
): Promise<{ mode: ChatMode; messages: ChatMessageRow[] }> {
  const conversation = await getConversationBySession(sessionId);
  if (!conversation) return { mode: "bot", messages: [] };
  return { mode: conversation.mode, messages: await getConversationMessages(conversation.id) };
}

/** Picks an email / phone number out of a visitor message so admin can see who they are. */
export function extractContact(text: string): ConversationPatch {
  const patch: ConversationPatch = {};
  const email = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0];
  if (email) patch.visitor_email = email.replace(/[.,;:!?)]+$/, "");
  const phone = text.match(/\+?\d[\d\s-]{7,}\d/)?.[0];
  if (phone) patch.visitor_whatsapp = phone.replace(/[\s-]/g, "");
  const name = text.match(/(?:my name is|mera naam)\s+([A-Za-z][A-Za-z ]{0,40}?)(?:\s+hai)?(?:[.,!]|$|\s+and\s)/i)?.[1];
  if (name) patch.visitor_name = name.trim();
  return patch;
}
