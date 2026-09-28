"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  MousePointerClick,
  Palette,
  Plus,
  Trash2,
  Underline,
  Image as ImageIcon,
} from "lucide-react";
import { buildCtaHtml, CTA_DEFAULTS, escapeHtml, normalizeUrl, parseCta, type CtaOptions } from "./cta";
import { CtaModal, ImageUrlModal, LinkModal } from "./modals";
import "@/components/features/blog/blog-content.css";

const TEXT_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#1e3a8a" },
  { name: "Red", value: "#dc2626" },
  { name: "Green", value: "#16a34a" },
  { name: "Gold", value: "#ca8a04" },
  { name: "Purple", value: "#9333ea" },
  { name: "Teal", value: "#0d9488" },
  { name: "Indigo", value: "#4f46e5" },
];

const FONTS = [
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Calibri", value: "Calibri, Carlito, sans-serif" },
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
  { name: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
];

// execCommand fontSize levels; .blog-content maps font[size] to rem.
const SIZES = [
  { name: "Small", value: "2" },
  { name: "Normal", value: "3" },
  { name: "Large", value: "4" },
  { name: "Extra large", value: "5" },
];

const BLOCKS = [
  { name: "Paragraph", value: "<p>" },
  { name: "Heading 2", value: "<h2>" },
  { name: "Heading 3", value: "<h3>" },
  { name: "Quote", value: "<blockquote>" },
];

type Align = "left" | "center" | "right";

type ModalState =
  | null
  | { type: "link"; anchor: HTMLAnchorElement | null; url: string; title: string }
  | { type: "cta"; anchor: HTMLAnchorElement | null; options: CtaOptions }
  | { type: "image-url"; image: HTMLImageElement | null };

type Props = {
  value: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string>;
  placeholder?: string;
};

function ToolButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      // Keep the editor selection when clicking toolbar buttons.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-6 w-px bg-gray-200" aria-hidden="true" />;

export function RichTextEditor({ value, onChange, onUploadImage, placeholder = "Start writing your blog…" }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const lastEmitted = useRef<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(!value);
  const [modal, setModal] = useState<ModalState>(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /** CTA blocks are edited through the modal, not by typing inside them. */
  const lockCtas = useCallback(() => {
    editorRef.current?.querySelectorAll<HTMLElement>(".blog-cta-wrap").forEach((w) => {
      w.contentEditable = "false";
    });
  }, []);

  // Load initial HTML, and re-load when the parent passes new HTML we didn't emit ourselves.
  useEffect(() => {
    const el = editorRef.current;
    if (!el || value === lastEmitted.current) return;
    el.innerHTML = value;
    lastEmitted.current = value;
    lockCtas();
    setIsEmpty(!value);
  }, [value, lockCtas]);

  // Remember the last selection inside the editor so toolbar actions can restore it.
  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection();
      const el = editorRef.current;
      if (!sel?.rangeCount || !el) return;
      const range = sel.getRangeAt(0);
      if (el.contains(range.commonAncestorContainer)) savedRange.current = range.cloneRange();
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  const cleanHtml = (): string => {
    const el = editorRef.current;
    if (!el) return "";
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-rte-selected]").forEach((n) => n.removeAttribute("data-rte-selected"));
    clone.querySelectorAll("[contenteditable]").forEach((n) => n.removeAttribute("contenteditable"));
    const hasMedia = clone.querySelector("img, .blog-cta-wrap");
    return clone.textContent?.trim() || hasMedia ? clone.innerHTML : "";
  };

  const emit = () => {
    const html = cleanHtml();
    lastEmitted.current = html;
    setIsEmpty(html === "");
    onChange(html);
  };

  const restoreSelection = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    if (savedRange.current && el.contains(savedRange.current.commonAncestorContainer)) {
      sel.addRange(savedRange.current);
    } else {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.addRange(range);
    }
  };

  const exec = (command: string, arg?: string) => {
    restoreSelection();
    document.execCommand("styleWithCSS", false, "false");
    document.execCommand(command, false, arg);
    emit();
  };

  const selectImage = (img: HTMLImageElement | null) => {
    editorRef.current?.querySelectorAll("[data-rte-selected]").forEach((n) => n.removeAttribute("data-rte-selected"));
    if (img) img.setAttribute("data-rte-selected", "true");
    setSelectedImg(img);
  };

  // ——— Formatting ———

  const applyFont = (font: string) => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel?.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const fragment = range.extractContents();
    fragment.querySelectorAll<HTMLElement>("[style]").forEach((n) => {
      n.style.removeProperty("font-family");
      if (!n.getAttribute("style")) n.removeAttribute("style");
    });
    fragment.querySelectorAll("font[face]").forEach((n) => n.removeAttribute("face"));

    const span = document.createElement("span");
    span.style.fontFamily = font;
    span.appendChild(fragment);
    range.insertNode(span);

    const next = document.createRange();
    next.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(next);
    savedRange.current = next.cloneRange();
    emit();
  };

  const align = (dir: Align) => {
    if (selectedImg) {
      const parent = selectedImg.parentElement;
      let wrap: HTMLElement;
      if (parent?.classList.contains("blog-img-wrap")) {
        wrap = parent;
      } else {
        wrap = document.createElement("div");
        wrap.className = "blog-img-wrap";
        selectedImg.replaceWith(wrap);
        wrap.appendChild(selectedImg);
      }
      wrap.style.textAlign = dir;
      wrap.style.width = "100%";
      emit();
      return;
    }
    exec(dir === "left" ? "justifyLeft" : dir === "center" ? "justifyCenter" : "justifyRight");
  };

  // ——— Links ———

  const openLinkModal = () => {
    const node = savedRange.current?.startContainer;
    const el = node instanceof Element ? node : node?.parentElement;
    const anchor = el?.closest("a") as HTMLAnchorElement | null;
    const existing = anchor && !anchor.classList.contains("blog-cta-btn") && editorRef.current?.contains(anchor) ? anchor : null;
    setModal({ type: "link", anchor: existing, url: existing?.getAttribute("href") ?? "", title: existing?.title ?? "" });
  };

  const decorateLink = (a: HTMLAnchorElement, href: string, title: string) => {
    a.setAttribute("href", href);
    if (title.trim()) a.title = title.trim();
    else a.removeAttribute("title");
    if (/^https?:/i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.removeAttribute("target");
      a.removeAttribute("rel");
    }
  };

  const applyLink = (anchor: HTMLAnchorElement | null, url: string, title: string) => {
    const href = normalizeUrl(url);
    setModal(null);
    if (anchor) {
      decorateLink(anchor, href, title);
      emit();
      return;
    }

    restoreSelection();
    const sel = window.getSelection();
    if (!sel?.rangeCount) return;
    const range = sel.getRangeAt(0);

    if (range.collapsed) {
      const a = document.createElement("a");
      a.textContent = url.trim();
      decorateLink(a, href, title);
      range.insertNode(a);
      range.setStartAfter(a);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      // Tag the new anchors with a temporary href so we can find and finish them.
      const marker = `rte-link-${Date.now()}`;
      document.execCommand("createLink", false, marker);
      editorRef.current
        ?.querySelectorAll<HTMLAnchorElement>(`a[href="${marker}"]`)
        .forEach((a) => decorateLink(a, href, title));
    }
    emit();
  };

  const removeLink = (anchor: HTMLAnchorElement | null) => {
    setModal(null);
    if (!anchor) return;
    anchor.replaceWith(...Array.from(anchor.childNodes));
    emit();
  };

  // ——— CTA buttons ———

  const openCtaModal = (anchor: HTMLAnchorElement | null) => {
    setModal({ type: "cta", anchor, options: anchor ? parseCta(anchor) : CTA_DEFAULTS });
  };

  const htmlToNode = (html: string): HTMLElement => {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild as HTMLElement;
  };

  const applyCta = (anchor: HTMLAnchorElement | null, options: CtaOptions) => {
    setModal(null);
    const node = htmlToNode(buildCtaHtml(options));
    node.contentEditable = "false";

    if (anchor) {
      (anchor.closest(".blog-cta-wrap") ?? anchor).replaceWith(node);
    } else {
      restoreSelection();
      const sel = window.getSelection();
      const el = editorRef.current!;
      const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
      // Insert after the block containing the caret so the button isn't nested inside a paragraph.
      let block: Node | null = range?.startContainer ?? null;
      while (block && block.parentNode !== el) block = block.parentNode;
      if (block) block.parentNode!.insertBefore(node, block.nextSibling);
      else el.appendChild(node);
      // Give the author a paragraph to keep typing after the button.
      const after = document.createElement("p");
      after.appendChild(document.createElement("br"));
      node.after(after);
    }
    emit();
  };

  const removeCta = (anchor: HTMLAnchorElement | null) => {
    setModal(null);
    if (!anchor) return;
    (anchor.closest(".blog-cta-wrap") ?? anchor).remove();
    emit();
  };

  // ——— Images ———

  const insertImage = (url: string) => {
    exec("insertHTML", `<img src="${escapeHtml(url)}" alt="" style="max-width: 100%; height: auto;">`);
  };

  const onPickImage = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const url = await onUploadImage(file);
      insertImage(url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const applyImageUrl = (image: HTMLImageElement | null, url: string) => {
    setModal(null);
    if (image) {
      image.src = url;
      emit();
    } else {
      insertImage(url);
    }
  };

  const resizeImage = (delta: number) => {
    if (!selectedImg) return;
    const current = selectedImg.getBoundingClientRect().width || selectedImg.naturalWidth || 300;
    const width = Math.min(1200, Math.max(50, Math.round(current + delta)));
    selectedImg.style.width = `${width}px`;
    selectedImg.style.height = "auto";
    selectedImg.removeAttribute("width");
    selectedImg.removeAttribute("height");
    emit();
  };

  const deleteImage = () => {
    if (!selectedImg) return;
    const wrap = selectedImg.parentElement;
    if (wrap?.classList.contains("blog-img-wrap") && wrap.childNodes.length === 1) wrap.remove();
    else selectedImg.remove();
    selectImage(null);
    emit();
  };

  // ——— Editor events ———

  const onEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const cta = target.closest(".blog-cta-btn") as HTMLAnchorElement | null;
    if (cta && editorRef.current?.contains(cta)) {
      e.preventDefault();
      selectImage(null);
      openCtaModal(cta);
      return;
    }
    if (target.tagName === "A") e.preventDefault();
    selectImage(target instanceof HTMLImageElement ? target : null);
  };

  const onEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!selectedImg) return;
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      deleteImage();
    } else if (!e.metaKey && !e.ctrlKey) {
      selectImage(null);
    }
  };

  const selectClass = "h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-gray-200 bg-gray-50 p-2">
        <select
          aria-label="Block style"
          className={selectClass}
          value=""
          onChange={(e) => e.target.value && exec("formatBlock", e.target.value)}
        >
          <option value="">Style</option>
          {BLOCKS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Font family"
          className={`${selectClass} ml-1`}
          value=""
          onChange={(e) => e.target.value && applyFont(e.target.value)}
        >
          <option value="">Font</option>
          {FONTS.map((f) => (
            <option key={f.name} value={f.value} style={{ fontFamily: f.value }}>
              {f.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Text size"
          className={`${selectClass} ml-1`}
          value=""
          onChange={(e) => e.target.value && exec("fontSize", e.target.value)}
        >
          <option value="">Size</option>
          {SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.name}
            </option>
          ))}
        </select>

        <Divider />
        <ToolButton label="Bold" onClick={() => exec("bold")}>
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Italic" onClick={() => exec("italic")}>
          <Italic className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Underline" onClick={() => exec("underline")}>
          <Underline className="h-4 w-4" />
        </ToolButton>

        <div className="relative">
          <ToolButton label="Text color" onClick={() => setColorOpen((o) => !o)}>
            <Palette className="h-4 w-4" />
          </ToolButton>
          {colorOpen && (
            <div className="absolute left-0 top-9 z-20 grid w-40 grid-cols-4 gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setColorOpen(false);
                    exec("foreColor", c.value);
                  }}
                  className="h-7 w-7 rounded-full border border-gray-300"
                  style={{ background: c.value }}
                />
              ))}
            </div>
          )}
        </div>

        <Divider />
        <ToolButton label="Align left" onClick={() => align("left")}>
          <AlignLeft className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Align center" onClick={() => align("center")}>
          <AlignCenter className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Align right" onClick={() => align("right")}>
          <AlignRight className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Bulleted list" onClick={() => exec("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Numbered list" onClick={() => exec("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </ToolButton>

        <Divider />
        <ToolButton label="Link" onClick={openLinkModal}>
          <Link2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Button (CTA)" onClick={() => openCtaModal(null)}>
          <MousePointerClick className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Upload image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          <ImagePlus className="h-4 w-4" />
        </ToolButton>
        <ToolButton label={selectedImg ? "Change image URL" : "Image from URL"} onClick={() => setModal({ type: "image-url", image: selectedImg })}>
          <ImageIcon className="h-4 w-4" />
        </ToolButton>

        {selectedImg && (
          <>
            <Divider />
            <span className="px-1 text-xs text-gray-500">Image:</span>
            <ToolButton label="Smaller" onClick={() => resizeImage(-20)}>
              <Minus className="h-4 w-4" />
            </ToolButton>
            <ToolButton label="Larger" onClick={() => resizeImage(20)}>
              <Plus className="h-4 w-4" />
            </ToolButton>
            <ToolButton label="Delete image" onClick={deleteImage}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </ToolButton>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void onPickImage(file);
            e.target.value = "";
          }}
        />
      </div>

      {(uploading || uploadError) && (
        <p className={`px-4 pt-2 text-xs ${uploadError ? "text-red-600" : "text-gray-500"}`}>
          {uploadError ?? "Uploading image…"}
        </p>
      )}

      <div className="relative">
        {isEmpty && (
          <p className="pointer-events-none absolute left-4 top-4 text-gray-400" aria-hidden="true">
            {placeholder}
          </p>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Blog content"
          className="blog-content rte-editor min-h-[240px] max-h-[min(420px,50vh)] overflow-y-auto px-4 py-4 outline-none"
          onInput={emit}
          onBlur={emit}
          onClick={onEditorClick}
          onKeyDown={onEditorKeyDown}
        />
      </div>

      {modal?.type === "link" && (
        <LinkModal
          initial={{ url: modal.url, title: modal.title }}
          isEditing={Boolean(modal.anchor)}
          onApply={({ url, title }) => applyLink(modal.anchor, url, title)}
          onRemove={() => removeLink(modal.anchor)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "cta" && (
        <CtaModal
          initial={modal.options}
          isEditing={Boolean(modal.anchor)}
          onApply={(options) => applyCta(modal.anchor, options)}
          onRemove={() => removeCta(modal.anchor)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "image-url" && (
        <ImageUrlModal
          initial={modal.image?.getAttribute("src") ?? ""}
          isEditing={Boolean(modal.image)}
          onApply={(url) => applyImageUrl(modal.image, url)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
