'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import type { SelfAssessmentProgram } from '@/data/quiz-content'

function resultTone(score: number, total: number) {
  const pct = score / total
  if (pct >= 0.85) {
    return {
      label: 'Looking solid',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      bgColor: 'bg-emerald-500/5',
      message: 'Your answers point to a program that\'s mostly in place. Keep your records current and revisit this each time something changes.',
    }
  }
  if (pct >= 0.6) {
    return {
      label: 'A few gaps',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      bgColor: 'bg-amber-500/5',
      message: 'A handful of gaps to close — nothing unusual, and all fixable with a policy update or a training session.',
    }
  }
  return {
    label: 'Worth prioritizing',
    textColor: 'text-indigo-300',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/5',
    message: "Several open items here. That's common for a program that hasn't been formally set up yet — the good news is every one of these is a known, fixable checklist item.",
  }
}

export default function SelfAssessmentQuiz({ program }: { program: SelfAssessmentProgram }) {
  const total = program.questions.length
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === total
  const score = Object.values(answers).filter(Boolean).length
  const tone = resultTone(score, total)

  const setAnswer = (i: number, val: boolean) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [i]: val }))
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <p className="text-sm text-zinc-400">{program.intro}</p>

      {!submitted && (
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{answeredCount} of {total} answered</span>
          <div className="w-40 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {program.questions.map((item, i) => {
          const answered = answers[i] !== undefined
          return (
            <div
              key={i}
              className={`rounded-2xl border p-4 transition-colors ${
                answered ? 'border-indigo-500/20 bg-indigo-500/5' : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <p className="text-sm font-medium text-zinc-200 mb-3 leading-snug">
                <span className="text-zinc-600 mr-2">{i + 1}.</span>
                {item.q}
              </p>
              <div className="flex gap-3">
                {[true, false].map((val) => {
                  const selected = answers[i] === val
                  return (
                    <button
                      key={String(val)}
                      onClick={() => setAnswer(i, val)}
                      disabled={submitted}
                      className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                        selected
                          ? val
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-zinc-700/50 text-zinc-200 border-zinc-600'
                          : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300 disabled:hover:border-white/10'
                      }`}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  )
                })}
              </div>
              {submitted && program.showPerItemFeedback && answers[i] !== undefined && (
                <div className="mt-3 text-xs text-zinc-500 bg-black/20 rounded-lg p-3 leading-relaxed">
                  {answers[i] ? item.yesNote : item.noNote}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {allAnswered ? 'See my results' : `Answer ${total - answeredCount} more to continue`}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <div className={`rounded-2xl border ${tone.borderColor} ${tone.bgColor} p-6 flex flex-col gap-4`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Self-check result</div>
              <div className={`text-2xl font-black mt-1 ${tone.textColor}`}>{tone.label}</div>
            </div>
            <div className="text-3xl font-black text-zinc-700">{score}/{total}</div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">{tone.message}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retake
            </button>
            <Link
              href={program.toolkitHref}
              className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" /> See the {program.name.split('(')[0].trim()} toolkit
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
