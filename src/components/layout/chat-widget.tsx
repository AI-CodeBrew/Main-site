"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/lib/content/site";
import { getStoredUtms } from "@/lib/leads/utm";
import { ChatMarkdown } from "@/components/common/chat-markdown";

type Msg = { role: "user" | "assistant" | "admin"; content: string };
type ChatAction = "book" | "human" | "continue";

const ADMIN_POLL_MS = 5_000;
// After a message in a chat the team has taken over, show "Thinking…" until they reply
// (or this long passes), the same as while the bot answers.
const TEAM_REPLY_WAIT_MS = 2 * 60_000;

// White pill with the site's navy text/icon and a white glow, so it stands out on the navy header.
const TALK_TO_US_CLASS =
  "relative inline-flex items-center gap-1 rounded-full border border-white bg-white px-2 py-2 text-sm font-semibold text-[#0A0045] shadow-[0_0_14px_rgba(255,255,255,0.45)] transition-all duration-300 hover:bg-[#eef2ff] hover:shadow-[0_0_20px_rgba(255,255,255,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A83FF]";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function greetingForPath(pathname: string): string {
  if (pathname.startsWith("/ecommerce")) {
    return "You're exploring e-commerce services — ask about store setup, funnels, or growth.";
  }
  if (pathname.startsWith("/ai-automation")) {
    return "You're on AI automation — ask about voice/chat agents, workflows, or custom agents.";
  }
  if (pathname === "/contact") {
    return "Want to reach the team? I can answer FAQs or connect you with a human.";
  }
  if (pathname === "/roi-calculator") {
    return "Curious about support ROI? I can explain assumptions behind the calculator.";
  }
  return "Ask about Fynk Tech services, process, or how to get started.";
}

function introFor(pathname: string, name: string | null): string {
  return `Hi${name ? ` ${name}` : ""} — I'm the Fynk Tech site assistant. ${greetingForPath(pathname)}`;
}

// A chat is kept for a while after the visitor's last activity (admin setting, default 1 hour):
// coming back in time (reload, new tab, next visit) continues the same chat; after that a fresh
// chat starts. `null` = the admin turned the time limit off, so chats never reset.
const SESSION_KEY = "fynk_chat_session";
let resumeWindowMs: number | null = 60 * 60 * 1000;

type StoredSession = { id: string; lastActive: number };

// Fallback when localStorage is blocked (private mode, strict privacy settings).
let memorySession: StoredSession | null = null;

function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const s = JSON.parse(raw) as Partial<StoredSession>;
      if (typeof s.id === "string" && typeof s.lastActive === "number") {
        return { id: s.id, lastActive: s.lastActive };
      }
    }
  } catch {
    // Blocked storage or an old/invalid value — use the in-memory session.
  }
  return memorySession;
}

function writeSession(s: StoredSession) {
  memorySession = s;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  } catch {
    // Ignore — memorySession keeps the chat going for this page view.
  }
}

/** The stored session if it is still within the time limit, else null. Never creates one. */
function activeSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  const s = readSession();
  if (!s) return null;
  if (resumeWindowMs === null) return s;
  return Date.now() - s.lastActive < resumeWindowMs ? s : null;
}

/** Loads the admin's chat time limit (Admin → Chats → Settings). */
async function loadChatConfig() {
  try {
    const res = await fetch("/api/chat/config", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { sessionTimeoutMinutes?: number | null };
    if (data.sessionTimeoutMinutes === null) resumeWindowMs = null;
    else if (typeof data.sessionTimeoutMinutes === "number") resumeWindowMs = data.sessionTimeoutMinutes * 60_000;
  } catch {
    // Keep the default time limit.
  }
}

/** Current chat session id; starts a new session when the last one has expired. */
function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const s = activeSession();
  if (s) return s.id;
  const fresh = { id: crypto.randomUUID(), lastActive: Date.now() };
  writeSession(fresh);
  return fresh.id;
}

