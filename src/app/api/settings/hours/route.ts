import { NextRequest, NextResponse } from "next/server";
import {
  getSiteHoursSettings,
  upsertSiteHoursSettings,
} from "@/lib/settings/store";

const ADMIN_COOKIE = "fynk_admin";

function isAdmin(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.cookies.get(ADMIN_COOKIE)?.value === password;
}

/** Public read — used by chat/site. */
export async function GET() {
  const data = await getSiteHoursSettings();
  return NextResponse.json({ ok: true, ...data });
}

/** Admin update. */
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    businessHours?: string;
    timezone?: string;
    offlineReplyPromise?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    body.businessHours !== undefined &&
    body.businessHours.trim().length < 3
  ) {
    return NextResponse.json({ error: "businessHours too short" }, { status: 400 });
  }
  if (body.timezone !== undefined && body.timezone.trim().length < 3) {
    return NextResponse.json({ error: "timezone too short" }, { status: 400 });
  }
  if (
    body.offlineReplyPromise !== undefined &&
    body.offlineReplyPromise.trim().length < 3
  ) {
    return NextResponse.json(
      { error: "offlineReplyPromise too short" },
      { status: 400 }
    );
  }

  const result = await upsertSiteHoursSettings({
    businessHours: body.businessHours,
    timezone: body.timezone,
    offlineReplyPromise: body.offlineReplyPromise,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "Failed to save" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, ...result.data });
}
