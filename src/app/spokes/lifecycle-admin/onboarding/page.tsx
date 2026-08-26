import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, UserCheck, FileText, ClipboardList, ShieldAlert, ArrowRight } from 'lucide-react'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'

export const metadata: Metadata = {
  title: 'Hiring & Onboarding (LC §2810.5) | CalBizHR',
  description: 'California mandatory hiring documentation, Wage Theft Prevention notices (LC §2810.5), Form I-9 compliance, and new hire pamphlet distribution.',
}

const noticeRequirements = [
  '1. Regular pay rate(s) and basis of pay (hourly, salary, piece-rate)',
  '2. Any allowances claimed as part of minimum wage (meal or lodging deductions)',
  '3. Regular designated payday schedule',
  '4. Employer legal business name and any DBA names',
  '5. Physical address of main office or principal place of business',
  '6. Name, address, and policy number of workers\' compensation insurance carrier',
  '7. California Paid Sick Leave entitlement details (LC § 246)',
  '8. Written notice of change required within 7 calendar days of any wage rate modification',
]

const onboardingChecklist = [
  'Federal Form I-9 Employment Eligibility Verification (completed within 3 business days of hire)',
  'California Wage Theft Protection Act Notice (Labor Code § 2810.5) for non-exempt hires',
  'Form W-4 (Federal Employee\'s Withholding Allowance Certificate)',
  'Form DE-4 (California Employee\'s Withholding Allowance Certificate)',
  'CRD Sexual Harassment Prevention Information Sheet (CRD-185)',
  'EDD Disability Insurance Pamphlet (DE 2515) & Paid Family Leave Pamphlet (DE 2511)',
  'Workers\' Compensation Time of Hire Pamphlet & Rights Notice',
  'Lactation Accommodation Policy Notice (Labor Code § 1034)',
]

export default function OnboardingProgramPage() {
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
            <UserCheck className="h-6 w-6 text-[#B5933C]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3 py-1 rounded-full">
              Compliance Program • Labor Code § 2810.5
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Hiring & Onboarding
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California Labor Code § 2810.5 requires employers to provide non-exempt new hires with a written Wage Theft Prevention notice at the time of hire detailing compensation rates, paydays, and employer legal disclosures.
          </p>
        </div>

        {/* 1. Mandates List */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              Labor Code § 2810.5 Statutory Wage Notice Requirements
            </h2>
          </div>
          <p className="text-xs font-sans text-zinc-300 leading-relaxed mb-4">
            The Wage Theft Prevention Act requires written notification provided in the language the employer normally uses to communicate employment-related information to the employee:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {noticeRequirements.map((req, idx) => (
              <div key={idx} className="p-3 bg-[#1A2D4D]/50 border border-[#B5933C]/20 rounded-lg text-xs font-sans text-zinc-200">
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Onboarding Checklist Section */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              California New Hire Documentation & Pamphlet Checklist
            </h2>
          </div>
          <div className="space-y-2">
            {onboardingChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#1A2D4D]/40 border border-[#B5933C]/10 rounded-lg text-xs font-sans text-zinc-200">
                <span className="font-mono font-bold text-[#B5933C]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 2810.5 — Wage Theft Prevention Act Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2810.5',
                source: 'California Legislative Information',
              },
              {
                label: 'DLSE Wage Theft Protection Act Template & FAQ',
                href: 'https://www.dir.ca.gov/dlse/lc_2810.5_notice.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
              {
                label: 'USCIS Form I-9 Employment Eligibility Verification',
                href: 'https://www.uscis.gov/i-9',
                source: 'U.S. Citizenship and Immigration Services',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need Turnkey Onboarding Packets?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Access mandatory workplace postings, digital 2810.5 notice templates, and new hire packet distribution checklists.
              </p>
            </div>
            <Link
              href="/tools/mandatory-postings"
              className="flex items-center justify-center gap-2 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Access Mandatory Postings Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
