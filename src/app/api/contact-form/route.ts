import { NextResponse } from 'next/server'
import { appendLeadRow } from '@/lib/google-sheets'

const MAX_MESSAGE_LENGTH = 2000

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Sheets runs with USER_ENTERED, so neutralize cells that would be read as formulas.
function safeCell(value: string) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!message) errors.message = 'Please enter a message.'
  else if (message.length >= MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be under ${MAX_MESSAGE_LENGTH.toLocaleString()} characters.`
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  try {
    await appendLeadRow('Contact', [
      new Date().toISOString(),
      safeCell(name),
      safeCell(email),
      safeCell(message),
    ])
  } catch (err) {
    console.error('Failed to append contact form to Google Sheets:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
