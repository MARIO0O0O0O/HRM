import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, Clock, DollarSign, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import PagaCalculatorComponent from '@/components/calculator/PagaCalculatorComponent'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Meal & Rest Breaks (LC §226.7 / §512) | CalBizHR',
  description: 'California mandatory meal break timing, 10-minute rest period rules, break waivers, and premium pay compliance under Labor Code § 226.7 & § 512.',
}

export default async function MealRestBreaksProgramPage() {
  const program = await getProgram('WAGE')
  const documents = await getDocumentsByCategory('WAGE')

  const fallbackProgram = {
    id: 'meal-rest-breaks',
    name: 'Meal & Rest Breaks Compliance',
    code: 'WAGE',
    summary: 'California law requires a 30-minute uninterrupted meal break before the end of the 5th hour of work (Labor Code § 512) and paid 10-minute rest periods per 4 hours worked. Any missed, late, or short break mandates 1 hour of premium pay.',
    statute: 'Labor Code § 226.7 & § 512',
    effectiveDate: '2001-01-01',
    agency: 'Labor Commissioner (DLSE)',
    targetAudience: 'All non-exempt employees in California',
    nonSupervisoryHours: 0,
    supervisoryHours: 0,
    recurrence: 'Daily Work Shifts',
    penaltySummary: '1 hour of premium pay per violation per workday plus PAGA penalty exposure.',
    lastUpdated: '2024-01-01',
  }

  const activeProgram = program || fallbackProgram
  const wageDocs = documents.map((d) => d.name)

  const mealBreakItems = [
    '30-minute uninterrupted meal break starting before the end of the 5th hour',
    'Second 30-minute meal break for work shifts exceeding 10 hours',
    'Valid written meal break waivers (for shifts of 6 hours or less, or second break under 12 hours)',
    'Off-duty requirement: employee must be relieved of all duties and free to leave premises',
    'On-duty meal period agreements (narrowly limited to exceptional operational constraints)',
  ]

  const restBreakItems = [
    'Paid 10-minute rest period for every 4 hours worked (or major fraction thereof)',
    'Rest breaks must be scheduled insofar as practicable in the middle of each work period',
    'Employers must provide suitable rest facilities and relief from active duty',
    '1 hour of premium pay for any missed, short, or interrupted rest period',
    'Strict prohibition of work-related calls or messages during rest breaks',
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
            <Clock className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • LC § 226.7 & § 512
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Meal & Rest Breaks
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California enforces mandatory meal break timing (before the 5th hour) and paid 10-minute rest periods. Failure to provide compliant breaks triggers 1 hour of premium pay per violation under Labor Code § 226.7.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. Inventory Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Meal & Rest Period Mandates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InventoryCard
              href="/tools/compliance-quiz"
              icon={Clock}
              title="Meal Break Requirements (LC § 512)"
              description="30-minute uninterrupted off-duty meal period timing and waiver rules."
              items={wageDocs.length > 0 ? wageDocs : mealBreakItems}
            />
            <InventoryCard
              href="/tools/compliance-quiz"
              icon={DollarSign}
              title="Rest Breaks & Premium Pay (LC § 226.7)"
              description="10-minute paid rest periods and statutory premium pay calculations."
              items={restBreakItems}
            />
          </div>
        </div>

        {/* 3. Interactive Risk Calculator Zone */}
        <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Interactive Risk Calculator
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-4 mb-2">
              Break Compliance Risk & Penalty Exposure Calculator
            </h2>
            <p className="text-sm font-sans text-zinc-300 max-w-xl leading-relaxed">
              Calculate potential PAGA penalty exposure and premium pay liability resulting from meal and rest break compliance gaps.
            </p>
          </div>

          <PagaCalculatorComponent compact={true} />
        </div>

        {/* 4. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 512 — Statutory Meal Period Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=512',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 226.7 — Premium Pay Standard Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226.7',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR DLSE Meal & Rest Period Enforcement FAQ',
                href: 'https://www.dir.ca.gov/dlse/faq_mealperiods.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need Break Attestation Templates?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Deploy written meal break waivers, electronic break attestation logs, and supervisor enforcement SOPs to eliminate break liability.
              </p>
            </div>
            <Link
              href="/tools/compliance-quiz"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access Compliance Quiz <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
