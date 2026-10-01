import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Globe, MapPin, MessageCircle, Mic, Wrench, Zap } from "lucide-react";
import type { Blog, BlogListItem } from "@/lib/blogs/store";
import {
  resolveStorySidebar,
  storyHasGoals,
  storyHasSolutions,
  storyHasStats,
} from "@/lib/blogs/story";
import { sanitizeBlogHtml } from "@/lib/blogs/validation";
import { whatsappLink } from "@/lib/content/site";
import "@/components/features/blog/blog-content.css";

type Props = {
  blog: Blog;
  related: BlogListItem[];
};

function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const host = new URL(src).hostname;
    return host.endsWith(".b-cdn.net") || host === "images.unsplash.com";
  } catch {
    return false;
  }
}

function channelIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("whatsapp") || key.includes("chat") || key.includes("message")) {
    return <MessageCircle className="h-4 w-4" aria-hidden />;
  }
  if (key.includes("voice") || key.includes("call")) {
    return <Mic className="h-4 w-4" aria-hidden />;
  }
  return <MessageCircle className="h-4 w-4" aria-hidden />;
}

function channelHref(label: string): string | null {
  const key = label.toLowerCase();
  if (key.includes("whatsapp")) return whatsappLink("Hi FynkTech — I saw your story and want to talk.") || null;
  if (key.includes("web") || key.includes("chat")) return "/contact";
  if (key.includes("voice") || key.includes("call")) return "/contact";
  return null;
}

/**
 * Customer-story layout:
 * dark hero → left scrolling body (stats / TL;DR / goals / solutions / article)
 * + sticky right sidebar (website / location / industry / channels).
 */
export function BlogStoryArticle({ blog, related }: Props) {
  const story = blog.story;
  const category = blog.description?.trim() || story.industry || null;
  const goals = story.goals.filter(Boolean);
  const solutions = story.solutions.filter(Boolean);
  const stats = story.stats.filter((s) => s.value);
  const sidebar = resolveStorySidebar(story, category);
  const websiteHref = sidebar.website.startsWith("http")
    ? sidebar.website
    : `https://${sidebar.website}`;

  return (
    <article className="min-h-screen bg-white">
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
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 md:px-6 md:pb-16 md:pt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Customer stories
          </Link>

          <div
            className={`mt-8 grid items-center gap-8 lg:mt-10 lg:gap-12 ${
              blog.image ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""
            }`}
          >
            <div className="min-w-0">
              {category ? (
                <p className="text-sm font-semibold tracking-wide text-[#96BDFF]">{category}</p>
              ) : null}

              <h1 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight md:text-[2.65rem] md:leading-[1.12]">
                {blog.title}
              </h1>

              {story.quote_author ? (
                <p className="mt-5 text-sm text-white/65 md:text-base">{story.quote_author}</p>
              ) : null}
            </div>

            {blog.image ? (
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Image
                  src={blog.image}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized={!canOptimizeImage(blog.image)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        {/* Two columns: left scrolls with page, right sticky */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="min-w-0">
            {storyHasStats(story) ? (
              <div className="mb-10 grid grid-cols-1 divide-y divide-[#D9E2FF] border-y border-[#D9E2FF] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {stats.map((stat) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className="px-1 py-6 sm:px-5 sm:py-7 sm:first:pl-0 sm:last:pr-0"
                  >
                    <p className="text-4xl font-bold tracking-tight text-[#5A83FF] md:text-[2.75rem]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-subtle">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {story.tldr ? (
              <section className="mb-10 rounded-2xl bg-[#EEF3FF] px-6 py-6 md:px-8 md:py-7">
                <h2 className="text-base font-bold text-heading">TL;DR</h2>
                <p className="mt-3 text-base leading-relaxed text-body md:text-[1.0625rem]">{story.tldr}</p>
              </section>
            ) : null}

            {storyHasGoals(story) ? (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-heading">Goals</h2>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-body">
                  {goals.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {storyHasSolutions(story) ? (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-heading">Solutions</h2>
                <ul className="mt-4 list-disc space-y-2.5 pl-5 text-body">
                  {solutions.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {blog.content ? (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content) }}
              />
            ) : null}

            {story.quote ? (
              <blockquote className="mt-12 border-l-4 border-[#5A83FF] bg-[#F4F6FF] px-6 py-6 md:px-8">
                <p className="text-lg leading-relaxed text-heading md:text-xl">“{story.quote}”</p>
                {story.quote_author ? (
                  <footer className="mt-4 text-sm font-medium text-subtle">{story.quote_author}</footer>
                ) : null}
              </blockquote>
            ) : null}

            <div
              className="relative mt-12 overflow-hidden rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12"
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
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(90%,560px)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(90,131,255,0.25) 45%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="text-lg font-semibold md:text-xl">Want results like this for your team?</p>
                <p className="mt-2 text-sm text-white/70">Talk to FynkTech about AI agents and automation.</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex rounded-full bg-[#5A83FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#96BDFF] hover:text-[#070643]"
                >
                  Book a free consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Sticky sidebar — stays while left content scrolls */}
          <aside className="order-first lg:order-none lg:sticky lg:top-28 lg:z-10 lg:self-start">
            <div className="space-y-7">
              <p className="text-sm font-bold tracking-tight text-heading">FynkTech</p>

              <div className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#5A83FF]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-heading">Website</p>
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block truncate text-sm text-[#5A83FF] hover:underline"
                  >
                    {sidebar.website.replace(/^https?:\/\//, "").replace(/^www\./, "")}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-heading">Location</p>
                  <p className="mt-0.5 text-sm text-body">{sidebar.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#EAB308]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-heading">Industry</p>
                  <p className="mt-0.5 text-sm text-body">{sidebar.industry}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-heading">Channels</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sidebar.channels.map((ch) => {
                      const href = channelHref(ch);
                      const chip = (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-xs font-medium text-body">
                          <span className="text-[#5A83FF]">{channelIcon(ch)}</span>
                          {ch}
                        </span>
                      );
                      return href ? (
                        <Link key={ch} href={href} className="hover:opacity-80">
                          {chip}
                        </Link>
                      ) : (
                        <span key={ch}>{chip}</span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="text-xl font-bold text-heading">Related stories</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post) => (
                <li key={post.id}>
                  <Link href={`/blogs/${post.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-muted">
                      {(post.card_image || post.image) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.card_image || post.image!}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      )}
                    </div>
                    {post.description ? (
                      <p className="mt-3 text-xs font-semibold text-[#5A83FF]">{post.description}</p>
                    ) : null}
                    <p className="mt-1 line-clamp-3 text-sm font-medium leading-snug text-heading group-hover:text-[#5A83FF]">
                      {post.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
