"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, whatsappLink } from "@/lib/content/site";
import { getStoredUtms } from "@/lib/leads/utm";

type Msg = { role: "user" | "assistant"; content: string };
type ChatAction = "book" | "human" | "continue";

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
  if (pathname === "/free-audit") {
    return "Looking at a free audit? I can explain what we check before you submit.";
  }
  if (pathname === "/roi-calculator") {
    return "Curious about support ROI? I can explain assumptions behind the calculator.";
  }
  return "Ask about Fynk Tech services, process, or how to get started.";
}

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const key = "fynk_chat_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
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
  const bottomRef = useRef<HTMLDivElement>(null);

  const intro = useMemo(
    () =>
      `Hi — I'm the Fynk Tech site assistant. Built by Fynk Tech — this is what we build for clients. ${greetingForPath(pathname)}`,
    [pathname],
  );

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: intro }]);
    }
  }, [open, intro, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const openChat = () => {
    setOpen(true);
    trackEvent("chat_opened", { pathname });
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Msg = { role: "user", content: text.trim() };
      const next = [...messages, userMsg];
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
          }),
        });
        const data = (await res.json()) as {
          reply?: string;
          actions?: ChatAction[];
          needsPrivacyConsent?: boolean;
          error?: string;
        };
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
    [loading, messages, pathname],
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

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] h-[min(520px,calc(100vh-6rem))] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="Fynk Tech"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">Fynk Tech Assistant</h3>
                <p className="text-white/70 text-xs truncate">
                  Built by Fynk Tech — demo for clients
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm rounded-2xl px-3 py-2 max-w-[90%] ${
                    m.role === "user"
                      ? "ml-auto bg-[#0A0045] text-white"
                      : "bg-white border border-gray-100 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-gray-500 animate-pulse">Thinking…</div>
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

            <div className="p-3 border-t bg-white space-y-2">
              <div className="flex flex-wrap gap-2">
                {actions.includes("book") && (
                  <button
                    type="button"
                    onClick={handleBook}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#0A0045] text-white"
                  >
                    Book call
                  </button>
                )}
                {actions.includes("human") && (
                  <button
                    type="button"
                    onClick={() => void handleHuman()}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-300"
                  >
                    Talk to human
                  </button>
                )}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-full border border-green-600 text-green-700"
                    onClick={() => trackEvent("whatsapp_click", { source: "chat" })}
                  >
                    WhatsApp
                  </a>
                )}
              </div>
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A0045]/20"
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
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openChat}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white shadow-lg text-sm font-medium"
          aria-label="Open chat"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Chat with us
        </motion.button>
      )}
    </div>
  );
}
