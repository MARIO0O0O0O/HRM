'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { createClient } from '@/lib/supabase/client'
import { Users, Printer, ScaleIcon } from 'lucide-react'

interface LawCard {
  threshold: number
  name: string
  citation: string
  summary: string
  note?: string
}

const LAWS: LawCard[] = [
  { threshold: 1, name: 'FEHA Harassment Prevention', citation: 'Gov. Code § 12940', summary: 'Prohibits workplace harassment and discrimination; requires employers to take reasonable steps to prevent and correct harassment.' },
  { threshold: 1, name: 'SB 553 — Workplace Violence Prevention Plan (WVPP)', citation: 'Cal. Lab. Code § 6401.9', summary: 'Requires all California employers to establish, implement, and maintain an effective Workplace Violence Prevention Plan.' },
  { threshold: 1, name: 'CA Paid Sick Leave', citation: 'Lab. Code § 245.5', summary: 'Employees accrue at least one hour of paid sick leave for every 30 hours worked, up to 40 hours per year.' },
  { threshold: 1, name: 'Wage Theft Prevention Act — Notice to Employees', citation: 'Lab. Code § 2810.5', summary: 'Employers must provide each new hire a written notice at time of hire covering pay rate, pay day, employer name, and other key wage terms.' },
  { threshold: 5, name: 'CFRA — California Family Rights Act', citation: 'Gov. Code § 12945.2 (SB 1383)', summary: 'Entitles eligible employees at employers with 5+ employees to up to 12 weeks of unpaid, job-protected leave per year for qualifying family or medical reasons.' },
  { threshold: 5, name: 'NPLA — New Parent Leave Act', citation: 'Gov. Code § 12945.6', summary: 'Guarantees up to 12 weeks of unpaid, job-protected parental leave for bonding with a new child for employers with 5–19 employees (folded into CFRA at 5+).' },
  { threshold: 5, name: 'Cal/OSHA — Injury & Illness Prevention Program (IIPP)', citation: 'Title 8, Cal. Code Regs. § 3203', summary: 'Requires employers to establish and maintain a written IIPP addressing safety responsibility, communication, hazard assessment, and recordkeeping.' },
  { threshold: 10, name: 'Cal/OSHA 300 Log — Injury & Illness Recordkeeping', citation: 'Title 8, Cal. Code Regs. § 14300', summary: 'Employers must record work-related fatalities, injuries, and illnesses on OSHA Form 300 and post the annual summary each February.' },
  { threshold: 15, name: 'SB 1162 — Pay Transparency / Pay Scale Disclosure', citation: 'Lab. Code § 432.3', summary: 'Requires employers to include the pay scale in all job postings and to provide the pay scale for a position to an employee upon request.' },
  { threshold: 15, name: 'ADA — Americans with Disabilities Act (Federal)', citation: '42 U.S.C. § 12111', summary: 'Prohibits discrimination against qualified individuals with disabilities and requires employers to provide reasonable accommodations.' },
  { threshold: 25, name: 'CA Minimum Wage — Higher Tier', citation: 'Lab. Code § 1182.12', summary: 'California applies a higher-tier minimum wage schedule for employers with 26 or more employees; verify the current rate with DIR each year.' },
  { threshold: 50, name: 'FMLA — Federal Family & Medical Leave Act', citation: '29 U.S.C. § 2611', summary: 'Entitles eligible employees to 12 weeks of unpaid, job-protected leave per year — applies only if 50 employees are employed within a 75-mile radius.', note: '75-mile radius' },
  { threshold: 50, name: 'EEO-1 Reporting', citation: '29 C.F.R. § 1602.7', summary: 'Employers must file an annual EEO-1 Component 1 report with the EEOC categorizing employees by job category, race/ethnicity, and sex.' },
  { threshold: 100, name: 'CA Pay Data Reporting — SB 973', citation: 'Gov. Code § 12999', summary: 'Requires annual submission of pay data to the Civil Rights Department (CRD) broken down by race, ethnicity, sex, and job category.' },
  { threshold: 250, name: 'CA WARN Act — Advance Notice of Layoffs', citation: 'Lab. Code § 1400 et seq.', summary: 'Requires 60 days advance written notice to employees, the Employment Development Department (EDD), and local officials before mass layoffs or plant closings.' },
]

const THRESHOLDS = [1, 5, 10, 15, 25, 50, 100, 250]

