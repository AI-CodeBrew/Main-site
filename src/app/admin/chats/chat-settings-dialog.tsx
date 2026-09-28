"use client";

import { useEffect, useState } from "react";
import type { ChatSettings } from "@/lib/chat/settings";

type Limits = Record<"sessionTimeoutMinutes" | "historyLimit" | "summaryEvery", { min: number; max: number }>;

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-40 ${
        checked ? "bg-[#0A0045]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function NumberField({
  value,
  onChange,
  limits,
  disabled,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  limits: { min: number; max: number };
  disabled?: boolean;
  suffix: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <input
        type="number"
        min={limits.min}
        max={limits.max}
        value={Number.isFinite(value) ? value : ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm disabled:bg-gray-50 disabled:text-gray-400"
      />
      <span className={`text-sm ${disabled ? "text-gray-400" : "text-gray-600"}`}>{suffix}</span>
    </span>
  );
}

export function ChatSettingsDialog({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState<ChatSettings | null>(null);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/chats/settings", { cache: "no-store" });
      const data = (await res.json()) as { settings?: ChatSettings; limits?: Limits; error?: string };
      if (!res.ok || !data.settings || !data.limits) {
        setError(data.error || "Could not load settings");
        return;
      }
      setSettings(data.settings);
      setLimits(data.limits);
    })();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) =>
    setSettings((s) => (s ? { ...s, [key]: value } : s));

  async function save() {
    if (!settings) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/chats/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = (await res.json()) as { settings?: ChatSettings; error?: string };
      if (!res.ok || !data.settings) throw new Error(data.error || "Save failed");
      setSettings(data.settings);
      setMessage("Saved. The chat uses these settings within ~30 seconds.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0A0045]/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-settings-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg! overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] px-5 py-4 text-white">
          <h2 id="chat-settings-title" className="font-semibold">
            Chat settings
          </h2>
          <button type="button" onClick={onClose} className="p-1 text-white/80 hover:text-white" aria-label="Close">
            ✕
          </button>
        </div>

        {!settings || !limits ? (
          <p className="p-6 text-sm text-gray-500">{error ?? "Loading…"}</p>
        ) : (
          <div className="space-y-5 p-5">
            <section className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-[#070643]">Chat time limit</h3>
                <Toggle
                  label="Chat time limit"
                  checked={settings.sessionTimeoutEnabled}
                  onChange={(v) => set("sessionTimeoutEnabled", v)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Start a new chat when the visitor comes back after{" "}
                <NumberField
                  value={settings.sessionTimeoutMinutes}
                  onChange={(v) => set("sessionTimeoutMinutes", v)}
                  limits={limits.sessionTimeoutMinutes}
                  disabled={!settings.sessionTimeoutEnabled}
                  suffix="minutes"
                />{" "}
                without activity.
              </p>
              {!settings.sessionTimeoutEnabled && (
                <p className="text-xs text-gray-400">Off: a visitor&apos;s chat never resets on its own.</p>
              )}
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-[#070643]">Message limit (context window)</h3>
                <Toggle
                  label="Message limit"
                  checked={settings.historyLimitEnabled}
                  onChange={(v) => set("historyLimitEnabled", v)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Send only the last{" "}
                <NumberField
                  value={settings.historyLimit}
                  onChange={(v) => set("historyLimit", v)}
                  limits={limits.historyLimit}
                  disabled={!settings.historyLimitEnabled}
                  suffix="messages"
                />{" "}
                (visitor + bot) to the AI with each new message.
              </p>
              {!settings.historyLimitEnabled && (
                <p className="text-xs text-gray-400">
                  Off: the whole chat is sent every time, so long chats cost more per message.
                </p>
              )}
            </section>

            <hr className="border-gray-100" />

            <section className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`font-semibold ${settings.historyLimitEnabled ? "text-[#070643]" : "text-gray-400"}`}
                >
                  Summarize older messages
                </h3>
                <Toggle
                  label="Summarize older messages"
                  checked={settings.summaryEnabled && settings.historyLimitEnabled}
                  disabled={!settings.historyLimitEnabled}
                  onChange={(v) => set("summaryEnabled", v)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Every{" "}
                <NumberField
                  value={settings.summaryEvery}
                  onChange={(v) => set("summaryEvery", v)}
                  limits={limits.summaryEvery}
                  disabled={!settings.historyLimitEnabled || !settings.summaryEnabled}
                  suffix="messages"
                />{" "}
                that fall outside the limit are summarized, so the bot still remembers the visitor&apos;s
                situation (business, needs, budget, contact details).
              </p>
              <p className="text-xs text-gray-400">
                {settings.historyLimitEnabled
                  ? settings.summaryEnabled
                    ? "Each summary is one small extra AI request; it shows in the chat's cost."
                    : "Off: messages outside the limit are simply dropped."
                  : "Turn on the message limit to use summaries."}
              </p>
            </section>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving}
                className="rounded-xl bg-[#0A0045] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#070643] disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save settings"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#f8f9fc]"
              >
                Close
              </button>
            </div>
            {message && <p className="text-sm text-green-700">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
