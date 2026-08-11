'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, Gauge, FileEdit, ArrowRight, Loader2, AlertTriangle, Download } from 'lucide-react'

type Tab = 'audit' | 'policy'

interface AuditArea {
  name: string
  score: number
  note: string
}
interface AuditResult {
  areas: AuditArea[]
  topPriority: string
  summary: string
}

function scoreColor(score: number) {
  if (score >= 75) return 'text-emerald-400 bg-emerald-500/10'
  if (score >= 50) return 'text-amber-400 bg-amber-500/10'
  return 'text-indigo-300 bg-indigo-500/10'
}

function AuditEngine() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
        <label className="text-sm font-semibold text-zinc-200">
          Describe your current HR practices — as much or as little detail as you have
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          placeholder="e.g. We have about 12 employees, a written handbook from 2 years ago, we don't have a formal WVPP yet, breaks are usually fine but sometimes get skipped when we're short-staffed..."
          className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
        />
        <button
          onClick={run}
          disabled={loading || description.trim().length < 10}
          className="self-start bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
          {loading ? 'Analyzing...' : 'Run the Audit'}
        </button>
        {error && (
          <div className="flex items-start gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
          <div className="grid gap-3">
            {result.areas.map((area) => (
              <div key={area.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-zinc-200">{area.name}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(area.score)}`}>{area.score}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${area.score >= 75 ? 'bg-emerald-500' : area.score >= 50 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1.5">{area.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">Where to Start</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{result.topPriority}</p>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-5">{result.summary}</p>
          <a href="/contact" className="self-start flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Want a second opinion on this? Talk to me directly <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  )
}

function PolicyArchitect() {
  const [request, setRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [draft, setDraft] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    setLoading(true)
    setError(null)
    setDraft(null)
    try {
      const res = await fetch('/api/ai/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setDraft(data.draft)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function downloadDraft() {
    if (!draft) return
    const blob = new Blob([draft], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'policy-draft.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
        <label className="text-sm font-semibold text-zinc-200">
          What policy do you need? Describe it in plain English.
        </label>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          rows={4}
          placeholder="e.g. A remote work policy for a 15-person team, covering expectations for availability, equipment, and expense reimbursement"
          className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
        />
        <button
          onClick={run}
          disabled={loading || request.trim().length < 10}
          className="self-start bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileEdit className="h-4 w-4" />}
          {loading ? 'Drafting...' : 'Draft the Policy'}
        </button>
        {error && (
          <div className="flex items-start gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
          </div>
        )}
      </div>

      {draft && (
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Draft Policy</p>
            <button
              onClick={downloadDraft}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download .txt
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed font-sans bg-[#0a0a0a] border border-white/5 rounded-xl p-5 max-h-[500px] overflow-y-auto">
            {draft}
          </pre>
          <a href="/contact" className="self-start flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Want this reviewed and finalized? Talk to me directly <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  )
}

export default function AiLabPage() {
  const [tab, setTab] = useState<Tab>('audit')

  useEffect(() => {
    try {
      createClient().from('tool_usage_events').insert({ tool_slug: 'ai-lab', event_type: 'view' }).then(() => {})
    } catch {
      // ignore
    }
  }, [])

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb className="mb-8" />

        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            AI Lab
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Two tools I built and use myself — a compliance self-audit, and a policy drafter. Both
            produce a real starting draft, never a final answer.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-8">
          <button
            onClick={() => setTab('audit')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-colors ${
              tab === 'audit' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-white/5 bg-[#111111] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Gauge className="h-4 w-4" /> Strategic Audit Engine
          </button>
          <button
            onClick={() => setTab('policy')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-colors ${
              tab === 'policy' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-white/5 bg-[#111111] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FileEdit className="h-4 w-4" /> Policy Architect
          </button>
        </div>

        {tab === 'audit' ? <AuditEngine /> : <PolicyArchitect />}

        <p className="text-xs text-zinc-600 text-center mt-8 leading-relaxed">
          AI-generated output is a starting draft, not legal advice, and does not create an
          attorney-client relationship. Have any policy or audit result reviewed by a qualified
          California employment attorney before relying on it.
        </p>
      </div>
    </div>
  )
}
