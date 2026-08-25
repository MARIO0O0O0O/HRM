'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Info,
  CheckCircle2,
  Lightbulb
} from 'lucide-react'

interface PagaCalculatorComponentProps {
  compact?: boolean
}

export default function PagaCalculatorComponent({ compact = false }: PagaCalculatorComponentProps) {
  const [headcount, setHeadcount] = useState(15)
  const [payFrequency, setPayFrequency] = useState('bi-weekly')
  const [breakViolationFreq, setBreakViolationFreq] = useState(3)
  const [paystubViolationFreq, setPaystubViolationFreq] = useState(2)
  const [overtimeViolationFreq, setOvertimeViolationFreq] = useState(1)

  const [pagaExposure, setPagaExposure] = useState((() => {
    const annualPayPeriods = 26
    const maxFreq = Math.max(3, 2, 1)
    const violationPayPeriods = Math.ceil(annualPayPeriods * (maxFreq / 10))
    const penaltyPerEmployee = 100 + 200 * Math.max(0, violationPayPeriods - 1)
    const uncappedPenalty = 15 * penaltyPerEmployee
    const perEmployeeCap = 15 * 9000
    return Math.min(uncappedPenalty, perEmployeeCap)
  })())
  const [wageClaimExposure, setWageClaimExposure] = useState((() => {
    const breakPremium = 15 * (250 * (3 / 10)) * 17
    const overtimePremium = 15 * (26 * (1 / 10)) * 25.50
    return breakPremium + overtimePremium
  })())
  const [totalExposure, setTotalExposure] = useState((() => {
    const annualPayPeriods = 26
    const maxFreq = Math.max(3, 2, 1)
    const violationPayPeriods = Math.ceil(annualPayPeriods * (maxFreq / 10))
    const penaltyPerEmployee = 100 + 200 * Math.max(0, violationPayPeriods - 1)
    const uncappedPenalty = 15 * penaltyPerEmployee
    const perEmployeeCap = 15 * 9000
    return Math.min(uncappedPenalty, perEmployeeCap)
  })() + (() => {
    const breakPremium = 15 * (250 * (3 / 10)) * 17
    const overtimePremium = 15 * (26 * (1 / 10)) * 25.50
    return breakPremium + overtimePremium
  })())

  useEffect(() => {
    try {
      createClient()
        .from('tool_usage_events')
        .insert({ tool_slug: 'paga-calculator', event_type: 'view' })
        .then(() => {})
    } catch {
      // ignore analytics failures
    }
  }, [])

  useEffect(() => {
    let annualPayPeriods = 26
    if (payFrequency === 'weekly') annualPayPeriods = 52
    else if (payFrequency === 'semi-monthly') annualPayPeriods = 24
    else if (payFrequency === 'monthly') annualPayPeriods = 12

    const maxFreq = Math.max(breakViolationFreq, paystubViolationFreq, overtimeViolationFreq)
    const violationPayPeriods = Math.ceil(annualPayPeriods * (maxFreq / 10))

    let pagaPenalties = 0
    if (violationPayPeriods > 0) {
      const penaltyPerEmployee =
        100 + 200 * Math.max(0, violationPayPeriods - 1)
      const uncappedPenalty = headcount * penaltyPerEmployee
      const perEmployeeCap = headcount * 9000
      pagaPenalties = Math.min(uncappedPenalty, perEmployeeCap)
    }

    const annualWorkingDays = 250
    const breakViolationsPerYear = annualWorkingDays * (breakViolationFreq / 10)
    const breakPremiumPenalties = headcount * breakViolationsPerYear * 17

    const overtimeViolationsPerYear = annualPayPeriods * (overtimeViolationFreq / 10)
    const overtimePenalties = headcount * overtimeViolationsPerYear * 25.50

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

  const violationPayPeriodsForDisplay = (() => {
    let annualPayPeriods = 26
    if (payFrequency === 'weekly') annualPayPeriods = 52
    else if (payFrequency === 'semi-monthly') annualPayPeriods = 24
    else if (payFrequency === 'monthly') annualPayPeriods = 12
    const maxFreq = Math.max(breakViolationFreq, paystubViolationFreq, overtimeViolationFreq)
    return Math.ceil(annualPayPeriods * (maxFreq / 10))
  })()

  const capReached = headcount * 9000 <= pagaExposure + 1 && violationPayPeriodsForDisplay > 1

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
      {/* Controls Panel */}
      <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
        <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-white/5 pb-4">
          <Calculator className="h-5 w-5 text-indigo-400" /> Tell Us About Your Team
        </h2>

        {/* Headcount Input */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <label className="text-zinc-400 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-zinc-500" /> Employee Headcount
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
          <span className="text-[10px] text-zinc-500">All shift/hourly and classified W-2 staff over the past year</span>
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
          <span className="text-[10px] text-zinc-500">{payPeriodsLabel()} — penalties are calculated per aggrieved employee, per pay period</span>
        </div>

        {/* Violation Sliders */}
        <div className="flex flex-col gap-6 pt-4 border-t border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">How Often Do These Happen?</h3>
          <p className="text-[11px] text-zinc-600 -mt-3">
            Rough estimates are fine — most owners land these within a pay period or two of accuracy.
          </p>

          {/* 1. Meal / Rest breaks */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-zinc-400">Meal &amp; Rest Break Issues</span>
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
            <span className="text-[10px] text-zinc-500">Breaks missed, shortened, taken late (after hour 5), or not documented</span>
          </div>

          {/* 2. Inaccurate Paystubs */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-zinc-400">Paystub Detail Gaps</span>
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
            <span className="text-[10px] text-zinc-500">Missing itemized rates, pay period dates, business name, or overtime breakdown</span>
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
            <span className="text-[10px] text-zinc-500">Pre-shift setup, post-shift closing, or rounding errors that go unrecorded</span>
          </div>
        </div>
      </div>

      {/* Results Summary Box */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Total exposure display */}
        <div className="relative w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl opacity-20 blur-sm pointer-events-none" />
          <div className="relative bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 text-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Estimated PAGA Exposure</span>
              <p className="text-4xl sm:text-5xl font-black text-zinc-50 mt-3 tracking-tight">
                {formattedCurrency(totalExposure)}
              </p>
              <span className="text-[10px] font-bold text-indigo-300 border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-1 rounded-md mt-3 inline-block leading-snug">
                A rough estimate — not a bill or a prediction
              </span>
            </div>

            <div className="border-t border-white/5 pt-5 flex flex-col gap-3.5 text-left text-xs sm:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-zinc-600 shrink-0" /> Statutory PAGA Penalties
                </span>
                <span className="font-extrabold text-zinc-200">{formattedCurrency(pagaExposure)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-zinc-600 shrink-0" /> Unpaid Wage &amp; Break Premiums
                </span>
                <span className="font-extrabold text-zinc-200">{formattedCurrency(wageClaimExposure)}</span>
              </div>

              {/* Show Your Work */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3.5 flex gap-2.5">
                <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  <strong className="text-zinc-400">Show your work:</strong> {headcount} employees × an estimated {violationPayPeriodsForDisplay} affected pay period{violationPayPeriodsForDisplay === 1 ? '' : 's'} × $100 (first) / $200 (each after) per employee{capReached ? ', capped at $9,000 per employee under AB 2288' : ''} = statutory penalties. Wage premiums are added separately for missed breaks and unpaid overtime.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href={`/book?exposure=${totalExposure}&headcount=${headcount}`}>
                <Button variant="outline" className="w-full border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 font-semibold tracking-wide py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2">
                  Want a second opinion? Book a $75 call <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-[10px] text-zinc-600 mt-2">Totally optional — the numbers above are yours to keep either way.</p>
            </div>
          </div>
        </div>

        {/* Path to compliance */}
        {!compact && (
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> Your Path to Compliance
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Almost everything on this page is fixable — most employers close these gaps with a policy update,
              a training session, and a paystub template fix. AB 2288 also expanded early{' '}
              <strong className="text-zinc-300">cure rights</strong>: correcting certain violations quickly,
              before a claim escalates, can reduce or eliminate the associated penalty.
            </p>
            <div className="flex items-start gap-2 text-xs text-zinc-500 pt-1">
              <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Start with whichever slider above is highest — that&apos;s usually the fastest win.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
