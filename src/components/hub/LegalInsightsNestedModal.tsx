'use client'

import { useState } from 'react'
import {
  BookOpen,
  Calendar,
  FileText,
  ArrowLeft,
  ArrowRight,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default function LegalInsightsNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'articles' | 'deadlines'>('tier1')

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: MAIN VIEW                                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 text-xs text-indigo-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <BookOpen className="h-4 w-4 shrink-0 text-indigo-400" />
              <span>California Labor Code Briefings & Case Law</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Stay ahead of California legislative updates, judicial rulings, and mandatory state reporting deadlines. Proactive compliance is the single most effective legal defense.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span>Executive Briefings</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Plain-English breakdowns of SB 553, AB 2288 PAGA reform, SB 1343 training, and meal break premium math.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Compliance Calendar</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Track mandatory deadlines for CRD Pay Data reporting, Cal/OSHA 300A posting, and CalSavers retirement mandates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('articles')}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Compliance Briefings</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('deadlines')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>State Deadlines Calendar</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW A: ARTICLES & BRIEFINGS                                         */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Briefings</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Legal Briefings
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">SB 553 Mandate</span>
              <h5 className="font-bold text-zinc-100 text-sm">California SB 553 Workplace Violence Prevention</h5>
              <p className="text-zinc-400 text-xs leading-snug">
                Every employer operating in California must maintain a site-specific written plan, log incidents, and conduct annual training.
              </p>
              <Link
                href="/blog/california-sb-553-workplace-violence-prevention"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-1"
              >
                Read Full Briefing <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">PAGA Reform</span>
              <h5 className="font-bold text-zinc-100 text-sm">AB 2288 & SB 92 Statutory Penalty Reform Rules</h5>
              <p className="text-zinc-400 text-xs leading-snug">
                Understanding the 15% pre-notice proactive audit cap and 30% 60-day post-notice cure provisions.
              </p>
              <Link
                href="/blog/california-meal-break-compliance-PAGA-rules"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-1"
              >
                Read Full Briefing <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW B: DEADLINES CALENDAR                                           */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'deadlines' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Briefings</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Mandatory Deadlines
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-amber-500/20 text-amber-400 p-2 rounded-lg font-bold text-center shrink-0 w-12">
                <span className="text-[10px] uppercase block leading-none">FEB</span>
                <span className="text-sm font-black">01</span>
              </div>
              <div>
                <h5 className="font-bold text-zinc-100">Cal/OSHA Form 300A Posting</h5>
                <p className="text-zinc-400 text-xs mt-0.5">Post annual summary of work-related injuries and illnesses in common employee areas through April 30.</p>
              </div>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-lg font-bold text-center shrink-0 w-12">
                <span className="text-[10px] uppercase block leading-none">MAY</span>
                <span className="text-sm font-black">14</span>
              </div>
              <div>
                <h5 className="font-bold text-zinc-100">CRD Pay Data Reporting</h5>
                <p className="text-zinc-400 text-xs mt-0.5">Employers with 100+ employees must submit annual pay data reports to the California Civil Rights Department.</p>
              </div>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg font-bold text-center shrink-0 w-12">
                <span className="text-[10px] uppercase block leading-none">JUN</span>
                <span className="text-sm font-black">30</span>
              </div>
              <div>
                <h5 className="font-bold text-zinc-100">CalSavers Annual Registration</h5>
                <p className="text-zinc-400 text-xs mt-0.5">Mandatory retirement program registration for employers with 1 to 4 employees who do not offer a qualified plan.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
