import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { Clock, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react'

export default function MealAndRestBreaksPage() {
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
            <Clock className="h-3.5 w-3.5" /> California Labor Code § 512 &amp; IWC Wage Orders
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Meal &amp; Rest Break Compliance
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Meal and rest break violations represent the single largest source of PAGA lawsuits and class actions in California. Strict timing, duty-free rules, and premium pay mandates apply.
          </p>
        </div>

        {/* Deep Content Grid */}
        <div className="space-y-8 mb-12 text-left">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              Meal Break Rules (Labor Code § 512)
            </h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Timing Requirement:</strong> A 30-minute meal break must begin before the end of the 5th hour of work (e.g. before 5:00:00 elapsed hours). A break starting at 5:01 is non-compliant.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Second Meal Break:</strong> A second 30-minute meal break must be provided for shifts exceeding 10 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Uninterrupted &amp; Duty-Free:</strong> Employees must be relieved of all duties and free to leave the premises. Answering a work phone call or staying at a register invalidates the break.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              Rest Break Rules (IWC Orders)
            </h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Paid 10-Minute Breaks:</strong> Mandatory paid 10-minute net rest period for every 4 hours worked or major fraction thereof.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Middle of Work Period:</strong> Rest breaks must be scheduled in the middle of each 4-hour work period insofar as practicable.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-amber-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              1-Hour Premium Pay Mandate
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              If an employer fails to provide a compliant meal or rest break, the employer must pay the employee <strong>1 hour of regular pay</strong> per missed or non-compliant break on the next regular pay period. Failure to pay premium pay creates compounding wage statement and PAGA penalties.
            </p>
          </div>
        </div>

        {/* Validation Links */}
        <div className="mb-10 text-left">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 512 — Statutory Meal Period Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=512',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR DLSE Meal Period FAQ & Legal Interpretations',
                href: 'https://www.dir.ca.gov/dlse/faq_mealperiods.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
              {
                label: 'DIR DLSE Rest Period FAQ',
                href: 'https://www.dir.ca.gov/dlse/faq_restperiods.htm',
                source: 'California Department of Industrial Relations (DIR)',
              },
            ]}
          />
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
