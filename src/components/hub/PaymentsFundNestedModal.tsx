'use client'

import { useState } from 'react'
import {
  CreditCard,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function PaymentsFundNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'retainers' | 'campaign'>('tier1')
  const [selectedContribution, setSelectedContribution] = useState<number | null>(null)
  const [contributionSubmitted, setContributionSubmitted] = useState<boolean>(false)

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: MAIN VIEW                                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 text-xs text-indigo-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <CreditCard className="h-4 w-4 shrink-0 text-indigo-400" />
              <span>Payments, Retainers & Defense Fund</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Submit client retainer payments via instant peer-to-peer handles or fund our voluntary Small Business Defense Campaign sponsoring free California compliance tools for local employers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <CreditCard className="h-4 w-4 text-indigo-400" />
                <span>Retainer Packages & P2P Handles</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Starter ($99/mo) and Pro ($249/mo) compliance retainers, plus direct Zelle, Venmo, Cash App, and Stripe handles.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <HeartHandshake className="h-4 w-4 text-fuchsia-400" />
                <span>Small Business Defense Fund</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Sponsor free SB 553 WVPP toolkits, PAGA calculators, and labor law guides for local SGV & California employers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('retainers')}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <CreditCard className="h-4 w-4" />
              <span>Client Payments & Retainers</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('campaign')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <HeartHandshake className="h-4 w-4 text-fuchsia-400" />
              <span>Small Business Defense Fund</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW A: CLIENT PAYMENTS & RETAINERS                                  */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'retainers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Payments & Fund</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Payments & Retainers
            </span>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            {/* P2P Handles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#161616] p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Zelle Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">info@mario00.com</p>
              </div>

              <div className="bg-[#161616] p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Venmo Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">@marioo00</p>
              </div>

              <div className="bg-[#161616] p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Cash App Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">10mario01</p>
              </div>
            </div>

            {/* Monthly Retainer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-zinc-100 text-sm">Starter Retainer</h5>
                  <span className="text-sm font-black text-indigo-400">$99/mo</span>
                </div>
                <p className="text-zinc-400 text-xs">Ongoing compliance updates, annual policy refreshes, and phone/email advisory support.</p>
              </div>

              <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-zinc-100 text-sm">Pro Retainer</h5>
                  <span className="text-sm font-black text-indigo-400">$249/mo</span>
                </div>
                <p className="text-zinc-400 text-xs">Comprehensive compliance oversight, quarterly audit reviews, WVPP incident logs, and priority advisory.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-indigo-500 transition-colors"
              >
                View Full Pricing & Checkout <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW B: SMALL BUSINESS DEFENSE CAMPAIGN                              */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'campaign' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Payments & Fund</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/20">
              Defense Fund
            </span>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-4 rounded-xl space-y-2">
              <h4 className="font-bold text-fuchsia-300 text-sm">Small Business Compliance Defense Campaign</h4>
              <p className="text-zinc-300 text-xs">Fund free California compliance toolkits and legal defense calculators for local small business owners.</p>
            </div>

            {/* Contribution Buttons */}
            <div className="space-y-2">
              <label className="block text-zinc-400 font-semibold">Select Voluntary Contribution Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {[25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedContribution(amt)}
                    className={`py-3 rounded-xl font-black text-sm border transition-colors ${
                      selectedContribution === amt
                        ? 'bg-fuchsia-600/30 border-fuchsia-500 text-fuchsia-300'
                        : 'bg-[#161616] border-white/10 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {selectedContribution && !contributionSubmitted && (
              <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-3">
                <p className="text-zinc-300 font-medium">
                  Sponsoring <strong>${selectedContribution}</strong> toward free California small business compliance tools.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setContributionSubmitted(true)}
                    className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2.5 rounded-lg transition-colors text-xs"
                  >
                    Confirm & Send via Zelle / Venmo
                  </button>
                </div>
              </div>
            )}

            {contributionSubmitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-300 text-sm">Thank You for Supporting Local Small Businesses!</h4>
                <p className="text-zinc-300 text-xs">Send your ${selectedContribution} contribution to Zelle (<span className="font-mono text-zinc-100">info@mario00.com</span>) or Venmo (<span className="font-mono text-zinc-100">@marioo00</span>).</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
