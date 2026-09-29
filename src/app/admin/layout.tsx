import { AdminShell } from "@/components/admin/admin-shell";

// Admin tools are designed for a light background; pin the light theme tokens here.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-light">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
