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
              Manage chats, media and leads. Add more tools here later.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/chats"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Chats
            </h2>
            <p className="text-sm text-gray-600">
              Read website chat conversations and reply to visitors directly.
            </p>
          </Link>

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
            href="/admin/blogs"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Blogs
            </h2>
            <p className="text-sm text-gray-600">
              Write, edit and publish blog posts with the rich text editor.
            </p>
          </Link>

          <Link
            href="/admin/projects"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Projects
            </h2>
            <p className="text-sm text-gray-600">
              Add or replace project images (1587 × 2245 px) in the PROJECTS section.
            </p>
          </Link>

          <Link
            href="/admin/team"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Team
            </h2>
            <p className="text-sm text-gray-600">
              Add, edit, reorder and hide team members and photos on the Team page.
            </p>
          </Link>

          <Link
            href="/admin/leads"
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#070643" }}>
              Leads & messages
            </h2>
            <p className="text-sm text-gray-600">
              Read contact form messages and reply by email, WhatsApp or phone.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
