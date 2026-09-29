import { z } from "zod";

// Empty string / null clear the field; a missing key stays undefined so PATCH leaves it untouched.
const emptyToNull = (v: string | null | undefined) => (v === undefined ? undefined : v || null);

const optionalText = (max: number) => z.string().trim().max(max).nullish().transform(emptyToNull);

const isLink = (v: string) => v.startsWith("/") || /^https?:\/\//i.test(v);

const optionalLink = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || isLink(v), "Must be a URL or a /path")
  .nullish()
  .transform(emptyToNull);

const fields = {
  title: z.string().trim().min(1, "Title is required").max(120),
  meta: optionalText(160),
  image_url: z.string().trim().min(1, "Image is required").max(1000).refine(isLink, "Must be a URL"),
  href: optionalLink,
  sort_order: z.coerce.number().int().min(0).max(9999),
  is_published: z.boolean(),
};

export const projectSchema = z.object({
  ...fields,
  sort_order: fields.sort_order.default(0),
  is_published: fields.is_published.default(true),
});

// Built from the raw fields (not `.partial()`), so omitted keys stay untouched instead of getting defaults.
export const projectPatchSchema = z.object(fields).partial();

export { firstIssue } from "@/lib/team/validation";
