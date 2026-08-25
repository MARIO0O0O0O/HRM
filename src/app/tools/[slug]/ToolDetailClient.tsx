'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ContributionBanner from '@/components/tools/ContributionBanner'
import HighTicketUpsell from '@/components/tools/HighTicketUpsell'

interface ToolItem {
  icon: string
  title: string
  description: string
  tags: string[]
}

interface ToolFAQ {
  q: string
  a: string
}

interface Tool {
  slug: string
  title: string
  shortTitle: string
  badge: string
  description: string
  lawRef: string
  price: number
  priceLabel: string
  items: ToolItem[]
  faqs: ToolFAQ[]
  ctaLabel: string
  accentColor: 'indigo' | 'cyan' | 'violet' | 'rose'
}

const accentMap = {
  indigo: {
    badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    glow: 'from-indigo-500 to-cyan-500',
    tag: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    btn: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/30',
    border: 'border-indigo-500/20',
    check: 'text-indigo-400',
  },
  cyan: {
    badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    glow: 'from-cyan-500 to-indigo-500',
    tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    btn: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/30',
    border: 'border-cyan-500/20',
    check: 'text-cyan-400',
  },
  violet: {
    badge: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    glow: 'from-violet-500 to-indigo-500',
    tag: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    btn: 'bg-violet-600 hover:bg-violet-500 shadow-violet-900/30',
    border: 'border-violet-500/20',
    check: 'text-violet-400',
  },
  rose: {
    badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    glow: 'from-rose-500 to-indigo-500',
    tag: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    btn: 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/30',
    border: 'border-rose-500/20',
    check: 'text-rose-400',
  },
}

function FAQItem({ q, a }: ToolFAQ) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 bg-[#111111] hover:bg-[#151515] transition-colors"
      >
        <span className="text-sm font-semibold text-zinc-200">{q}</span>
        {open
          ? <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" />
          : <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 py-4 bg-[#0e0e0e] border-t border-white/5">
          <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function ToolDetailClient({ tool }: { tool: Tool }) {
  const colors = accentMap[tool.accentColor]

  const paymentSubject = encodeURIComponent(`${tool.shortTitle} — ${tool.priceLabel}`)
  const paymentBody = encodeURIComponent(
    `Hi Mario,\n\nI'd like to purchase the ${tool.title} (${tool.priceLabel}).\n\nPlease send payment instructions.\n\nThank you.`
  )

  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen">

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06)_0%,transparent_60%)] pointer-events-none`} />
        <div className="max-w-4xl mx-auto relative">
          <Breadcrumb className="mb-6" />
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> All Toolkits
          </Link>

          <span className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full border ${colors.badge}`}>
            {tool.badge}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-100 mt-5 leading-tight">
            {tool.title}
          </h1>
          <p className="text-xs font-mono text-zinc-600 mt-2">{tool.lawRef}</p>
          <p className="text-base sm:text-lg text-zinc-400 mt-5 max-w-2xl leading-relaxed">
            {tool.description}
          </p>

          {/* Price + CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div>
              <span className="text-4xl font-black text-zinc-100">${tool.price}</span>
              <span className="text-sm text-zinc-500 ml-2">one-time · immediate delivery</span>
            </div>
            <a
              href={`mailto:mario_espindola@outlook.com?subject=${paymentSubject}&body=${paymentBody}`}
              className={`inline-flex items-center gap-2 ${colors.btn} text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg`}
            >
              {tool.ctaLabel} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Payment methods */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-600">
            <span>Pay via:</span>
            <span className="bg-[#111111] border border-white/5 px-2.5 py-1 rounded-lg font-medium text-zinc-400">Zelle 626-999-6239</span>
            <span className="bg-[#111111] border border-white/5 px-2.5 py-1 rounded-lg font-medium text-zinc-400">Venmo @marioo00</span>
            <span className="bg-[#111111] border border-white/5 px-2.5 py-1 rounded-lg font-medium text-zinc-400">Cash App $10mario01</span>
          </div>
        </div>
      </section>

      {/* Contribution Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContributionBanner
          toolTitle={tool.title}
          suggestedPrice={tool.price}
        />
      </div>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-10">
            What&apos;s included
          </h2>
          <div className="flex flex-col gap-4">
            {tool.items.map((item, i) => (
              <div
                key={i}
                className={`bg-[#111111] border border-white/5 hover:${colors.border} rounded-2xl p-6 sm:p-7 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${colors.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary checklist */}
          <div className="mt-10 bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-5">Summary</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.items.map((item) => (
                <li key={item.title} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 className={`h-4 w-4 ${colors.check} shrink-0`} />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-10">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-3">
            {tool.faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* High Ticket Upsell */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <HighTicketUpsell />
      </div>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 items-center justify-between bg-[#111111] border border-white/10 rounded-2xl p-8">
          <div>
            <h3 className="text-xl font-bold text-zinc-100">Ready to get started?</h3>
            <p className="text-sm text-zinc-400 mt-1">
              {tool.priceLabel} · Delivered within 1 business day
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`mailto:mario_espindola@outlook.com?subject=${paymentSubject}&body=${paymentBody}`}
              className={`inline-flex items-center gap-2 ${colors.btn} text-white font-bold px-6 py-3 rounded-xl transition-colors`}
            >
              {tool.ctaLabel} <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-zinc-100 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-8 max-w-2xl mx-auto">
          Educational and compliance guidance only — not legal advice. CalBizHR is an HR consultancy, not a law firm.
          Templates should be reviewed by qualified employment counsel prior to implementation.
        </p>
      </section>
    </div>
  )
}
