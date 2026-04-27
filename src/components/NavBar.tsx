'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavBar() {
  const pathname = usePathname()
  const isStatePage = pathname?.startsWith('/states/')

  return (
    <nav className="w-full bg-[#1a2744] px-6 flex items-center justify-between" style={{ height: 56 }}>
      <Link href="/" className="flex items-center gap-2 text-white font-bold text-base">
        <span>🛡️</span>
        <span>
          Final <span className="text-[#14b8a6]">Expense</span> Calc
        </span>
      </Link>
      {isStatePage && (
        <Link
          href="/"
          className="text-white text-sm hover:text-[#14b8a6] transition-colors"
        >
          ← All States
        </Link>
      )}
    </nav>
  )
}
