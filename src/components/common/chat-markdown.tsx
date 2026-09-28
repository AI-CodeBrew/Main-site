import type { ReactNode } from "react";

// Renders the small markdown subset the AI uses in chat replies (bold, italic, headings, lists,
// links, emails, URLs) as React elements — no raw HTML, so replies can't inject markup.

type Block =
  | { type: "p"; lines: string[] }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; start: number; items: string[] };

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let current: Block | null = null;
  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flush();
      continue;
    }
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ type: "h", text: heading[1] });
      continue;
    }
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      if (current?.type !== "ul") {
        flush();
        current = { type: "ul", items: [] };
      }
      current.items.push(bullet[1]);
      continue;
    }
    const numbered = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (numbered) {
      if (current?.type !== "ol") {
        flush();
        current = { type: "ol", start: Number(numbered[1]), items: [] };
      }
      current.items.push(numbered[2]);
      continue;
    }
    // Indented text right under a list item continues that item.
    if ((current?.type === "ul" || current?.type === "ol") && /^\s/.test(raw)) {
      current.items[current.items.length - 1] += ` ${line}`;
      continue;
    }
    if (current?.type !== "p") {
      flush();
      current = { type: "p", lines: [] };
    }
    current.lines.push(line);
  }
  flush();
  return blocks;
}

// 1,2 bold · 3,4 [text](url) · 5 `code` · 6 https://… · 7 www.… · 8 email · 9 *italic*
const INLINE =
  /\*\*(.+?)\*\*|__(.+?)__|\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|`([^`]+)`|(https?:\/\/[^\s<>()]+)|(www\.[^\s<>()]+)|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|\*([^*\s](?:[^*]*[^*\s])?)\*/g;

const TRAILING_PUNCTUATION = /[.,!?;:'")]+$/;

function Anchor({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-medium underline underline-offset-2 break-all"
    >
      {children}
    </a>
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyPrefix}-${i++}`;
    let consumed = m[0];

    if (m[1] !== undefined || m[2] !== undefined) {
      out.push(<strong key={key}>{renderInline(m[1] ?? m[2], key)}</strong>);
    } else if (m[3] !== undefined) {
      out.push(<Anchor key={key} href={m[4]}>{m[3]}</Anchor>);
    } else if (m[5] !== undefined) {
      out.push(
        <code key={key} className="rounded bg-black/5 px-1 py-0.5 text-[0.9em]">
          {m[5]}
        </code>,
      );
    } else if (m[6] !== undefined || m[7] !== undefined || m[8] !== undefined) {
      const matched = m[6] ?? m[7] ?? m[8];
      const clean = matched.replace(TRAILING_PUNCTUATION, "");
      consumed = clean;
      const href = m[6] ? clean : m[7] ? `https://${clean}` : `mailto:${clean}`;
      out.push(<Anchor key={key} href={href}>{clean}</Anchor>);
    } else if (m[9] !== undefined) {
      out.push(<em key={key}>{renderInline(m[9], key)}</em>);
    }
    last = start + consumed.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function ChatMarkdown({ text }: { text: string }) {
  const blocks = parseBlocks(text);
  return (
    <div className="space-y-2 break-words">
      {blocks.map((block, b) => {
        const key = `b${b}`;
        switch (block.type) {
          case "h":
            return (
              <p key={key} className="font-semibold">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc space-y-1 pl-5">
                {block.items.map((item, n) => (
                  <li key={n}>{renderInline(item, `${key}-${n}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} start={block.start} className="list-decimal space-y-1 pl-5">
                {block.items.map((item, n) => (
                  <li key={n}>{renderInline(item, `${key}-${n}`)}</li>
                ))}
              </ol>
            );
          default:
            return (
              <p key={key}>
                {block.lines.map((line, n) => (
                  <span key={n}>
                    {n > 0 && <br />}
                    {renderInline(line, `${key}-${n}`)}
                  </span>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}
