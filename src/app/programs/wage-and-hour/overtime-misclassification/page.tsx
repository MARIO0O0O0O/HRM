import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { Scale, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function OvertimeMisclassificationPage() {
  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 text-left">
          <Breadcrumb />
          <Link
            href="/programs/wage-and-hour"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Wage &amp; Hour Hub
          </Link>
        </div>

        <div className="mb-10 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <Scale className="h-3.5 w-3.5" /> Cal. Lab. Code § 510 &amp; § 2775 (ABC Test)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Overtime &amp; Employee Misclassification
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            California overtime rules differ significantly from federal law by enforcing daily overtime thresholds. Misclassifying non-exempt workers or independent contractors creates severe liability.
          </p>
        </div>

        <div className="space-y-8 mb-12 text-left">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              California Overtime Rules (Labor Code § 510)
            </h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>1.5x Regular Rate:</strong> Hours worked beyond 8 in a workday, or beyond 40 in a workweek, or for the first 8 hours on the 7th consecutive day of work.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>2.0x Double Time:</strong> Hours worked beyond 12 in a workday, or beyond 8 hours on the 7th consecutive day of work.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Regular Rate Calculation:</strong> Overtime must include non-discretionary bonuses, shift differentials, and commissions in the regular rate calculation.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              Exempt Salary Threshold &amp; Duties Test
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              To be exempt from overtime under the Executive, Administrative, or Professional exemptions, an employee must meet BOTH tests:
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Salary Basis Test:</strong> Earn a fixed salary at least 2 times the California state minimum wage for full-time employment (40 hrs/wk).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Duties Test:</strong> Customarily and regularly exercise discretion and independent judgment, spending more than 50% of work time on exempt duties.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-indigo-400" />
              The ABC Independent Contractor Test (Labor Code § 2775)
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              Under AB 5 / Labor Code § 2775, a worker is presumed to be an employee unless the hiring entity proves ALL THREE factors:
            </p>
            <ol className="space-y-2 text-sm text-zinc-300 list-decimal list-inside pl-2">
              <li><strong>Part A:</strong> Worker is free from control and direction in performing the work.</li>
              <li><strong>Part B:</strong> Worker performs work outside the usual course of the hiring entity&apos;s business.</li>
              <li><strong>Part C:</strong> Worker is customarily engaged in an independently established trade, occupation, or business.</li>
            </ol>
          </div>
        </div>

        <div className="mb-10 text-left">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 510 — Overtime Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=510',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR DLSE Overtime Laws & Regulations FAQ',
                href: 'https://www.dir.ca.gov/dlse/faq_overtime.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
              {
                label: 'Cal. Lab. Code § 2775 — ABC Independent Contractor Test',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2775',
                source: 'California Legislative Information',
              },
            ]}
          />
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