// Clicking "Chat with us" the first time asks for a name (required) and phone (optional).
// Both are remembered in this browser so admin sees them on the conversation.
const NAME_KEY = "fynk_chat_name";
const PHONE_KEY = "fynk_chat_phone";
const GATE_KEY = "fynk_chat_gate";
let memoryName: string | null = null;
let memoryPhone: string | null = null;

function readVisitorName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY)?.trim() || memoryName;
  } catch {
    return memoryName;
  }
}

function hasPassedGate(): boolean {
  try {
    return localStorage.getItem(GATE_KEY) === "name-phone";
  } catch {
    return Boolean(memoryName);
  }
}

function markGatePassed() {
  try {
    localStorage.setItem(GATE_KEY, "name-phone");
  } catch {
    // Ignore.
  }
}

function readVisitorPhone(): string | null {
  try {
    return localStorage.getItem(PHONE_KEY)?.trim() || memoryPhone;
  } catch {
    return memoryPhone;
  }
}

function saveVisitorName(name: string) {
  memoryName = name;
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // Ignore — memoryName keeps it for this page view.
  }
}

function saveVisitorPhone(phone: string | null) {
  memoryPhone = phone;
  try {
    if (phone) localStorage.setItem(PHONE_KEY, phone);
    else localStorage.removeItem(PHONE_KEY);
  } catch {
    // Ignore — memoryPhone keeps it for this page view.
  }
}

function cleanName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, 60);
}

function cleanPhone(raw: string): string {
  return raw.replace(/[^\d+\s-]/g, "").replace(/\s+/g, " ").trim().slice(0, 20);
}

