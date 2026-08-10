'use client'

import { useState } from 'react'
import { Calendar, Users, ArrowRight } from 'lucide-react'

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function addMonths(d: Date, months: number): Date {
  const result = new Date(d)
  result.setMonth(result.getMonth() + months)
  return result
}

export default function TrainingCycleCalculator({
  programName,
  thresholdEmployees,
  cycleMonths,
  cycleLabel,
  newHireWindowMonths,
  belowThresholdNote,
}: {
  programName: string
  thresholdEmployees: number
  cycleMonths: number
  cycleLabel: string
  newHireWindowMonths?: number
  belowThresholdNote: string
}) {
  const [employeeCount, setEmployeeCount] = useState('')
  const [untrainedCount, setUntrainedCount] = useState('')
  const [lastTrainingDate, setLastTrainingDate] = useState('')
  const [lastHireDate, setLastHireDate] = useState('')
  const [result, setResult] = useState<{
    required: boolean
    renewalDate: string | null
    newHireDeadline: string | null
    untrained: number
    recommendation: string
  } | null>(null)

  const handleCalculate = () => {
    const count = parseInt(employeeCount, 10) || 0
    const untrained = parseInt(untrainedCount, 10) || 0
    const required = count >= thresholdEmployees

    let renewalDate: string | null = null
    if (lastTrainingDate) {
      renewalDate = formatDate(addMonths(new Date(lastTrainingDate + 'T00:00:00'), cycleMonths))
    }

    let newHireDeadline: string | null = null
    if (lastHireDate && newHireWindowMonths) {
      newHireDeadline = formatDate(addMonths(new Date(lastHireDate + 'T00:00:00'), newHireWindowMonths))
    }

    let recommendation = ''
    if (!required) {
      recommendation = belowThresholdNote
    } else if (untrained > 0 && renewalDate) {
      recommendation = `${untrained} employee${untrained !== 1 ? 's' : ''} need${untrained === 1 ? 's' : ''} initial training. Your next ${cycleLabel} renewal is due by ${renewalDate} — a good time to schedule both at once.`
    } else if (untrained > 0) {
      recommendation = `${untrained} employee${untrained !== 1 ? 's' : ''} need${untrained === 1 ? 's' : ''} initial training as soon as reasonably possible.`
    } else if (renewalDate) {
      recommendation = `All employees appear trained. Your next ${cycleLabel} renewal is due by ${renewalDate} — plan 60–90 days ahead and keep certificates on file.`
    } else {
      recommendation = `Training is required for your organization. Add your last training date to see your renewal deadline.`
    }

    setResult({ required, renewalDate, newHireDeadline, untrained, recommendation })
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Total California headcount
          </label>
          <input
            type="number"
            min="0"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(e.target.value)}
            placeholder="e.g. 25"
            className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Employees never trained
          </label>
          <input
            type="number"
            min="0"
            value={untrainedCount}
            onChange={(e) => setUntrainedCount(e.target.value)}
            placeholder="e.g. 5"
            className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Most recent training date <span className="normal-case text-zinc-600">(optional)</span>
          </label>
          <input
            type="date"
            value={lastTrainingDate}
            onChange={(e) => setLastTrainingDate(e.target.value)}
            className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
          />
        </div>
        {newHireWindowMonths ? (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Most recent new-hire date <span className="normal-case text-zinc-600">(optional)</span>
            </label>
            <input
              type="date"
              value={lastHireDate}
              onChange={(e) => setLastHireDate(e.target.value)}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
            />
          </div>
        ) : null}
      </div>

      <button
        onClick={handleCalculate}
        disabled={!employeeCount}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 w-fit px-6"
      >
        Calculate deadlines <ArrowRight className="h-4 w-4" />
      </button>

      {result && (
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-white/[0.03] px-5 py-3 border-b border-white/5">
            <h4 className="font-bold text-zinc-200 text-sm">Your {programName} deadlines</h4>
          </div>
          <div className="divide-y divide-white/5">
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-zinc-500">Training required?</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${result.required ? 'bg-indigo-500/10 text-indigo-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                {result.required ? `Yes — ${thresholdEmployees}+ employees` : `No — under ${thresholdEmployees} employees`}
              </span>
            </div>
            {result.renewalDate && (
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-zinc-500">Next renewal due by</span>
                <span className="text-sm font-semibold text-zinc-200">{result.renewalDate}</span>
              </div>
            )}
            {result.newHireDeadline && (
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-zinc-500">New-hire training deadline</span>
                <span className="text-sm font-semibold text-zinc-200">{result.newHireDeadline}</span>
              </div>
            )}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-zinc-500">Employees needing initial training</span>
              <span className="text-sm font-semibold text-zinc-200">{result.untrained}</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border-t border-white/5 px-5 py-4">
            <p className="text-sm text-zinc-400 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
