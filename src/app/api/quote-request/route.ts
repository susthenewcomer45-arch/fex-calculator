import { NextResponse } from 'next/server'
import { appendLeadRow } from '@/lib/google-sheets'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return phone.replace(/\D/g, '').length === 10
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const firstName = asString(body.firstName)
  const lastName = asString(body.lastName)
  const email = asString(body.email)
  const phone = asString(body.phone)
  const state = asString(body.state)
  const coverage = asString(body.coverage)

  const errors: Record<string, string> = {}
  if (!firstName) errors.firstName = 'First name is required.'
  if (!lastName) errors.lastName = 'Last name is required.'
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid 10-digit phone number.'
  if (!state) errors.state = 'State is required.'
  if (!coverage) errors.coverage = 'Coverage amount is required.'

  if (Object.keys(errors).length) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  try {
    await appendLeadRow('Quotes', [
      new Date().toISOString(),
      firstName,
      lastName,
      email,
      phone,
      state,
      coverage,
    ])
  } catch (err) {
    console.error('Failed to append quote request to Google Sheets:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
