'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import TrainingCycleCalculator from '@/components/tools/TrainingCycleCalculator'
import AnnualDeadlineTracker from '@/components/tools/AnnualDeadlineTracker'
import ProgressChecklist from '@/components/tools/ProgressChecklist'
import { createClient } from '@/lib/supabase/client'
import { iippHazardCategories } from '@/data/quiz-content'
import { CalendarClock, Shield, AlertTriangle, FileText, BookOpen } from 'lucide-react'

type ProgramKey = 'hpp' | 'wvpp' | 'iipp' | 'kyr'

const tabs: { key: ProgramKey; label: string; icon: typeof Shield }[] = [
  { key: 'hpp', label: 'Harassment Prevention', icon: Shield },
  { key: 'wvpp', label: 'Workplace Violence', icon: AlertTriangle },
  { key: 'iipp', label: 'Injury & Illness', icon: FileText },
  { key: 'kyr', label: 'Know Your Rights', icon: BookOpen },
]

export default function DeadlineTrackerPage() {
  const [active, setActive] = useState<ProgramKey>('hpp')

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'deadline-tracker', event_type: 'view' }).then(() => {})
    } catch {
      // ignore -- analytics must never break the tool
    }
  }, [])

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb className="mb-8" />

        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <CalendarClock className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Training Deadline Tracker
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Enter a few dates and headcounts to get exact deadlines for each program — no guessing which cycle you&apos;re on.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-colors ${
                active === key
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                  : 'border-white/5 bg-[#111111] text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {active === 'hpp' && (
          <TrainingCycleCalculator
            programName="Harassment Prevention"
            thresholdEmployees={5}
            cycleMonths={24}
            cycleLabel="2-year"
            newHireWindowMonths={6}
            belowThresholdNote="Under 5 employees, SB 1343's mandatory training threshold doesn't apply — but FEHA's underlying anti-harassment obligations still do. Voluntary training remains good practice."
          />
        )}

        {active === 'wvpp' && (
          <TrainingCycleCalculator
            programName="Workplace Violence Prevention"
            thresholdEmployees={1}
            cycleMonths={12}
            cycleLabel="annual"
            belowThresholdNote="SB 553 applies to nearly all California employers regardless of size, with narrow exemptions (e.g. facilities already covered by the stricter Title 8 CCR §3342 standard, some remote-only teams, and a few other specific carve-outs)."
          />
        )}

        {active === 'iipp' && (
          <div className="flex flex-col gap-8">
            <TrainingCycleCalculator
              programName="Injury & Illness Prevention"
              thresholdEmployees={1}
              cycleMonths={12}
              cycleLabel="annual"
              belowThresholdNote="A written IIPP is required for every California employer with 1 or more employees — there's no size exemption."
            />
            <div>
              <h2 className="text-sm font-bold text-zinc-300 mb-3">Prefer a walk-through checklist instead?</h2>
              <ProgressChecklist categories={iippHazardCategories} />
            </div>
          </div>
        )}

        {active === 'kyr' && <AnnualDeadlineTracker />}

        <p className="text-xs text-zinc-600 text-center mt-8 leading-relaxed">
          Dates and thresholds here are estimates based on current statutory rates and the information you enter — not
          legal advice. For a specific situation, talk to a qualified employment attorney or{' '}
          <a href="/book" className="text-indigo-400 hover:text-indigo-300">book a consultation</a>.
        </p>
        <LegalDisclaimer />
      </div>
    </div>
  )
}
