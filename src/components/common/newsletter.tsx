"use client";

import { useState } from "react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className={`${compact ? "py-8" : "py-16"} bg-surface text-heading dark:bg-black dark:text-white`}>
      <div className="container-page">
        {!compact && (
          <h2 className="heading-title text-2xl md:text-3xl mb-4">Get the latest in AI & e‑commerce innovation</h2>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 rounded-full border border-white/20 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
          />
          <button className="btn btn-primary" type="submit">
            {submitted ? "Subscribed" : "Subscribe"}
          </button>
        </form>
        {!compact && (
          <div className="mt-2 text-xs text-zinc-500">We respect your privacy. Unsubscribe anytime.</div>
        )}
      </div>
    </section>
  );
}


