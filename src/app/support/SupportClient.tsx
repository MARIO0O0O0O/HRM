'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeartHandshake,
  QrCode,
  ArrowLeft,
  Database,
  Zap,
  Layers,
  Sparkles,
  Mail,
  MessageSquare
} from 'lucide-react'

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => { render: (containerSelector: string) => void }
    }
  }
}

const PAYPAL_CLIENT_ID =
  'BAAppu76hfAXUs56BPzvSG1Z0j-DWFecgjp4mBvYyLdNcQeFGhPPZoceDMPCru2fHjh2kaEjW3dkDdN_mI'
const PAYPAL_HOSTED_BUTTON_ID = '8K8H5FDQJ444U'
const PAYPAL_CONTAINER_ID = 'paypal-container-8K8H5FDQJ444U'
const PAYPAL_SDK_SCRIPT_ID = 'paypal-hosted-buttons-sdk'

export default function SupportClient() {
  useEffect(() => {
    const container = document.getElementById(PAYPAL_CONTAINER_ID)
    if (!container) return
    container.innerHTML = ''

    function renderButton() {
      window.paypal?.HostedButtons({ hostedButtonId: PAYPAL_HOSTED_BUTTON_ID }).render(
        `#${PAYPAL_CONTAINER_ID}`
      )
    }

    if (window.paypal) {
      renderButton()
      return
    }

    const existing = document.getElementById(PAYPAL_SDK_SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', renderButton, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = PAYPAL_SDK_SCRIPT_ID
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&enable-funding=venmo&currency=USD`
    script.async = true
    script.onload = renderButton
    document.body.appendChild(script)
  }, [])

  return (
    <main className="min-h-screen bg-[#0a1320] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#B5933C] hover:text-[#d4b45a] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Header */}
        <div className="space-y-3 border-b border-[#B5933C]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B5933C]/10 border border-[#B5933C]/30 text-xs font-mono text-[#B5933C] uppercase tracking-wider">
            <HeartHandshake className="h-3.5 w-3.5" /> Support &amp; Investment
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Support CalBizHR
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Sponsor free employer compliance tools for local small businesses, or learn how to back our next-generation California HR compliance engine.
          </p>
        </div>

        {/* SECTION A: Community Support */}
        <section className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5933C]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B5933C]">Section A</span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2.5 mt-0.5">
                <HeartHandshake className="h-6 w-6 text-[#B5933C]" />
                Community Support &amp; Defense Campaign
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 px-3 py-1 rounded-full border border-[#B5933C]/30 shrink-0">
              Suggested: $25 &ndash; $100
            </span>
          </div>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Help keep essential California HR tools free for local small business owners. Your donation sponsors free SB 553 WVPP toolkits, PAGA exposure calculators, and labor law compliance guides for employers across Los Angeles and the San Gabriel Valley.
          </p>

          {/* Real PayPal Donate Box */}
          <div className="bg-[#161616] border border-[#B5933C]/30 rounded-xl p-5 sm:p-6 shadow-inner">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center gap-2 text-[#B5933C] font-bold text-sm">
                  <HeartHandshake className="h-4 w-4 shrink-0" />
                  <span>Donate Securely via PayPal</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Choose your own amount at checkout. Card or PayPal balance accepted &mdash; processed directly by PayPal, no account required.
                </p>
                {/* PayPal Container */}
                <div id={PAYPAL_CONTAINER_ID} className="w-full min-h-[42px] pt-1" />
              </div>

              <div className="sm:shrink-0 flex flex-col items-center gap-2 pt-2 sm:pt-0 sm:border-l sm:border-white/10 sm:pl-6">
                <div className="bg-white rounded-lg p-2 border border-[#B5933C]/40 shadow-md">
                  <Image
                    src="/images/paypal-donate-qr.webp"
                    alt="Scan to donate via PayPal"
                    width={110}
                    height={110}
                    className="rounded"
                  />
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  <QrCode className="h-3 w-3 text-[#B5933C]" /> Scan QR to Donate
                </span>
              </div>
            </div>
          </div>

          {/* GoFundMe Campaign -- second giving option, visually distinct from PayPal */}
          <a
            href="https://gofund.me/8a0a7a7ca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-[#0d2818] border border-emerald-500/30 rounded-xl px-5 py-4 hover:border-emerald-500/50 hover:bg-[#0f3320] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-emerald-300 font-bold text-sm">Or support our GoFundMe campaign</p>
                <p className="text-zinc-400 text-xs mt-0.5">Another way to give &mdash; same mission</p>
              </div>
            </div>
            <span className="text-emerald-400 text-xs font-mono shrink-0 group-hover:translate-x-0.5 transition-transform">
              gofund.me/8a0a7a7ca &rarr;
            </span>
          </a>

          {/* Direct Handles Collapsible */}
          <details className="group bg-[#161616] rounded-xl border border-white/10 overflow-hidden">
            <summary className="cursor-pointer px-4 py-3 text-zinc-300 font-semibold text-xs flex items-center justify-between hover:bg-white/5 transition-colors">
              <span>Prefer to send directly via P2P handles?</span>
              <span className="text-[#B5933C] text-[11px] group-open:hidden font-mono">+ Show Handles</span>
              <span className="text-[#B5933C] text-[11px] hidden group-open:inline font-mono">&minus; Hide Handles</span>
            </summary>
            <div className="px-4 pb-4 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/5">
              <div className="bg-[#0f0f0f] p-3.5 rounded-lg border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Zelle Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">info@mario00.com</p>
              </div>
              <div className="bg-[#0f0f0f] p-3.5 rounded-lg border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Venmo Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">@marioo00</p>
              </div>
              <div className="bg-[#0f0f0f] p-3.5 rounded-lg border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Cash App Handle</span>
                <p className="text-sm font-mono text-zinc-100 font-bold select-all">10mario01</p>
              </div>
            </div>
          </details>
        </section>

        {/* SECTION B: Invest & Fund Operations */}
        <section className="bg-[#0b172a] border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">Section B</span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2.5 mt-0.5">
                <Database className="h-6 w-6 text-indigo-400" />
                Invest &amp; Fund Platform Operations
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 shrink-0">
              Strategic Growth &amp; Tech Build
            </span>
          </div>

          {/* Vision Statement */}
          <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-5 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" /> Vision Statement
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans">
              CalBizHR is building a structured California compliance database (SQL) designed to deliver compliance auditing and policy generation at the speed of enterprise HR platforms with the legal precision of specialized law firms.
            </p>
          </div>

          {/* What Funding Accelerates */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              What Funding Accelerates:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#121f35] border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Database className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Structured SQL Engine</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Completing the relational database mapping California Labor Code, DLSE rulings, and mandatory policy requirements.
                </p>
              </div>

              <div className="bg-[#121f35] border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Layers className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Expanded Coverage</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Expanding specialized coverage across safety &amp; prevention, wage &amp; hour, leave management, and industry-specific regulations.
                </p>
              </div>

              <div className="bg-[#121f35] border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Zap className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Scaling Free Employer Tools</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Scaling accessible calculators, risk self-audits, and compliance generators for California small businesses.
                </p>
              </div>
            </div>
          </div>

          {/* Investor Contact CTA */}
          <div className="bg-[#121f35]/80 border border-indigo-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-white font-bold text-sm sm:text-base">Inquire About Investment Opportunities</h4>
              <p className="text-zinc-400 text-xs">
                Investor conversations and strategic partnerships take place off-platform. Reach out directly to initiate a conversation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="mailto:info@mario00.com?subject=Investment%20Inquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-indigo-600/20"
              >
                <Mail className="h-4 w-4" /> Email Investment Inquiry
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/10 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-indigo-400" /> Contact Page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
