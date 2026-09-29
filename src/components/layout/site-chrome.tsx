"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps the public site's header/footer so they stay off the admin panel,
 * which has its own sidebar shell.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
