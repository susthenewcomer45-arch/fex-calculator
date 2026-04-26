'use client'

import { useEffect } from 'react'

interface AdsensePlaceholderProps {
  label?: string
}

export default function AdsensePlaceholder({ label }: AdsensePlaceholderProps) {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({})
    } catch {}
  }, [])

  return (
    <div className="w-full my-6" style={{ minHeight: 100, background: '#f5f5f5' }} aria-label={label ?? 'Advertisement'}>
      {/* ADSENSE_UNIT — Google AdSense ins tag rendered below */}
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
