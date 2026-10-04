'use client'

import { useState } from 'react'

type Fields = { name: string; email: string; message: string }

const MAX_MESSAGE_LENGTH = 2000

export default function ContactForm() {
  const [form, setForm] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | 'form', string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const inputCls = (field: keyof Fields) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0d9488] transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    else if (form.message.trim().length >= MAX_MESSAGE_LENGTH) next.message = 'Message must be under 2,000 characters.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setErrors({ ...(data.errors ?? {}), form: data.error ?? (data.errors ? undefined : 'Something went wrong. Please try again.') })
      }
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-sm text-green-800 font-medium">
        ✅ Thanks! Your message was sent. We&apos;ll get back to you as soon as we can.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div>
        <input
          type="text" autoComplete="name" placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputCls('name')}
        />
        {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email" autoComplete="email" inputMode="email" placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputCls('email')}
        />
        {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
      </div>
      <div>
        <textarea
          rows={5} placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={inputCls('message')}
        />
        {errors.message && <p className="text-red-500 text-xs mt-0.5">{errors.message}</p>}
      </div>
      {errors.form && <p className="text-red-500 text-xs">{errors.form}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#0d9488] hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-full text-sm transition-colors cursor-pointer"
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
