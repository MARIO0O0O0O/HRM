'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  CreditCard,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  QrCode
} from 'lucide-react'
import Link from 'next/link'

// PayPal Hosted Buttons SDK — declared here since window.paypal has no built-in type
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

export default function PaymentsFundNestedModal() {
  const [subView, setSubView] = useState<'tier1' | 'retainers' | 'campaign'>('tier1')

  // Load the PayPal SDK (once, cached across re-opens) and render the real Donate
  // button whenever the Defense Fund sub-view becomes active. Manual DOM injection
  // (rather than next/script) because this container mounts/unmounts every time the
  // visitor navigates in and out of this modal sub-view, and we need the button to
  // re-render each time — not just on first-ever page load.
  useEffect(() => {
    if (subView !== 'campaign') return

    const container = document.getElementById(PAYPAL_CONTAINER_ID)
    if (!container) return
    container.innerHTML = '' // clear so PayPal doesn't stack duplicate buttons on re-open

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
  }, [subView])

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

            <Link
              href="/support"
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-white/10 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
            >
              <HeartHandshake className="h-4 w-4 text-fuchsia-400" />
              <span>Small Business Defense Fund</span>
            </Link>
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
              <p className="text-zinc-300 text-xs">Fund free California compliance toolkits and legal defense calculators for local small business owners. Typical contributions range $25&ndash;$100 &mdash; every amount helps.</p>
            </div>

            {/* Real PayPal Donate flow */}
            <div className="bg-[#161616] border border-[#B5933C]/30 rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-6">
                <div className="flex-1 min-w-0 w-full space-y-3 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start text-[#B5933C] font-bold text-sm">
                    <HeartHandshake className="h-4 w-4 shrink-0" />
                    <span>Donate Securely via PayPal</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Choose your own amount at checkout. Card or PayPal balance accepted &mdash; processed directly by PayPal, no account required.
                  </p>
                  {/* PayPal renders its real "Donate Now" button into this container */}
                  <div id={PAYPAL_CONTAINER_ID} className="w-full min-h-[42px]" />
                </div>

                <div className="sm:shrink-0 flex flex-col items-center gap-1.5">
                  <div className="bg-white rounded-lg p-2 border border-[#B5933C]/30">
                    <Image
                      src="/images/paypal-donate-qr.webp"
                      alt="Scan to donate via PayPal"
                      width={110}
                      height={110}
                      className="rounded"
                    />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    <QrCode className="h-3 w-3" /> Scan to Donate
                  </span>
                </div>
              </div>
            </div>

            {/* P2P handles retained as an alternate for donors who prefer them */}
            <details className="group bg-[#161616] rounded-xl border border-white/10 overflow-hidden">
              <summary className="cursor-pointer px-4 py-3 text-zinc-300 font-semibold text-xs flex items-center justify-between">
                Prefer to send directly?
                <span className="text-zinc-500 text-[10px] group-open:hidden">Show handles</span>
                <span className="text-zinc-500 text-[10px] hidden group-open:inline">Hide handles</span>
              </summary>
              <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0f0f0f] p-3 rounded-lg border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Zelle Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">info@mario00.com</p>
                </div>
                <div className="bg-[#0f0f0f] p-3 rounded-lg border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Venmo Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">@marioo00</p>
                </div>
                <div className="bg-[#0f0f0f] p-3 rounded-lg border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Cash App Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">10mario01</p>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  )
}
