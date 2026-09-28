import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "fynk_admin";

/** Same check as middleware.ts: the admin cookie must equal ADMIN_PASSWORD. */
export function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}
