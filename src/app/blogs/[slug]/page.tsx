import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogStoryArticle } from "@/components/features/blog/blog-story-article";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogBySlug, listBlogs } from "@/lib/blogs/store";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  const blog = result.ok ? result.data : null;
  if (!blog) return buildPageMetadata({ title: "Blogs", description: "Post not found.", path: "/blogs" });

  const title = blog.meta_title || blog.title;
  const description =
    blog.meta_description ||
    blog.story.tldr ||
    blog.description ||
    "Insights from FynkTech on AI automation and e-commerce. Read the full article.";

  return buildPageMetadata({
    title: title.slice(0, 50),
    description,
    path: `/blogs/${blog.slug}`,
    ogType: "article",
    image: blog.image || undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [result, listResult] = await Promise.all([getBlogBySlug(slug), listBlogs()]);
  const blog = result.ok ? result.data : null;
  if (!blog) notFound();

  const related = listResult.ok
    ? listResult.data.filter((b) => b.slug !== blog.slug).slice(0, 3)
    : [];

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
          { name: blog.title, path: `/blogs/${blog.slug}` },
        ])}
      />
      <BlogStoryArticle blog={blog} related={related} />
    </main>
  );
}
