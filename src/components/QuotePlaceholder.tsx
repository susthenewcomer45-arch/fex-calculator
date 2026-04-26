interface QuotePlaceholderProps {
  state?: string
}

export default function QuotePlaceholder({ state }: QuotePlaceholderProps) {
  return (
    <div className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 text-center my-8">
      <div className="text-5xl mb-3">🧮</div>
      <p className="text-blue-800 font-bold text-xl mb-2">
        {state ? `${state} Final Expense Quote Calculator` : 'Final Expense Quote Calculator'}
      </p>
      <p className="text-blue-600 text-sm max-w-md mx-auto">
        {/* QUOTE_TOOL_PLACEHOLDER — Replace this component with the live interactive quote calculator */}
        Get your instant quote in 60 seconds — no phone calls, no agents, no medical exam required.
        {state ? ` Showing rates for ${state} residents.` : ' Available for all 50 states.'}
      </p>
      <div className="mt-6 inline-block bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg opacity-60 cursor-not-allowed select-none">
        Calculate My Rate — Coming Soon
      </div>
    </div>
  )
}
