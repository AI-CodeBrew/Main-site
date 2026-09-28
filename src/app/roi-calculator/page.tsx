"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/content/site";
import { getStoredUtms } from "@/lib/leads/utm";

const CURRENCIES = ["USD", "GBP", "EUR", "PKR", "AED", "SAR"] as const;

export default function RoiCalculatorPage() {
  const [tickets, setTickets] = useState(500);
  const [minutes, setMinutes] = useState(8);
  const [hourly, setHourly] = useState(25);
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const [automationPct, setAutomationPct] = useState(40);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const { hoursSaved, costSaved } = useMemo(() => {
    const totalMinutes = tickets * minutes;
    const automatedMinutes = totalMinutes * (automationPct / 100);
    const hours = automatedMinutes / 60;
    const cost = hours * hourly;
    return { hoursSaved: hours, costSaved: cost };
  }, [tickets, minutes, hourly, automationPct]);

  useEffect(() => {
    trackEvent("calculator_used", { tickets, automationPct });
  }, [tickets, automationPct]);

  async function saveEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const utm = getStoredUtms();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        lead_type: "calculator",
        source_page: "/roi-calculator",
        qualification: { tickets, minutes, hourly, currency, automationPct, hoursSaved, costSaved },
        ...utm,
      }),
    });
    setSaved(true);
    trackEvent("lead_captured", { source: "calculator" });
  }

  return (
    <main className="container-page py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Support ROI calculator</h1>
      <p className="text-gray-600 mb-8">
        Estimate hours and labor cost saved by automating a share of support tickets with AI. Adjust
        inputs to match your team — this is directional, not a guarantee.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-gray-700">Monthly tickets</span>
          <input
            type="number"
            min={1}
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-700">Avg handling time (minutes)</span>
          <input
            type="number"
            min={1}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-700">Agent hourly cost</span>
          <input
            type="number"
            min={1}
            value={hourly}
            onChange={(e) => setHourly(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-700">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-gray-700">AI automation % ({automationPct}%)</span>
          <input
            type="range"
            min={0}
            max={90}
            value={automationPct}
            onChange={(e) => setAutomationPct(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-[#0A0045]/5 border border-[#0A0045]/10">
        <p className="text-lg font-semibold text-gray-900">
          ~{hoursSaved.toFixed(0)} hours / month saved
        </p>
        <p className="text-2xl font-bold text-[#0A0045] mt-1">
          ~{costSaved.toFixed(0)} {currency} / month
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Assumptions: {automationPct}% of {tickets} tickets × {minutes} min at {hourly} {currency}/hr.
          Deflection quality and implementation scope affect real outcomes — validate on a discovery call.
        </p>
      </div>

      <form onSubmit={saveEmail} className="mt-8 flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Email results (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border px-4 py-2"
        />
        <button type="submit" className="px-6 py-2 rounded-lg bg-gray-900 text-white">
          Save estimate
        </button>
      </form>
      {saved && <p className="text-sm text-green-700 mt-2">Saved — we may follow up with resources.</p>}

      <div className="mt-10">
        {siteConfig.bookingUrl ? (
          <a href={siteConfig.bookingUrl} className="text-[#0A0045] font-semibold underline">
            Book a call to validate ROI
          </a>
        ) : (
          <Link href="/contact" className="text-[#0A0045] font-semibold underline">
            Contact us to validate ROI
          </Link>
        )}
      </div>
    </main>
  );
}
