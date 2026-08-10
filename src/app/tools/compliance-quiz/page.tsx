'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import SelfAssessmentQuiz from '@/components/tools/SelfAssessmentQuiz'
import KnowledgeQuiz from '@/components/tools/KnowledgeQuiz'
import { createClient } from '@/lib/supabase/client'
import { selfAssessmentPrograms, wvppKnowledgeQuiz } from '@/data/quiz-content'
import { ClipboardCheck, Shield, AlertTriangle, FileText, BookOpen } from 'lucide-react'

type ProgramKey = 'hpp' | 'wvpp' | 'iipp' | 'kyr'

const tabs: { key: ProgramKey; label: string; icon: typeof Shield }[] = [
  { key: 'hpp', label: 'Harassment Prevention', icon: Shield },
  { key: 'wvpp', label: 'Workplace Violence', icon: AlertTriangle },
  { key: 'iipp', label: 'Injury & Illness', icon: FileText },
  { key: 'kyr', label: 'Know Your Rights', icon: BookOpen },
]

export default function ComplianceQuizPage() {
  const [active, setActive] = useState<ProgramKey>('hpp')

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'compliance-quiz', event_type: 'view' }).then(() => {})
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
            <ClipboardCheck className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            Compliance Quick-Check
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Pick a program below and answer honestly. Most gaps are ordinary and fixable — this just shows you where to look first.
          </p>
        </div>

        {/* Program tabs */}
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

        {active === 'wvpp' ? (
          <>
            <p className="text-xs text-zinc-600 mb-4 text-center">
              WVPP works a little differently — this is a quick knowledge check on SB 553 basics, not a self-assessment.
            </p>
            <KnowledgeQuiz questions={wvppKnowledgeQuiz} />
          </>
        ) : (
          <SelfAssessmentQuiz program={selfAssessmentPrograms[active]} />
        )}

        <p className="text-xs text-zinc-600 text-center mt-8 leading-relaxed">
          This is a self-assessment tool for general informational purposes, not a legal audit. It does not constitute
          legal advice. For a specific situation, talk to a qualified employment attorney or{' '}
          <a href="/book" className="text-indigo-400 hover:text-indigo-300">book a consultation</a>.
        </p>
      </div>
    </div>
  )
}
