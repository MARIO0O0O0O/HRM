'use client'

import { useState, useMemo, useEffect } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { createClient } from '@/lib/supabase/client'
import { ClipboardList, Printer, ExternalLink } from 'lucide-react'

type SizeFilter = 'all' | '1' | '5' | '15' | '50'
type IndustryFilter = 'All' | 'Los Angeles' | 'Cannabis'

interface Posting {
  id: string
  name: string
  agency: string
  threshold: string
  link: string
  industry: IndustryFilter | 'General'
}

const POSTINGS: Posting[] = [
  { id: 'eeoc', name: 'EEOC: Know Your Rights', agency: 'EEOC', threshold: 'All employers', link: 'https://www.eeoc.gov/poster', industry: 'General' },
  { id: 'flsa', name: 'FLSA: Federal Minimum Wage', agency: 'DOL WHD', threshold: 'All employers', link: 'https://www.dol.gov/agencies/whd/posters', industry: 'General' },
  { id: 'osha-fed', name: 'OSHA: Job Safety and Health', agency: 'OSHA', threshold: 'All employers', link: 'https://www.osha.gov/publications/poster', industry: 'General' },
  { id: 'eppa', name: 'EPPA: Polygraph Protection', agency: 'DOL WHD', threshold: 'All employers', link: 'https://www.dol.gov/agencies/whd/posters', industry: 'General' },
  { id: 'userra', name: 'USERRA: Military Leave', agency: 'DOL VETS', threshold: 'All employers', link: 'https://www.dol.gov/agencies/vets/programs/userra/poster', industry: 'General' },
  { id: 'fmla', name: 'FMLA: Family and Medical Leave', agency: 'DOL WHD', threshold: '50+ employees', link: 'https://www.dol.gov/agencies/whd/fmla/poster', industry: 'General' },
  { id: 'dfeh', name: 'CRD: Harassment, Discrimination & Retaliation is Illegal', agency: 'CA CRD', threshold: '5+ employees', link: 'https://calcivilrights.ca.gov/posters/', industry: 'General' },
  { id: 'ca-minwage', name: 'CA Minimum Wage', agency: 'DIR', threshold: 'All employers', link: 'https://www.dir.ca.gov/iwc/minwageconsolidated.htm', industry: 'General' },
  { id: 'psl', name: 'Paid Sick Leave (Lab. Code § 245.5)', agency: 'DIR', threshold: 'All employers', link: 'https://www.dir.ca.gov/dlse/paid_sick_leave.htm', industry: 'General' },
  { id: 'wc', name: "Workers' Compensation (DWC1)", agency: 'DIR DWC', threshold: 'All employers', link: 'https://www.dir.ca.gov/dwc/dwc_home_page.htm', industry: 'General' },
  { id: 'calosha', name: 'Cal/OSHA: Safety and Health', agency: 'Cal/OSHA', threshold: 'All employers', link: 'https://www.dir.ca.gov/dosh/', industry: 'General' },
  { id: 'payday', name: 'Payday Notice', agency: 'DIR DLSE', threshold: 'All employers', link: 'https://www.dir.ca.gov/dlse/dlseforms.htm', industry: 'General' },
  { id: 'edd-ui', name: 'EDD: Unemployment Insurance', agency: 'EDD', threshold: 'All employers', link: 'https://www.edd.ca.gov/pdf_pub_ctr/de1857a.pdf', industry: 'General' },
  { id: 'sdi', name: 'SDI / State Disability Insurance Notice', agency: 'EDD', threshold: 'All employers', link: 'https://www.edd.ca.gov/pdf_pub_ctr/de2515.pdf', industry: 'General' },
  { id: 'cfra', name: 'CFRA: California Family Rights Act (SB 1383)', agency: 'CRD', threshold: '5+ employees', link: 'https://calcivilrights.ca.gov/posters/', industry: 'General' },
  { id: 'pdl', name: 'PDL: Pregnancy Disability Leave', agency: 'CRD', threshold: '5+ employees', link: 'https://calcivilrights.ca.gov/posters/', industry: 'General' },
  { id: 'sb553', name: 'SB 553 WVPP: Workplace Violence Summary', agency: 'Cal/OSHA', threshold: 'All employers (eff. 7/1/2024)', link: 'https://www.dir.ca.gov/dosh/dosh_publications/wvpp.html', industry: 'General' },
  { id: 'sb1162', name: 'SB 1162: Pay Transparency Notice', agency: 'DIR', threshold: '15+ employees', link: 'https://www.dir.ca.gov/dlse/PayTransparency.html', industry: 'General' },
  { id: 'warn', name: 'WARN Act Notice', agency: 'DIR', threshold: '75+ employees (layoff threshold)', link: 'https://www.edd.ca.gov/jobs_and_training/Layoff_Services_WARN.htm', industry: 'General' },
  { id: 'la-city-mw', name: 'LA City Minimum Wage', agency: 'LA OWS', threshold: 'All employers in LA City limits', link: 'https://wagesla.lacity.org/', industry: 'Los Angeles' },
  { id: 'la-county-mw', name: 'LA County Minimum Wage', agency: 'LA County', threshold: 'All employers in unincorporated LA County', link: 'https://dcba.lacounty.gov/minimum-wage/', industry: 'Los Angeles' },
  { id: 'la-psl', name: 'LA Paid Sick Leave (LAMC 187.06)', agency: 'LA OWS', threshold: 'All employers in LA City', link: 'https://wagesla.lacity.org/', industry: 'Los Angeles' },
  { id: 'cannabis-regs', name: 'CA Cannabis Regulations (BCC/DCC)', agency: 'DCC', threshold: 'Cannabis employers', link: 'https://cannabis.ca.gov/', industry: 'Cannabis' },
  { id: 'cannabis-safety', name: 'Safe Workplace Notice (cannabis-specific)', agency: 'Cal/OSHA', threshold: 'Cannabis employers', link: 'https://www.dir.ca.gov/dosh/', industry: 'Cannabis' },
]

