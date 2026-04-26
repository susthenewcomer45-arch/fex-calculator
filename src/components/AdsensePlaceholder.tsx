interface AdsensePlaceholderProps {
  label: string
}

export default function AdsensePlaceholder({ label }: AdsensePlaceholderProps) {
  return (
    <div
      className="w-full rounded border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center my-6"
      style={{ minHeight: 100 }}
      aria-label="Advertisement placeholder"
    >
      {/* ADSENSE_PLACEHOLDER — Replace with live Google AdSense <ins> tag when approved */}
      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold select-none">
        {label}
      </p>
    </div>
  )
}
