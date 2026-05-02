#!/usr/bin/env node
'use strict'

require('dotenv').config({ path: '.env.local' })

const { google } = require('googleapis')
const Anthropic = require('@anthropic-ai/sdk')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const CREDENTIALS_FILE = 'aiaura-810e8-06dbbed3d67a.json'
const GENERATED_POSTS_PATH = path.join('src', 'lib', 'generated-posts.json')

// ---------------------------------------------------------------------------
// Google Sheets helpers
// ---------------------------------------------------------------------------

function getCredentials() {
  // In CI: full JSON is stored as a secret env var
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  }
  // Locally: read from the key file in the project root
  if (fs.existsSync(CREDENTIALS_FILE)) {
    return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8'))
  }
  throw new Error(
    'No Google credentials found. Set GOOGLE_SERVICE_ACCOUNT_JSON env var ' +
    `or place the key file at ${CREDENTIALS_FILE}.`
  )
}

async function getSheets() {
  const credentials = getCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

// Returns { title, row } for the first row where Column A has a title and
// Column B is empty, or null if nothing is unpublished.
async function getNextUnpublishedRow(sheets) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:B',
  })
  const rows = res.data.values || []
  for (let i = 0; i < rows.length; i++) {
    const title = (rows[i] && rows[i][0] ? rows[i][0] : '').trim()
    const status = (rows[i] && rows[i][1] ? rows[i][1] : '').trim()
    if (title && !status) {
      return { title, row: i + 1 } // Sheet rows are 1-indexed
    }
  }
  return null
}

async function markPublished(sheets, row) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `Sheet1!B${row}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['Published']] },
  })
}

// ---------------------------------------------------------------------------
// Claude content generation
// ---------------------------------------------------------------------------

async function generatePost(title) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const prompt = `Write an 800-word SEO blog post for nocallquotenow.com about final expense insurance.

Title: "${title}"

Site context: nocallquotenow.com helps seniors (age 50-85) get burial insurance premium estimates without spam calls or giving up personal contact information. Tone: educational, honest, empowering — not fear-based. Audience: seniors and their adult children.

Return ONLY valid JSON — no markdown fences, no commentary — in this exact structure:
{
  "description": "SEO meta description, under 155 characters",
  "readTime": "8 min read",
  "sections": [
    {
      "paragraphs": ["intro paragraph 1", "intro paragraph 2"]
    },
    {
      "heading": "Section Heading",
      "paragraphs": ["paragraph 1", "paragraph 2"]
    }
  ]
}

Rules:
- First section must have NO heading field (intro only)
- 5-6 sections total
- ~800 words across all paragraph strings
- Each paragraph is plain text (no HTML, no markdown)
- Mention nocallquotenow.com naturally in the conclusion section
- Final expense insurance is age-rated: older applicants pay higher premiums`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].text.trim()
  // Strip markdown code fences if the model added them
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()

  let parsed
  try {
    parsed = JSON.parse(cleaned)
  } catch (err) {
    throw new Error(`Claude returned invalid JSON:\n${cleaned}\n\nParse error: ${err.message}`)
  }
  return parsed
}

// ---------------------------------------------------------------------------
// TSX file generation
// ---------------------------------------------------------------------------

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

// Escape characters that would break a JS single-quoted string literal
function escJS(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
}

function generateTSX(slug, title, date, post) {
  const t = escJS(title)
  const d = escJS(post.description)
  const r = escJS(post.readTime)
  // JSON.stringify produces valid TS array literal; backticks inside JSON
  // strings are safe because they sit inside double-quoted string values.
  const sectionsLiteral = JSON.stringify(post.sections, null, 2)

  return `// Auto-generated ${date} — do not edit manually
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '${t} | NocallQuoteNow',
  description: '${d}',
  alternates: { canonical: 'https://nocallquotenow.com/blog/${slug}' },
  openGraph: {
    title: '${t} | NocallQuoteNow',
    description: '${d}',
    url: 'https://nocallquotenow.com/blog/${slug}',
  },
}

interface Section {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

const sections: Section[] = ${sectionsLiteral}

const postDate = '${date}'
const readTime = '${r}'

export default function BlogPost() {
  const formattedDate = new Date(postDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <section className="bg-[#1a2744] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-[#14b8a6] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-[#14b8a6] transition-colors">Blog</Link>
          </nav>
          <h1 className="font-bold text-white leading-tight mb-4 text-3xl">
            ${t}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <time dateTime={postDate}>{formattedDate}</time>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </section>

      <article className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-[#1a2744] mb-3">{section.heading}</h2>
              )}
              {section.paragraphs?.map((para, j) => (
                <p key={j} className="text-[#1e293b] leading-relaxed text-sm mb-3">{para}</p>
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
`
}

// ---------------------------------------------------------------------------
// Manifest update (blog listing + sitemap read this)
// ---------------------------------------------------------------------------

function updateGeneratedPosts(slug, title, description, date, readTime) {
  let posts = []
  if (fs.existsSync(GENERATED_POSTS_PATH)) {
    try {
      posts = JSON.parse(fs.readFileSync(GENERATED_POSTS_PATH, 'utf8'))
    } catch {
      posts = []
    }
  }
  if (posts.find((p) => p.slug === slug)) {
    console.log(`  ↩ Slug "${slug}" already in manifest — skipping duplicate`)
    return
  }
  posts.unshift({ slug, title, description, date, readTime })
  fs.writeFileSync(GENERATED_POSTS_PATH, JSON.stringify(posts, null, 2) + '\n', 'utf8')
}

// ---------------------------------------------------------------------------
// Git push
// ---------------------------------------------------------------------------

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

function gitPush(slug, title) {
  run('git config user.email "actions@github.com"')
  run('git config user.name "GitHub Actions"')
  run(`git add "src/app/blog/${slug}/page.tsx" "${GENERATED_POSTS_PATH}"`)
  run(`git commit -m "Auto-publish: ${title.replace(/"/g, '\\"')}"`)
  run('git push')
  console.log('✅ Pushed to GitHub')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!SHEET_ID) throw new Error('GOOGLE_SHEET_ID is not set')
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set')

  console.log('📋 Connecting to Google Sheets…')
  const sheets = await getSheets()

  console.log('🔍 Looking for next unpublished title…')
  const next = await getNextUnpublishedRow(sheets)

  if (!next) {
    console.log('✅ No unpublished titles found. Nothing to publish today.')
    return
  }

  const { title, row } = next
  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]

  console.log(`📝 Title  : "${title}"`)
  console.log(`   Slug   : /blog/${slug}`)
  console.log(`   Date   : ${date}`)

  console.log('\n🤖 Calling Claude (claude-haiku-4-5) to write post…')
  const post = await generatePost(title)
  console.log(`   Sections : ${post.sections.length}`)
  console.log(`   Read time: ${post.readTime}`)

  console.log('\n💾 Writing src/app/blog/' + slug + '/page.tsx…')
  const postDir = path.join('src', 'app', 'blog', slug)
  fs.mkdirSync(postDir, { recursive: true })
  fs.writeFileSync(path.join(postDir, 'page.tsx'), generateTSX(slug, title, date, post), 'utf8')

  console.log('📊 Updating generated-posts.json…')
  updateGeneratedPosts(slug, title, post.description, date, post.readTime)

  console.log('✅ Marking row ' + row + ' as Published in Sheet…')
  await markPublished(sheets, row)

  console.log('🚀 Pushing to GitHub…')
  gitPush(slug, title)

  console.log(`\n🎉 Published: "${title}" → https://nocallquotenow.com/blog/${slug}`)
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
