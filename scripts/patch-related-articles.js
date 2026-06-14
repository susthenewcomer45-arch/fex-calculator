#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const blogDir = path.join(__dirname, '..', 'src', 'app', 'blog')
const entries = fs.readdirSync(blogDir, { withFileTypes: true })

let patched = 0
let skipped = 0

for (const entry of entries) {
  if (!entry.isDirectory()) continue
  if (entry.name === '[slug]') continue

  const slug = entry.name
  const filePath = path.join(blogDir, slug, 'page.tsx')

  if (!fs.existsSync(filePath)) {
    console.log(`⚠  No page.tsx found in: ${slug}`)
    continue
  }

  let content = fs.readFileSync(filePath, 'utf8')

  if (content.includes('RelatedArticles')) {
    console.log(`↩  Already patched: ${slug}`)
    skipped++
    continue
  }

  // Add import after "import Link from 'next/link'"
  content = content.replace(
    "import Link from 'next/link'",
    "import Link from 'next/link'\nimport RelatedArticles from '@/components/RelatedArticles'"
  )

  // Insert RelatedArticles before the last </article> closing tag
  const marker = '\n      </article>'
  const lastIdx = content.lastIndexOf(marker)
  if (lastIdx === -1) {
    console.log(`⚠  Could not find </article> in: ${slug}`)
    continue
  }

  content =
    content.slice(0, lastIdx) +
    `\n\n        <RelatedArticles currentSlug="${slug}" />` +
    content.slice(lastIdx)

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ Patched: ${slug}`)
  patched++
}

console.log(`\nDone. Patched: ${patched} | Already done: ${skipped}`)
