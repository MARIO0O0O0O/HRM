import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ValidationLinks from '@/components/programs/ValidationLinks'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { Eye, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function PayTransparencyPage() {
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
            <Eye className="h-3.5 w-3.5" /> SB 1162 &amp; Cal. Lab. Code § 432.3
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Pay Transparency &amp; Salary Disclosure
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            California Senate Bill 1162 mandates pay scale disclosures on all job postings, expands employee rights to request pay scales, and enforces annual pay data reporting for larger employers.
          </p>
        </div>

        <div className="space-y-8 mb-12 text-left">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              Job Posting Pay Scale Mandate (15+ Employees)
            </h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Mandatory Salary Ranges:</strong> Employers with 15 or more employees must include the pay scale (salary or hourly wage range) in any job posting published directly or through third-party job boards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Good-Faith Range:</strong> The pay scale must reflect the salary or hourly range that the employer reasonably expects to pay for the position.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              Employee Request Rights &amp; Record Retention
            </h2>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Applicant &amp; Employee Right to Request:</strong> Upon request, an employer must provide the pay scale for a position to an applicant or current employee holding that role.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>3-Year Record Retention:</strong> Employers must maintain job title and wage rate history records for each employee for the duration of employment plus 3 years.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              CRD Pay Data Reporting (100+ Employees)
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Employers with 100 or more employees (and 100+ labor contractor workers) must submit annual Pay Data Reports to the California Civil Rights Department (CRD) detailing pay data broken down by race, ethnicity, and sex across 10 job categories.
            </p>
          </div>
        </div>

        <div className="mb-10 text-left">
          <ValidationLinks
            links={[
              {
                label: 'Cal. Lab. Code § 432.3 — Pay Scale Disclosure Statutory Text',
                href: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=432.3',
                source: 'California Legislative Information',
              },
              {
                label: 'California Civil Rights Department (CRD) Pay Data Reporting Guidance',
                href: 'https://calcivilrights.ca.gov/paydatareporting/',
                source: 'California Civil Rights Department (CRD)',
              },
            ]}
          />
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  )
}
