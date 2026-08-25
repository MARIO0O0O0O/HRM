'use client'

import { useState } from 'react'

/**
 * PaymentOptions
 *
 * Displays available payment methods. Stripe is plumbed but gated behind
 * the NEXT_PUBLIC_STRIPE_ENABLED feature flag — set it to "true" in Vercel
 * env vars when your Stripe account is ready. Until then, peer-to-peer
 * options (Venmo, Cash App, Zelle) are shown as primary.
 *
 * Per project payment rules:
 *  - Stripe is the designated primary CTA once enabled.
 *  - Alt handles are rendered as labeled copyable text only (no deep links).
 */

const STRIPE_ENABLED = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'

interface AltPayment {
  id: string
  label: string
  icon: string
  handle: string
  description: string
  instruction: string
}

const ALT_PAYMENTS: AltPayment[] = [
  {
    id: 'venmo',
    label: 'Venmo',
    icon: '💙',
    handle: '@marioo00',
    description: 'Mobile peer-to-peer',
    instruction: 'Open your Venmo app and search for the handle below.',
  },
  {
    id: 'cashapp',
    label: 'Cash App',
    icon: '💚',
    handle: '$10mario01',
    description: 'Mobile peer-to-peer',
    instruction: 'Open Cash App and send to the $Cashtag below.',
  },
  {
    id: 'zelle',
    label: 'Zelle',
    icon: '💜',
    handle: '626-708-2220',
    description: 'Bank-to-bank transfer',
    instruction: 'Use your bank app\'s Zelle feature to send to this number.',
  },
]

export default function PaymentOptions() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [stripeLoading, setStripeLoading] = useState(false)

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleStripeCheckout = async (priceId: string) => {
    setStripeLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('[Stripe] Checkout error:', err)
    } finally {
      setStripeLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-2xl p-8 text-zinc-100 shadow-2xl">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Payment Options
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Choose your preferred payment method below.
        </p>
      </div>

      {/* ── Stripe (shown only when NEXT_PUBLIC_STRIPE_ENABLED=true) ───────── */}
      {STRIPE_ENABLED && (
        <>
          <div className="mb-8 bg-[#161616] border border-indigo-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Pay Securely via Stripe</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Credit/debit cards · Apple Pay · Google Pay
              </p>
            </div>
            <button
              id="stripe-checkout-btn"
              onClick={() => handleStripeCheckout('price_placeholder')}
              disabled={stripeLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-semibold tracking-wide shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {stripeLoading ? 'Redirecting…' : 'Pay with Card'}
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#111111] text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Or pay via mobile app
            </span>
          </div>
        </>
      )}

      {/* ── Alt payments (always visible) ───────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ALT_PAYMENTS.map((m) => (
          <div
            key={m.id}
            id={`payment-${m.id}`}
            className="flex flex-col bg-[#161616] border border-white/5 hover:border-white/15 rounded-xl p-5 justify-between items-center text-center transition-all duration-200 group"
          >
            <div className="w-full">
              <div className="text-2xl mb-2">{m.icon}</div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {m.label}
              </span>
              <p className="text-base font-extrabold text-zinc-100 mt-1 select-all font-mono tracking-tight">
                {m.handle}
              </p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                {m.instruction}
              </p>
            </div>
            <button
              id={`copy-${m.id}`}
              onClick={() => copy(m.handle, m.id)}
              className="mt-4 px-4 py-2 text-xs font-bold tracking-wide rounded-md bg-zinc-800 hover:bg-zinc-700 group-hover:bg-zinc-700 text-zinc-300 border border-white/5 active:scale-95 transition-all cursor-pointer w-full"
            >
              {copiedId === m.id ? '✓ Copied!' : `Copy ${m.label} Handle`}
            </button>
          </div>
        ))}
      </div>

      {/* Footer notice */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-zinc-600 leading-relaxed max-w-md mx-auto">
          These are peer-to-peer handles for your convenience. For questions
          about your payment, email us after sending and include your name and
          service date.{' '}
          {!STRIPE_ENABLED && (
            <span className="text-zinc-500">
              Card payments coming soon.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
