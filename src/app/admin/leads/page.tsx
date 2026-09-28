import { listLeads } from "@/lib/leads/store";
import { LeadsAdminClient } from "./leads-admin-client";

export default async function AdminLeadsPage() {
  const hasSupabase = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const leads = hasSupabase ? await listLeads() : [];

  return (
    <main className="container-page py-10">
      <h1 className="text-2xl font-bold mb-2">Leads</h1>
      {!hasSupabase ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 mb-8">
          <p className="font-medium mb-2">Supabase not configured</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a Supabase project and run <code>supabase/migrations/001_leads.sql</code>.</li>
            <li>Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in env.</li>
            <li>Redeploy — leads from forms and chat will appear here.</li>
          </ol>
        </div>
      ) : null}
      <LeadsAdminClient initialLeads={leads} supabaseEnabled={hasSupabase} />
    </main>
  );
}
