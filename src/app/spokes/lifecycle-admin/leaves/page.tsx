import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, UserCheck, Heart, ShieldAlert, FileText, ArrowRight } from 'lucide-react'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'

export const metadata: Metadata = {
  title: 'Protected Leaves & Accommodations (CFRA / ADA) | CalBizHR',
  description: 'California Family Rights Act (CFRA) leave rules, FEHA disability accommodations, and statutory interactive dialogue process SOPs.',
}

const cfraHighlights = [
  'Job-Protected Family & Medical Leave under CFRA for qualifying family care and medical reasons',
  'Coverage applies to employers with 5 or more employees in California',
  'Care for expanded family members: child, parent, spouse, domestic partner, grandparent, grandchild, sibling, or designated person',
  'Maintenance of group health benefit coverage during approved leave',
  'Strict reinstatement rights to the same or comparable position upon conclusion of leave',
]

const interactiveProcessSteps = [
  '1. Notice of Accommodation Request or Known Disability: Triggered upon employee request or employer observation of performance impact',
  '2. Timely Good-Faith Interactive Dialogue: Engage directly with the employee to discuss functional limitations and workplace barriers',
  '3. Medical Certification Review: Obtain necessary medical verification of limitations without requesting diagnostic details',
  '4. Identification of Potential Accommodations: Evaluate modified duties, assistive technology, ergonomic adjustments, or reassignment',
  '5. Implementation & Ongoing Tracking: Document agreed-upon accommodations and maintain periodic follow-up communications',
]

export default function LeavesProgramPage() {
  return (
    <div className="flex-grow bg-[#1A2D4D] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#B5933C]/20 pb-4">
          <Link
            href="/spokes/lifecycle-admin"
            className="inline-flex items-center gap-2 text-sm font-sans font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Lifecycle Admin</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-zinc-300 hover:text-white transition-colors bg-[#0f1c32] px-3 py-1.5 rounded-lg border border-[#B5933C]/20"
          >
            <Home className="h-3.5 w-3.5 text-[#B5933C]" />
            <span>Home</span>
          </Link>
        </div>

        {/* Compliance Review Status Callout Note */}
        <div className="flex items-center gap-3 p-4 bg-[#B5933C]/10 border border-[#B5933C]/40 rounded-xl text-[#B5933C]">
          <ShieldAlert className="h-5 w-5 flex-shrink-0" />
          <p className="text-xs font-sans font-medium leading-relaxed">
            <strong>Compliance Status Note:</strong> Content for this program is newly drafted for Phase 3 and is currently pending formal compliance review.
          </p>
        </div>

        {/* Program Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • CFRA / ADA / FEHA
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Protected Leaves & Accommodations
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            The California Family Rights Act (CFRA) and Fair Employment and Housing Act (FEHA) mandate job-protected leaves and a mandatory good-faith interactive dialogue process for disability accommodations.
          </p>
        </div>

        {/* 1. Mandates List */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              California Family Rights Act (CFRA) Framework
            </h2>
          </div>
          <div className="space-y-2">
            {cfraHighlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#1A2D4D]/40 border border-[#B5933C]/10 rounded-lg text-xs font-sans text-zinc-200">
                <span className="font-mono font-bold text-[#B5933C]">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Dialogue SOP Section */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              FEHA / ADA Good-Faith Interactive Process SOP
            </h2>
          </div>
          <div className="space-y-2">
            {interactiveProcessSteps.map((step, idx) => (
              <div key={idx} className="p-3 bg-[#1A2D4D]/50 border border-[#B5933C]/20 rounded-lg text-xs font-sans text-zinc-200">
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Gov. Code § 12945.2 — CFRA Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12945.2',
                source: 'California Legislative Information',
              },
              {
                label: 'CRD Family, Medical, and Pregnancy Disability Leave Guidance',
                href: 'https://calcivilrights.ca.gov/employment/family-medical-pregnancy-leave/',
                source: 'California Civil Rights Department (CRD)',
              },
              {
                label: '2 CCR § 11069 — Reasonable Accommodation Interactive Process',
                href: 'https://govt.westlaw.com/calregs/Document/I184A2850D40A11E5BAD9DDC301241E9C',
                source: 'California Code of Regulations',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need Classification & Leave Support?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Evaluate job requirements, accommodation logs, and job classification standards using our interactive guide.
              </p>
            </div>
            <Link
              href="/tools/job-classification"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access Job Classification Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
