import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import generatedPostsRaw from "@/lib/generated-posts.json";

interface GeneratedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}
const generatedPosts = generatedPostsRaw as GeneratedPost[];

export const metadata: Metadata = {
  title: "Final Expense Insurance Blog — Tips, Guides & Resources",
  description:
    "Read expert articles about final expense insurance, burial costs, and how to protect your family without a phone call or medical exam.",
  alternates: { canonical: "https://nocallquotenow.com/blog" },
};

const manualLive = blogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.description,
  date: p.date,
  readTime: p.readTime,
}));

const autoLive = generatedPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.description,
  date: p.date,
  readTime: p.readTime,
}));

// Most-recent first; generated posts go on top since they are newer
const liveArticles = [...autoLive, ...manualLive];

export default function BlogPage() {
  return (
    <>
      <section className="mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-3">
          Final Expense Insurance Blog
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Expert guides, cost breakdowns, and practical advice to help you make a confident
          decision about final expense coverage — with no sales pressure and no phone calls.
        </p>
      </section>

      {/* Live articles */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {liveArticles.map((article) => (
          <article
            key={article.slug}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="text-lg font-bold text-blue-900 mb-2 leading-snug">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
            <Link
              href={`/blog/${article.slug}`}
              className="inline-block text-sm font-semibold text-white bg-[#0d9488] hover:bg-teal-700 rounded-full px-4 py-1.5 transition-colors"
            >
              Read Article →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/" className="text-blue-700 hover:underline font-medium text-sm">
          ← Back to Home
        </Link>
      </div>
    </>
  );
}
