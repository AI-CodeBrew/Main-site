"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics";
import { Phone } from "lucide-react";

export function VoiceDemoSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const ready = Boolean(siteConfig.voiceDemoNumber);

  async function notify(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          leadType: "voice_demo_notify",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
          message: "Notify me when voice demo is ready",
        }),
      });
      if (!res.ok) throw new Error("fail");
      trackEvent("lead_captured", { type: "voice_demo_notify" });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-16 md:py-24 bg-surface" aria-labelledby="voice-demo-heading">
      <div className="container-page max-w-4xl">
        <div
          className="rounded-2xl p-8 md:p-12 border border-line"
          style={{ background: "linear-gradient(135deg, rgba(90,131,255,0.08), rgba(1,180,210,0.06))" }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: "#0A0045" }}>
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 id="voice-demo-heading" className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
                Call our AI receptionist
              </h2>
              <p className="text-body leading-relaxed">
                Hear a live voice agent qualify a caller, answer FAQs, and book a follow-up — the same class of system we ship for clients like Dialcom.
              </p>
            </div>
          </div>

          {ready ? (
            <a
              href={`tel:${siteConfig.voiceDemoNumber}`}
              className="btn btn-primary inline-flex text-lg"
              onClick={() => trackEvent("cta_click", { cta: "voice_demo_call" })}
            >
              Call {siteConfig.voiceDemoNumber}
            </a>
          ) : (
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: "#5A83FF" }}>
                Coming soon — get notified
              </p>
              <form onSubmit={notify} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 rounded-full border border-line px-4 py-3 outline-none focus:ring-2 focus:ring-[#5A83FF]/40"
                />
                <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
                  {status === "loading" ? "Saving…" : status === "done" ? "You're on the list" : "Notify me"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-sm text-red-600 mt-2">Could not save — try again or email {siteConfig.email}.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
