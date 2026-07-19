'use client'

import { useState } from 'react'

const COVERAGE_STEPS = [5000, 10000, 15000, 20000, 25000, 35000]

type Gender = 'female' | 'male'
type Health = 'preferred' | 'standard' | 'high-risk'

function getRatePerThousand(gender: Gender, health: Health, age: number): number {
  const key = `${gender}-${health}` as const
  const table: Record<string, number> = {
    'female-preferred':  age < 60 ? 1.8 : age < 70 ? 2.4 : age < 80 ? 3.2 : 4.5,
    'female-standard':   age < 60 ? 2.1 : age < 70 ? 2.9 : age < 80 ? 3.9 : 5.5,
    'female-high-risk':  age < 60 ? 2.8 : age < 70 ? 3.8 : age < 80 ? 5.1 : 7.2,
    'male-preferred':    age < 60 ? 2.1 : age < 70 ? 2.8 : age < 80 ? 3.8 : 5.2,
    'male-standard':     age < 60 ? 2.5 : age < 70 ? 3.4 : age < 80 ? 4.6 : 6.5,
    'male-high-risk':    age < 60 ? 3.3 : age < 70 ? 4.5 : age < 80 ? 6.0 : 8.5,
  }
  return table[key] ?? 2.9
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface CalculatorProps {
  stateName: string
}

export default function Calculator({ stateName }: CalculatorProps) {
  // Calculator state
  const [gender, setGender] = useState<Gender | null>(null)
  const [age, setAge] = useState('')
  const [coverage, setCoverage] = useState(15000)
  const [health, setHealth] = useState<Health | null>(null)
  const [result, setResult] = useState<number | null>(null)

  // "Get My Exact Quote" form state
  const [quoteForm, setQuoteForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [quoteErrors, setQuoteErrors] = useState<Record<string, string>>({})
  const [quoteSubmitting, setQuoteSubmitting] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  // "Get Future Industry Tips" form state
  const [tipsEmail, setTipsEmail] = useState('')
  const [tipsError, setTipsError] = useState('')
  const [tipsSubmitting, setTipsSubmitting] = useState(false)
  const [tipsSubmitted, setTipsSubmitted] = useState(false)

  const ageNum = parseInt(age, 10)
  const ageValid = !isNaN(ageNum) && ageNum >= 40 && ageNum <= 85

  function calculate() {
    if (!gender || !health || !ageValid) return
    const rate = getRatePerThousand(gender, health, ageNum)
    setResult(Math.round((coverage / 1000) * rate * 100) / 100)
  }

  function validateQuoteForm() {
    const errs: Record<string, string> = {}
    if (!quoteForm.firstName.trim()) errs.firstName = 'Required'
    if (!quoteForm.lastName.trim()) errs.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteForm.email)) errs.email = 'Enter a valid email'
    if (quoteForm.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid 10-digit number'
    return errs
  }

  async function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateQuoteForm()
    if (Object.keys(errs).length) { setQuoteErrors(errs); return }
    setQuoteErrors({})
    setQuoteSubmitting(true)
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: quoteForm.firstName,
          lastName: quoteForm.lastName,
          email: quoteForm.email,
          phone: quoteForm.phone,
          state: stateName,
          coverage,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setQuoteSubmitted(true)
    } catch {
      setQuoteErrors({ form: 'Something went wrong. Please try again.' })
    }
    setQuoteSubmitting(false)
  }

  async function handleTipsSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tipsEmail)) {
      setTipsError('Enter a valid email')
      return
    }
    setTipsError('')
    setTipsSubmitting(true)
    try {
      const res = await fetch('/api/tips-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: tipsEmail }),
      })
      if (!res.ok) throw new Error('Request failed')
      setTipsSubmitted(true)
    } catch {
      setTipsError('Something went wrong. Please try again.')
    }
    setTipsSubmitting(false)
  }

  const sliderIndex = COVERAGE_STEPS.indexOf(coverage)
  const canCalculate = gender !== null && health !== null && ageValid

  const quoteInputCls = (field: string) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] transition-colors ${
      quoteErrors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`

  return (
      <div className="bg-white rounded-2xl shadow-md max-w-lg mx-auto p-8 my-8">
        <h2 className="text-xl font-bold text-[#1a2744] mb-1">Free Estimate — {stateName}</h2>
        <p className="text-[#64748b] text-sm mb-6">
          Instant results based on {stateName} market data. No sign-up required.
        </p>

        {/* A. Gender */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1e293b] mb-2">Gender</label>
          <div className="flex gap-3">
            {(['female', 'male'] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => { setGender(g); setResult(null) }}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                  gender === g
                    ? 'bg-[#0d9488] border-[#0d9488] text-white'
                    : 'bg-white border-gray-200 text-[#64748b] hover:border-[#0d9488]'
                }`}
              >
                {g === 'female' ? '♀ Female' : '♂ Male'}
              </button>
            ))}
          </div>
        </div>

        {/* B. Age */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1e293b] mb-2" htmlFor="calc-age">
            Your Age <span className="font-normal text-[#64748b]">(40–85)</span>
          </label>
          <input
            id="calc-age"
            type="number"
            inputMode="numeric"
            min={40}
            max={85}
            placeholder="e.g. 62"
            value={age}
            onChange={(e) => { setAge(e.target.value); setResult(null) }}
            className={`w-full border rounded-xl px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] transition-colors ${
              age && !ageValid ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
            }`}
          />
          {age && !ageValid && (
            <p className="text-red-500 text-xs mt-1">Please enter an age between 40 and 85.</p>
          )}
        </div>

        {/* C. Coverage slider */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-[#1e293b]">Coverage Amount</label>
            <span className="text-[#14b8a6] font-bold text-sm">
              ${(coverage / 1000).toFixed(0)}K
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={COVERAGE_STEPS.length - 1}
            step={1}
            value={sliderIndex === -1 ? 2 : sliderIndex}
            onChange={(e) => { setCoverage(COVERAGE_STEPS[parseInt(e.target.value, 10)]); setResult(null) }}
            className="w-full cursor-pointer accent-[#0d9488]"
          />
          <div className="flex justify-between gap-1 mt-3">
            {COVERAGE_STEPS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => { setCoverage(v); setResult(null) }}
                className={`flex-1 text-xs py-1.5 rounded-full border font-medium transition-colors cursor-pointer ${
                  coverage === v
                    ? 'bg-[#0d9488] border-[#0d9488] text-white'
                    : 'bg-white border-gray-200 text-[#64748b] hover:border-[#0d9488]'
                }`}
              >
                ${(v / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* D. Health Status */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1e293b] mb-2">Health Status</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { key: 'preferred' as Health, label: '💪 Preferred' },
              { key: 'standard' as Health, label: '😊 Standard' },
              { key: 'high-risk' as Health, label: '🛡️ High Risk' },
            ]).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setHealth(key); setResult(null) }}
                className={`border rounded-xl py-3 text-xs font-semibold transition-colors cursor-pointer text-center ${
                  health === key
                    ? 'bg-teal-50 border-2 border-[#0d9488] text-[#0d9488]'
                    : 'bg-white border-gray-200 text-[#64748b] hover:border-[#0d9488]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* E. Calculate button */}
        <button
          type="button"
          onClick={calculate}
          disabled={!canCalculate}
          className="w-full bg-[#1a2744] disabled:opacity-40 text-white font-bold py-3 rounded-full text-sm transition-opacity cursor-pointer mb-4"
        >
          Calculate My Premium
        </button>

        {/* F+G. Result */}
        {result !== null && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center mb-4 animate-pulse-once">
            <p className="text-sm text-[#0d9488] font-medium mb-1">Estimated Monthly Premium</p>
            <p className="text-4xl font-extrabold text-[#1a2744]">
              ${result.toFixed(2)}
              <span className="text-lg font-semibold text-[#0d9488]"> / month</span>
            </p>
            <p className="text-xs text-[#64748b] mt-2">
              for ${coverage.toLocaleString()} in coverage
            </p>
            <p className="text-xs text-[#64748b] mt-1">
              Illustrative estimate. Actual rates vary by carrier.
            </p>
          </div>
        )}

        {/* Section A: Get My Exact Quote (optional) */}
        {result !== null && (
          <div className="border-t border-gray-100 pt-6 mt-2">
            <p className="font-bold text-[#1a2744] text-sm mb-1">Get My Exact Quote</p>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Optional — get your exact approved rate. We&apos;ll only use this to follow up about
              final expense coverage, never sold to third parties.
            </p>
            {quoteSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-sm text-green-800 font-medium">
                ✅ Thanks! We&apos;ll follow up about your exact rate shortly.
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} noValidate className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text" autoComplete="given-name" placeholder="First Name"
                      value={quoteForm.firstName}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, firstName: e.target.value }))}
                      className={quoteInputCls('firstName')}
                    />
                    {quoteErrors.firstName && <p className="text-red-500 text-xs mt-0.5">{quoteErrors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text" autoComplete="family-name" placeholder="Last Name"
                      value={quoteForm.lastName}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, lastName: e.target.value }))}
                      className={quoteInputCls('lastName')}
                    />
                    {quoteErrors.lastName && <p className="text-red-500 text-xs mt-0.5">{quoteErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="email" autoComplete="email" inputMode="email" placeholder="Email Address"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                    className={quoteInputCls('email')}
                  />
                  {quoteErrors.email && <p className="text-red-500 text-xs mt-0.5">{quoteErrors.email}</p>}
                </div>

                <div>
                  <input
                    type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
                    className={quoteInputCls('phone')}
                  />
                  {quoteErrors.phone && <p className="text-red-500 text-xs mt-0.5">{quoteErrors.phone}</p>}
                </div>

                {quoteErrors.form && <p className="text-red-500 text-xs">{quoteErrors.form}</p>}

                <button
                  type="submit"
                  disabled={quoteSubmitting}
                  className="w-full bg-[#0d9488] hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-full text-sm transition-colors cursor-pointer"
                >
                  {quoteSubmitting ? 'Submitting…' : 'Get My Exact Quote'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Section B: Get Future Industry Tips (optional) */}
        {result !== null && (
          <div className="border-t border-gray-100 pt-6 mt-6">
            <p className="font-bold text-[#1a2744] text-sm mb-1">Get Future Industry Tips</p>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Optional — occasional updates on final expense and life insurance changes. No spam,
              unsubscribe anytime.
            </p>
            {tipsSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-sm text-green-800 font-medium">
                ✅ You&apos;re subscribed for occasional updates.
              </div>
            ) : (
              <form onSubmit={handleTipsSubmit} noValidate className="flex items-start gap-2">
                <div className="flex-1">
                  <input
                    type="email" autoComplete="email" inputMode="email" placeholder="Email Address"
                    value={tipsEmail}
                    onChange={(e) => setTipsEmail(e.target.value)}
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] transition-colors ${
                      tipsError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                    }`}
                  />
                  {tipsError && <p className="text-red-500 text-xs mt-0.5">{tipsError}</p>}
                </div>
                <button
                  type="submit"
                  disabled={tipsSubmitting}
                  className="bg-[#1a2744] disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors cursor-pointer"
                >
                  {tipsSubmitting ? '…' : 'Sign Up'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
  )
}
