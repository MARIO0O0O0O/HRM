import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, Scale, DollarSign, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { ProgramRecord } from '@/data/airtable-seed'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Timekeeping & Classification | CalBizHR',
  description: 'California exempt vs. non-exempt duties tests, minimum salary thresholds, timekeeping rules, and ABC contractor classification test.',
}

export default async function TimekeepingClassificationProgramPage() {
  const program = await getProgram('WAGE')
  const documents = await getDocumentsByCategory('WAGE')

  const fallbackProgram: ProgramRecord = {
    code: 'WAGE',
    name: 'Timekeeping & Exemption Classification',
    governingLaw: 'California Labor Code & IWC Wage Orders',
    primaryStatute: 'Labor Code §§ 510, 515 & 2775',
    effectiveDate: '2000-01-01',
    description: 'California law enforces daily overtime (after 8 hours/day), weekly overtime (after 40 hours/week), and double time (after 12 hours/day). Exempt status requires meeting strict duties tests and earning a minimum monthly salary equivalent to 2x state minimum wage.',
    appliesTo: 'All California employers',
    trainingRequired: false,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Ongoing Wage Administration',
    keyDeliverables: 'ABC Classification Checklist, Overtime & Double Time Calculation Guide',
    notes: 'Back overtime pay, interest, Waiting Time Penalties, and PAGA statutory penalties.',
  }

  const activeProgram = program || fallbackProgram
  const wageDocs = documents.map((d) => d.name)

  const overtimeRulesItems = [
    'Daily Overtime: 1.5x regular rate for hours worked over 8 in a workday',
    'Weekly Overtime: 1.5x regular rate for hours worked over 40 in a workweek',
    'Double Time: 2.0x regular rate for hours worked over 12 in a workday or over 8 hours on 7th consecutive day',
    'Regular Rate of Pay calculation: includes non-discretionary bonuses, commissions, and shift differentials',
    'Strict prohibition against uncompensated "off-the-clock" work or mandatory pre-shift work',
  ]

  const exemptionItems = [
    'Executive Exemption: primary duty managing enterprise, regularly directing 2+ employees, hire/fire authority',
    'Administrative Exemption: office or non-manual work directly related to management policies or general business operations',
    'Professional Exemption: licensed professional practice or custom creative artistic work',
    'California 51% Rule: employee must spend MORE THAN 50% of work time on exempt duties (unlike federal law)',
    'Salary Basis Test: fixed salary equal to at least 2x California state minimum wage for full-time employment',
  ]

  const contractorItems = [
    'California ABC Test under Labor Code § 2775 (Dynamex standard)',
    'Prong A: Free from control and direction of hiring entity in performance of work',
    'Prong B: Performs work outside usual course of hiring entity\'s business',
    'Prong C: Customarily engaged in an independently established trade, occupation, or business',
    'B2B statutory exemptions require meeting strict 12-factor independent contractor criteria',
  ]

  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#B5933C]/20 pb-4">
          <Link
            href="/spokes/wage-hour"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Wage & Hour</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-zinc-300 hover:text-white transition-colors bg-[#0f1c32] px-3 py-1.5 rounded-lg border border-[#B5933C]/20"
          >
            <Home className="h-3.5 w-3.5 text-[#B5933C]" />
            <span>Home</span>
          </Link>
        </div>

        {/* Program Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • Labor Code §§ 510, 515 & 2775
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Timekeeping & Classification
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California enforces daily overtime rules, a strict 51% quantitative duties test for exempt status, minimum salary thresholds equal to 2x state minimum wage, and the ABC test for independent contractors.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. Inventory Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Overtime Rules, Exemption Tests & Contractor Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InventoryCard
              href="/tools/threshold-checker"
              icon={DollarSign}
              title="Daily Overtime & Math Rules"
              description="Daily 1.5x/2.0x overtime standards and regular rate calculation rules."
              items={wageDocs.length > 0 ? wageDocs : overtimeRulesItems}
            />
            <InventoryCard
              href="/tools/threshold-checker"
              icon={Scale}
              title="Exempt Duties & Salary Test"
              description="The 51% quantitative duties test and 2x state minimum wage salary threshold."
              items={exemptionItems}
            />
            <InventoryCard
              href="/tools/threshold-checker"
              icon={Scale}
              title="ABC Independent Contractor Test"
              description="Labor Code § 2775 3-prong test for independent contractor classification."
              items={contractorItems}
            />
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 510 — Daily Overtime Statutory Standard',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=510',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 515 — Executive, Administrative & Professional Exemptions',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=515',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 2775 — ABC Independent Contractor Test Standard',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2775',
                source: 'California Legislative Information',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need an Exemption Audit?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Evaluate job descriptions, actual employee time allocation, and 1099 contractor agreements against California&apos;s strict standards.
              </p>
            </div>
            <Link
              href="/tools/threshold-checker"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access Threshold Checker <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
