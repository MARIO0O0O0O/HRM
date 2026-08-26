import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, DollarSign, FileText, Eye, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { ProgramRecord } from '@/data/airtable-seed'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Paystubs & Wage Statements (LC §226 / SB 1162) | CalBizHR',
  description: 'California mandatory itemized wage statement requirements under Labor Code § 226 and pay transparency disclosures under SB 1162.',
}

export default async function PaystubsWageStatementsProgramPage() {
  const program = await getProgram('WAGE')
  const documents = await getDocumentsByCategory('WAGE')

  const fallbackProgram: ProgramRecord = {
    code: 'WAGE',
    name: 'Paystubs & Wage Statements (LC §226 / SB 1162)',
    governingLaw: 'California Labor Code & DLSE Guidelines',
    primaryStatute: 'Labor Code § 226 / SB 1162',
    effectiveDate: '2023-01-01',
    description: 'California Labor Code § 226(a) mandates 9 specific itemized items on every employee wage statement. SB 1162 adds pay scale transparency requirements, mandating disclosures on job postings and current employee pay range requests.',
    appliesTo: 'All California employers',
    trainingRequired: false,
    supervisoryHours: null,
    nonSupervisoryHours: null,
    recurrence: 'Ongoing Payroll Administration',
    keyDeliverables: 'Itemized Wage Statement Audit Checklist, Pay Scale Disclosure Templates',
    notes: 'Statutory per-employee, per-pay-period penalties apply under Labor Code § 226(e), plus PAGA statutory penalties (exact penalty figures pending verification).',
  }

  const activeProgram = program || fallbackProgram
  const wageDocs = documents.map((d) => d.name)

  const wageStatementItems = [
    '1. Gross wages earned during the pay period',
    '2. Total hours worked (for non-exempt hourly employees)',
    '3. Piece-rate units and applicable rates (if applicable)',
    '4. All deductions (taxes, benefit withholdings)',
    '5. Net wages paid',
    '6. Inclusive dates of the pay period',
    '7. Employee legal name and last 4 digits of SSN/ID',
    '8. Legal name and address of the employing entity',
    '9. All applicable hourly rates and corresponding hours worked',
  ]

  const transparencyItems = [
    'Mandatory pay scale disclosures on job postings (15+ employees under SB 1162)',
    'Right of current employees to request pay scales for their positions',
    'Annual CRD Pay Data Reporting for employers with 100+ employees',
    'Job title and wage history record retention requirement (3 years minimum)',
    'Civil administrative penalties apply under Labor Code § 432.3 (exact penalty figures pending verification)',
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
            <DollarSign className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • Labor Code § 226 / SB 1162
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Paystubs & Wage Statements
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California enforces strict technical requirements for itemized wage statements under Labor Code § 226(a) and pay scale transparency under SB 1162. Minor paystub omissions can result in compounding PAGA liability.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. Inventory Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Mandated Paystub Items & Pay Transparency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InventoryCard
              href="/tools/threshold-checker"
              icon={FileText}
              title="The 9 Itemized Wage Statement Elements"
              description="Labor Code § 226(a) requires these 9 exact items on every wage stub."
              items={wageDocs.length > 0 ? wageDocs : wageStatementItems}
            />
            <InventoryCard
              href="/tools/threshold-checker"
              icon={Eye}
              title="Pay Transparency Rules (SB 1162)"
              description="Mandatory pay scales on job postings and employee disclosure requirements."
              items={transparencyItems}
            />
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 226 — Itemized Wage Statement Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 432.3 — Pay Transparency (SB 1162)',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3',
                source: 'California Legislative Information',
              },
              {
                label: 'DLSE Paydays, Pay Period & Final Wages Guidance',
                href: 'https://www.dir.ca.gov/dlse/faq_paydays.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need a Payroll Audit?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Audit your wage statement templates and job posting pay scales to ensure total statutory compliance under LC § 226 and SB 1162.
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
