export function Ecommerce() {
  const offerings = [
    "Managed E‑commerce Stores",
    "In‑house Brand Stores",
    "Performance Marketing",
    "AI‑driven Product Insights",
  ];

  return (
    <section id="ecommerce" className="py-24 bg-dark-gradient glow-top text-white relative overflow-hidden">
      <div className="noise absolute inset-0" aria-hidden="true" />
      <div className="container-page relative">
        <h2 className="heading-title text-3xl md:text-4xl mb-8">Next‑Gen E‑commerce Operations</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            {offerings.map((o) => (
              <div key={o} className="glass p-4 rounded-xl hover:bg-white/10 transition">{o}</div>
            ))}
          </div>
          <div className="rounded-2xl card h-64 flex items-center justify-center">
            <span className="text-zinc-300">Dashboards & Store Visuals</span>
          </div>
        </div>
        <div className="mt-8">
          <a href="#cases" className="btn btn-outline">View Case Studies</a>
        </div>
      </div>
    </section>
  );
}


