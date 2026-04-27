'use client'

import Link from 'next/link'
import type { State } from '@/lib/states'

interface StateGridProps {
  states: State[]
}

export default function StateGrid({ states }: StateGridProps) {
  if (states.length === 0) {
    return (
      <p className="col-span-full text-center text-[#64748b] py-10 text-sm">
        No states match your search.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {states.map((state) => (
        <Link
          key={state.slug}
          href={`/states/${state.slug}`}
          className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1 hover:shadow-md hover:border-teal-400 border border-transparent transition-all"
        >
          <span className="text-2xl font-bold text-[#1a2744] leading-none">{state.abbr}</span>
          <span className="text-[0.875rem] text-[#64748b]">{state.name}</span>
          <span className="text-[0.75rem] text-[#64748b]">
            Avg. funeral: ${state.averageFuneralCost.toLocaleString()}
          </span>
          <span className="mt-2 w-full bg-[#0d9488] text-white text-sm rounded-full py-2 text-center font-medium">
            Calculate Local Rates
          </span>
        </Link>
      ))}
    </div>
  )
}
