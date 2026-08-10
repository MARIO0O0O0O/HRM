'use client'

import { useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

// SB 294's notice deadline: February 1 every calendar year.
const DEADLINE_MONTH = 1 // 0-indexed: February
const DEADLINE_DAY = 1

export default function AnnualDeadlineTracker() {
  const [lastNoticeDate, setLastNoticeDate] = useState('')
  const [result, setResult] = useState<{
    nextDue: string
    daysUntil: number
    isFirstNotice: boolean
  } | null>(null)

  const calculate = () => {
    const today = new Date()
    const thisYear = today.getFullYear()
    let nextDeadline = new Date(thisYear, DEADLINE_MONTH, DEADLINE_DAY)
    if (today >= nextDeadline) {
      nextDeadline = new Date(thisYear + 1, DEADLINE_MONTH, DEADLINE_DAY)
    }
    const daysUntil = Math.floor((nextDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const formattedDue = nextDeadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    setResult({
      nextDue: formattedDue,
      daysUntil,
      isFirstNotice: !lastNoticeDate,
    })
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 max-w-xs">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> Date of last KYR notice issued
        </label>
        <input
          type="date"
          value={lastNoticeDate}
          onChange={(e) => setLastNoticeDate(e.target.value)}
          className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
        />
        <span className="text-[11px] text-zinc-600">Leave blank if you haven&apos;t issued it yet</span>
      </div>

      <button
        onClick={calculate}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 w-fit"
      >
        Check my deadline <ArrowRight className="h-4 w-4" />
      </button>

      {result && (
        <div className="flex flex-col gap-3">
          {result.isFirstNotice && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-sm">
              <p className="font-semibold text-zinc-200 mb-1">First notices were due February 1, 2026.</p>
              <p className="text-zinc-500">If you haven&apos;t issued the KYR notice yet, issuing it now — with signed acknowledgments — closes the gap.</p>
            </div>
          )}
          <div className="flex justify-between py-2.5 border-b border-white/5 text-sm">
            <span className="text-zinc-500">Next annual notice due</span>
            <span className="font-semibold text-zinc-200">{result.nextDue}</span>
          </div>
          <div className="flex justify-between py-2.5 border-b border-white/5 text-sm">
            <span className="text-zinc-500">Days until deadline</span>
            <span className={`font-semibold ${result.daysUntil <= 30 ? 'text-amber-400' : 'text-zinc-200'}`}>
              {result.daysUntil} days
            </span>
          </div>
          <div className={`rounded-xl p-3.5 text-sm ${result.daysUntil <= 30 ? 'bg-amber-500/5 border border-amber-500/20 text-amber-300' : 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-300'}`}>
            {result.daysUntil <= 30
              ? `${result.daysUntil} days out — good time to start preparing this year's notice.`
              : `${result.daysUntil} days until your next annual notice is due.`}
          </div>
        </div>
      )}
    </div>
  )
}
