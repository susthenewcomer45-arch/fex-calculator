import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog-posts'
import { generateWebPageSchema } from '@/lib/schema'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | NocallQuoteNow`,
    description: post.description,
    alternates: { canonical: `https://nocallquotenow.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nocallquotenow.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const pageSchema = generateWebPageSchema(
    post.title,
    post.description,
    `https://nocallquotenow.com/blog/${post.slug}`
  )

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-[#14b8a6] transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>
          <h1 className="font-bold text-white leading-tight mb-4 text-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-[#1a2744] mb-3">{section.heading}</h2>
              )}
              {section.paragraphs?.map((para, j) => (
                <p key={j} className="text-[#1e293b] leading-relaxed text-sm mb-3">
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc list-inside space-y-2 text-sm text-[#1e293b] leading-relaxed ml-2 mb-3">
                  {section.bullets.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-[#f0fdfa] border border-teal-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-[#1a2744] text-lg mb-2">
            Get a Free Estimate — No Phone Number Required
          </p>
          <p className="text-[#64748b] text-sm mb-4">
            Select your state to see a personalized premium estimate. Zero sign-up, zero sales calls.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#0d9488] hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            View State Estimates →
          </Link>
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/blog" className="text-[#0d9488] hover:underline font-medium">
            ← Back to Blog
          </Link>
          <Link href="/" className="text-[#0d9488] hover:underline font-medium">
            Home
          </Link>
        </div>
      </article>
    </>
  )
}
