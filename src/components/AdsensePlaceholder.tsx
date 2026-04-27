'use client'

import { useEffect } from 'react'

interface AdsensePlaceholderProps {
  label?: string
}

export default function AdsensePlaceholder({ label }: AdsensePlaceholderProps) {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).adsbygoogle.push({})
    } catch {}
  }, [])

  // ADSENSE_PLACEHOLDER - Replace inner <ins> with actual AdSense unit when approved
  return (
    <div
      className="w-full my-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center"
      style={{ minHeight: 120 }}
      aria-label={label ?? 'Advertisement'}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4437016471828719"
        data-ad-slot="4024000945"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
