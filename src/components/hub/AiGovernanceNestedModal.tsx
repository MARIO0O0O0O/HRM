'use client'

import { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Bot,
  Scale,
  Building
} from 'lucide-react'

export default function AiGovernanceNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'bias' | 'indemnity'>('tier1')

  // Sub-View A: AI Bias Assessment state
  const [biasChecks, setBiasChecks] = useState<Record<string, boolean>>({
    'resume-screener': false,
    'video-interview': false,
    'performance-tracking': false,
    'crd-notice': false,
    'human-override': false,
  })

  // Sub-View B: Vendor Indemnity state
  const [indemnityChecks, setIndemnityChecks] = useState<Record<string, boolean>>({
    'crd-warranty': false,
    'full-indemnification': false,
    'audit-rights': false,
    'data-privacy': false,
  })

  const toggleBias = (id: string) => {
    setBiasChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleIndemnity = (id: string) => {
    setIndemnityChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: MAIN VIEW                                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 text-xs text-cyan-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Bot className="h-4 w-4 shrink-0 text-cyan-400" />
              <span>CRD Automated Decision Systems (ADS) Rules</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              The California Civil Rights Department (CRD) mandates strict governance for Automated Decision Systems used in recruitment, hiring, evaluation, or pay decisions. Employers remain strictly liable for third-party AI bias.
            </p>
          </div>

          {/* Key Compliance Mandates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Scale className="h-4 w-4 text-cyan-400" />
                <span>Impact Assessment Requirement</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Mandatory annual bias audits for algorithmic tools screening job applicants or evaluating employee productivity.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Building className="h-4 w-4 text-indigo-400" />
                <span>Vendor Joint Liability</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Using third-party AI software does not exempt employers from CRD discrimination claims without explicit vendor indemnification.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('bias')}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Bias Assessment</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('indemnity')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Vendor Indemnity Checklist</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW A: AI BIAS ASSESSMENT                                          */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'bias' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI Governance</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              Bias Assessment
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-cyan-300 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Algorithmic Tool Screener
              </h4>
              <div className="space-y-2.5 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biasChecks['resume-screener']}
                    onChange={() => toggleBias('resume-screener')}
                    className="mt-0.5 h-4 w-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>Automated resume screeners audited for adverse impact against protected classes.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biasChecks['video-interview']}
                    onChange={() => toggleBias('video-interview')}
                    className="mt-0.5 h-4 w-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>Facial or voice analysis in video interviews evaluated for biometric discrimination.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biasChecks['performance-tracking']}
                    onChange={() => toggleBias('performance-tracking')}
                    className="mt-0.5 h-4 w-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>Employee productivity surveillance metrics reviewed for disability accommodations.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biasChecks['crd-notice']}
                    onChange={() => toggleBias('crd-notice')}
                    className="mt-0.5 h-4 w-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>Mandatory candidate notice provided prior to deploying automated screening tools.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biasChecks['human-override']}
                    onChange={() => toggleBias('human-override')}
                    className="mt-0.5 h-4 w-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <span>Human-in-the-loop review protocol established for all automated rejection recommendations.</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW B: VENDOR INDEMNITY CHECKLIST                                   */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'indemnity' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to AI Governance</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Vendor Indemnity
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Mandatory AI Contract Clauses
              </h4>
              <div className="space-y-2.5 text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indemnityChecks['crd-warranty']}
                    onChange={() => toggleIndemnity('crd-warranty')}
                    className="mt-0.5 h-4 w-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span>Express warranty that AI algorithms comply with California CRD & EEOC bias standards.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indemnityChecks['full-indemnification']}
                    onChange={() => toggleIndemnity('full-indemnification')}
                    className="mt-0.5 h-4 w-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span>Full indemnification clause holding employer harmless against algorithm discrimination lawsuits.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indemnityChecks['audit-rights']}
                    onChange={() => toggleIndemnity('audit-rights')}
                    className="mt-0.5 h-4 w-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span>Right to demand raw algorithmic audit data upon receiving an employee CRD complaint.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indemnityChecks['data-privacy']}
                    onChange={() => toggleIndemnity('data-privacy')}
                    className="mt-0.5 h-4 w-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span>Strict prohibition against vendor using employer employee data for external model training.</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
