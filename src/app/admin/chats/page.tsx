import { isChatStoreConfigured } from "@/lib/chat/store";
import { AdminPage, AdminPageHeader } from "@/components/admin/admin-page";
import { ChatsAdminClient } from "./chats-admin-client";

// The page shell renders immediately; the chat list is fetched in the browser once it opens
// (and re-polled), so nothing waits on Supabase before the screen appears.
export default function AdminChatsPage() {
  const hasSupabase = isChatStoreConfigured();

  return (
    <AdminPage width="full">
      <AdminPageHeader title="Chats" />
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
      <ChatsAdminClient />
    </AdminPage>
  );
}