/** Marks the chat as active now, restarting the 1-hour window. */
function touchSession() {
  writeSession({ id: sessionId(), lastActive: Date.now() });
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState<ChatAction[]>(["continue"]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [needsPrivacy, setNeedsPrivacy] = useState(false);
  const [visitorName, setVisitorName] = useState<string | null>(() =>
    typeof window === "undefined" ? null : hasPassedGate() ? readVisitorName() : null,
  );
  const [visitorPhone, setVisitorPhone] = useState<string | null>(() =>
    typeof window === "undefined" ? null : readVisitorPhone(),
  );
  const [nameInput, setNameInput] = useState(() =>
    typeof window === "undefined" ? "" : readVisitorName() ?? "",
  );
  const [phoneInput, setPhoneInput] = useState(() =>
    typeof window === "undefined" ? "" : readVisitorPhone() ?? "",
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const seenAdminIds = useRef(new Set<string>());
  const lastAdminAt = useRef<string | null>(null);
  const [awaitingTeam, setAwaitingTeam] = useState(false);
  const hasStarted = messages.some((m) => m.role === "user");

  // The visible screen area while the chat is open. On phones the keyboard covers the bottom
  // of the page without moving fixed elements, so the pop-up follows the visual viewport:
  // it sits just above the keyboard and shrinks to the space that's left.
  const [viewport, setViewport] = useState<{
    height: number;
    offsetTop: number;
    keyboardInset: number;
    isMobile: boolean;
  } | null>(null);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!open || !vv) return;
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => {
      const keyboardInset = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      setViewport({
        height: vv.height,
        offsetTop: vv.offsetTop,
        keyboardInset,
        isMobile: mobileQuery.matches,
      });
      // Keep the latest message in view as the space shrinks.
      bottomRef.current?.scrollIntoView({ block: "end" });
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    mobileQuery.addEventListener("change", update);

    // Phones: the chat is full screen, so the page behind must not scroll.
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    if (mobileQuery.matches) html.style.overflow = "hidden";

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      mobileQuery.removeEventListener("change", update);
      html.style.overflow = previousOverflow;
      setViewport(null);
    };
  }, [open]);

  const intro = useMemo(() => introFor(pathname, visitorName), [pathname, visitorName]);

  // The chat starts once the visitor has given their name on the name screen.
  useEffect(() => {
    if (open && visitorName && messages.length === 0) {
      setMessages([{ role: "assistant", content: intro }]);
    }
  }, [open, intro, messages.length, visitorName]);

  // Visitor came back within the time limit (reload, new tab, next visit): restore their chat.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await loadChatConfig();
      const session = activeSession();
      if (!session || cancelled) return;
      try {
        const params = new URLSearchParams({ sessionId: session.id, history: "1" });
        const res = await fetch(`/api/chat/messages?${params}`, { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as {
          messages?: { id: string; role: Msg["role"]; content: string; created_at: string }[];
        };
        const history = data.messages ?? [];
        if (history.length === 0 || cancelled) return;
        for (const m of history) {
          if (m.role === "admin") {
            seenAdminIds.current.add(m.id);
            lastAdminAt.current = m.created_at;
          }
        }
        const restored: Msg[] = [
          { role: "assistant", content: introFor(window.location.pathname, readVisitorName()) },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ];
        // Don't overwrite a chat the visitor already started while this was loading.
        setMessages((prev) => (prev.some((m) => m.role === "user") ? prev : restored));
      } catch {
        // Couldn't restore — the visitor just starts from the greeting.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, awaitingTeam]);

  // Pick up replies the team sends from /admin/chats.
  useEffect(() => {
    if (!open || !hasStarted) return;
    let cancelled = false;
    const poll = async () => {
      // Expired chats are not polled; the next message starts a fresh chat.
      const session = activeSession();
      if (!session) return;
      const params = new URLSearchParams({ sessionId: session.id });
      if (lastAdminAt.current) params.set("after", lastAdminAt.current);
      try {
        const res = await fetch(`/api/chat/messages?${params}`, { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as {
          messages?: { id: string; content: string; created_at: string }[];
        };
        const fresh = (data.messages ?? []).filter((m) => !seenAdminIds.current.has(m.id));
        if (fresh.length === 0) return;
        fresh.forEach((m) => seenAdminIds.current.add(m.id));
        lastAdminAt.current = fresh[fresh.length - 1].created_at;
        touchSession();
        setAwaitingTeam(false);
        setMessages((prev) => [
          ...prev,
          ...fresh.map((m) => ({ role: "admin" as const, content: m.content })),
        ]);
      } catch {
        // Network hiccup — try again on the next tick.
      }
    };
    void poll();
    const timer = setInterval(() => void poll(), ADMIN_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [open, hasStarted]);

  // Don't show "Thinking…" forever if the team doesn't answer.
  useEffect(() => {
    if (!awaitingTeam) return;
    const timer = setTimeout(() => setAwaitingTeam(false), TEAM_REPLY_WAIT_MS);
    return () => clearTimeout(timer);
  }, [awaitingTeam]);

  /** Clears everything tied to the old chat so the next message starts a new conversation. */
  const resetChat = () => {
    seenAdminIds.current = new Set();
    lastAdminAt.current = null;
    setAwaitingTeam(false);
    setActions(["continue"]);
    setNeedsPrivacy(false);
  };

  const openChat = () => {
    // Tab left open for over an hour since the last message: show a fresh chat.
    if (hasStarted && !activeSession()) {
      resetChat();
      setMessages([]);
    }
    setOpen(true);
    trackEvent("chat_opened", { pathname });
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      let base = messages;
      if (base.some((m) => m.role === "user") && !activeSession()) {
        // Over an hour since the last activity: this message starts a new chat.
        resetChat();
        base = [{ role: "assistant", content: intro }];
      }
      touchSession();
      const userMsg: Msg = { role: "user", content: text.trim() };
      const next = [...base, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next,
            pathname,
            sessionId: sessionId(),
            distinctId: posthog.get_distinct_id(),
            visitorName: visitorName ?? undefined,
            visitorPhone: visitorPhone ?? undefined,
          }),
        });
        const data = (await res.json()) as {
          reply?: string | null;
          humanMode?: boolean;
          actions?: ChatAction[];
          needsPrivacyConsent?: boolean;
          error?: string;
        };
        if (data.humanMode) {
          // The team has taken over; their reply arrives via polling and looks like a bot reply.
          setAwaitingTeam(true);
          setActions(data.actions ?? ["continue"]);
          return;
        }
        touchSession();
        const reply =
          data.reply ??
          data.error ??
          "Something went wrong. Try again or talk to our team.";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        setActions(data.actions ?? ["continue", "human"]);
        setNeedsPrivacy(Boolean(data.needsPrivacyConsent));
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, pathname, intro, visitorName, visitorPhone],
  );

  const captureLead = async (fields: {
    name?: string;
    email?: string;
    whatsapp?: string;
  }) => {
    const utm = getStoredUtms();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fields,
        lead_type: "chat",
        source_page: pathname,
        chat_transcript_ref: sessionId(),
        qualification: { transcriptLength: messages.length },
        ...utm,
      }),
    });
    trackEvent("lead_captured", { pathname, source: "chat" });
  };

  const handleHuman = async () => {
    trackEvent("human_handoff", { pathname });
    const res = await fetch("/api/chat/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId(),
        pathname,
        transcript: messages.map((m) => `${m.role}: ${m.content}`).join("\n"),
      }),
    });
    const data = (await res.json()) as { message?: string; online?: boolean };
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: data.message ?? "We'll follow up soon.",
      },
    ]);
  };

  const handleBook = () => {
    trackEvent("booking", { pathname, source: "chat" });
    if (siteConfig.bookingUrl) {
      window.open(siteConfig.bookingUrl, "_blank", "noopener,noreferrer");
    } else {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Booking link is not configured yet (TODO: NEXT_PUBLIC_BOOKING_URL). You can use Contact or WhatsApp meanwhile.",
        },
      ]);
    }
  };

  /** Gate submit: name is required, phone is optional. */
  const onNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = cleanName(nameInput);
    if (!name) return;
    const phone = cleanPhone(phoneInput);
    saveVisitorName(name);
    saveVisitorPhone(phone || null);
    markGatePassed();
    setVisitorName(name);
    setVisitorPhone(phone || null);
    setNameInput("");
    setPhoneInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needsPrivacy && !privacyAccepted && /@|whatsapp|\+?\d{8,}/i.test(input)) {
      return;
    }
    void sendMessage(input);
    if (privacyAccepted && (input.includes("@") || /whatsapp/i.test(input))) {
      void captureLead({ email: input.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0] });
    }
  };

  const wa = whatsappLink("Hi Fynk Tech — I was chatting on your website.");

  // Admins answer chats from /admin/chats; the visitor widget would only get in the way there.
  if (pathname?.startsWith("/admin")) return null;

  // Phones: full screen, like a messaging app. It fills the visible area, so when the keyboard
  // opens the chat shrinks to the space above it and the message box stays in view.
  // Desktop: floating pop-up above the button.
  // Before the first viewport reading, decide from the screen width so a phone never flashes the pop-up.
  const fullScreen =
    viewport?.isMobile ??
    (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);
  const keyboardOpen = !fullScreen && viewport !== null && viewport.keyboardInset > 0;
  const panelStyle: React.CSSProperties = fullScreen
    ? { top: viewport?.offsetTop ?? 0, height: viewport?.height, transformOrigin: "bottom center" }
    : {
        transformOrigin: "bottom right",
        height: viewport ? Math.min(520, viewport.height - 32) : undefined,
      };

  return (
    <>
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]"
      style={keyboardOpen ? { bottom: viewport.keyboardInset + 8 } : undefined}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            // Desktop: pops out of the chat button's corner. Phones: slides up full screen.
            initial={fullScreen ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.6 }}
            animate={fullScreen ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
            exit={fullScreen ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={panelStyle}
            role="dialog"
            aria-label="Chat with Fynk Tech"
            // data-lenis-prevent: messages scroll natively instead of the page behind.
            data-lenis-prevent
            className={`bg-surface flex flex-col overflow-hidden ${
              fullScreen
                ? "fixed inset-x-0 w-full"
                : "mb-4 w-[calc(100vw-2rem)] max-w-[380px] h-[min(520px,calc(100vh-6rem))] rounded-2xl shadow-2xl border border-line"
            }`}
          >
            <div
              className={`bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] p-4 flex items-center gap-3 ${
                fullScreen ? "pt-[max(1rem,env(safe-area-inset-top))]" : ""
              }`}
            >
              <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="Fynk Tech"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">Fynk Tech Assistant</h3>
              </div>
              <span className="relative inline-flex shrink-0">
                <span
                  aria-hidden="true"
                  // pointer-events-none: the ring grows over the ✕ while pulsing and must not eat its clicks.
                  className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-25 motion-safe:animate-ping"
                />
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "chat" })}
                    className={TALK_TO_US_CLASS}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Talk to us
                  </a>
                ) : (
                  <button type="button" onClick={() => void handleHuman()} className={TALK_TO_US_CLASS}>
                    <WhatsAppIcon className="h-5 w-5" />
                    Talk to us
                  </button>
                )}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {!visitorName ? (
              <form
                onSubmit={onNameSubmit}
                className="flex-1 flex flex-col justify-center gap-4 p-6 bg-surface-muted"
              >
                <div className="text-center">
                  <p className="text-lg font-semibold text-heading">Welcome to Fynk Tech</p>
                  <p className="mt-1 text-sm text-body">Enter your name to start. Phone is optional.</p>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-heading">Name</span>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={60}
                    autoFocus
                    required
                    className="w-full text-base md:text-sm px-3 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-[#0A0045]/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-heading">Phone (optional)</span>
                  <input
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="03xx xxx xxxx"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    className="w-full text-base md:text-sm px-3 py-2.5 rounded-xl border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-[#0A0045]/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0045] text-white text-sm font-medium disabled:opacity-50"
                >
                  Start chat
                </button>
              </form>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 bg-surface-muted space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`w-fit text-sm rounded-2xl px-3 py-2 max-w-[90%] ${
                        m.role === "user"
                          ? "ml-auto bg-[#0A0045] text-white"
                          : "bg-surface border border-line text-heading"
                      }`}
                    >
                      {m.role === "user" ? (
                        <span className="whitespace-pre-wrap">{m.content}</span>
                      ) : (
                        <ChatMarkdown text={m.content} />
                      )}
                    </div>
                  ))}
                  {(loading || awaitingTeam) && (
                    <div className="text-xs text-subtle animate-pulse">Thinking…</div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {needsPrivacy && (
                  <div className="px-4 py-2 bg-amber-50 border-t border-amber-100 text-xs text-amber-900">
                    <label className="flex gap-2 items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-0.5"
                      />
                      <span>
                        I agree my contact details are used only to respond to my inquiry.{" "}
                        <Link href="/privacy" className="underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                )}

                {/* Bottom padding clears the iPhone home bar in full-screen mode. */}
                <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-line bg-surface space-y-2">
                  {actions.includes("book") && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleBook}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#0A0045] text-white"
                      >
                        Book call
                      </button>
                    </div>
                  )}
                  <form onSubmit={onSubmit} className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message…"
                      className="flex-1 min-w-0 text-base md:text-sm px-3 py-2 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-[#0A0045]/20"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="px-4 py-2 rounded-xl bg-[#0A0045] text-white text-sm disabled:opacity-50"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          // Gentle float up and down so it reads as a floating button.
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={openChat}
          // mb-5 keeps the icon where it sat when the "Chat with us" label was under it.
          className="mb-5 block rounded-full motion-reduce:!transform-none"
          aria-label="Chat with us"
        >
          {/* Round blue button with the message icon, which blinks softly. */}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5A83FF] to-[#01B4D2] text-white shadow-lg">
            <MessageCircleMore
              className="h-7 w-7 motion-safe:animate-pulse [animation-duration:1.6s]"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </motion.button>
      )}
    </div>
    </>
  );
}
