// Server-only Airtable data layer. Prefers a live fetch from the HRBiz Ops
// Database when AIRTABLE_API_KEY is configured; falls back to the static
// migrated snapshot (src/data/airtable-seed.ts) otherwise, so the site
// works today with zero additional setup and upgrades to live data the
// moment a token is added.

import { programsSeed, documentsSeed, type ProgramRecord, type DocumentRecord } from '@/data/airtable-seed'

const BASE_ID = 'app7Dhacms0tMsXKN'
const PROGRAMS_TABLE = 'tblESyY0RKjiisI8S'
const DOCUMENT_VAULT_TABLE = 'tblV0at4YUg63hu4H'

function hasLiveAirtable(): boolean {
  return !!process.env.AIRTABLE_API_KEY
}

async function airtableFetch(tableId: string) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    next: { revalidate: 3600 }, // re-fetch at most once an hour
  })
  if (!res.ok) throw new Error(`Airtable fetch failed: ${res.status}`)
  return res.json()
}

export async function getProgram(code: string): Promise<ProgramRecord | null> {
  if (!hasLiveAirtable()) {
    return programsSeed[code] ?? null
  }
  try {
    const data = await airtableFetch(PROGRAMS_TABLE)
    const record = data.records.find((r: { fields: Record<string, unknown> }) => {
      const codeField = r.fields['Code'] as { name?: string } | undefined
      return codeField?.name === code
    })
    if (!record) return programsSeed[code] ?? null
    const f = record.fields
    return {
      code,
      name: f['Program Name'] ?? '',
      governingLaw: f['Governing Law'] ?? '',
      primaryStatute: f['Primary Statute'] ?? '',
      effectiveDate: f['Effective Date'] ?? '',
      description: f['Description'] ?? '',
      appliesTo: f['Applies To (Employer Size)'] ?? '',
      trainingRequired: !!f['Training Required'],
      supervisoryHours: f['Supervisory Hours'] ?? null,
      nonSupervisoryHours: f['Non-Supervisory Hours'] ?? null,
      recurrence: f['Recurrence']?.name ?? '',
      keyDeliverables: f['Key Deliverables'] ?? '',
      notes: f['Notes'] ?? '',
    }
  } catch {
    // Airtable hiccup -- never let this break the page, fall back silently
    return programsSeed[code] ?? null
  }
}

export async function getDocumentsByCategory(category: string): Promise<DocumentRecord[]> {
  if (!hasLiveAirtable()) {
    return documentsSeed.filter((d) => d.category === category)
  }
  try {
    const data = await airtableFetch(DOCUMENT_VAULT_TABLE)
    return data.records
      .filter((r: { fields: Record<string, unknown> }) => {
        const cat = r.fields['Category'] as { name?: string } | undefined
        return cat?.name === category
      })
      .map((r: { fields: Record<string, unknown> }) => ({
        name: r.fields['Document Name'] ?? '',
        category,
        mpaVerified: !!r.fields['MPA Verified'],
      }))
  } catch {
    return documentsSeed.filter((d) => d.category === category)
  }
}
