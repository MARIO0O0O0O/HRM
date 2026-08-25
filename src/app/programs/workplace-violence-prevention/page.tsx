import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import KnowledgeQuiz from '@/components/tools/KnowledgeQuiz'
import TrainingCycleCalculator from '@/components/tools/TrainingCycleCalculator'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { wvppKnowledgeQuiz } from '@/data/quiz-content'
import { FileText, ShieldAlert, GraduationCap, ClipboardList, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export default async function WorkplaceViolencePreventionHub() {
  const program = await getProgram('WVPP')
  const documents = await getDocumentsByCategory('WVPP')

  if (!program) return null

  const planDocs = documents.map((d) => d.name)
  const incidentLogItems = [
    'Mandatory Violent Incident Log (retained for 5 years)',
    '4 Incident Type Classifications (Criminal Intent, Customer/Client, Worker-on-Worker, Personal Relationship)',
    'Anonymized employee details to protect privacy',
    'Post-incident investigation checklist & root-cause analysis',
    'Cal/OSHA inspection readiness documentation',
  ]
  const trainingItems = [
    'Annual interactive training required for all California employees',
    'Specific hazards identified in the workplace location',
    'Emergency response procedures and alarm systems',
    'How to report violent incidents without fear of retaliation',
    'Interactive Q&A component with designated plan administrator',
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <ShieldAlert className="h-3.5 w-3.5" /> Compliance Program · Cal. Lab. Code § 6401.9
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            {program.name} (SB 553)
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            Effective July 1, 2024, California requires nearly all employers to establish, implement, and maintain an effective written Workplace Violence Prevention Plan and deliver annual interactive training.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-10">
          <ProgramSummaryCard program={program} />
        </div>

        {/* 2. What's In This Program -- Inventory Cards */}
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">What&apos;s In This Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InventoryCard
              href="#written-plan"
              icon={FileText}
              title="Written Plan Requirements"
              description="Site-specific written plan designating responsible managers, active employee involvement, and hazard correction procedures."
              items={planDocs.length > 0 ? planDocs : ['Site-Specific Written Plan', 'Hazard Identification Checklist', 'Employee Reporting Procedures']}
            />
            <InventoryCard
              href="#incident-log"
              icon={ClipboardList}
              title="Violent Incident Log & Recordkeeping"
              description="Detailed log recording every incident, threat, or workplace violence hazard, retained for 5 years."
              items={incidentLogItems}
            />
            <InventoryCard
              href="#training"
              icon={GraduationCap}
              title="Training Requirements"
              description="Annual interactive training covering plan basics, emergency measures, and how to seek assistance."
              items={trainingItems}
            />
          </div>
        </div>

        {/* 3. Free Tools & Compliance Checklist Zone */}
        <div className="mb-12 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Free Compliance Tools
            </span>
            <h2 className="text-2xl font-bold text-zinc-100 mt-4 mb-2">WVPP Calculator & Knowledge Quick-Check</h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Calculate your training renewal deadlines and test your understanding of California SB 553 requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-base font-bold text-zinc-200 mb-4">Annual Training Deadline Calculator</h3>
              <TrainingCycleCalculator
                programName="Workplace Violence Prevention"
                thresholdEmployees={1}
                cycleMonths={12}
                cycleLabel="annual"
                belowThresholdNote="SB 553 applies to nearly all California employers regardless of size, with narrow exemptions."
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-200 mb-4">SB 553 Knowledge Check</h3>
              <KnowledgeQuiz questions={wvppKnowledgeQuiz} />
            </div>
          </div>
        </div>

        {/* 4. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 6401.9 — Full SB 553 Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=6401.9',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal/OSHA Workplace Violence Prevention General Industry Guidance',
                href: 'https://www.dir.ca.gov/dosh/dosh_publications/wvpp.html',
                source: 'California Department of Industrial Relations (DIR)',
              },
              {
                label: 'Cal/OSHA Model WVPP Template & Fact Sheets',
                href: 'https://www.dir.ca.gov/dosh/Workplace-Violence.html',
                source: 'Cal/OSHA Publications',
              },
            ]}
          />

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Ready to Deploy SB 553 Compliance?</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                Get our complete WVPP Toolkit — customized written plan template, violent incident log spreadsheet, hazard assessment checklist, and annual training presentation.
              </p>
            </div>
            <Link
              href="/tools/wvpp"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              See the WVPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
