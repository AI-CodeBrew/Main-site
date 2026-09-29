"use client";

import { useRouter } from "next/navigation";
import { withPostHog } from "@/lib/posthog-client";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });

    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      withPostHog((ph) => {
        ph.reset();
      });
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
    >
      Sign out
    </button>
  );
}
