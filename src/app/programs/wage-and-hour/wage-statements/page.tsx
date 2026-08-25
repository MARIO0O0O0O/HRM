import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function WageStatementsPage() {
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
            <FileText className="h-3.5 w-3.5" /> Cal. Lab. Code § 226(a)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Itemized Wage Statement Requirements
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Labor Code § 226(a) requires California employers to furnish itemized wage statements containing 9 specific items with every paycheck. Missing a single item triggers statutory penalties up to $4,000 per employee plus PAGA claims.
          </p>
        </div>

        <div className="space-y-8 mb-12 text-left">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              The 9 Mandatory Paystub Items (Labor Code § 226(a))
            </h2>
            <ol className="space-y-3 text-sm text-zinc-300 list-decimal list-inside">
              <li><strong>Gross Wages Earned:</strong> Total gross earnings for the pay period.</li>
              <li><strong>Total Hours Worked:</strong> Actual hours worked (for non-exempt employees).</li>
              <li><strong>Piece-Rate Units:</strong> Number of piece-rate units earned and applicable rate (if applicable).</li>
              <li><strong>All Deductions:</strong> Itemized list of all deductions (taxes, benefit contributions).</li>
              <li><strong>Net Wages Earned:</strong> Total net pay after deductions.</li>
              <li><strong>Inclusive Pay Period Dates:</strong> Start date and end date of the pay period.</li>
              <li><strong>Employee Identification:</strong> Employee name and last 4 digits of SSN or employee ID number.</li>
              <li><strong>Employer Legal Name &amp; Address:</strong> Exact legal entity name and physical address of employer.</li>
              <li><strong>Hourly Rates &amp; Hours:</strong> All applicable hourly rates and corresponding hours worked at each rate.</li>
            </ol>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-amber-300 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              Statutory Penalties for Non-Compliant Wage Statements
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Under Labor Code § 226(e), an employee suffering injury as a result of a knowing and intentional failure to provide a compliant wage statement is entitled to <strong>$50 for the initial pay period violation and $100 per employee for each subsequent violation</strong>, up to a maximum aggregate of $4,000 per employee, plus attorney fees.
            </p>
          </div>
        </div>

        <div className="mb-10 text-left">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 226 — Statutory Itemized Wage Statement Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=226',
                source: 'California Legislative Information',
              },
              {
                label: 'DIR DLSE Itemized Wage Statement Requirements Sample & Overview',
                href: 'https://www.dir.ca.gov/dlse/Paystatements.pdf',
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
