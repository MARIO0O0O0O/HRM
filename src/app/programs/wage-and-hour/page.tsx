import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import PagaCalculatorComponent from '@/components/calculator/PagaCalculatorComponent'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { DollarSign, Clock, Scale, Eye, FileText, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export default async function WageAndHourHubPage() {
  const program = await getProgram('WAGE')
  const documents = await getDocumentsByCategory('WAGE')

  if (!program) return null

  const mealRestItems = [
    '30-minute uninterrupted meal break before 5th hour of work',
    'Second 30-minute meal break for shifts over 10 hours',
    'Paid 10-minute rest breaks per 4 hours worked',
    '1-hour premium pay requirement for any missed, late, or interrupted break',
    'Strict prohibition of work-related messages or duties during break time',
  ]

  const overtimeItems = [
    'Daily overtime (1.5x regular rate after 8 hours/day)',
    'Weekly overtime (1.5x regular rate after 40 hours/week)',
    'Double time (2x regular rate after 12 hours/day or 8+ hours on 7th day)',
    'Salary basis test (minimum 2x state minimum wage for exempt status)',
    'California ABC Test (Lab. Code § 2775) for independent contractor classification',
  ]

  const transparencyItems = [
    'Mandatory pay scale disclosure on all job postings (15+ employees under SB 1162)',
    'Right of current employees to request pay scale for their role',
    'Annual pay data reporting to CRD for employers with 100+ workers',
    'Record retention requirement: job titles & pay histories for 3 years',
    'Civil penalties up to $10,000 per violation under Labor Code § 432.3',
  ]

  const wageStatementItems = [
    '9 mandatory paystub requirements under Labor Code § 226(a)',
    'Gross wages earned & net wages paid',
    'Total hours worked (for non-exempt employees)',
    'Applicable hourly rates and corresponding hours worked',
    'Inclusive pay period dates & employer legal name and address',
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <DollarSign className="h-3.5 w-3.5" /> Compliance Program · Cal. Lab. Code §§ 200-558
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            {program.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            California wage-and-hour laws generate the largest class actions and PAGA exposure for small businesses. Master meal breaks, overtime rules, pay transparency, and wage statement compliance.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-10">
          <ProgramSummaryCard program={program} />
        </div>

        {/* 2. Inventory of Nested Topics (Real Navigation Links) */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Core Wage &amp; Hour Compliance Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InventoryCard
              href="/programs/wage-and-hour/meal-and-rest-breaks"
              icon={Clock}
              title="Meal & Rest Breaks"
              description="Strict timing, duration, premium pay rules, and duty-free break mandates under IWC Wage Orders & Labor Code § 512."
              items={mealRestItems}
            />
            <InventoryCard
              href="/programs/wage-and-hour/overtime-misclassification"
              icon={Scale}
              title="Overtime & Misclassification"
              description="Daily overtime, double time, executive/administrative salary thresholds, and the ABC independent contractor test."
              items={overtimeItems}
            />
            <InventoryCard
              href="/programs/wage-and-hour/pay-transparency"
              icon={Eye}
              title="Pay Transparency (SB 1162)"
              description="Mandatory pay scale postings, employee disclosure rights, and CRD pay data reporting obligations."
              items={transparencyItems}
            />
            <InventoryCard
              href="/programs/wage-and-hour/wage-statements"
              icon={FileText}
              title="Wage Statement Requirements"
              description="The 9 mandatory itemized paystub elements under Labor Code § 226(a) to avoid compounding penalties."
              items={wageStatementItems}
            />
          </div>
        </div>

        {/* 3. Free Tools & Compliance Checklist Zone */}
        <div className="mb-12 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Free Wage &amp; Hour Risk Tools
            </span>
            <h2 className="text-2xl font-bold text-zinc-100 mt-4 mb-2">Wage &amp; Hour Risk Calculator &amp; Classification Tools</h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Calculate your PAGA risk exposure, verify job classifications against California standards, and check mandatory posting requirements.
            </p>
          </div>

          <PagaCalculatorComponent compact={true} />
        </div>

        {/* 4. Validation Links & Consultation CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 512 — Meal Period Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=512',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR DLSE Meal and Rest Period FAQ & Enforcement Guidance',
                href: 'https://www.dir.ca.gov/dlse/faq_mealperiods.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
              {
                label: 'Cal. Lab. Code § 226 — Itemized Wage Statement Requirements',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 432.3 — Pay Transparency (SB 1162)',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3',
                source: 'California Legislative Information',
              },
            ]}
          />

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Need Wage &amp; Hour Exposure Cleanup?</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                Our focused Wage-and-Hour Audit reviews break tracking, paystub items, overtime calculations, and employee classifications before a PAGA notice is filed.
              </p>
            </div>
            <Link
              href="/spokes/labor-law"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              See Wage-and-Hour Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
