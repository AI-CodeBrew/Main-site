import { NextRequest, NextResponse } from "next/server";
import { getUsageTotals } from "@/lib/chat/store";
import { getSiteHoursSettings } from "@/lib/settings/store";

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return req.cookies.get("fynk_admin")?.value === adminPassword;
}

/** AI token + cost totals for today, this month and all time. */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { timezone } = await getSiteHoursSettings();
  const totals = await getUsageTotals(timezone);
  return NextResponse.json({ totals, timezone });
}
