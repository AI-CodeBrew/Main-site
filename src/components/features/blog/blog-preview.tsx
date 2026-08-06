import Link from "next/link";

export function BlogPreview() {
  const posts = [
    { title: "AI Automation Trends", href: "/blog/ai-automation-trends" },
    { title: "Scaling E‑commerce with AI", href: "/blog/scaling-ecommerce" },
    { title: "From MVP to Product", href: "/blog/mvp-to-product" },
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-white text-black dark:bg-black dark:text-white">
      <div className="container-page">
        <h2 className="heading-title text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8">Insights</h2>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <Link href={posts[0].href} className="card p-4 md:p-6 md:col-span-2 hover:translate-y-[-2px] transition-transform">
            <div className="h-32 md:h-36 rounded-lg bg-white/5 mb-4" />
            <h3 className="font-semibold text-base md:text-lg">{posts[0].title}</h3>
            <div className="mt-1 text-xs text-zinc-500">5 min read · Oct 2025</div>
            <span className="mt-2 inline-block text-sm text-[var(--color-accent)]">Read →</span>
          </Link>
          {posts.slice(1).map((p) => (
            <Link key={p.href} href={p.href} className="card p-4 md:p-6 hover:translate-y-[-2px] transition-transform">
              <div className="h-24 md:h-28 rounded-lg bg-white/5 mb-4" />
              <h3 className="font-medium text-sm md:text-base">{p.title}</h3>
              <div className="mt-1 text-xs text-zinc-500">4 min read</div>
              <span className="mt-2 inline-block text-sm text-[var(--color-accent)]">Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


