'use client'

import { useState } from 'react'
import StateGrid from './StateGrid'
import AdsensePlaceholder from './AdsensePlaceholder'
import type { State } from '@/lib/states'

interface HomeHeroProps {
  states: State[]
}

export default function HomeHero({ states }: HomeHeroProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? states.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.abbr.toLowerCase() === query.trim().toLowerCase()
      )
    : states

  return (
    <>
      {/* Navy hero */}
      <section className="bg-[#1a2744] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-bold text-white leading-tight mb-4" style={{ fontSize: '3rem' }}>
            Final Expense Insurance
            <br />
            <span className="text-[#14b8a6]">by State</span>
          </h1>
          <p className="text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
            Select your state for localized premium estimates. Instant results — no sign-up, no
            personal info required.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { bold: '50', small: 'States Covered' },
              { bold: '$5K–$35K', small: 'Coverage Range' },
              { bold: 'Free', small: 'No Sign-Up' },
            ].map(({ bold, small }) => (
              <div
                key={bold}
                className="flex flex-col items-center px-4 py-2 rounded-full border border-white/20 bg-white/10"
              >
                <span className="text-white font-bold text-sm">{bold}</span>
                <span className="text-white/70 text-xs">{small}</span>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search states... (e.g. Texas, CA)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white rounded-full pl-10 pr-5 py-3 text-sm text-[#1e293b] outline-none focus:ring-2 focus:ring-[#14b8a6] shadow-sm"
              aria-label="Search states"
            />
          </div>
        </div>
      </section>

      {/* ADSENSE_UNIT_1_START - Above state grid */}
      <div className="max-w-5xl mx-auto px-4">
        <AdsensePlaceholder label="Homepage Ad — Above State Grid" />
      </div>
      {/* ADSENSE_UNIT_1_END */}

      {/* State grid section */}
      <section className="bg-[#f1f5f9] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#0d9488] text-xs font-semibold uppercase tracking-widest mb-5">
            50 States — Click to Open Calculator
          </p>
          <StateGrid states={filtered} />
        </div>
      </section>
    </>
  )
}
