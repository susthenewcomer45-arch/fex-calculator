'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { State } from '@/lib/states'

interface StateGridProps {
  states: State[]
}

export default function StateGrid({ states }: StateGridProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? states.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : states

  return (
    <div>
      <p className="text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5 leading-relaxed">
        Each state has different burial costs and also have different life insurance rates, but we
        took that into consideration and that&apos;s why you have to choose your home state for an
        accurate quote.
      </p>

      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </span>
        <input
          type="search"
          placeholder="Search your state… (e.g. Texas, FL)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          aria-label="Search states"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((state) => (
          <Link
            key={state.slug}
            href={`/states/${state.slug}`}
            className="bg-white border border-gray-200 rounded-lg px-3 py-3 text-sm font-medium text-blue-800 hover:bg-blue-50 hover:border-blue-400 transition-colors text-center shadow-sm"
          >
            {state.name}
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-10 text-sm">
            No states match &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
