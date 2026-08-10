'use client'

import { useState } from 'react'
import type { HazardCategory } from '@/data/quiz-content'

export default function ProgressChecklist({ categories }: { categories: HazardCategory[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const total = categories.reduce((sum, cat) => sum + cat.items.length, 0)

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const pct = Math.round((checked.size / total) * 100)

  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-zinc-300">{checked.size} of {total} reviewed</span>
          <span className="font-bold text-indigo-400">{pct}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {categories.map((cat) => {
          const catChecked = cat.items.filter((_, j) => checked.has(`${cat.category}-${j}`)).length
          return (
            <div key={cat.category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-bold text-zinc-200 text-sm">{cat.category}</h3>
                <span className="ml-auto text-xs text-zinc-600 font-medium">{catChecked}/{cat.items.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {cat.items.map((item, j) => {
                  const key = `${cat.category}-${j}`
                  const isChecked = checked.has(key)
                  return (
                    <button
                      key={key}
                      onClick={() => toggle(key)}
                      className={`w-full text-left flex items-start gap-3 px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                          : 'border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span
                        className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-600'
                        }`}
                        style={{ width: '1.1rem', height: '1.1rem' }}
                      >
                        {isChecked && <span className="text-[10px] font-bold">✓</span>}
                      </span>
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
