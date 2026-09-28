import { z } from "zod";
import { SLUG_PATTERN } from "./slug";

// Empty string / null clear the field; a missing key stays undefined so PATCH leaves it untouched.
const emptyToNull = (v: string | null | undefined) => (v === undefined ? undefined : v || null);

const optionalText = (max: number) => z.string().trim().max(max).nullish().transform(emptyToNull);

const httpsImage = z
  .string()
  .trim()
  .max(1000)
  .refine((v) => v === "" || /^https:\/\//i.test(v), "Cover image must be an https:// URL")
  .nullish()
  .transform(emptyToNull);

const fields = {
  slug: z.string().trim().min(1, "Slug is required").max(120).regex(SLUG_PATTERN, "Use lowercase letters, numbers and dashes"),
  title: z.string().trim().min(1, "Title is required").max(300),
  description: optionalText(1000),
  meta_title: optionalText(200),
  meta_description: optionalText(500),
  image: httpsImage,
  content: z
    .string()
    .max(500_000)
    .nullish()
    .transform((v) => (v === undefined ? undefined : v ? sanitizeBlogHtml(v) : null)),
  status: z.enum(["draft", "published"]),
  sort_order: z.coerce.number().int().min(-9999).max(9999),
};

export const blogSchema = z.object({
  ...fields,
  status: fields.status.default("published"),
  sort_order: fields.sort_order.default(0),
});

// Built from the raw fields (not `.partial()`), so omitted keys stay untouched instead of getting defaults.
export const blogPatchSchema = z.object(fields).partial();

export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  return issue ? `${issue.path.join(".") || "body"}: ${issue.message}` : "Invalid input";
}

/**
 * Defense in depth for admin-authored HTML: strips executable tags, inline event handlers
 * and javascript: URLs. Content is only writable by admins, so this is not a full sanitizer.
 */
export function sanitizeBlogHtml(html: string): string {
  return html
    .replace(/<\s*(script|style|iframe|object|embed|form|link|meta|base)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*\/?>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["']?)\s*(javascript|vbscript|data):[^"'\s>]*\2/gi, '$1="#"');
}
