import type { Metadata } from 'next'
import Link from 'next/link'
import { currentPricingPhase, feeSchedule, type FeeItem } from '@/data/fee-schedule'
import { Clock, GraduationCap, Calendar, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fee Schedule — CalBizHR | California HR Compliance Services',
  description:
    'Transparent hourly consulting rates and flat-fee compliance training structure for California small businesses.',
}

export default function PricingPage() {
  const hourlyItems = feeSchedule.filter((item) => item.type === 'hourly')
  const flatItems = feeSchedule.filter((item) => item.type === 'flat')

  const formatPrice = (item: FeeItem) => {
    if (item.amount === null) {
      return (
        <span className="text-zinc-400 font-mono italic text-xs sm:text-sm">
          Rate TBD
        </span>
      )
    }
    return (
      <span className="text-[#B5933C] font-mono font-bold text-base sm:text-lg">
        ${item.amount}
        {item.unit && <span className="text-xs text-zinc-400 font-sans ml-1">/ {item.unit}</span>}
      </span>
    )
  }

  return (
    <div className="bg-[#1A2D4D] text-zinc-100 min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5 text-[#B5933C]" />
            <span>California HR Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Fee Schedule
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Transparent hourly consulting rates and flat-fee live training packages built for California small businesses.
          </p>
        </div>

        {/* Section 1: Hourly Services */}
        <section className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#B5933C]/20 pb-4">
            <div className="p-2 rounded-xl bg-[#1A2D4D] border border-[#B5933C]/40 text-[#B5933C]">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Hourly Services
              </h2>
              <p className="text-xs text-zinc-400">
                On-demand HR consultation, audit support, and advisory services
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {hourlyItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-white">
                      {item.label}
                    </span>
                    {item.unit && (
                      <span className="text-[10px] font-mono text-zinc-400 bg-[#1A2D4D] px-2 py-0.5 rounded border border-white/10">
                        {item.unit}
                      </span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="shrink-0 sm:text-right">{formatPrice(item)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Flat-Fee Trainings */}
        <section className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-[#B5933C]/20 pb-4">
            <div className="p-2 rounded-xl bg-[#1A2D4D] border border-[#B5933C]/40 text-[#B5933C]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Flat-Fee Trainings
              </h2>
              <p className="text-xs text-zinc-400">
                Live, founder-delivered interactive compliance sessions and manager workshops
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {flatItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-white">
                      {item.label}
                    </span>
                    {item.unit && (
                      <span className="text-[10px] font-mono text-zinc-400 bg-[#1A2D4D] px-2 py-0.5 rounded border border-white/10">
                        {item.unit}
                      </span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>

                <div className="shrink-0 sm:text-right">{formatPrice(item)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footnote / Pricing Phase Notice */}
        <div className="bg-[#0f1c32]/60 border border-[#B5933C]/20 rounded-xl p-4 sm:p-5 flex items-start gap-3 text-xs text-zinc-300">
          <HelpCircle className="h-4 w-4 text-[#B5933C] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono font-bold uppercase tracking-wider text-[#B5933C] block text-[11px]">
              {currentPricingPhase.label}
            </span>
            <p className="italic text-zinc-300 leading-relaxed">
              Pricing Notice: {currentPricingPhase.description}
            </p>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="bg-gradient-to-r from-[#0f1c32] via-[#162744] to-[#0f1c32] border border-[#B5933C]/40 rounded-2xl p-6 sm:p-10 text-center space-y-4 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Need a Custom Compliance Consultation?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Schedule a diagnostic session with founder Mario Espindola, MPA to discuss your specific California HR needs.
          </p>
          <div className="pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#B5933C] hover:bg-[#cbb057] text-[#0f1c32] font-sans font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a Call</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
