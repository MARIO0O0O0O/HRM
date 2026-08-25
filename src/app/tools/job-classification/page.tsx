'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/layout/Breadcrumb'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { createClient } from '@/lib/supabase/client'
import { Briefcase, ArrowLeft, RotateCcw } from 'lucide-react'

type Step = 'worker-type' | 'abc-test' | 'salary-test' | 'duties-test'
type Result = 'non-exempt' | 'exempt' | 'likely-ic' | null

interface AbcAnswers {
  a: boolean | null
  b: boolean | null
  c: boolean | null
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 ${className}`}>{children}</div>
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
        <span>Step {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
        <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function YesNoButtons({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <div className="flex gap-3 mt-6">
      <button onClick={onYes} className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
        Yes
      </button>
      <button onClick={onNo} className="flex-1 py-3 px-6 rounded-xl font-semibold border border-white/15 text-zinc-300 hover:border-white/30 transition-colors">
        No
      </button>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-sm font-medium mb-6 text-zinc-500 hover:text-zinc-300 transition-colors">
      <ArrowLeft className="h-3.5 w-3.5" /> Back
    </button>
  )
}

function Disclaimer() {
  return (
    <p className="mt-8 text-xs text-center leading-relaxed text-zinc-600">
      This tool provides general guidance for educational purposes only. It does not constitute legal
      advice. Employment classification is highly fact-specific — consult a qualified employment
      attorney or HR professional for a definitive classification.
    </p>
  )
}

function RestartButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="mt-4 w-full flex items-center justify-center gap-1.5 py-3 px-6 rounded-xl font-semibold border border-white/15 text-zinc-300 hover:border-white/30 transition-colors">
      <RotateCcw className="h-3.5 w-3.5" /> Restart quiz
    </button>
  )
}

function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block text-center mt-4 py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
      {label}
    </Link>
  )
}

function NonExemptResult({ onRestart }: { onRestart: () => void }) {
  return (
    <Card className="border-l-4 border-l-indigo-500">
      <h2 className="text-2xl font-black text-zinc-100 mb-2">Non-Exempt Employee</h2>
      <p className="font-semibold text-zinc-200 mb-3">This employee is <strong>non-exempt</strong> under California law.</p>
      <p className="text-sm text-zinc-500 mb-2 font-medium">They are entitled to:</p>
      <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside mb-4">
        <li>Overtime pay (1.5× after 8 hrs/day or 40 hrs/week; 2× after 12 hrs/day)</li>
        <li>30-min meal break by the 5th hour of work</li>
        <li>10-min rest breaks every 4 hours worked</li>
        <li>California minimum wage</li>
        <li>Itemized wage statements (Lab. Code § 226)</li>
      </ul>
      <p className="text-xs italic text-zinc-600 mb-4">Applies under California IWC Wage Orders.</p>
      <CtaButton href="/services" label="Need help classifying your workforce?" />
      <RestartButton onClick={onRestart} />
      <Disclaimer />
    </Card>
  )
}

function ExemptResult({ onRestart }: { onRestart: () => void }) {
  return (
    <Card className="border-l-4 border-l-emerald-500">
      <h2 className="text-2xl font-black text-zinc-100 mb-2">Likely Exempt Employee</h2>
      <p className="font-semibold text-zinc-200 mb-3">
        This employee <strong>may qualify as exempt</strong> under the white-collar exemption (Lab. Code § 515).
      </p>
      <p className="text-sm text-zinc-500 mb-2 font-medium">Key requirements:</p>
      <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside mb-3">
        <li>Salary ≥ $68,640/yr (verify annually — tied to CA minimum wage)</li>
        <li>Duties test met (executive, administrative, or professional)</li>
      </ul>
      <p className="text-sm text-zinc-400 mb-4">
        Exempt employees are <strong>not entitled to overtime</strong> under California law. Misclassification
        carries real PAGA exposure — worth having your classifications reviewed annually.
      </p>
      <CtaButton href="/book" label="Get a compliance review" />
      <RestartButton onClick={onRestart} />
      <Disclaimer />
    </Card>
  )
}

function LikelyIcResult({ onRestart }: { onRestart: () => void }) {
  return (
    <Card className="border-l-4 border-l-amber-500">
      <h2 className="text-2xl font-black text-zinc-100 mb-2">Likely Independent Contractor</h2>
      <div className="rounded-xl px-4 py-3 mb-4 text-sm font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
        Worth proceeding carefully — see notes below
      </div>
      <p className="font-semibold text-zinc-200 mb-3">
        This worker <strong>may qualify as an independent contractor</strong> under the ABC Test.
      </p>
      <p className="text-sm text-zinc-500 mb-2 font-medium">A few things worth knowing:</p>
      <ul className="text-sm text-zinc-400 space-y-2 list-disc list-inside mb-4">
        <li>California applies the ABC Test strictly (Lab. Code § 2775, AB 5).</li>
        <li>Misclassification is one of the most litigated issues in CA employment law.</li>
        <li>PAGA penalties for IC misclassification can add up quickly per worker.</li>
        <li>This tool is <strong>not legal advice</strong> — have IC relationships reviewed by an employment attorney or HR professional.</li>
      </ul>
      <CtaButton href="/contact" label="Get a professional review" />
      <RestartButton onClick={onRestart} />
      <Disclaimer />
    </Card>
  )
}

export default function JobClassificationPage() {
  const [step, setStep] = useState<Step>('worker-type')
  const [history, setHistory] = useState<Step[]>([])
  const [result, setResult] = useState<Result>(null)
  const [abcAnswers, setAbcAnswers] = useState<AbcAnswers>({ a: null, b: null, c: null })

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'job-classification', event_type: 'view' }).then(() => {})
    } catch {
      // ignore
    }
  }, [])

  const stepNumber: Record<Step, number> = { 'worker-type': 1, 'abc-test': 2, 'salary-test': 3, 'duties-test': 4 }

  function goTo(next: Step) {
    setHistory((h) => [...h, step])
    setStep(next)
  }

  function goBack() {
    const prev = history[history.length - 1]
    if (!prev) return
    setHistory((h) => h.slice(0, -1))
    setStep(prev)
    setResult(null)
  }

  function restart() {
    setStep('worker-type')
    setHistory([])
    setResult(null)
    setAbcAnswers({ a: null, b: null, c: null })
  }

  function resolveAbcTest() {
    if (abcAnswers.a && abcAnswers.b && abcAnswers.c) {
      setResult('likely-ic')
    } else {
      setHistory((h) => [...h, 'abc-test'])
      setStep('salary-test')
      setResult(null)
    }
  }

  const totalSteps = 4

  if (result) {
    return (
      <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <Breadcrumb className="mb-6" />
          <BackButton onClick={() => { setResult(null); goBack() }} />
          {result === 'non-exempt' && <NonExemptResult onRestart={restart} />}
          {result === 'exempt' && <ExemptResult onRestart={restart} />}
          {result === 'likely-ic' && <LikelyIcResult onRestart={restart} />}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Breadcrumb className="mb-8" />

        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Briefcase className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            California Job Classification Quiz
          </h1>
          <p className="text-sm text-zinc-400 mt-3">Exempt · Non-Exempt · Independent Contractor</p>
        </div>

        <ProgressBar current={stepNumber[step]} total={totalSteps} />

        {step === 'worker-type' && (
          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">Step 1 — Worker Type</p>
            <h2 className="text-lg font-semibold text-zinc-100 mb-4 leading-snug">
              Does this worker primarily control <em>how</em> they do their work — setting their own schedule,
              using their own tools or equipment, and typically working for multiple clients or companies?
            </h2>
            <YesNoButtons onYes={() => goTo('abc-test')} onNo={() => goTo('salary-test')} />
          </Card>
        )}

        {step === 'abc-test' && (
          <Card>
            <BackButton onClick={goBack} />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-1">Step 2 — ABC Test (Lab. Code § 2775, AB 5)</p>
            <p className="text-sm text-zinc-500 mb-6">Answer all three prongs. All three must be <strong className="text-zinc-300">Yes</strong> to qualify as an independent contractor.</p>

            {([
              { key: 'a' as const, label: 'Prong A', question: "Is the worker free from the company's control and direction in performing work, both under contract and in fact?" },
              { key: 'b' as const, label: 'Prong B', question: "Does the worker perform work outside the usual course of the company's business?" },
              { key: 'c' as const, label: 'Prong C', question: 'Is the worker customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed?' },
            ] as const).map(({ key, label, question }) => (
              <div key={key} className="mb-6 pb-6 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
                <p className="text-xs font-mono font-bold text-amber-400 mb-1">{label}</p>
                <p className="text-sm font-medium text-zinc-200 mb-3">{question}</p>
                <div className="flex gap-3">
                  {(['Yes', 'No'] as const).map((opt) => {
                    const val = opt === 'Yes'
                    const selected = abcAnswers[key] === val
                    return (
                      <button
                        key={opt}
                        onClick={() => setAbcAnswers((prev) => ({ ...prev, [key]: val }))}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                          selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={resolveAbcTest}
              disabled={abcAnswers.a === null || abcAnswers.b === null || abcAnswers.c === null}
              className="mt-2 w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              See result →
            </button>
          </Card>
        )}

        {step === 'salary-test' && (
          <Card>
            <BackButton onClick={goBack} />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">Step 3 — Salary Basis Test</p>
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">
              Is this worker paid a fixed salary of at least <span className="text-emerald-400">$68,640/year</span>?
            </h2>
            <p className="text-xs text-zinc-600 mb-6">2× California minimum wage (2024). Verify annually as CA minimum wage updates.</p>
            <YesNoButtons onYes={() => goTo('duties-test')} onNo={() => setResult('non-exempt')} />
          </Card>
        )}

        {step === 'duties-test' && (
          <Card>
            <BackButton onClick={goBack} />
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4">Step 4 — Duties Test</p>
            <h2 className="text-lg font-semibold text-zinc-100 mb-6">Which best describes this employee&apos;s <em>primary</em> job duties?</h2>
            <div className="flex flex-col gap-3">
              {([
                { label: 'A — Executive', desc: 'Manages the business or a department; primary duty is management; regularly directs 2+ employees; authority over hiring/firing.', result: 'exempt' as Result },
                { label: 'B — Administrative', desc: 'Exercises independent judgment on significant business matters; primary duty is office/non-manual work directly related to management policies.', result: 'exempt' as Result },
                { label: 'C — Professional', desc: 'Primary duty requires advanced knowledge in a field of science or learning, customarily acquired by a prolonged specialized course of study.', result: 'exempt' as Result },
                { label: 'D — None of the above', desc: 'Does not fit any of the above exemption categories.', result: 'non-exempt' as Result },
              ] as const).map(({ label, desc, result: r }) => (
                <button
                  key={label}
                  onClick={() => setResult(r)}
                  className="w-full text-left rounded-xl border border-white/10 hover:border-indigo-500/40 p-4 transition-colors"
                >
                  <p className="font-semibold text-sm text-zinc-200 mb-1">{label}</p>
                  <p className="text-xs text-zinc-500">{desc}</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        <Disclaimer />
        <LegalDisclaimer />
      </div>
    </div>
  )
}
