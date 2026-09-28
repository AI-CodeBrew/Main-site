import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

export default function AdminHomePage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p
              className="text-xs font-medium tracking-[0.12em] uppercase mb-2"
              style={{ color: "#5A83FF" }}
            >
              Fynk Tech
            </p>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#070643" }}>
              Admin
            </h1>
            <p className="text-gray-600">
              Manage media and leads. Add more tools here later.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/settings"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Hours & replies
            </h2>
            <p className="text-sm text-gray-600">
              Edit public business hours, timezone, and offline reply promise.
            </p>
          </Link>

          <Link
            href="/admin/media"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Media library
            </h2>
            <p className="text-sm text-gray-600">
              Upload images and videos to Bunny by section. URLs saved in Supabase.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Leads
            </h2>
            <p className="text-sm text-gray-600">
              View and update lead status from forms, chat, audit, and calculator.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
