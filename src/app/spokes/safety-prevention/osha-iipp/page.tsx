import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, HardHat, FileText, ClipboardList, ShieldCheck, Sun, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import SelfAssessmentQuiz from '@/components/tools/SelfAssessmentQuiz'
import ProgressChecklist from '@/components/tools/ProgressChecklist'
import TrainingCycleCalculator from '@/components/tools/TrainingCycleCalculator'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { selfAssessmentPrograms, iippHazardCategories } from '@/data/quiz-content'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cal/OSHA IIPP & Heat Illness (Title 8 CCR §3203) | CalBizHR',
  description: 'California Injury & Illness Prevention Program (IIPP) 8 elements, hazard inspection checklist, training cycle calculator, and Heat Illness Prevention rules.',
}

export default async function OshaIippProgramPage() {
  const program = await getProgram('IIPP')
  const documents = await getDocumentsByCategory('IIPP')

  const fallbackProgram = {
    id: 'iipp',
    name: 'Injury & Illness Prevention Program',
    code: 'IIPP',
    summary: 'Title 8 CCR § 3203 mandates an effective written Injury & Illness Prevention Program (IIPP) for every California employer with 1 or more employees. Includes 8 required program elements and nested Heat Illness Prevention (8 CCR § 3395) protocols.',
    statute: 'Title 8 CCR § 3203',
    effectiveDate: '1991-07-01',
    agency: 'Cal/OSHA (DOSH)',
    targetAudience: 'Every California employer (1+ employees)',
    nonSupervisoryHours: 1,
    supervisoryHours: 1,
    recurrence: 'Annual & Event-Driven',
    penaltySummary: 'Cal/OSHA civil penalties for lack of written IIPP or failure to inspect/train.',
    lastUpdated: '2024-01-01',
  }

  const activeProgram = program || fallbackProgram
  const iippDocs = documents.map((d) => d.name)

  const elementsList = [
    '1. Management Responsibility & Designated Administrator',
    '2. Employee Compliance System',
    '3. Two-Way Safety Communication & Anonymous Reporting',
    '4. Periodic Scheduled Hazard Assessment Inspections',
    '5. Injury & Illness Incident Investigation',
    '6. Hazard Correction & Mitigations',
    '7. Training & Instruction (New hires, new assignments, new hazards)',
    '8. Documentation & Recordkeeping (5-year retention)',
  ]

  const hazardCorrectionItems = [
    'Hazard identification and risk classification log',
    'Immediate mitigation procedures for imminent danger hazards',
    'Scheduled safety inspection checklists by facility zone',
    'Employee hazard reporting channel without fear of retaliation',
    'Root-cause analysis documentation for near-miss incidents',
  ]

  const recordkeepingItems = [
    'Cal/OSHA Form 300 Log of Work-Related Injuries and Illnesses',
    'Form 300A Annual Summary (Posted Feb 1 – Apr 30 each year)',
    'Form 301 Injury and Illness Incident Report',
    '5-year record retention requirement under 8 CCR § 3203(b)',
    'Electronic submission for covered high-hazard industries',
  ]

  const heatIllnessItems = [
    'Written Heat Illness Prevention Plan (Title 8 CCR § 3395)',
    'Fresh, pure, suitably cool drinking water (1 quart/hr per worker)',
    'Shade structures open when temperature exceeds 80°F',
    'High-heat procedures triggered at 95°F (10-min cool-down breaks every 2 hrs)',
    'Acclimatization procedures for new hires during heat waves',
    'Emergency response and communication protocols for heat illness',
  ]

  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#B5933C]/20 pb-4">
          <Link
            href="/spokes/safety-prevention"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Safety & Prevention</span>
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
            <HardHat className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • Title 8 CCR § 3203
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {activeProgram.name} (Cal/OSHA IIPP)
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            The foundational safety program required for every California employer with 1 or more employees. Includes nested Heat Illness Prevention (8 CCR § 3395) requirements.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. Inventory Cards (4 Cards) */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Program Elements & Recordkeeping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InventoryCard
              href="/tools/iipp"
              icon={FileText}
              title="The 8 Required IIPP Elements"
              description="Cal/OSHA mandates 8 specific elements in every written IIPP document under Title 8 CCR § 3203(a)."
              items={iippDocs.length > 0 ? iippDocs : elementsList}
            />
            <InventoryCard
              href="/tools/iipp"
              icon={ClipboardList}
              title="Hazard Identification & Correction Log"
              description="Systematic procedures to inspect workplaces, identify hazards, and track corrective action to completion."
              items={hazardCorrectionItems}
            />
            <InventoryCard
              href="/tools/iipp"
              icon={ShieldCheck}
              title="Cal/OSHA Recordkeeping (Form 300 / 300A)"
              description="Annual posting, injury logging, and 5-year documentation retention mandated by Cal/OSHA regulations."
              items={recordkeepingItems}
            />
            <InventoryCard
              href="/tools/iipp"
              icon={Sun}
              title="Heat Illness Prevention (Subtopic · 8 CCR § 3395)"
              description="Nested water, shade, rest break, high-heat (95°F), and emergency response protocols for outdoor workers."
              items={heatIllnessItems}
            />
          </div>
        </div>

        {/* 3. Interactive Tools Zone */}
        <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Interactive IIPP Compliance Tools
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-4 mb-2">
              Interactive IIPP Audit & Hazard Inspection Tools
            </h2>
            <p className="text-sm font-sans text-zinc-300 max-w-2xl leading-relaxed">
              Use these free interactive tools to audit your 8 required IIPP elements, walk through hazard category inspections, and calculate safety training cycles.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#B5933C]">
                IIPP 8-Element Self-Assessment
              </h3>
              <SelfAssessmentQuiz program={selfAssessmentPrograms.iipp} />
            </div>

            <div className="border-t border-[#B5933C]/20 pt-8 space-y-4">
              <h3 className="text-base font-serif font-bold text-[#B5933C]">
                Workplace Hazard Category Inspection Checklist
              </h3>
              <ProgressChecklist categories={iippHazardCategories} />
            </div>

            <div className="border-t border-[#B5933C]/20 pt-8 max-w-xl space-y-4">
              <h3 className="text-base font-serif font-bold text-[#B5933C]">
                Safety Training Cycle Calculator
              </h3>
              <TrainingCycleCalculator
                programName="Injury & Illness Prevention"
                thresholdEmployees={1}
                cycleMonths={12}
                cycleLabel="annual"
                belowThresholdNote="A written IIPP is required for every California employer with 1 or more employees — there is no size exemption."
              />
            </div>
          </div>
        </div>

        {/* 4. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Title 8 CCR § 3203 — Cal/OSHA IIPP Standard Text',
                href: 'https://www.dir.ca.gov/title8/3203.html',
                source: 'California Code of Regulations',
              },
              {
                label: 'Title 8 CCR § 3395 — Cal/OSHA Heat Illness Prevention Standard',
                href: 'https://www.dir.ca.gov/title8/3395.html',
                source: 'California Code of Regulations',
              },
              {
                label: 'Cal. Lab. Code § 6401.7 — IIPP Statutory Mandate',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=6401.7',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal/OSHA eTool: Injury & Illness Prevention Program',
                href: 'https://www.dir.ca.gov/dosh/etools/iiap/index.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Ready to Upgrade Your IIPP Compliance?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Get our complete IIPP Toolkit — written 8-element plan template, hazard identification log, Code of Safe Work Practices, Cal/OSHA 300 log guide, and Heat Illness Prevention Plan.
              </p>
            </div>
            <Link
              href="/tools/iipp"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access IIPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
