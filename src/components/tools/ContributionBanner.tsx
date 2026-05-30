'use client'

import { useState } from 'react'
import { X, Heart } from 'lucide-react'
import { PAYMENT_HANDLES } from '@/config/payment-handles'

interface ContributionBannerProps {
  toolTitle: string
  suggestedPrice: number
  usageCount?: number  // Static number M.E. updates manually
}

export default function ContributionBanner({
  toolTitle,
  suggestedPrice,
  usageCount = 47,
}: ContributionBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`contribution-dismissed-${toolTitle}`, '1')
    }
  }

  // Check sessionStorage on mount
  if (typeof window !== 'undefined') {
    if (sessionStorage.getItem(`contribution-dismissed-${toolTitle}`)) {
      return null
    }
  }

  if (dismissed) return null

  return (
    <div className="relative w-full border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 to-[#0d0d0d] rounded-2xl px-5 py-5 sm:px-7 sm:py-6 mb-8">
      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Icon */}
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 text-indigo-400" />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-200 leading-snug">
            This tool took 40+ hours of California labor law research to build.
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            If it saves your business time or protects you from a PAGA claim, a voluntary contribution of{' '}
            <span className="text-zinc-300 font-semibold">${suggestedPrice}</span> keeps it free for the next small business owner.
            {' '}<span className="text-zinc-600">Used by {usageCount} CA businesses this month.</span>
          </p>

          {/* Payment handles */}
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="inline-flex items-center gap-1.5 bg-[#111111] border border-white/5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300">
              <span className="text-zinc-600">Venmo</span> {PAYMENT_HANDLES.venmo}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#111111] border border-white/5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300">
              <span className="text-zinc-600">Zelle</span> {PAYMENT_HANDLES.zelle}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#111111] border border-white/5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300">
              <span className="text-zinc-600">Cash App</span> {PAYMENT_HANDLES.cashapp}
            </span>
          </div>
        </div>

        {/* Skip CTA */}
        <button
          onClick={handleDismiss}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
        >
          Skip for now →
        </button>
      </div>
    </div>
  )
}