const SIZE_FILTERS: { label: string; value: SizeFilter }[] = [
  { label: 'All sizes', value: 'all' },
  { label: '1+ employees', value: '1' },
  { label: '5+ employees', value: '5' },
  { label: '15+ employees', value: '15' },
  { label: '50+ employees', value: '50' },
]

const INDUSTRY_FILTERS: IndustryFilter[] = ['All', 'Los Angeles', 'Cannabis']

function thresholdNum(threshold: string): number {
  const m = threshold.match(/^(\d+)\+/)
  return m ? parseInt(m[1], 10) : 0
}

function badgeClass(threshold: string) {
  if (threshold.startsWith('All')) return 'bg-white/5 text-zinc-500'
  if (threshold.startsWith('5+')) return 'bg-indigo-500/10 text-indigo-300'
  if (threshold.startsWith('15+')) return 'bg-amber-500/10 text-amber-300'
  if (threshold.startsWith('50+') || threshold.startsWith('75+')) return 'bg-rose-500/10 text-rose-300'
  return 'bg-white/5 text-zinc-500'
}

export default function MandatoryPostingsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all')
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>('All')

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'mandatory-postings', event_type: 'view' }).then(() => {})
    } catch {
      // ignore
    }
  }, [])

  const visible = useMemo(() => {
    return POSTINGS.filter((p) => {
      if (industryFilter !== 'All' && p.industry !== industryFilter) return false
      if (industryFilter === 'All' && p.industry !== 'General') return false
      if (sizeFilter !== 'all') {
        const selected = parseInt(sizeFilter, 10)
        const required = thresholdNum(p.threshold)
        if (required > selected) return false
      }
      return true
    })
  }, [sizeFilter, industryFilter])

  const checkedCount = visible.filter((p) => checked[p.id]).length

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8 print:hidden" />

        <div className="text-center mb-10 print:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto print:hidden">
            <ClipboardList className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6 print:text-black print:bg-none">
            Mandatory Workplace Postings Checklist
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed print:text-black">
            Track required federal, California state, and local postings for your business. Check off each one as you obtain and display it.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 print:hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Filter by company size</p>
            <div className="flex flex-wrap gap-2">
              {SIZE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setSizeFilter(f.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    sizeFilter === f.value ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-white/10 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Filter by location / industry</p>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setIndustryFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    industryFilter === f ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' : 'border-white/10 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-zinc-300">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs mr-2">
              {checkedCount}/{visible.length}
            </span>
            required postings checked
          </p>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
          >
            <Printer className="h-4 w-4" /> Print / Download PDF
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {visible.length === 0 && (
            <p className="text-zinc-500 text-sm py-8 text-center">No postings match the selected filters.</p>
          )}
          {visible.map((posting) => {
            const isChecked = !!checked[posting.id]
            return (
              <div
                key={posting.id}
                onClick={() => toggle(posting.id)}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors break-inside-avoid ${
                  isChecked ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-white/10 bg-[#111111] hover:border-white/20'
                }`}
              >
                <div
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-600'
                  }`}
                >
                  {isChecked && <span className="text-[10px] font-bold text-black">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className={`font-semibold text-sm ${isChecked ? 'text-emerald-300' : 'text-zinc-200'}`}>{posting.name}</span>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass(posting.threshold)}`}>{posting.threshold}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-zinc-600">Issued by: <strong className="text-zinc-500">{posting.agency}</strong></span>
                    <a
                      href={posting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="print:hidden flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Obtain poster <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-10 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-300/90 print:hidden">
          <strong>Note:</strong> Posting requirements change. Verify current versions with each issuing agency before purchasing or displaying posters.
        </div>
      </div>
    </div>
  )
}
