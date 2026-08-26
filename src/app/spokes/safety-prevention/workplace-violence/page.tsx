import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, ShieldAlert, FileText, ClipboardList, GraduationCap, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import KnowledgeQuiz from '@/components/tools/KnowledgeQuiz'
import TrainingCycleCalculator from '@/components/tools/TrainingCycleCalculator'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { wvppKnowledgeQuiz } from '@/data/quiz-content'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Workplace Violence Prevention (SB 553 / LC §6401.9) | CalBizHR',
  description: 'California Workplace Violence Prevention Plan (WVPP) mandates, violent incident logging, annual training, and interactive compliance tools.',
}

export default async function WorkplaceViolenceProgramPage() {
  const program = await getProgram('WVPP')
  const documents = await getDocumentsByCategory('WVPP')

  const fallbackProgram = {
    id: 'wvpp',
    name: 'Workplace Violence Prevention Program',
    code: 'WVPP',
    summary: 'Effective July 1, 2024, California Labor Code § 6401.9 (SB 553) requires nearly all California employers to establish, implement, and maintain a site-specific written Workplace Violence Prevention Plan, record violent incidents in a log (retained for 5 years), and provide annual interactive training.',
    statute: 'Labor Code § 6401.9 / SB 553',
    effectiveDate: '2024-07-01',
    agency: 'Cal/OSHA (DOSH)',
    targetAudience: 'Nearly all California employers',
    nonSupervisoryHours: 1,
    supervisoryHours: 1,
    recurrence: 'Annual',
    penaltySummary: 'Cal/OSHA citations up to $25,000+ per violation for failure to maintain plan or logs.',
    lastUpdated: '2024-07-01',
  }

  const activeProgram = program || fallbackProgram
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
            <ShieldAlert className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • LC § 6401.9 / SB 553
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {activeProgram.name} (SB 553)
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            Effective July 1, 2024, California requires nearly all employers to establish, implement, and maintain an effective written Workplace Violence Prevention Plan and deliver annual interactive training.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. What's In This Program - Inventory Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Program Components & Mandates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InventoryCard
              href="/tools/wvpp"
              icon={FileText}
              title="Written Plan Requirements"
              description="Site-specific written plan designating responsible managers, active employee involvement, and hazard correction procedures."
              items={planDocs.length > 0 ? planDocs : ['Site-Specific Written Plan', 'Hazard Identification Checklist', 'Employee Reporting Procedures']}
            />
            <InventoryCard
              href="/tools/wvpp"
              icon={ClipboardList}
              title="Violent Incident Log & Recordkeeping"
              description="Detailed log recording every incident, threat, or workplace violence hazard, retained for 5 years."
              items={incidentLogItems}
            />
            <InventoryCard
              href="/tools/wvpp"
              icon={GraduationCap}
              title="Training Requirements"
              description="Annual interactive training covering plan basics, emergency measures, and how to seek assistance."
              items={trainingItems}
            />
          </div>
        </div>

        {/* 3. Interactive Tools Zone */}
        <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-3xl p-6 sm:p-8 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Interactive Compliance Tools
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-4 mb-2">
              WVPP Training Calculator & Knowledge Quick-Check
            </h2>
            <p className="text-sm font-sans text-zinc-300 max-w-xl leading-relaxed">
              Calculate your annual training renewal deadlines and test your understanding of California SB 553 statutory mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#B5933C]">
                Annual Training Deadline Calculator
              </h3>
              <TrainingCycleCalculator
                programName="Workplace Violence Prevention"
                thresholdEmployees={1}
                cycleMonths={12}
                cycleLabel="annual"
                belowThresholdNote="SB 553 applies to nearly all California employers regardless of size, with narrow exemptions."
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-[#B5933C]">
                SB 553 Knowledge Check
              </h3>
              <KnowledgeQuiz questions={wvppKnowledgeQuiz} />
            </div>
          </div>
        </div>

        {/* 4. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 6401.9 — Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=6401.9',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal/OSHA Workplace Violence Prevention Guidance',
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

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Ready to Deploy SB 553 Compliance?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Get our complete WVPP Toolkit — customized written plan template, violent incident log spreadsheet, hazard assessment checklist, and annual training presentation.
              </p>
            </div>
            <Link
              href="/tools/wvpp"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access WVPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
