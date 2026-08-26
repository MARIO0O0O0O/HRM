import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, FileText, GraduationCap, Shield, ArrowRight } from 'lucide-react'
import ProgramSummaryCard from '@/components/programs/ProgramSummaryCard'
import InventoryCard from '@/components/programs/InventoryCard'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { getProgram, getDocumentsByCategory } from '@/lib/airtable/server'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Harassment Prevention (SB 1343) | CalBizHR',
  description: 'California mandatory harassment prevention training rules, written complaint procedures, and statutory mandates under SB 1343.',
}

export default async function HarassmentPreventionProgramPage() {
  const program = await getProgram('HPP')
  const documents = await getDocumentsByCategory('HPP')

  const fallbackProgram = {
    id: 'hpp',
    name: 'Harassment Prevention Program',
    code: 'HPP',
    summary: 'California law (SB 1343 / Gov. Code § 12950.1) mandates sexual harassment prevention training for all employers with 5 or more employees. Non-supervisory employees must complete 1 hour of training, and supervisory employees must complete 2 hours, repeated every 2 years.',
    statute: 'Gov. Code § 12950.1 / SB 1343',
    effectiveDate: '2021-01-01',
    agency: 'Civil Rights Department (CRD)',
    targetAudience: 'Employers with 5+ employees',
    nonSupervisoryHours: 1,
    supervisoryHours: 2,
    recurrence: 'Bi-annual (Every 2 Years)',
    penaltySummary: 'CRD compliance orders, employee administrative complaints, and civil liability under FEHA.',
    lastUpdated: '2024-01-01',
  }

  const activeProgram = program || fallbackProgram
  const policyDocs = documents.filter((d) => !d.name.toLowerCase().includes('checklist') && !d.name.toLowerCase().includes('guide'))
  const trainingItems = [
    `${activeProgram.nonSupervisoryHours ?? 1} hour training track for non-supervisory employees`,
    `${activeProgram.supervisoryHours ?? 2} hour training track for supervisors`,
    'Interactive "Wheel of Knowledge" module — satisfies statutory interactivity requirements',
    `Retraining required every ${activeProgram.recurrence ? activeProgram.recurrence.toLowerCase() : '2 years'}`,
    'PDF completion certificate and tracking roster for each employee',
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
            <Shield className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • SB 1343
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {activeProgram.name} (SB 1343)
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California Government Code § 12950.1 mandates that all employers with 5 or more employees provide sexual harassment prevention training and maintain clear written complaint procedures.
          </p>
        </div>

        {/* 1. Summary Card */}
        <div className="mb-8">
          <ProgramSummaryCard program={activeProgram} />
        </div>

        {/* 2. What's In This Program - Inventory Cards */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C]">
            Program Inventory & Requirements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InventoryCard
              href="/tools/hpp"
              icon={FileText}
              title="Policy & Forms"
              description="Written anti-harassment policy, complaint forms, and investigation workflows."
              items={policyDocs.length > 0 ? policyDocs.map((d) => d.name) : ['Written Anti-Harassment Policy', 'Employee Complaint Form', 'Investigation SOP & Roster']}
            />
            <InventoryCard
              href="/tools/hpp"
              icon={GraduationCap}
              title="Training Requirements"
              description="Exact training rules mandated by SB 1343 for supervisory and non-supervisory staff."
              items={trainingItems}
            />
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Gov. Code § 12950.1 — Statutory Text',
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

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Ready to Implement This Program?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                This hub details the legal rules. The HPP Toolkit provides turnkey templates, complaint forms, and compliance rosters ready to deploy to your team.
              </p>
            </div>
            <Link
              href="/tools/hpp"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access HPP Toolkit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
