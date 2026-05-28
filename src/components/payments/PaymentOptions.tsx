'use client'

import { useState } from 'react'

export default function PaymentOptions() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleStripeCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_mock' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    {
      id: 'venmo',
      label: 'Venmo',
      handle: '@marioo00',
      description: 'Copy handle to pay in Venmo app',
    },
    {
      id: 'cashapp',
      label: 'Cash App',
      handle: '$10mario01',
      description: 'Copy cash tag to pay in Cash App',
    },
    {
      id: 'zelle',
      label: 'Zelle',
      handle: '626-999-6239',
      description: 'Send via your bank app to this number',
    },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-2xl p-8 text-zinc-100 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Secure Payment Options
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-2">
          Select your preferred payment method below to complete your billing.
        </p>
      </div>

      {/* Primary Stripe Option */}
      <div className="mb-10 bg-[#161616] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-bold text-zinc-100">Pay Securely via Stripe</h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Supports Credit Cards, Debit Cards, Apple Pay, and Google Pay.
          </p>
        </div>
        <button
          onClick={handleStripeCheckout}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-semibold tracking-wide shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay with Card'}
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <span className="relative px-3 bg-[#111111] text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Or Peer-to-Peer Support
        </span>
      </div>

      {/* Secondary Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex flex-col bg-[#161616] border border-white/5 hover:border-white/10 rounded-xl p-5 justify-between items-center text-center transition-all duration-200"
          >
            <div>
              <span className="text-sm font-semibold text-zinc-400">{method.label}</span>
              <p className="text-lg font-extrabold text-zinc-100 mt-1 select-all">
                {method.handle}
              </p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                {method.description}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(method.handle, method.id)}
              className="mt-4 px-4 py-2 text-xs font-bold tracking-wide rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/5 active:bg-zinc-900 transition-colors cursor-pointer w-full"
            >
              {copiedId === method.id ? 'Copied ✓' : 'Copy Account'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
          <span className="font-bold text-zinc-400">Notice:</span> Stripe is our primary processor. Peer-to-peer options are for clients who prefer mobile payment apps.
        </p>
      </div>
    </div>
  )
}
