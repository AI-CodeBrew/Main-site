"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  CTA_BG_PRESETS,
  CTA_ICON_PRESETS,
  CTA_TEXT_PRESETS,
  type CtaAlign,
  type CtaOptions,
  safeColor,
} from "./cta";

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: "#070643" }}>
            {title}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputClass = "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm";
const primaryBtn = "rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-50";

// ——— Link ———

export function LinkModal({
  initial,
  isEditing,
  onApply,
  onRemove,
  onClose,
}: {
  initial: { url: string; title: string };
  isEditing: boolean;
  onApply: (value: { url: string; title: string }) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(initial.url);
  const [title, setTitle] = useState(initial.title);

  return (
    <Modal title={isEditing ? "Edit link" : "Insert link"} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (url.trim()) onApply({ url, title });
        }}
      >
        <label className="block text-sm">
          <span className="font-medium text-gray-700">URL</span>
          <input autoFocus value={url} onChange={(e) => setUrl(e.target.value)} className={inputClass} placeholder="example.com/page" required />
          <span className="mt-1 block text-xs text-gray-400">https:// is added automatically if missing.</span>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Link title (accessibility)</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Describe where the link goes" />
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="submit" className={primaryBtn} style={{ background: "#0A0045" }}>
            {isEditing ? "Update link" : "Insert link"}
          </button>
          {isEditing && (
            <button type="button" onClick={onRemove} className="text-sm font-medium text-red-600">
              Remove link
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

// ——— Image URL ———

export function ImageUrlModal({
  initial,
  isEditing,
  onApply,
  onClose,
}: {
  initial: string;
  isEditing: boolean;
  onApply: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(initial);
  const valid = /^https:\/\/\S+$/i.test(url.trim());

  return (
    <Modal title={isEditing ? "Change image URL" : "Insert image from URL"} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onApply(url.trim());
        }}
      >
        <label className="block text-sm">
          <span className="font-medium text-gray-700">Image URL (https)</span>
          <input autoFocus value={url} onChange={(e) => setUrl(e.target.value)} className={inputClass} placeholder="https://…" />
          {url && !valid && <span className="mt-1 block text-xs text-red-600">Must start with https://</span>}
        </label>
        <button type="submit" disabled={!valid} className={primaryBtn} style={{ background: "#0A0045" }}>
          {isEditing ? "Update image" : "Insert image"}
        </button>
      </form>
    </Modal>
  );
}

// ——— CTA button ———

function Swatches({
  presets,
  value,
  onChange,
}: {
  presets: { name: string; value: string }[];
  value: string;
  onChange: (value: string, presetName?: string) => void;
}) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-2">
      {presets.map((p) => (
        <button
          key={p.value}
          type="button"
          title={p.name}
          aria-label={p.name}
          onClick={() => onChange(p.value, p.name)}
          className={`h-7 w-7 rounded-full border ${value.toLowerCase() === p.value.toLowerCase() ? "ring-2 ring-offset-2 ring-[#5A83FF]" : "border-gray-300"}`}
          style={{ background: p.value }}
        />
      ))}
      <input
        type="color"
        // <input type="color"> only accepts #rrggbb.
        value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-10 cursor-pointer rounded border border-gray-200"
        aria-label="Custom color"
      />
    </div>
  );
}

export function CtaModal({
  initial,
  isEditing,
  onApply,
  onRemove,
  onClose,
}: {
  initial: CtaOptions;
  isEditing: boolean;
  onApply: (value: CtaOptions) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [cta, setCta] = useState<CtaOptions>(initial);
  const set = <K extends keyof CtaOptions>(key: K, value: CtaOptions[K]) => setCta((c) => ({ ...c, [key]: value }));
  const canSubmit = cta.label.trim() !== "" && cta.href.trim() !== "";

  return (
    <Modal title={isEditing ? "Edit button" : "Insert button"} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) onApply(cta);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-gray-700">Button name</span>
            <input autoFocus value={cta.label} onChange={(e) => set("label", e.target.value)} className={inputClass} placeholder="Book a free call" required />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-gray-700">Button link</span>
            <input value={cta.href} onChange={(e) => set("href", e.target.value)} className={inputClass} placeholder="fynktech.com/contact" required />
          </label>
        </div>

        <div className="text-sm">
          <span className="font-medium text-gray-700">Background color</span>
          <Swatches
            presets={CTA_BG_PRESETS}
            value={cta.bg}
            onChange={(value, name) =>
              // Gold background reads best with navy text.
              setCta((c) => ({ ...c, bg: value, ...(name === "Gold" ? { text: "#2E3B78" } : {}) }))
            }
          />
        </div>

        <div className="text-sm">
          <span className="font-medium text-gray-700">Text color</span>
          <Swatches presets={CTA_TEXT_PRESETS} value={cta.text} onChange={(v) => set("text", v)} />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={cta.showIcon} onChange={(e) => set("showIcon", e.target.checked)} />
          Show arrow icon
        </label>

        {cta.showIcon && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Icon color</span>
            <Swatches presets={CTA_ICON_PRESETS} value={cta.iconColor} onChange={(v) => set("iconColor", v)} />
          </div>
        )}

        <div className="text-sm">
          <span className="font-medium text-gray-700">Alignment</span>
          <div className="mt-1 inline-flex rounded-lg border border-gray-200 p-0.5">
            {(["left", "center", "right"] as CtaAlign[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => set("align", a)}
                className={`rounded-md px-3 py-1 capitalize ${cta.align === a ? "bg-[#0A0045] text-white" : "text-gray-600"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4" style={{ textAlign: cta.align }}>
          <span className="mb-2 block text-left text-xs uppercase tracking-wide text-gray-400">Preview</span>
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            style={{ background: safeColor(cta.bg, "#2E3B78"), color: safeColor(cta.text, "#ffffff") }}
          >
            {cta.label || "Button name"}
            {cta.showIcon && (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={safeColor(cta.iconColor, "#FCD64C")} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="submit" disabled={!canSubmit} className={primaryBtn} style={{ background: "#0A0045" }}>
            {isEditing ? "Update button" : "Insert button"}
          </button>
          {isEditing && (
            <button type="button" onClick={onRemove} className="text-sm font-medium text-red-600">
              Remove button
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
