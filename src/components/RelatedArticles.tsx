import Link from 'next/link'
import { blogPosts } from '@/lib/blog-posts'
import generatedPostsRaw from '@/lib/generated-posts.json'

interface Post {
  slug: string
  title: string
  description: string
}

const generatedPosts = generatedPostsRaw as { slug: string; title: string; description: string }[]

const allPosts: Post[] = [
  ...generatedPosts.map((p) => ({ slug: p.slug, title: p.title, description: p.description })),
  ...blogPosts.map((p) => ({ slug: p.slug, title: p.title, description: p.description })),
]

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const pool = allPosts.filter((p) => p.slug !== currentSlug)

  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const related = shuffled.slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-extrabold text-[#1a2744] mb-5">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
          >
            <span
              className="block w-8 h-1 rounded-full mb-3"
              style={{ backgroundColor: '#0d9488' }}
            />
            <p className="text-sm font-bold text-[#1a2744] leading-snug mb-2">{post.title}</p>
            <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3 mt-auto">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
