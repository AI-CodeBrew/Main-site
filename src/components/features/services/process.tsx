export function Process() {
  const steps = [
    { title: "Discover", desc: "Deep-dive workshops to clarify goals and constraints." },
    { title: "Build", desc: "Design, implement, and iterate with tight feedback loops." },
    { title: "Scale", desc: "Optimize, automate, and expand across markets." },
  ];
  return (
    <section className="py-24 bg-surface text-heading dark:bg-black dark:text-white">
      <div className="container-page">
        <h2 className="heading-title text-3xl md:text-4xl mb-8">Our Process</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
