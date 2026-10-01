import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "@/lib/blogs/store";
import { sanitizeBlogHtml } from "@/lib/blogs/validation";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import "@/components/features/blog/blog-content.css";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  const blog = result.ok ? result.data : null;
  if (!blog) return buildPageMetadata({ title: "Blog", description: "Post not found.", path: "/blog" });

  const title = blog.meta_title || blog.title;
  const description =
    blog.meta_description ||
    blog.description ||
    "Insights from Fynk Tech on AI automation and e-commerce. Read the full article.";

  return buildPageMetadata({
    title: title.slice(0, 50),
    description,
    path: `/blog/${blog.slug}`,
    ogType: "article",
    image: blog.image || undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  const blog = result.ok ? result.data : null;
  if (!blog) notFound();

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: blog.title, path: `/blog/${blog.slug}` },
        ])}
      />
      <article className="container-page max-w-3xl py-14 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-subtle hover:text-heading transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mt-8 mb-10">
          <time className="text-sm text-subtle" dateTime={blog.created_at}>
            {dateFormat.format(new Date(blog.created_at))}
          </time>
          <h1
            className="mt-3 text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: "var(--heading)" }}
          >
            {blog.title}
          </h1>
          {blog.description && (
            <p className="mt-5 text-lg leading-relaxed text-body">{blog.description}</p>
          )}
        </header>

        {blog.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.image}
            alt={blog.title}
            className="mb-10 w-full rounded-2xl object-cover"
          />
        )}

        {blog.content && (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content) }}
          />
        )}
      </article>
    </main>
  );
}
