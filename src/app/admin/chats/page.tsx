import Link from "next/link";
import { isChatStoreConfigured, listConversations } from "@/lib/chat/store";
import { ChatsAdminClient } from "./chats-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminChatsPage() {
  const hasSupabase = isChatStoreConfigured();
  const conversations = hasSupabase ? await listConversations() : [];

  return (
    <main className="container-page py-6">
      <div className="flex items-center gap-3 mb-4">
        <Link
          href="/admin"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-[#f8f9fc] hover:text-[#070643]"
        >
          ← Admin
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: "#070643" }}>
          Chats
        </h1>
      </div>
      {!hasSupabase ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 mb-8">
          <p className="font-medium mb-2">Supabase not configured</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Run <code>supabase/migrations/004_chats.sql</code> in the Supabase SQL editor.</li>
            <li>Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in env.</li>
            <li>Restart — website chats will appear here.</li>
          </ol>
        </div>
      ) : null}
      <ChatsAdminClient initialConversations={conversations} />
    </main>
  );
}
