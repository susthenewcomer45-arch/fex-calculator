import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

// Same service account used by scripts/publish-blog.js — reuse the same
// credential resolution order (env var in CI/hosting, local key file in dev).
const CREDENTIALS_FILE = path.join(process.cwd(), 'aiaura-810e8-06dbbed3d67a.json')

// Dedicated lead-capture sheet (separate from the blog-titles sheet used by
// GOOGLE_SHEET_ID in publish-blog.js).
export const LEADS_SHEET_ID = '11RX4NB0REmayMxFZt8mH6lct3ix-WA-T1HZi05mjWDA'

function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  }
  if (fs.existsSync(CREDENTIALS_FILE)) {
    return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8'))
  }
  throw new Error(
    'No Google credentials found. Set GOOGLE_SERVICE_ACCOUNT_JSON env var ' +
    `or place the key file at ${CREDENTIALS_FILE}.`
  )
}

async function getSheetsClient() {
  const credentials = getCredentials()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export async function appendLeadRow(tab: 'Quotes' | 'Tips', values: string[]) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId: LEADS_SHEET_ID,
    range: `${tab}!A:A`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [values] },
  })
}
