'use client'

import { useState } from 'react'
import {
  Calendar,
  Mail,
  Phone,
  Send,
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function AdvisoryBookingNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'book' | 'intake'>('tier1')
  const [intakeSubmitted, setIntakeSubmitted] = useState<boolean>(false)

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIntakeSubmitted(true)
  }

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* TIER 1: MAIN VIEW                                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'tier1' && (
        <div className="space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 sm:p-5 text-xs text-emerald-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Direct Consultation & Compliance Intake</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              Schedule a 30-minute diagnostic session or submit an urgent Labor Code inquiry. All consultation fees ($75) are 100% credited toward any ongoing compliance package.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>30-Min Diagnostic Session</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Direct calendar scheduling with Mario Espindola, MPA. Review paystub audits, WVPP plans, or PAGA notices ($75 fee 100% credited).
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-zinc-200 font-bold">
                <Mail className="h-4 w-4 text-rose-400" />
                <span>Direct Inquiry & Fast Response</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Submit an urgent wage or audit question with guaranteed response within 1 business day, or tap to call immediately.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSubView('book')}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Diagnostic Session ($75)</span>
            </button>

            <button
              type="button"
              onClick={() => setSubView('intake')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <Mail className="h-4 w-4 text-rose-400" />
              <span>Direct Message Intake</span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW A: BOOK DIAGNOSTIC SESSION                                      */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'book' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Consultation</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Book Session
            </span>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">30-Minute Diagnostic Session</h4>
                <p className="text-emerald-300 text-xs mt-0.5">$75 fee is 100% credited toward any ongoing compliance package.</p>
              </div>
              <span className="text-base font-black text-emerald-400">$75</span>
            </div>

            {/* Embedded Booking Widget Placeholder */}
            <div className="bg-[#161616] border border-white/10 p-6 rounded-xl text-center space-y-3">
              <Calendar className="h-8 w-8 text-emerald-400 mx-auto" />
              <p className="text-zinc-400 text-xs">Direct Cal.com integration widget for instant calendar scheduling.</p>
              <div className="text-[10px] text-zinc-500 font-mono">[PLACEHOLDER — Cal.com Widget Embed]</div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-emerald-500 transition-colors"
              >
                Open Full Booking Page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* SUB-VIEW B: DIRECT MESSAGE INTAKE                                        */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      {subView === 'intake' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setSubView('tier1')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Consultation</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              Direct Message
            </span>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            {/* Quick Contact Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:6267082220"
                className="bg-[#161616] p-3 rounded-xl border border-white/10 flex items-center gap-3 hover:border-emerald-500/30 transition-colors"
              >
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block">Call Directly</span>
                  <span className="font-bold text-zinc-100">626-708-2220</span>
                </div>
              </a>
              <a
                href="mailto:info@mario00.com"
                className="bg-[#161616] p-3 rounded-xl border border-white/10 flex items-center gap-3 hover:border-emerald-500/30 transition-colors"
              >
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block">Email Outreach</span>
                  <span className="font-bold text-zinc-100">info@mario00.com</span>
                </div>
              </a>
            </div>

            {/* Intake Form */}
            {intakeSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-emerald-300 text-sm">Intake Request Submitted</h4>
                <p className="text-zinc-300 text-xs">Mario Espindola will review your compliance inquiry and contact you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleIntakeSubmit} className="space-y-3 bg-[#161616] p-4 rounded-xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Your Name</label>
                    <input required type="text" placeholder="Jane Doe" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Business Name</label>
                    <input required type="text" placeholder="SGV Business" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Email</label>
                    <input required type="email" defaultValue="info@mario00.com" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Phone</label>
                    <input required type="tel" defaultValue="626-708-2220" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Compliance Question</label>
                  <textarea rows={3} placeholder="How do I ensure my paystubs and WVPP plan are compliant?" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors">
                    Submit Intake Request <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
