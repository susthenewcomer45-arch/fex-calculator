'use client'

import { useState } from 'react'

// GHL webhook — exact URL from original lead form
const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Dvf2rqHONiSKny28dnXH/webhook-trigger/eo3vRXdsJRmdZzat8ANR'

const COVERAGE_STEPS = [5000, 10000, 15000, 20000, 25000, 35000]

const INTEREST_OPTIONS = [
  'Mortgage Protection',
  'Indexed Universal Life (IUL)',
  'Term Life',
  "Children's Whole Life",
  'None',
]

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

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    otherInterests: [] as string[],
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const ageNum = parseInt(age, 10)
  const ageValid = !isNaN(ageNum) && ageNum >= 40 && ageNum <= 85

  function calculate() {
    if (!gender || !health || !ageValid) return
    const rate = getRatePerThousand(gender, health, ageNum)
    setResult(Math.round((coverage / 1000) * rate * 100) / 100)
  }

  function toggleInterest(opt: string) {
    setForm((f) => ({
      ...f,
      otherInterests: f.otherInterests.includes(opt)
        ? f.otherInterests.filter((i) => i !== opt)
        : [...f.otherInterests, opt],
    }))
  }

  function validateForm() {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid 10-digit number'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateForm()
    if (Object.keys(errs).length) { setFormErrors(errs); return }
    setFormErrors({})
    setSubmitting(true)
    try {
      await fetch(GHL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          state: stateName,
          desiredCoverage: coverage,
          otherInterests: form.otherInterests.join(', ') || 'None',
        }),
      })
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setModalOpen(false), 3000)
  }

  const sliderIndex = COVERAGE_STEPS.indexOf(coverage)
  const canCalculate = gender !== null && health !== null && ageValid

  const inputCls = (field: string) =>
    `w-full border rounded-xl px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] transition-colors ${
      formErrors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`

  return (
    <>
      {/* Calculator card */}
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

        {/* H. Get Approved Rate button */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full bg-[#16a34a] hover:bg-green-700 text-white font-bold py-3 rounded-full text-sm transition-colors cursor-pointer"
        >
          Get the Approved Rate →
        </button>
      </div>

      {/* Lead capture modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto mt-10 mb-10 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-[#1a2744] text-xl">Request Your Exact Approval</p>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer px-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold text-[#1a2744] text-lg mb-2">Thank you!</p>
                <p className="text-[#64748b] text-sm">
                  An agent will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1e293b] mb-1">First Name</label>
                    <input
                      type="text" autoComplete="given-name" placeholder="Jane"
                      value={form.firstName}
                      onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                      className={inputCls('firstName')}
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-0.5">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1e293b] mb-1">Last Name</label>
                    <input
                      type="text" autoComplete="family-name" placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                      className={inputCls('lastName')}
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-0.5">{formErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e293b] mb-1">Email Address</label>
                  <input
                    type="email" autoComplete="email" inputMode="email" placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls('email')}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-0.5">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e293b] mb-1">Phone Number</label>
                  <input
                    type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
                    className={inputCls('phone')}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-0.5">{formErrors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1e293b] mb-1">Home State</label>
                    <input
                      type="text" value={stateName} readOnly
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3 py-3 text-sm text-[#64748b]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1e293b] mb-1">Desired Coverage</label>
                    <select
                      value={coverage}
                      onChange={(e) => setCoverage(parseInt(e.target.value, 10))}
                      className="w-full border border-gray-200 bg-white rounded-xl px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] cursor-pointer"
                    >
                      {COVERAGE_STEPS.map((v) => (
                        <option key={v} value={v}>${(v / 1000).toFixed(0)}K</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e293b] mb-2">
                    Any other life insurance interests?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors select-none ${
                          form.otherInterests.includes(opt)
                            ? 'border-[#0d9488] bg-teal-50 text-[#0d9488] font-medium'
                            : 'border-gray-200 bg-gray-50 text-[#64748b]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.otherInterests.includes(opt)}
                          onChange={() => toggleInterest(opt)}
                          className="accent-[#0d9488] w-3.5 h-3.5 flex-shrink-0"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0d9488] hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition-colors cursor-pointer"
                >
                  {submitting ? 'Submitting…' : 'Request Exact Approval'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
