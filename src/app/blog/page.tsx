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

const articles = [
  {
    slug: "what-is-final-expense-insurance",
    title: "What Is Final Expense Insurance? A Complete Guide for Seniors",
    excerpt:
      "Final expense insurance is a type of whole life policy designed to cover funeral, burial, and end-of-life costs. Learn how it works, who qualifies, and how much it costs.",
    date: "2024-11-01",
    readTime: "8 min read",
  },
  {
    slug: "funeral-costs-by-state-2024",
    title: "How Much Does a Funeral Cost in 2024? State-by-State Breakdown",
    excerpt:
      "Funeral costs vary dramatically across the US — from under $7,500 in Mississippi to over $12,000 in Hawaii. Here is what families in every state can expect to pay.",
    date: "2024-10-20",
    readTime: "10 min read",
  },
  {
    slug: "final-expense-vs-whole-life-insurance",
    title: "Final Expense vs. Whole Life Insurance: What's the Difference?",
    excerpt:
      "Both are permanent life insurance, but final expense policies are smaller, easier to qualify for, and specifically designed for seniors. Here is how to choose.",
    date: "2024-10-10",
    readTime: "7 min read",
  },
  {
    slug: "no-medical-exam-life-insurance",
    title: "No Medical Exam Life Insurance: How It Works and Who Qualifies",
    excerpt:
      "Simplified-issue and guaranteed-issue policies offer coverage without a physical exam. Learn the difference, the pros and cons, and how to find the best option.",
    date: "2024-09-28",
    readTime: "6 min read",
  },
  {
    slug: "how-to-choose-coverage-amount",
    title: "How to Choose the Right Final Expense Coverage Amount",
    excerpt:
      "Picking the right death benefit is about balancing what your family will need against what you can comfortably afford each month. Here is a simple framework.",
    date: "2024-09-15",
    readTime: "5 min read",
  },
  {
    slug: "no-phone-call-insurance-quotes",
    title: "Top 5 Reasons Seniors Are Choosing No-Phone-Call Insurance Quotes",
    excerpt:
      "Robocalls and pushy agents are driving seniors away from traditional insurance shopping. Here is why the no-call model is growing fast — and why it works.",
    date: "2024-09-01",
    readTime: "5 min read",
  },
  {
    slug: "burial-insurance-pre-existing-conditions",
    title: "Burial Insurance for People with Pre-Existing Conditions",
    excerpt:
      "Diabetes, COPD, heart disease — many seniors assume they cannot qualify for life insurance. The truth is, final expense policies are designed for exactly these situations.",
    date: "2024-08-20",
    readTime: "7 min read",
  },
  {
    slug: "what-happens-to-debt-when-you-die",
    title: "What Happens to Debt When You Die? Why Final Expense Insurance Matters",
    excerpt:
      "Medical bills, credit cards, and mortgages do not simply disappear after death. Learn which debts become your family's responsibility and how insurance protects them.",
    date: "2024-08-05",
    readTime: "8 min read",
  },
  {
    slug: "save-money-on-final-expense-premiums",
    title: "How to Save Money on Final Expense Insurance Premiums",
    excerpt:
      "Locking in coverage at a younger age, choosing the right health classification, and comparing carriers can significantly reduce what you pay each month. Here is how.",
    date: "2024-07-22",
    readTime: "6 min read",
  },
  {
    slug: "final-expense-insurance-faq",
    title: "Final Expense Insurance FAQs: Everything You Need to Know",
    excerpt:
      "Your most common questions about burial insurance answered in plain English — no jargon, no sales pitch. Coverage amounts, premiums, waiting periods, and more.",
    date: "2024-07-10",
    readTime: "9 min read",
  },
];

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

      {/* Upcoming articles */}
      <h2 className="text-xl font-bold text-blue-900 mb-4">More Articles Coming Soon</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article) => (
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
            <span className="inline-block text-sm font-semibold text-blue-700 border border-blue-200 rounded-full px-3 py-1 bg-blue-50">
              Coming Soon
            </span>
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
