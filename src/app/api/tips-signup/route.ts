import { NextResponse } from 'next/server'
import { appendLeadRow } from '@/lib/google-sheets'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, errors: { email: 'Enter a valid email address.' } },
      { status: 400 }
    )
  }

  try {
    await appendLeadRow('Tips', [new Date().toISOString(), email])
  } catch (err) {
    console.error('Failed to append tips signup to Google Sheets:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
