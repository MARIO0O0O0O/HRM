import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import SelfAssessmentQuiz from '@/components/tools/SelfAssessmentQuiz'
import ProgressChecklist from '@/components/tools/ProgressChecklist'
import TrainingCycleCalculator from '@/components/tools/TrainingCycleCalculator'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { selfAssessmentPrograms, iippHazardCategories } from '@/data/quiz-content'
import { ShieldCheck, HardHat, FileText, ClipboardList, Sun, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export default async function InjuryIllnessPreventionHub() {
  const program = await getProgram('IIPP')
  const documents = await getDocumentsByCategory('IIPP')

  if (!program) return null

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
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <HardHat className="h-3.5 w-3.5" /> Compliance Program · Title 8 CCR § 3203
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            {program.name} (Cal/OSHA IIPP)
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            The foundational safety program required for every California employer with 1 or more employees. Includes nested Heat Illness Prevention (8 CCR § 3395) requirements.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-10">
          <ProgramSummaryCard program={program} />
        </div>

        {/* 2. What's In This Program -- Inventory Cards (4 Cards) */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">What&apos;s In This Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InventoryCard
              href="#eight-elements"
              icon={FileText}
              title="The 8 Required IIPP Elements"
              description="Cal/OSHA mandates 8 specific elements in every written IIPP document under Title 8 CCR § 3203(a)."
              items={elementsList}
            />
            <InventoryCard
              href="#hazard-log"
              icon={ClipboardList}
              title="Hazard Identification & Correction Log"
              description="Systematic procedures to inspect workplaces, identify hazards, and track corrective action to completion."
              items={hazardCorrectionItems}
            />
            <InventoryCard
              href="#recordkeeping"
              icon={ShieldCheck}
              title="Cal/OSHA Recordkeeping (Form 300 / 300A)"
              description="Annual posting, injury logging, and 5-year documentation retention mandated by Cal/OSHA regulations."
              items={recordkeepingItems}
            />
            <InventoryCard
              href="#heat-illness"
              icon={Sun}
              title="Heat Illness Prevention (Subtopic · 8 CCR § 3395)"
              description="Nested water, shade, rest break, high-heat (95°F), and emergency response protocols for outdoor workers."
              items={heatIllnessItems}
            />
          </div>
        </div>

        {/* 3. Free Tools & Compliance Checklist Zone */}
        <div className="mb-12 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Free IIPP Compliance Tools
            </span>
            <h2 className="text-2xl font-bold text-zinc-100 mt-4 mb-2">Interactive IIPP Audit & Hazard Checklist</h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Use these free interactive tools to audit your 8 required IIPP elements, walk through hazard category inspections, and calculate safety training cycles.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-zinc-200 mb-4">IIPP 8-Element Self-Assessment</h3>
              <SelfAssessmentQuiz program={selfAssessmentPrograms.iipp} />
            </div>

            <div className="border-t border-white/5 pt-8">
              <h3 className="text-base font-bold text-zinc-200 mb-4">Workplace Hazard Category Inspection Checklist</h3>
              <ProgressChecklist categories={iippHazardCategories} />
            </div>

            <div className="border-t border-white/5 pt-8 max-w-xl">
              <h3 className="text-base font-bold text-zinc-200 mb-4">Safety Training Cycle Calculator</h3>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
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

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Ready to Upgrade Your IIPP Compliance?</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                Get our complete IIPP Toolkit — written 8-element plan template, hazard identification log, Code of Safe Work Practices, Cal/OSHA 300 log guide, and Heat Illness Prevention Plan.
              </p>
            </div>
            <Link
              href="/tools/iipp"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              See the IIPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
