'use client'

import { useState } from 'react'
import {
  UserCheck,
  Award,
  ShieldCheck,
  ArrowLeft,
  Briefcase,
  GraduationCap
} from 'lucide-react'

export default function FounderBioNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'credentials' | 'philosophy'>('tier1')

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: MAIN VIEW                                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 sm:p-5 text-xs text-purple-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <UserCheck className="h-4 w-4 shrink-0 text-purple-400" />
              <span>Mario Espindola, MPA — Founder Profile</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              10-year public-sector HR operations leader, labor relations strategist, and AI compliance architect dedicated to protecting San Gabriel Valley & California small businesses from predatory PAGA litigation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>MPA & Public Sector Rigor</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Master of Public Administration degree with extensive background managing complex bargaining unit contracts, Cal/OSHA standards, and civil rights audits.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Proactive Defense Mission</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Empowering small business employers with institutional-grade compliance toolkits to cure technical paystub/break flaws before litigation hits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('credentials')}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <Award className="h-4 w-4" />
              <span>Background & Credentials</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('philosophy')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>Defense Philosophy</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW A: BACKGROUND & CREDENTIALS                                     */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'credentials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Leadership</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Credentials
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <h5 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-400" /> Master of Public Administration (MPA)
              </h5>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Specialization in organizational management, public personnel administration, and statutory compliance frameworks across California local government agencies.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <h5 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-purple-400" /> 10+ Years Operational Leadership
              </h5>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Hands-on oversight of labor negotiations, workplace safety programs (IIPP/WVPP), mandatory harassment prevention training, and civil rights compliance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW B: DEFENSE PHILOSOPHY                                           */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'philosophy' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Leadership</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Defense Mission
            </span>
          </div>

          <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-3 text-xs text-zinc-300 leading-relaxed">
            <h5 className="font-bold text-purple-300 text-sm">Why Proactive Auditing Shields Employers</h5>
            <p>
              California Labor Code enforcement is asymmetrical. Small businesses are targeted by high-volume PAGA lawsuits for minor, technical paystub or break log oversights that carry staggering statutory penalties.
            </p>
            <p>
              Under 2024–2026 reforms (AB 2288 / SB 92), employers who take <strong>proactive reasonable steps</strong> prior to receiving an LWDA notice cap their penalty exposure at <strong>15%</strong> (an 85% savings). Our mission is to make institutional-grade compliance tools accessible to every business owner.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
