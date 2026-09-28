"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/content/site";
import Link from "next/link";

export default function FreeAuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    fixes: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Request failed");
        return;
      }
      setResult({ summary: data.summary, fixes: data.fixes });
      trackEvent("audit_submit", { url });
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-page py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Free store audit</h1>
      <p className="text-gray-600 mb-8">
        Enter your public store URL and email. We fetch the homepage HTML (with safety checks) and
        return top fixes — no invented traffic stats.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          required
          type="url"
          placeholder="https://yourstore.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
        <input
          required
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#0A0045] text-white font-medium disabled:opacity-60"
        >
          {loading ? "Analyzing…" : "Run audit"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-gray-800 mb-4">{result.summary}</p>
          <h2 className="font-semibold mb-2">Top fixes</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {result.fixes.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ol>
          {siteConfig.bookingUrl ? (
            <a
              href={siteConfig.bookingUrl}
              className="inline-block mt-6 text-[#0A0045] font-medium underline"
            >
              Book a call to implement fixes
            </a>
          ) : (
            <Link href="/contact" className="inline-block mt-6 text-[#0A0045] font-medium underline">
              Contact us to implement fixes
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
