'use client'

import { useState } from 'react'
import {
  ShieldAlert,
  Calculator,
  ClipboardCheck,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Info,
  Scale,
  DollarSign,
  Users
} from 'lucide-react'

interface PagaNestedPortalModalProps {
  onOpenBooking?: () => void
}

export default function PagaNestedPortalModal({ onOpenBooking }: PagaNestedPortalModalProps) {
  const [subView, setSubView] = useState<'tier1' | 'calculator' | 'checklist'>('tier1')

  // Calculator Sub-View State
  const [employeeCount, setEmployeeCount] = useState<number>(25)
  const [payFreq, setPayFreq] = useState<'weekly' | 'bi-weekly' | 'semi-monthly'>('bi-weekly')
  const [violationsPerPeriod, setViolationsPerPeriod] = useState<number>(2)
  const [applyProactiveCap, setApplyProactiveCap] = useState<boolean>(true)

  // Pay periods per year
  const payPeriodsMap = {
    weekly: 52,
    'bi-weekly': 26,
    'semi-monthly': 24,
  }
  const currentPayPeriods = payPeriodsMap[payFreq]

  // Penalty Calculation Math
  // $100 initial per employee per pay period for 1st violation, $200 for subsequent
  // Baseline exposure calculation
  const totalPeriodsWithViolations = currentPayPeriods
  const penaltyPerEmployee = 100 + 200 * Math.max(0, totalPeriodsWithViolations - 1) * (violationsPerPeriod / 2)
  const uncappedTotalExposure = employeeCount * penaltyPerEmployee
  const cappedMaxExposure = Math.min(uncappedTotalExposure, employeeCount * 9000)

  // 15% Statutory Cap for Proactive Audit (85% reduction)
  const finalCalculatedExposure = applyProactiveCap
    ? Math.round(cappedMaxExposure * 0.15)
    : Math.round(cappedMaxExposure)

  const lwdaShare = Math.round(finalCalculatedExposure * 0.65)
  const employeeShare = Math.round(finalCalculatedExposure * 0.35)

  // Checklist Sub-View State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'paystub-entity': false,
    'paystub-dates': false,
    'paystub-rates': false,
    'paystub-wages': false,
    'paystub-sick': false,
    'break-meal': false,
    'break-rest': false,
    'break-premium': false,
    'safety-wvpp': false,
    'safety-log': false,
    'safety-iipp': false,
    'notice-wage': false,
    'notice-dfeh': false,
    'notice-posters': false,
  })

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const checkedCount = Object.values(checkedItems).filter(Boolean).length
  const totalChecklistItems = Object.keys(checkedItems).length

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: PAGA EDUCATIONAL HUB (DEFAULT MODAL VIEW)                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5 text-xs text-amber-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Scale className="h-4 w-4 shrink-0 text-amber-400" />
              <span>California Labor Code § 2698 (PAGA) Overview</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              The California Private Attorneys General Act (PAGA) allows aggrieved employees to step into the shoes of the state Labor and Workforce Development Agency (LWDA) to sue employers for Labor Code violations, with a <strong>1-year statutory lookback period</strong>.
            </p>
          </div>

          {/* Penalty Math & Distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <DollarSign className="h-4 w-4 text-amber-400" />
                <span>Statutory Penalty Math</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Standard PAGA civil penalties compound per employee per pay period: <strong>$100</strong> for the initial violation and <strong>$200</strong> for each subsequent violation.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Users className="h-4 w-4 text-indigo-400" />
                <span>65% LWDA / 35% Employee Split</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Under 2024–2026 AB 2288 reforms, statutory penalties collected are split: <strong>65% to the State LWDA</strong> and <strong>35% to aggrieved employees</strong>.
              </p>
            </div>
          </div>

          {/* 2024-2026 PAGA Reform Cure Rules */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              2024–2026 Statutory Reform & Cap Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <span className="font-bold text-emerald-300 block mb-1">15% Proactive Audit Cap</span>
                <span className="text-[11px] text-zinc-300 leading-normal block">
                  Taking proactive reasonable compliance steps prior to receiving an LWDA notice caps statutory penalties at 15% (an <strong>85% penalty reduction</strong>).
                </span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <span className="font-bold text-amber-300 block mb-1">30% Post-Notice Cure Cap</span>
                <span className="text-[11px] text-zinc-300 leading-normal block">
                  Curing technical violations within <strong>60 days</strong> of LWDA notice receipt caps statutory penalties at 30% of maximum exposure.
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('calculator')}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Risk Exposure</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('checklist')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <ClipboardCheck className="h-4 w-4 text-indigo-400" />
              <span>Review Audit Checklist</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenBooking) onOpenBooking()
              }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Consultation ($75)</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 2: SUB-VIEW A (PAGA RISK CALCULATOR)                                */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'calculator' && (
        <div className="space-y-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to PAGA Guide</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Risk Calculator
            </span>
          </div>

          {/* Calculator Controls */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-5">
            {/* Slider: Non-exempt employee count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-300">Non-Exempt Employees</label>
                <span className="font-black text-amber-400 text-sm">{employeeCount} Employees</span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={employeeCount}
                onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>5</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>

            {/* Selector: Pay Frequency & Counter: Violations per period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1.5">Pay Frequency</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPayFreq('weekly')}
                    className={`py-2 px-2 rounded-lg font-bold text-[11px] border transition-colors ${
                      payFreq === 'weekly'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    Weekly (52)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayFreq('bi-weekly')}
                    className={`py-2 px-2 rounded-lg font-bold text-[11px] border transition-colors ${
                      payFreq === 'bi-weekly'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    Bi-Weekly (26)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayFreq('semi-monthly')}
                    className={`py-2 px-2 rounded-lg font-bold text-[11px] border transition-colors ${
                      payFreq === 'semi-monthly'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    Semi-Mo (24)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1.5">Violations Per Pay Period</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setViolationsPerPeriod(val)}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border transition-colors ${
                        violationsPerPeriod === val
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Checkbox: Apply Proactive Audit Cap */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-3">
              <input
                type="checkbox"
                id="proactiveCap"
                checked={applyProactiveCap}
                onChange={(e) => setApplyProactiveCap(e.target.checked)}
                className="h-4 w-4 accent-amber-500 rounded cursor-pointer"
              />
              <label htmlFor="proactiveCap" className="text-xs font-bold text-zinc-200 cursor-pointer">
                Apply Proactive Audit Cap (Applies 85% penalty reduction / 15% statutory cap)
              </label>
            </div>
          </div>

          {/* Live Exposure Output Card */}
          <div className="bg-[#141414] border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Estimated Exposure</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                ${finalCalculatedExposure.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">State LWDA Share (65%)</span>
                <span className="text-base font-black text-indigo-300">${lwdaShare.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Employee Share (35%)</span>
                <span className="text-base font-black text-emerald-300">${employeeShare.toLocaleString()}</span>
              </div>
            </div>

            {applyProactiveCap && (
              <p className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg text-center font-medium">
                Proactive audit cap applied — saving ${Math.round(cappedMaxExposure - finalCalculatedExposure).toLocaleString()} (85% penalty cap under AB 2288).
              </p>
            )}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 2: SUB-VIEW B (UNIVERSAL CA COMPLIANCE CHECKLIST)                    */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'checklist' && (
        <div className="space-y-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to PAGA Guide</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {checkedCount}/{totalChecklistItems} Checked
            </span>
          </div>

          {/* Core Exposure Areas Checklist */}
          <div className="space-y-5 text-xs">
            {/* Category 1: Paystubs (LC § 226) */}
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> 1. Paystubs & Wage Statements (LC § 226)
              </h4>
              <div className="space-y-2 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['paystub-entity']}
                    onChange={() => toggleCheck('paystub-entity')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Legal entity name & physical address listed accurately on every stub.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['paystub-dates']}
                    onChange={() => toggleCheck('paystub-dates')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Inclusive pay period dates explicitly shown (start & end dates).</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['paystub-rates']}
                    onChange={() => toggleCheck('paystub-rates')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>All applicable hourly rates and corresponding hours worked itemized.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['paystub-wages']}
                    onChange={() => toggleCheck('paystub-wages')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Gross wages, net wages, and itemized tax/benefit deductions clearly shown.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['paystub-sick']}
                    onChange={() => toggleCheck('paystub-sick')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Paid Sick Leave balance updated on stub or separate written notice every payday.</span>
                </label>
              </div>
            </div>

            {/* Category 2: Meal & Rest Breaks (LC § 226.7 / § 512) */}
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> 2. Meal & Rest Breaks (LC § 226.7 / § 512)
              </h4>
              <div className="space-y-2 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['break-meal']}
                    onChange={() => toggleCheck('break-meal')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Uninterrupted 30-minute meal break provided before the end of the 5th hour of work.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['break-rest']}
                    onChange={() => toggleCheck('break-rest')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>10-minute net rest break provided for every 4 hours worked or major fraction thereof.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['break-premium']}
                    onChange={() => toggleCheck('break-premium')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>1-hour premium pay regular rate tracking for missed or non-compliant break days.</span>
                </label>
              </div>
            </div>

            {/* Category 3: Safety & Cal/OSHA */}
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> 3. Safety & Cal/OSHA (SB 553 & Title 8 § 3203)
              </h4>
              <div className="space-y-2 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['safety-wvpp']}
                    onChange={() => toggleCheck('safety-wvpp')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Site-specific written Workplace Violence Prevention Plan (SB 553 / LC § 6401.9).</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['safety-log']}
                    onChange={() => toggleCheck('safety-log')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Violent Incident Log maintained for 5 years with PII anonymized.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['safety-iipp']}
                    onChange={() => toggleCheck('safety-iipp')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Title 8 CCR § 3203 Injury & Illness Prevention Program (IIPP) signed & active.</span>
                </label>
              </div>
            </div>

            {/* Category 4: New Hire & Notices */}
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> 4. New Hire Notices & Disclosures
              </h4>
              <div className="space-y-2 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['notice-wage']}
                    onChange={() => toggleCheck('notice-wage')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Labor Code § 2810.5 Wage Theft Notice provided to all non-exempt hires at onboarding.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['notice-dfeh']}
                    onChange={() => toggleCheck('notice-dfeh')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>CRD DFEH-185 Harassment rights pamphlet distributed at hire.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedItems['notice-posters']}
                    onChange={() => toggleCheck('notice-posters')}
                    className="mt-0.5 h-4 w-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span>Mandatory California & Federal labor law posting posters displayed in common area.</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-[11px] text-zinc-400 leading-relaxed space-y-1">
            <p className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0" /> Mandatory Diagnostic Disclaimer
            </p>
            <p>
              Note: This checklist highlights common California Labor Code exposure areas. Specific statutory obligations vary across industries (e.g., hospitality, construction, healthcare). This tool is for diagnostic education and does not constitute formal legal counsel.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