export default function ThresholdCheckerPage() {
  const [count, setCount] = useState<number>(1)

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'threshold-checker', event_type: 'view' }).then(() => {})
    } catch {
      // ignore
    }
  }, [])

  const handleInput = (val: number) => {
    const clamped = Math.max(1, Math.min(300, val))
    setCount(isNaN(clamped) ? 1 : clamped)
  }

  const applies = (threshold: number) => count >= threshold

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8 print:hidden" />

        <div className="text-center mb-10 print:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto print:hidden">
            <ScaleIcon className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6 print:text-black print:bg-none">
            California Employer Threshold Checker
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed print:text-black">
            Enter your employee count to instantly see which California and federal employment laws apply to your organization.
          </p>
        </div>

        {/* Input */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 print:hidden">
          <label className="flex items-center gap-1.5 font-semibold text-zinc-200 mb-5">
            <Users className="h-4 w-4 text-zinc-500" /> How many employees do you have?
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={300}
                value={count}
                onChange={(e) => handleInput(parseInt(e.target.value, 10))}
                className="w-24 bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-3 text-2xl font-bold text-zinc-100 text-center focus:outline-none focus:border-indigo-500/50 transition-colors"
                aria-label="Employee count"
              />
              <span className="text-zinc-500 text-xs">employees<br />(1–300)</span>
            </div>
            <div className="flex-1 w-full">
              <input
                type="range"
                min={1}
                max={300}
                value={count}
                onChange={(e) => handleInput(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                aria-label="Employee count slider"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1 select-none">
                <span>1</span><span>75</span><span>150</span><span>225</span><span>300</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {THRESHOLDS.map((t) => (
              <button
                key={t}
                onClick={() => setCount(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  count >= t ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' : 'bg-[#0a0a0a] text-zinc-500 border-white/10 hover:border-white/20'
                }`}
              >
                {t}+
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <h2 className="text-xl font-bold text-zinc-100">
            Laws applicable at{' '}
            <span className="text-indigo-400">{count} employee{count !== 1 ? 's' : ''}</span>
          </h2>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              {LAWS.filter((l) => applies(l.threshold)).length} applies
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600">
              <span className="inline-block w-2 h-2 rounded-full bg-zinc-700" />
              {LAWS.filter((l) => !applies(l.threshold)).length} not yet
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {THRESHOLDS.map((threshold) => {
            const group = LAWS.filter((l) => l.threshold === threshold)
            if (group.length === 0) return null
            return (
              <div key={threshold}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${applies(threshold) ? 'bg-indigo-500/15 text-indigo-300' : 'bg-white/5 text-zinc-600'}`}>
                    {threshold}+ employees
                  </div>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.map((law) => {
                    const active = applies(law.threshold)
                    return (
                      <div
                        key={law.name}
                        className={`bg-[#111111] rounded-2xl border p-5 transition-all ${active ? 'border-emerald-500/20' : 'border-white/5 opacity-50'}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${active ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-zinc-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                            {active ? 'Applies' : 'Not yet'}
                          </span>
                          {law.note && <span className="text-xs bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-medium shrink-0">⚠ {law.note}</span>}
                        </div>
                        <h3 className="font-bold text-sm text-zinc-100 mb-1 leading-snug">{law.name}</h3>
                        <p className="text-xs font-mono text-zinc-600 mb-2">{law.citation}</p>
                        <p className="text-sm text-zinc-500 leading-relaxed">{law.summary}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col gap-5 print:hidden">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 text-sm text-zinc-400">
            <strong className="text-zinc-200">FMLA 75-mile radius note:</strong> The federal FMLA applies only if you have 50+ employees within 75 miles of the employee&apos;s worksite. Remote workers may count toward the total, but the radius is measured from the worksite, not headquarters.
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-zinc-100">Not sure what applies to you?</h3>
              <p className="text-sm text-zinc-500 mt-1">Every employer&apos;s situation is different — happy to help you sort through it.</p>
            </div>
            <a href="/contact" className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
              Talk to an HR expert →
            </a>
          </div>
          <button
            onClick={() => window.print()}
            className="self-end flex items-center gap-2 border border-white/10 text-zinc-400 px-5 py-2.5 rounded-xl hover:border-white/20 hover:text-zinc-200 transition-colors text-sm font-semibold"
          >
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
          <p className="text-xs text-zinc-600 italic border-t border-white/5 pt-5">
            This tool is for general informational purposes only and does not constitute legal advice. Employee count thresholds may have additional conditions (hours worked, location, industry) not captured here. Consult qualified legal counsel before making compliance decisions.
          </p>
          <LegalDisclaimer />
        </div>
      </div>
    </div>
  )
}
