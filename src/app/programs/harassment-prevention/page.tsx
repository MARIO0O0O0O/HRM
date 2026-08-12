import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'
import { FileText, GraduationCap, Shield, ArrowRight } from 'lucide-react'

export const revalidate = 3600

export default async function HarassmentPreventionHub() {
  const program = await getProgram('HPP')
  const documents = await getDocumentsByCategory('HPP')

  if (!program) return null

  const policyDocs = documents.filter((d) => !d.name.toLowerCase().includes('checklist') && !d.name.toLowerCase().includes('guide'))
  const trainingItems = [
    `${program.nonSupervisoryHours ?? 1} hour training track for non-supervisory employees`,
    `${program.supervisoryHours ?? 2} hour training track for supervisors`,
    'Interactive "Wheel of Knowledge" module — satisfies the interactivity requirement without a graded exam',
    `Retraining required every ${program.recurrence.toLowerCase().includes('bi') ? '2 years' : program.recurrence.toLowerCase()}`,
    'PDF completion certificate for each employee',
  ]

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Program header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <Shield className="h-3.5 w-3.5" /> Compliance Program
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            {program.name}
          </h1>
        </div>

        {/* 1. Summary card -- always first */}
        <div className="mb-10">
          <ProgramSummaryCard program={program} />
        </div>

        {/* 2. Inventory of nested cards */}
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">What&apos;s In This Program</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InventoryCard
              href="/programs/harassment-prevention/policy-templates"
              icon={FileText}
              title="Policy & Forms"
              description="The written policy and every form you need to actually run this program day-to-day."
              items={policyDocs.map((d) => d.name)}
            />
            <InventoryCard
              href="/programs/harassment-prevention/training"
              icon={GraduationCap}
              title="Training Requirements"
              description="Exactly what SB 1343 requires, for whom, how often, and what satisfies it."
              items={trainingItems}
            />
          </div>
        </div>

        {/* 3. Validation links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ValidationLinks
            links={[
              {
                label: 'Gov. Code § 12950.1 — Full Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12950.1',
                source: 'California Legislative Information',
              },
              {
                label: 'CRD Sexual Harassment Prevention Training FAQ',
                href: 'https://calcivilrights.ca.gov/shpt/',
                source: 'California Civil Rights Department',
              },
              {
                label: '2 CCR § 11024 — Training Content Requirements',
                href: 'https://govt.westlaw.com/calregs/Document/I0FE22530D40A11E5BAD9DDC301241E9C',
                source: 'California Code of Regulations',
              },
            ]}
          />

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-zinc-200">Ready to Implement This?</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              This hub is the reference. The toolkit is the ready-to-use version — templates filled in,
              training platform provisioned, ready to deploy to your team.
            </p>
            <Link
              href="/tools/hpp"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              See the HPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
