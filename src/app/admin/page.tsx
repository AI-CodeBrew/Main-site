import Link from "next/link";
import { ADMIN_NAV } from "@/components/admin/admin-nav";
import { AdminPage, AdminPageHeader } from "@/components/admin/admin-page";

export default function AdminHomePage() {
  const sections = ADMIN_NAV.filter((item) => item.href !== "/admin");

  return (
    <AdminPage>
      <AdminPageHeader title="Dashboard" description="Pick a section. Each one loads only its own data when opened." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5A83FF]/10 text-[#5A83FF] transition-colors group-hover:bg-[#0A0045] group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-[#070643]">{item.label}</h2>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </AdminPage>
  );
}
