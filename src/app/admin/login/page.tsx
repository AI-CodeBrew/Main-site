"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") ?? "/admin";
  const configError = searchParams.get("error") === "config";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Login failed");
      return;
    }
    router.push(from);
    router.refresh();
  }

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-8">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Admin login</h1>
        {configError && (
          <p className="text-sm text-amber-700">Set ADMIN_PASSWORD in environment to enable admin.</p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full py-2 rounded-lg bg-gray-900 text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading…</main>}>
      <LoginForm />
    </Suspense>
  );
}
