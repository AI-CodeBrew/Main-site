"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { AdminLogoutButton } from "./admin-logout-button";
import { ADMIN_NAV, isAdminNavActive as isActive } from "./admin-nav";

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {ADMIN_NAV.map((item) => {
          const active = isActive(pathname, item);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0A0045] text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#f1f3fa] hover:text-[#070643]"
                }`}
              >
                <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[#80DFFF]" : "text-gray-400"}`} aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-gray-100 px-4 py-4 space-y-3">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#070643]"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        View website
      </Link>
      <AdminLogoutButton />
    </div>
  );
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/admin" onClick={onNavigate} className="flex items-center gap-3 px-5 py-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A0045] to-[#5A83FF] text-sm font-bold text-white">
        F
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-[#070643]">Fynk Tech</span>
        <span className="block text-[11px] uppercase tracking-[0.12em] text-gray-400">Admin</span>
      </span>
    </Link>
  );
}

/**
 * Admin panel frame: a fixed sidebar with every section on desktop, a top bar with a
 * slide-in drawer on phones. Each section is its own route, so only the code and data
 * for the tab being viewed are loaded — navigating to another tab loads that tab's data.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin";
  // Phone drawer; every link inside it closes it on click.
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  // The login screen has no sidebar.
  if (pathname === "/admin/login") return <>{children}</>;

  const current = ADMIN_NAV.find((item) => isActive(pathname, item));

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#070643] md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:flex-col border-r border-gray-100 bg-white">
        <Brand />
        <SidebarNav pathname={pathname} />
        <SidebarFooter />
      </aside>

      {/* Phone top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-3 py-2 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-[#f1f3fa]"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <span className="text-sm font-semibold text-[#070643]">{current?.label ?? "Admin"}</span>
        <span className="w-9" aria-hidden />
      </header>

      {/* Phone drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
            aria-label="Close menu"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between pr-3">
              <Brand onNavigate={closeDrawer} />
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-lg p-2 text-gray-500 hover:bg-[#f1f3fa]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <SidebarNav pathname={pathname} onNavigate={closeDrawer} />
            <SidebarFooter />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
