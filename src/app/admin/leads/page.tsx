import { AdminPage, AdminPageHeader } from "@/components/admin/admin-page";
import { LeadsAdminClient } from "./leads-admin-client";

// The page shell renders immediately; leads are fetched in the browser when the section
// opens (and on Refresh), so the screen never waits on Supabase.
export default function AdminLeadsPage() {
  const hasSupabase = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  return (
    <AdminPage width="wide">
      <AdminPageHeader
        title="Leads & messages"
        description="Contact form messages and leads from the website. Reply by email, WhatsApp or phone."
      />
      {!hasSupabase ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-medium mb-2">Supabase not configured</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a Supabase project and run <code>supabase/migrations/001_leads.sql</code>.</li>
            <li>Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in env.</li>
            <li>Redeploy — leads from forms and chat will appear here.</li>
          </ol>
        </div>
      ) : null}
      <LeadsAdminClient supabaseEnabled={hasSupabase} />
    </AdminPage>
  );
}
