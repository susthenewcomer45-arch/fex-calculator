'use client'

import { useState } from 'react'

const COVERAGE_PRESETS = [5000, 10000, 15000, 20000, 25000, 35000]

const INTEREST_OPTIONS = [
  'Mortgage Protection',
  'Indexed Universal Life (IUL)',
  'Term Life',
  "Children's Whole Life",
  'None',
]

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

interface LeadFormProps {
  defaultState?: string
}

export default function LeadForm({ defaultState = '' }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    homeState: defaultState,
    desiredCoverage: 15000,
    otherInterests: [] as string[],
  })

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required.'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a valid 10-digit phone number.'
    return errs
  }

  function toggleInterest(opt: string) {
    setForm(f => ({
      ...f,
      otherInterests: f.otherInterests.includes(opt)
        ? f.otherInterests.filter(i => i !== opt)
        : [...f.otherInterests, opt],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      await fetch(
        'https://services.leadconnectorhq.com/hooks/Dvf2rqHONiSKny28dnXH/webhook-trigger/eo3vRXdsJRmdZzat8ANR',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName:       form.firstName,
            lastName:        form.lastName,
            email:           form.email,
            phone:           form.phone,
            state:           form.homeState,
            desiredCoverage: form.desiredCoverage,
            otherInterests:  form.otherInterests.join(', ') || 'None',
          }),
        }
      )
    } catch {}

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center my-8">
        <div className="text-4xl mb-3">✅</div>
        <p className="text-green-800 font-bold text-xl mb-2">You&apos;re all set!</p>
        <p className="text-green-700 text-sm max-w-md mx-auto">
          A licensed{form.homeState ? ` ${form.homeState}` : ' local'} insurance expert will
          reach out to you shortly to provide your exact rate and coverage options.
        </p>
      </div>
    )
  }

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
    }`

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 my-8">
      <h2 className="text-xl font-bold text-blue-900 mb-1">Get Your Exact Approval Rate →</h2>
      <p className="text-gray-500 text-sm mb-6">
        A licensed local insurance expert will reach out to you shortly to provide your exact rate
        and answer any questions you have.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-fname">
              First Name
            </label>
            <input
              id="lf-fname" type="text" autoComplete="given-name" placeholder="Jane"
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              className={inputClass('firstName')}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-lname">
              Last Name
            </label>
            <input
              id="lf-lname" type="text" autoComplete="family-name" placeholder="Doe"
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className={inputClass('lastName')}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-email">
            Email Address
          </label>
          <input
            id="lf-email" type="email" autoComplete="email" inputMode="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-phone">
            Phone Number
          </label>
          <input
            id="lf-phone" type="tel" autoComplete="tel" inputMode="tel"
            placeholder="(555) 555-5555"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))}
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-state">
              Home State
            </label>
            <input
              id="lf-state" type="text" placeholder="e.g. Texas"
              value={form.homeState}
              onChange={e => setForm(f => ({ ...f, homeState: e.target.value }))}
              className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="lf-coverage">
              Desired Coverage
            </label>
            <select
              id="lf-coverage"
              value={form.desiredCoverage}
              onChange={e => setForm(f => ({ ...f, desiredCoverage: parseInt(e.target.value, 10) }))}
              className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              {COVERAGE_PRESETS.map(v => (
                <option key={v} value={v}>${(v / 1000).toFixed(0)}K</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Any other life insurance interests?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {INTEREST_OPTIONS.map(opt => (
              <label
                key={opt}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors select-none ${
                  form.otherInterests.includes(opt)
                    ? 'border-blue-500 bg-blue-50 text-blue-800 font-medium'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.otherInterests.includes(opt)}
                  onChange={() => toggleInterest(opt)}
                  className="accent-blue-600 w-4 h-4 flex-shrink-0"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {loading ? 'Submitting…' : 'Request Exact Approval'}
        </button>
      </form>
    </div>
  )
}
