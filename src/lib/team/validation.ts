import { z } from "zod";

// Empty string / null clear the field; a missing key stays undefined so PATCH leaves it untouched.
const emptyToNull = (v: string | null | undefined) => (v === undefined ? undefined : v || null);

const optionalText = (max: number) => z.string().trim().max(max).nullish().transform(emptyToNull);

const optionalLink = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//i.test(v), "Must be a URL")
  .nullish()
  .transform(emptyToNull);

const fields = {
  name: z.string().trim().min(1, "Name is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  bio: optionalText(600),
  photo_url: optionalLink,
  linkedin_url: optionalLink,
  sort_order: z.coerce.number().int().min(0).max(9999),
  is_published: z.boolean(),
};

export const teamMemberSchema = z.object({
  ...fields,
  sort_order: fields.sort_order.default(0),
  is_published: fields.is_published.default(true),
});

// Built from the raw fields (not `.partial()`), so omitted keys stay untouched instead of getting defaults.
export const teamMemberPatchSchema = z.object(fields).partial();

export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  return issue ? `${issue.path.join(".") || "body"}: ${issue.message}` : "Invalid input";
}
