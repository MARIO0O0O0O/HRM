// Static snapshot of the HRBiz Ops Database Airtable base (app7Dhacms0tMsXKN),
// migrated on 2026-08-11. This is the fallback data source -- see
// src/lib/airtable/server.ts, which prefers a live Airtable fetch when
// AIRTABLE_API_KEY is configured and falls back to this seed otherwise.
//
// Only public-facing, non-client-specific tables are mirrored here
// (Programs, Document Vault). Client/Employee/Certificate data stays in
// Airtable only -- it's operational data, not public card content.

export interface ProgramRecord {
  code: string
  name: string
  governingLaw: string
  primaryStatute: string
  effectiveDate: string
  description: string
  appliesTo: string
  trainingRequired: boolean
  supervisoryHours: number | null
  nonSupervisoryHours: number | null
  recurrence: string
  keyDeliverables: string
  notes: string
}

export const programsSeed: Record<string, ProgramRecord> = {
  HPP: {
    code: 'HPP',
    name: 'Harassment Prevention Program',
    governingLaw: 'California FEHA / Cal. Gov. Code § 12950.1',
    primaryStatute: 'Cal. Gov. Code § 12950.1 (SB 1343)',
    effectiveDate: '2026-01-01',
    description:
      'Sexual harassment prevention training and written policy. Two legally distinct tracks are required: 1 hour for non-supervisory employees, 2 hours for supervisors.',
    appliesTo: '5+ employees',
    trainingRequired: true,
    supervisoryHours: 2,
    nonSupervisoryHours: 1,
    recurrence: 'Biennial (every 2 years)',
    keyDeliverables:
      'Written policy, complaint form, investigation checklist, supervisor and employee acknowledgment forms, PDF certificate on completion, interactive training modules',
    notes: 'Free tier available. Investigation guidance only — not licensed to conduct investigations directly.',
  },
  WVPP: {
    code: 'WVPP',
    name: 'Workplace Violence Prevention Program',
    governingLaw: 'Cal/OSHA',
    primaryStatute: 'Cal. Lab. Code § 6401.9 (SB 553)',
    effectiveDate: '2024-07-01',
    description:
      'Written Workplace Violence Prevention Plan plus annual interactive training. Incident types must be classified (Criminal Intent, Customer/Client, Worker-on-Worker, Personal Relationship), and an anonymized Violent Incident Log must be maintained.',
    appliesTo: 'All CA employers (most industries)',
    trainingRequired: true,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Annual',
    keyDeliverables:
      'Written WVPP plan, hazard identification procedure, violent incident log template, annual training with interactive Q&A',
    notes: 'Training records retained minimum 1 year.',
  },
  IIPP: {
    code: 'IIPP',
    name: 'Injury and Illness Prevention Program',
    governingLaw: 'Cal/OSHA',
    primaryStatute: 'Cal. Lab. Code § 6401.7',
    effectiveDate: '',
    description:
      'Written Injury & Illness Prevention Program — hazard identification system, correction procedures, anonymous reporting channel. Must be kept in sync with the WVPP.',
    appliesTo: 'All CA employers',
    trainingRequired: false,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Ongoing / As-needed',
    keyDeliverables:
      'Written IIPP document, hazard inspection schedule template, named responsible person designation, correction procedure log',
    notes: 'No fixed training-hour minimum in statute — training is triggered by hazard type and frequency.',
  },
  KYR: {
    code: 'KYR',
    name: 'Know Your Rights',
    governingLaw: 'California Labor Code',
    primaryStatute: 'Cal. Lab. Code §§ 1553-1554 (SB 294)',
    effectiveDate: '2026-02-01',
    description:
      "Annual standalone written notice covering workers' comp, immigration/I-9 rights, 4th/5th Amendment rights, and right to organize, plus an emergency contact designation system for arrest/detention scenarios.",
    appliesTo: 'All CA employers',
    trainingRequired: false,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Annual',
    keyDeliverables:
      'SB 294 standalone notice template, emergency contact opt-in form, distribution/receipt log, 3-year retention system',
    notes: 'Highest urgency deadline of the four programs — annual Feb 1 notice requirement.',
  },
  WAGE: {
    code: 'WAGE',
    name: 'Wage & Hour Compliance Program',
    governingLaw: 'California Labor Code & IWC Wage Orders',
    primaryStatute: 'Cal. Lab. Code §§ 200-558, IWC Orders 1-17',
    effectiveDate: 'Ongoing',
    description:
      'Comprehensive California wage-and-hour compliance: meal & rest break timing, overtime calculation, employee classification, pay transparency (SB 1162), and itemized wage statements (Labor Code § 226).',
    appliesTo: 'All CA employers',
    trainingRequired: false,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Ongoing / Daily Operations',
    keyDeliverables:
      'Meal & Rest Break Policy & Premium Log, ABC Exempt Classification Checklist, Pay Transparency Job Posting Template, Labor Code § 226 Paystub Audit Checklist',
    notes: 'Primary source of California class actions and PAGA representative claims.',
  },
}

