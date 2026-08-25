import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Sparkles, Shield, Building2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — CalBizHR | California HR Compliance for Small Businesses',
  description: 'Simple, transparent pricing for California HR compliance. Starter from $99/mo. No hidden fees. Cancel anytime.',
}

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Essential compliance tools for small teams getting organized.',
    icon: Shield,
    color: 'indigo',
    features: [
      'PAGA Exposure Calculator',
      'Compliance Calendar access',
      'AI Policy Wizard (WVPP, Breaks, Reimbursement)',
      'Toolkit PDF downloads',
      'Up to 5 documents in secure locker',
      'Email support',
    ],
    notIncluded: [
      'AI interaction logging',
      'Priority response',
      'Fractional HR hours',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$249',
    period: '/month',
    description: 'Full compliance suite for growing businesses.',
    icon: Sparkles,
    color: 'cyan',
    features: [
      'Everything in Starter',
      'Unlimited document storage',
      'AI interaction history & logs',
      'Priority email + phone support',
      'Monthly compliance check-in call',
      'Proactive CA regulatory alerts',
    ],
    notIncluded: [
      'Fractional HR hours included',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Agency',
    price: '$599',
    period: '/month',
    description: 'Dedicated fractional HR for multi-location or high-volume teams.',
    icon: Building2,
    color: 'violet',
    features: [
      'Everything in Pro',
      'Fractional HR hours included',
      'Multi-location support',
      'Custom policy and handbook drafting',
      'Dedicated point-of-contact',
      'On-site or virtual manager coaching',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
            Simple Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-100 mt-6">
            HR compliance that fits your{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              budget
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed">
            Built for California small businesses. Cancel anytime. Start with a $75 consultation and get the fee credited toward your first month.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isPro = plan.highlight
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col gap-6 transition-all ${
                  isPro
                    ? 'bg-gradient-to-b from-indigo-950/60 to-[#111111] border-indigo-500/40 shadow-2xl shadow-indigo-900/20 scale-[1.02]'
                    : 'bg-[#111111] border-white/10'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    isPro ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-zinc-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-zinc-100">{plan.name}</h2>
                    <p className="text-xs text-zinc-500">{plan.description}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-zinc-100">{plan.price}</span>
                    <span className="text-sm text-zinc-500 mb-1">{plan.period}</span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1">Billed monthly · Cancel anytime</p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600 line-through">
                      <CheckCircle2 className="h-4 w-4 text-zinc-700 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link href="/book" className="block">
                    <Button
                      className={`w-full font-semibold tracking-wide py-3 ${
                        isPro
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-900/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
                      }`}
                    >
                      {plan.cta} <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Consultation callout */}
        <div className="mt-20 border border-white/10 bg-[#111111] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-zinc-100">Not sure which plan?</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Start with a $75, 30-minute consultation. The fee is credited toward your first month.
            </p>
          </div>
          <Link href="/book" className="shrink-0">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3">
              Book a $75 Consultation
            </Button>
          </Link>
        </div>

        {/* Payment options note */}
        <p className="text-center text-xs text-zinc-600 mt-10">
          Online card payments coming soon. Currently accepting Zelle (626-708-2220), Venmo (@marioo00), and Cash App ($10mario01).
        </p>
      </div>
    </div>
  )
}
