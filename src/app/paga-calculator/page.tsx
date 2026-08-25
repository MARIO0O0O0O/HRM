'use client'

import Breadcrumb from '@/components/layout/Breadcrumb'
import PagaCalculatorComponent from '@/components/calculator/PagaCalculatorComponent'
import LegalDisclaimer from '@/components/layout/LegalDisclaimer'
import { Calculator, Info } from 'lucide-react'

export default function PagaCalculatorPage() {
  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-8" />

        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Calculator className="h-3.5 w-3.5" /> Free Tool · No Signup Required
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent mt-6">
            California PAGA Exposure Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
            The Private Attorneys General Act (PAGA) lets employees bring labor code violation claims on behalf of the state, with penalties that compound per pay period. This tool estimates a realistic range under the{' '}
            <span className="text-amber-400 font-semibold">AB 2288 reformed penalty structure</span>{' '}(effective June 2024) — so you know roughly where you stand and what to fix first.
          </p>
          <p className="text-xs text-zinc-600 mt-2">
            Updated for AB 2288 + SB 92 · $9,000/employee cap · 35% employee / 65% LWDA split · CA min wage $17/hr (2025)
          </p>
        </div>

        {/* Calculator Component */}
        <PagaCalculatorComponent />

        {/* Advisory / PAGA Notice box */}
        <div className="bg-[#111111]/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 mt-12 text-left">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
            <Info className="h-5 w-5 text-indigo-400 shrink-0" /> AB 2288 Reform (June 2024) — What Changed
          </h3>
          <ul className="flex flex-col gap-1.5 text-xs text-zinc-500">
            <li>• <strong className="text-zinc-400">Distribution:</strong> 35% to aggrieved employees / 65% to LWDA (was 25%/75%)</li>
            <li>• <strong className="text-zinc-400">Cap:</strong> $9,000 per aggrieved employee for most violations</li>
            <li>• <strong className="text-zinc-400">Reasonable-steps caps:</strong> reasonable-steps caps are 15% (pre-notice) and 30% (post-notice cure) under AB 2288/SB 92</li>
            <li>• <strong className="text-zinc-400">Standing:</strong> Only employees who personally experienced a violation may bring a claim</li>
            <li>• <strong className="text-zinc-400">Cure provisions:</strong> Expanded early-cure rights — fixing issues fast can reduce exposure</li>
            <li>• <strong className="text-zinc-400">Attorney fees:</strong> Still recoverable by a prevailing plaintiff</li>
          </ul>
          <p className="text-xs text-zinc-600 leading-relaxed border-t border-white/5 pt-3">
            This is an educational estimate based on the numbers you enter and current statutory rates — not
            a prediction, a legal opinion, or a bill. Actual exposure depends on violation frequency, cure
            actions taken, arbitration agreements, and judicial interpretation. For a specific situation,
            talk to a PAGA defense attorney. CalBizHR / M.E. Consulting accepts no liability for decisions made
            from calculator output.
          </p>
        </div>
        <LegalDisclaimer />
      </div>
    </div>
  )
}
