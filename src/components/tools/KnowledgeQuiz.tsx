'use client'

import { useState } from 'react'
import { ArrowRight, RotateCcw, Info } from 'lucide-react'
import type { MCQuestion } from '@/data/quiz-content'

export default function KnowledgeQuiz({ questions }: { questions: MCQuestion[] }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]

  const choose = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const tone =
      pct >= 80
        ? { label: 'Strong knowledge', color: 'text-emerald-400' }
        : pct >= 60
        ? { label: 'Good foundation', color: 'text-amber-400' }
        : { label: 'Worth a refresher', color: 'text-indigo-300' }

    return (
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center gap-3">
        <div className="text-5xl font-black text-zinc-100">{pct}%</div>
        <div className={`text-lg font-bold ${tone.color}`}>{tone.label}</div>
        <p className="text-sm text-zinc-500">{score} of {questions.length} correct</p>
        <p className="text-sm text-zinc-400 max-w-md leading-relaxed mt-2">
          {pct === 100
            ? "Perfect score — your WVPP fundamentals are solid."
            : "Whatever wasn't clear here is worth covering in your next team training session."}
        </p>
        <button
          onClick={reset}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Retake
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Question {current + 1} of {questions.length}</span>
        <span>{score} correct so far</span>
      </div>

      <p className="text-base font-semibold text-zinc-100 leading-snug">{q.q}</p>

      <div className="flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === q.correct
          let cls = 'border-white/10 text-zinc-300 hover:border-white/20'
          if (selected !== null) {
            if (isCorrect) cls = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
            else if (isSelected) cls = 'border-zinc-600 bg-zinc-800/50 text-zinc-400'
            else cls = 'border-white/5 text-zinc-600'
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex gap-2.5">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={next}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {current < questions.length - 1 ? 'Next question' : 'See my score'}
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
