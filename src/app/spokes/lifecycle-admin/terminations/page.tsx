import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, UserCheck, ShieldAlert, DollarSign, FileText, ArrowRight } from 'lucide-react'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'

export const metadata: Metadata = {
  title: 'Terminations & Final Pay (LC §§201–203) | CalBizHR',
  description: 'California immediate final paycheck timelines (LC §201/202), Waiting Time Penalties (LC §203), PTO payouts, and separation documentation.',
}

const finalPayTimelines = [
  'Involuntary Discharge / Layoff (LC § 201): All earned wages, accrued unused PTO/vacation, and earned commissions are due IMMEDIATELY at the time of termination.',
  'Voluntary Resignation with 72 Hours Notice (LC § 202): Final paycheck is due on the employee\'s last day of work.',
  'Voluntary Resignation without Notice (LC § 202): Final paycheck is due within 72 hours of resignation. Employee may request check mailed to specified address.',
  'Accrued PTO / Vacation Payout (LC § 227.3): Accrued unused vacation or paid time off must be paid as wages at the employee\'s final regular pay rate. "Use-it-or-lose-it" policies are strictly illegal under California law.',
]

const waitingTimePenaltyRules = [
  'Labor Code § 203 Waiting Time Penalties: If an employer willfully fails to pay final wages in accordance with LC §§ 201/202, wages continue as a penalty.',
  'Penalty Rate: Full daily wages for each day the payment is delayed, up to a maximum of 30 calendar days.',
  'Willfulness Standard: "Willful" does not require malice; it simply means the employer intentionally failed to pay wages when due or engaged in bad-faith delay.',
  'Statute of Limitations: 3-year statutory lookback period for recovery of Waiting Time Penalties (4 years if brought as an unfair business practice under BPC § 17200).',
]

export default function TerminationsProgramPage() {
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
              Compliance Program • Labor Code §§ 201–203
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terminations & Final Pay
          </h1>
          <p className="text-base font-sans text-zinc-300 max-w-3xl leading-relaxed">
            California enforces strict statutory deadlines for final wage payment upon employee separation. Delayed final pay triggers compounding Waiting Time Penalties under Labor Code § 203.
          </p>
        </div>

        {/* 1. Final Pay Mandates */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              Statutory Final Pay Timelines (LC §§ 201 & 202)
            </h2>
          </div>
          <div className="space-y-2">
            {finalPayTimelines.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#1A2D4D]/50 border border-[#B5933C]/20 rounded-lg text-xs font-sans text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Waiting Time Penalties Section */}
        <div className="p-6 sm:p-8 bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-[#B5933C]" />
            <h2 className="text-xl font-serif font-bold text-white">
              Waiting Time Penalty Mechanics (Labor Code § 203)
            </h2>
          </div>
          <div className="space-y-2">
            {waitingTimePenaltyRules.map((rule, idx) => (
              <div key={idx} className="p-3 bg-[#1A2D4D]/40 border border-[#B5933C]/10 rounded-lg text-xs font-sans text-zinc-200">
                {rule}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Validation Links & Toolkit CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#B5933C]/20">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 201 — Discharge Final Wage Payment Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=201',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 202 — Resignation Final Wage Payment Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=202',
                source: 'California Legislative Information',
              },
              {
                label: 'Cal. Lab. Code § 203 — Waiting Time Penalty Standard Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=203',
                source: 'California Legislative Information',
              },
              {
                label: 'DLSE Final Pay Enforcement FAQ',
                href: 'https://www.dir.ca.gov/dlse/faq_paydays.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
            ]}
          />

          <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Need Separation Packet Tools?</h3>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed mt-2">
                Access mandatory workplace postings, EDD separation pamphlets, and final paycheck calculation checklists.
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
