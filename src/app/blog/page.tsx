import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Contact } from "@/components/features/contact/contact";
import { listBlogs } from "@/lib/blogs/store";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, e-commerce growth, and building systems that scale — from the Fynk Tech team.",
};

// Posts are managed in /admin/blogs, so always read the latest list.
export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogPage() {
  const result = await listBlogs();
  const posts = result.ok ? result.data : [];

  return (
    <main className="min-h-screen">
      <PageHero
        title="Blog"
        subtitle="Insights"
        description="Practical notes on AI agents, automation, and e-commerce from the Fynk Tech team."
        backgroundImage="/about.jpeg"
        showButtons={false}
      />

      <section className="py-20 bg-surface">
        <div className="container-page">
          {posts.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
                Posts coming soon
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                We&apos;re preparing original articles. Check back shortly.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Talk to us
              </Link>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-surface-muted">
                      {post.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-xs text-subtle" dateTime={post.created_at}>
                        {dateFormat.format(new Date(post.created_at))}
                      </time>
                      <h2 className="mt-2 text-xl font-bold leading-snug" style={{ color: 'var(--heading)' }}>
                        {post.title}
                      </h2>
                      {post.description && <p className="mt-3 text-sm leading-relaxed text-body line-clamp-3">{post.description}</p>}
                      <span className="mt-auto pt-5 text-sm font-semibold text-[#5A83FF]">Read article →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Contact />
    </main>
  );
}
