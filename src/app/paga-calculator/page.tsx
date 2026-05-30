'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react'

export default function PagaCalculatorPage() {
  const [headcount, setHeadcount] = useState(15)
  const [payFrequency, setPayFrequency] = useState('bi-weekly') // weekly, bi-weekly, semi-monthly, monthly
  const [breakViolationFreq, setBreakViolationFreq] = useState(3) // out of 10
  const [paystubViolationFreq, setPaystubViolationFreq] = useState(2) // out of 10
  const [overtimeViolationFreq, setOvertimeViolationFreq] = useState(1) // out of 10
  
  const [pagaExposure, setPagaExposure] = useState(0)
  const [wageClaimExposure, setWageClaimExposure] = useState(0)
  const [totalExposure, setTotalExposure] = useState(0)

  // Recalculate exposure dynamically whenever parameters change
  // PAGA math reflects AB 2288 + SB 92 reform (effective June 2024)
  useEffect(() => {
    // Determine total pay periods in a year
    let annualPayPeriods = 26
    if (payFrequency === 'weekly') annualPayPeriods = 52
    else if (payFrequency === 'semi-monthly') annualPayPeriods = 24
    else if (payFrequency === 'monthly') annualPayPeriods = 12

    // ── AB 2288 PAGA Penalty Math (post-June 2024 reform) ──────────────────
    // Aggrieved employees (personally experienced violation):
    //   $100/pay period non-willful · $200/pay period repeat/willful
    //   Cap: $9,000 per aggrieved employee (most violations)
    // Non-aggrieved employees: $100 total (not per employee) for most violations
    // Distribution: 35% employees / 65% LWDA (was 25%/75% pre-reform)
    // Standing: only employees who personally experienced violations can bring claims

    const maxFreq = Math.max(breakViolationFreq, paystubViolationFreq, overtimeViolationFreq)
    const violationPayPeriods = Math.ceil(annualPayPeriods * (maxFreq / 10))

    let pagaPenalties = 0
    if (violationPayPeriods > 0) {
      // Per-aggrieved-employee penalty (uncapped pre-reform was unlimited; AB 2288 caps at $9k/employee)
      const penaltyPerEmployee =
        100 + // first pay period
        200 * Math.max(0, violationPayPeriods - 1) // subsequent pay periods at repeat rate
      const uncappedPenalty = headcount * penaltyPerEmployee
      // Apply $9,000 per aggrieved employee cap (AB 2288 § 2699(f)(2))
      const perEmployeeCap = headcount * 9000
      pagaPenalties = Math.min(uncappedPenalty, perEmployeeCap)
    }

    // ── Wage & Break Premium Claims ────────────────────────────────────────
    // Break premium: 1 hour of pay per violation (Labor Code § 226.7)
    // Assuming CA min wage $17/hr (2025); 250 working days/year
    const annualWorkingDays = 250
    const breakViolationsPerYear = annualWorkingDays * (breakViolationFreq / 10)
    const breakPremiumPenalties = headcount * breakViolationsPerYear * 17 // CA min wage 2025

    // Overtime premium claims (1 hr unpaid OT per affected pay period)
    const overtimeViolationsPerYear = annualPayPeriods * (overtimeViolationFreq / 10)
    const overtimePenalties = headcount * overtimeViolationsPerYear * 25.50 // 1.5x $17/hr

    const wageClaims = breakPremiumPenalties + overtimePenalties

    setPagaExposure(pagaPenalties)
    setWageClaimExposure(wageClaims)
    setTotalExposure(pagaPenalties + wageClaims)
  }, [headcount, payFrequency, breakViolationFreq, paystubViolationFreq, overtimeViolationFreq])

  const formattedCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  const payPeriodsLabel = () => {
    if (payFrequency === 'weekly') return '52 pay periods / yr'
    if (payFrequency === 'bi-weekly') return '26 pay periods / yr'
    if (payFrequency === 'semi-monthly') return '24 pay periods / yr'
    return '12 pay periods / yr'
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <ShieldAlert className="h-3.5 w-3.5" /> Compliance Risk Assessment
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            California PAGA Exposure Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            The Private Attorneys General Act (PAGA) allows employees to sue for labor code violations with compounding penalties. Calculate your estimated exposure under the{' '}
            <span className="text-amber-400 font-semibold">AB 2288 reformed penalty structure</span>{' '}(effective June 2024).
          </p>
          <p className="text-xs text-zinc-600 mt-2">
            Updated for AB 2288 + SB 92 · $9,000/employee cap · 35% employee / 65% LWDA split · CA min wage $17/hr (2025)
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-white/5 pb-4">
              <Calculator className="h-5 w-5 text-indigo-400" /> Diagnostic Parameters
            </h2>

            {/* Headcount Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-zinc-400 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-zinc-500" /> Aggrieved Employee Headcount
                </label>
                <span className="text-indigo-400 text-base">{headcount} staff members</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-zinc-500">Includes all shift/hourly and classified W-2 staff over the past year</span>
            </div>

            {/* Pay Frequency Selection */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Pay Period Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                {['weekly', 'bi-weekly', 'semi-monthly', 'monthly'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setPayFrequency(freq)}
                    className={`py-3 px-2 rounded-xl font-bold border transition-colors capitalize cursor-pointer ${
                      payFrequency === freq
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-white/5 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {freq.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500">{payPeriodsLabel()} — penalties compound per aggrieved employee per pay period</span>
            </div>

            {/* Violation Sliders */}
            <div className="flex flex-col gap-6 pt-4 border-t border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Estimated Labor Code Deviation Rates</h3>

              {/* 1. Meal / Rest breaks */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <span className="text-zinc-400">Meal & Rest Period Anomalies</span>
                  <span className="text-indigo-400">{breakViolationFreq} out of 10 pay periods</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={breakViolationFreq}
                  onChange={(e) => setBreakViolationFreq(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-zinc-500">Breaks missed, shortened, late (past hour 5), or not documented properly</span>
              </div>

              {/* 2. Inaccurate Paystubs */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <span className="text-zinc-400">Paystub Detail Errors</span>
                  <span className="text-indigo-400">{paystubViolationFreq} out of 10 pay periods</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={paystubViolationFreq}
                  onChange={(e) => setPaystubViolationFreq(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-zinc-500">Missing itemized rates, clean dates, business names, or overtime breakdowns</span>
              </div>

              {/* 3. Off the clock work */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <span className="text-zinc-400">Off-the-Clock / Unpaid Overtime</span>
                  <span className="text-indigo-400">{overtimeViolationFreq} out of 10 pay periods</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={overtimeViolationFreq}
                  onChange={(e) => setOvertimeViolationFreq(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-[10px] text-zinc-500">Pre-shift set up, post-shift closing, or rounding errors leading to unrecorded work</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Total exposure display */}
            <div className="relative w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-3xl opacity-20 blur-sm pointer-events-none" />
              <div className="relative bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 text-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Total Compliance Risk Exposure</span>
                  <p className="text-4xl sm:text-5xl font-black text-rose-500 mt-3 tracking-tight">
                    {formattedCurrency(totalExposure)}
                  </p>
                  <span className="text-[10px] font-bold text-rose-400/80 border border-rose-500/10 bg-rose-500/5 px-2.5 py-1 rounded-md mt-3 inline-block leading-snug">
                    Litigation & PAGA Penalty Risk
                  </span>
                </div>

                <div className="border-t border-white/5 pt-5 flex flex-col gap-3.5 text-left text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-zinc-600 shrink-0" /> Compounding PAGA Penalties
                    </span>
                    <span className="font-extrabold text-zinc-200">{formattedCurrency(pagaExposure)}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-zinc-600 shrink-0" /> Aggrieved Employee Premium Claims
                    </span>
                    <span className="font-extrabold text-zinc-200">{formattedCurrency(wageClaimExposure)}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
                      <TrendingUp className="h-4 w-4 text-indigo-400 shrink-0" /> BizHR Diagnostic Rating
                    </span>
                    <span className="font-black text-rose-400 uppercase">
                      {totalExposure > 100000 ? 'High Risk' : totalExposure > 25000 ? 'Medium Risk' : 'Low Risk'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/book?exposure=${totalExposure}&headcount=${headcount}`}>
                    <Button className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 active:from-rose-700 text-zinc-50 font-bold tracking-wide py-3.5 rounded-xl shadow-xl shadow-rose-600/10 cursor-pointer flex items-center justify-center gap-2">
                      Lock in $75 Mitigation Consultation <ArrowRight className="h-4.5 w-4.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Advisory / PAGA Notice box */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" /> AB 2288 Reform (June 2024)
              </h3>
              <ul className="flex flex-col gap-1.5 text-xs text-zinc-500">
                <li>• <strong className="text-zinc-400">Distribution:</strong> 35% to aggrieved employees / 65% to LWDA (was 25%/75%)</li>
                <li>• <strong className="text-zinc-400">Cap:</strong> $9,000 per aggrieved employee (most violations)</li>
                <li>• <strong className="text-zinc-400">Standing:</strong> Only employees who personally experienced violations may bring claims</li>
                <li>• <strong className="text-zinc-400">Cure provisions:</strong> Expanded early cure rights — act fast to reduce exposure</li>
                <li>• <strong className="text-zinc-400">Attorney fees:</strong> Still recoverable by plaintiff — settlement pressure remains high</li>
              </ul>
              <p className="text-xs text-zinc-600 leading-relaxed border-t border-white/5 pt-3">
                PAGA penalty calculations are estimates based on disclosed inputs and current statutory rates.
                Actual exposure depends on violation frequency, cure actions taken, arbitration agreements,
                and judicial interpretation. Consult a PAGA defense attorney before making settlement or
                cure decisions. CalHR AI accepts no liability for decisions made based on calculator output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