export interface DocumentRecord {
  name: string
  category: string
  mpaVerified: boolean
}

export const documentsSeed: DocumentRecord[] = [
  { name: 'Harassment Prevention Policy', category: 'HPP', mpaVerified: false },
  { name: 'Harassment Prevention Training Requirements', category: 'HPP', mpaVerified: false },
  { name: 'Harassment Prevention Program Checklist', category: 'HPP', mpaVerified: false },
  { name: 'Complaint Form', category: 'HPP', mpaVerified: false },
  { name: 'Investigation Checklist', category: 'HPP', mpaVerified: false },
  { name: 'Investigation Process Flowchart', category: 'HPP', mpaVerified: false },
  { name: 'Supervisor Acknowledgment Form', category: 'HPP', mpaVerified: false },
  { name: 'Employee Acknowledgment Form', category: 'HPP', mpaVerified: false },
  { name: 'Quick Reference Guide', category: 'HPP', mpaVerified: false },
  { name: '101 HPP Organization Guide — Complete Artifact Inventory', category: 'HPP', mpaVerified: false },
  { name: 'Artifact 1: Harassment Prevention Compliance Checklist', category: 'HPP', mpaVerified: true },
  { name: 'Workplace Violence Prevention Plan (WVPP)', category: 'WVPP', mpaVerified: true },
  { name: 'Violent Incident Log Template', category: 'WVPP', mpaVerified: true },
  { name: 'Hazard Assessment & Inspection Checklist', category: 'WVPP', mpaVerified: false },
  { name: 'Employee Incident Reporting Form', category: 'WVPP', mpaVerified: true },
  { name: 'Annual Training Facilitator Guide & Sign-In Sheet', category: 'WVPP', mpaVerified: false },
  { name: 'Employee Interactive Training Presentation', category: 'WVPP', mpaVerified: true },
  { name: 'Injury & Illness Prevention Program (IIPP) Written Plan', category: 'IIPP', mpaVerified: true },
  { name: '8-Element Compliance Checklist', category: 'IIPP', mpaVerified: true },
  { name: 'Hazard Identification & Correction Log', category: 'IIPP', mpaVerified: true },
  { name: 'Code of Safe Work Practices', category: 'IIPP', mpaVerified: false },
  { name: 'Cal/OSHA Form 300 / 300A Log Guide', category: 'IIPP', mpaVerified: true },
  { name: 'Heat Illness Prevention Plan (Title 8 CCR § 3395)', category: 'IIPP', mpaVerified: true },
  { name: 'Meal & Rest Period Policy & Attestation Form', category: 'WAGE', mpaVerified: true },
  { name: 'Overtime & Double Time Calculation Worksheet', category: 'WAGE', mpaVerified: true },
  { name: 'Exempt vs. Non-Exempt ABC Classification Checklist', category: 'WAGE', mpaVerified: true },
  { name: 'SB 1162 Pay Scale Disclosure Template for Job Postings', category: 'WAGE', mpaVerified: true },
  { name: 'Labor Code § 226 Compliant Itemized Wage Statement Audit Guide', category: 'WAGE', mpaVerified: true },
]
