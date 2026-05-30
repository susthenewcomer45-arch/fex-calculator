'use client'

import { useState } from 'react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-bold text-[#1a2744] text-base">{title}</span>
        <span className="text-blue-600 text-2xl font-light leading-none select-none ml-4">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 border-t border-gray-100 space-y-3 text-gray-700 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}
