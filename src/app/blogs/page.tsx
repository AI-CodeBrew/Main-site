import type { Metadata } from "next";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { BlogsIndex } from "@/components/features/blog/blogs-index";
import { JsonLd } from "@/components/seo/json-ld";
import { listBlogs } from "@/lib/blogs/store";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const Contact = nextDynamic(
  () => import("@/components/features/contact/contact").then((m) => m.Contact),
  { loading: () => <div className="min-h-[16rem]" aria-hidden /> },
);

export const metadata: Metadata = buildPageMetadata({
  title: "Stories",
  description:
    "Customer stories and practical notes on AI agents, automation, and e-commerce from the FynkTech team.",
  path: "/blogs",
});

// Posts are managed in /admin/blogs, so always read the latest list.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const result = await listBlogs();
  const posts = result.ok
    ? result.data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        image: p.image,
        card_image: p.card_image,
      }))
    : [];

  const stats = [
    { value: "Dialcom", label: "AI receptionist, CRM & OMS shipped" },
    { value: "24/7", label: "AI agents that qualify and hand off" },
    { value: "Global", label: "clients · engineered in Lahore" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stories", path: "/blogs" },
        ])}
      />

      {/* Compact hero — same black + line grid as homepage */}
      <header
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #12121f 0%, #0a0a12 55%, #000000 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 85%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(90,131,255,0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 py-8 text-center md:px-6 md:py-10">
          <h1 className="text-2xl font-bold tracking-tight md:text-4xl md:leading-tight">
            <span aria-hidden>🎉</span> Customer stories
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            How teams use FynkTech AI agents and e-commerce systems to reply faster, qualify better,
            and grow revenue.
          </p>
        </div>
      </header>

      {posts.length === 0 ? (
        <section className="px-5 py-20 text-center md:px-6">
          <h2 className="text-2xl font-bold text-heading">Stories coming soon</h2>
          <p className="mx-auto mt-3 max-w-md text-body">
            We&apos;re preparing original articles. Check back shortly — or talk to us in the meantime.
          </p>
          <Link href="/contact" className="btn btn-primary mt-8 inline-flex">
            Talk to us
          </Link>
        </section>
      ) : (
        <>
          {/* Light grey stats strip — respond.io style */}
          <section className="bg-[#F5F6F8]">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-7 md:flex-row md:items-center md:gap-0 md:px-6 md:py-8">
              <h2 className="shrink-0 text-2xl font-bold leading-snug text-heading md:max-w-[260px] md:text-3xl md:leading-snug lg:max-w-[300px]">
                Results from work like yours
              </h2>

              <div className="grid min-w-0 flex-1 grid-cols-1 divide-y divide-[#E2E5EB] sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:ml-8 lg:ml-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-0 py-4 sm:px-6 sm:py-0 lg:px-8">
                    <p className="text-3xl font-bold tracking-tight text-[#5A83FF] md:text-[2.25rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-[#5B6170]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <BlogsIndex posts={posts} />
        </>
      )}

      <Contact />
    </main>
  );
}
