'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Scale,
  Sparkles,
  BookOpen,
  UserCheck,
  Mail,
  Calendar,
  CreditCard,
  Shield,
  ArrowRight,
  CheckCircle2,
  Phone,
  Send,
  HeartHandshake
} from 'lucide-react'
import HubModal from '@/components/hub/HubModal'
import PagaNestedPortalModal from '@/components/hub/PagaNestedPortalModal'

export interface HubTile {
  id: string
  title: string
  subtitle: string
  badge: string
  icon: typeof Scale
  accentColor: string
  bgHover: string
  borderAccent: string
}

const hubTiles: HubTile[] = [
  {
    id: 'paga-risk',
    title: 'PAGA Risk Center',
    subtitle: 'AB 2288 Penalty Calculator & Cure Rules',
    badge: 'Statutory Defense',
    icon: Scale,
    accentColor: 'text-amber-400',
    bgHover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
    borderAccent: 'border-amber-500/20'
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Governance',
    subtitle: 'CRD Decision Rules & Policy Architect',
    badge: 'AI Compliance',
    icon: Sparkles,
    accentColor: 'text-cyan-400',
    bgHover: 'hover:border-cyan-500/30 hover:bg-cyan-500/5',
    borderAccent: 'border-cyan-500/20'
  },
  {
    id: 'legal-insights',
    title: 'Legal Insights & Blog',
    subtitle: 'California Labor Code Briefings',
    badge: '2026 Legal Briefs',
    icon: BookOpen,
    accentColor: 'text-indigo-400',
    bgHover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    borderAccent: 'border-indigo-500/20'
  },
  {
    id: 'founder-bio',
    title: 'Founder Bio',
    subtitle: 'Mario Espindola, MPA Profile & Mission',
    badge: '10-Yr Public HR',
    icon: UserCheck,
    accentColor: 'text-emerald-400',
    bgHover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
    borderAccent: 'border-emerald-500/20'
  },
  {
    id: 'advisory-intake',
    title: 'Advisory Intake',
    subtitle: 'Direct Compliance Outreach Form',
    badge: 'Fast Response',
    icon: Mail,
    accentColor: 'text-rose-400',
    bgHover: 'hover:border-rose-500/30 hover:bg-rose-500/5',
    borderAccent: 'border-rose-500/20'
  },
  {
    id: 'booking-scheduling',
    title: 'Booking & Scheduling',
    subtitle: '30-Min Diagnostic ($75 Credited)',
    badge: 'Live Calendar',
    icon: Calendar,
    accentColor: 'text-violet-400',
    bgHover: 'hover:border-violet-500/30 hover:bg-violet-500/5',
    borderAccent: 'border-violet-500/20'
  },
  {
    id: 'payment-portal',
    title: 'Payment Portal',
    subtitle: 'Zelle, Venmo, Cash App & Stripe',
    badge: 'Instant Retainer',
    icon: CreditCard,
    accentColor: 'text-blue-400',
    bgHover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
    borderAccent: 'border-blue-500/20'
  },
  {
    id: 'defense-campaign',
    title: 'Defense Campaign',
    subtitle: 'Small Business Legal Tool Funding',
    badge: 'SGV Community',
    icon: Shield,
    accentColor: 'text-fuchsia-400',
    bgHover: 'hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5',
    borderAccent: 'border-fuchsia-500/20'
  }
]

export default function HubGrid() {
  const [activeTileId, setActiveTileId] = useState<string | null>(null)

  // Intake Form State
  const [intakeSubmitted, setIntakeSubmitted] = useState<boolean>(false)

  const activeTile = hubTiles.find((t) => t.id === activeTileId)

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col bg-[#0a0a0a] text-zinc-100 overflow-hidden select-none">
      {/* Top Hub Bar */}
      <header className="px-4 py-3 bg-[#111111] border-b border-white/10 flex items-center justify-between shrink-0 h-[56px]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xs">
            HR
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-zinc-100 leading-none">
              CalBizHR <span className="text-indigo-400 font-bold text-xs">Hub</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-medium leading-none mt-0.5">
              Zero-Scroll Viewport · 8 Primary Compliance Modules
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live System
          </span>
          <a
            href="tel:6267082220"
            className="text-xs font-bold text-zinc-300 hover:text-indigo-400 flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 transition-colors"
          >
            <Phone className="h-3 w-3 text-indigo-400" />
            <span className="hidden sm:inline">626-708-2220</span>
          </a>
        </div>
      </header>

      {/* Main 8-Tile Hub Grid (2x4 on Mobile, 4x2 on Desktop) */}
      <main className="flex-1 p-3 sm:p-5 grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-3 sm:gap-4 overflow-hidden h-[calc(100dvh-56px)]">
        {hubTiles.map((tile) => {
          const TileIcon = tile.icon

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setActiveTileId(tile.id)}
              className={`group relative flex flex-col justify-between p-4 sm:p-5 bg-[#111111] border border-white/10 rounded-2xl text-left transition-all duration-200 cursor-pointer overflow-hidden ${tile.bgHover} hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]`}
            >
              {/* Top Accent Pill */}
              <div className="flex items-start justify-between gap-2 w-full">
                <div className={`p-2.5 rounded-xl bg-white/5 border ${tile.borderAccent} ${tile.accentColor} group-hover:scale-110 transition-transform`}>
                  <TileIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 border border-white/5 px-2 py-0.5 rounded-full truncate">
                  {tile.badge}
                </span>
              </div>

              {/* Center Content */}
              <div className="mt-2 space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                  {tile.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-snug">
                  {tile.subtitle}
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-zinc-500 group-hover:text-indigo-400 transition-colors pt-2 border-t border-white/5 w-full">
                <span>Launch Module</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          )
        })}
      </main>

      {/* Drill-Down Modals */}
      {activeTile && (
        <HubModal
          title={activeTile.title}
          subtitle={activeTile.subtitle}
          badge={activeTile.badge}
          isOpen={!!activeTileId}
          onClose={() => setActiveTileId(null)}
        >
          {/* 1. PAGA Risk Center Modal */}
          {activeTile.id === 'paga-risk' && (
            <PagaNestedPortalModal
              onOpenBooking={() => setActiveTileId('booking-scheduling')}
            />
          )}

          {/* 2. AI & Automation Governance Modal */}
          {activeTile.id === 'ai-automation' && (
            <div className="space-y-6">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-xs text-cyan-200 leading-relaxed">
                <strong className="font-bold block text-cyan-300 text-sm mb-1">CRD Automated Decision System Rules</strong>
                California Civil Rights Department (CRD) regulations strictly govern the use of AI in recruitment, performance evaluation, and worker screening.
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">AI Governance Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#161616] p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block">Algorithmic Bias Audit</span>
                    <p className="text-zinc-400 text-[11px]">Regular testing of AI resume screening tools to prevent disparate impact discrimination.</p>
                  </div>
                  <div className="bg-[#161616] p-3.5 rounded-xl border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block">Mandatory Disclosures</span>
                    <p className="text-zinc-400 text-[11px]">Clear written notice to job applicants before AI video interviews or automated assessments.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Link
                  href="/ai-lab"
                  className="inline-flex items-center gap-2 bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-cyan-500 transition-colors"
                >
                  Launch AI Policy Architect <Sparkles className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 3. Legal Insights & Blog Modal */}
          {activeTile.id === 'legal-insights' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <p className="text-zinc-400">
                California Labor Code statutory briefings, compliance updates, and small business legal guides.
              </p>

              <div className="space-y-3">
                <div className="bg-[#161616] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">SB 553 Briefing</span>
                  <h4 className="font-bold text-zinc-100 text-sm">Workplace Violence Prevention Mandates</h4>
                  <p className="text-zinc-400 text-[11px]">All California employers must maintain written plans, incident logs, and annual training rosters.</p>
                </div>
                <div className="bg-[#161616] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">PAGA Reform Guide</span>
                  <h4 className="font-bold text-zinc-100 text-sm">AB 2288 Statutory Cure Opportunities</h4>
                  <p className="text-zinc-400 text-[11px]">How small businesses can utilize 60-day cure windows to eliminate PAGA lawsuit exposure.</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-indigo-500 transition-colors"
                >
                  Explore All Briefings <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 4. Founder Bio Modal */}
          {activeTile.id === 'founder-bio' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <div className="flex items-center gap-4 bg-[#161616] border border-white/10 p-4 rounded-xl">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl shrink-0">
                  ME
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">Mario Espindola, MPA</h3>
                  <p className="text-emerald-400 font-medium text-xs">10-Year CA Public Sector HR Professional</p>
                  <p className="text-zinc-500 text-[11px] mt-0.5">Founder & Principal HR Consultant</p>
                </div>
              </div>

              <div className="space-y-3 leading-relaxed">
                <p>
                  With over a decade of hands-on human resources administration across California public sector agencies and municipal workforces, Mario Espindola brings deep operational expertise to small business owners in the San Gabriel Valley and Greater Los Angeles area.
                </p>
                <p>
                  CalBizHR was founded on a simple mission: equip small business owners with direct, high-volume compliance output at accessible rates, bypassing overpriced corporate retainers.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-emerald-500 transition-colors"
                >
                  Full Bio & Mission <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 5. Advisory Intake Modal */}
          {activeTile.id === 'advisory-intake' && (
            <div className="space-y-5 text-xs text-zinc-300">
              {intakeSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-300">Intake Form Received!</h4>
                  <p className="text-zinc-400 text-xs">Mario will review your compliance inquiry and respond within 1 business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIntakeSubmitted(true)
                  }}
                  className="space-y-3"
                >
                  <p className="text-zinc-400">Direct outreach for urgent California HR questions or custom plan support.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Your Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Business Name</label>
                      <input required type="text" placeholder="SGV Local Business" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Email</label>
                      <input required type="email" defaultValue="info@mario00.com" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Phone Number</label>
                      <input required type="tel" defaultValue="626-708-2220" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Primary Compliance Question</label>
                    <textarea rows={3} placeholder="How do I ensure my paystubs and WVPP written plan are compliant?" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-100 outline-none focus:border-rose-500" />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button type="submit" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors">
                      Submit Intake Request <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 6. Booking & Scheduling Modal */}
          {activeTile.id === 'booking-scheduling' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-zinc-100 text-sm">30-Minute Diagnostic Session</h4>
                  <p className="text-violet-300 text-xs mt-0.5">$75 fee is 100% credited toward any ongoing compliance package.</p>
                </div>
                <span className="text-base font-black text-violet-400">$75</span>
              </div>

              {/* Embedded Booking Widget Placeholder */}
              <div className="bg-[#161616] border border-white/10 p-6 rounded-xl text-center space-y-3">
                <Calendar className="h-8 w-8 text-violet-400 mx-auto" />
                <p className="text-zinc-400 text-xs">Direct Cal.com integration widget for instant calendar scheduling.</p>
                <div className="text-[10px] text-zinc-500 font-mono">[PLACEHOLDER — Cal.com Widget Embed]</div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-violet-500 transition-colors"
                >
                  Open Booking Page <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 7. Payment Portal Modal */}
          {activeTile.id === 'payment-portal' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <p className="text-zinc-400">Direct peer-to-peer payment handles and retainer payment methods.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Zelle Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">info@mario00.com</p>
                </div>

                <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">Venmo Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">@marioo00</p>
                </div>

                <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Cash App Handle</span>
                  <p className="text-sm font-mono text-zinc-100 font-bold select-all">10mario01</p>
                </div>

                <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Stripe Card Retainer</span>
                  <p className="text-xs text-zinc-400">Credit card retainer checkout via secure Stripe portal.</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-blue-500 transition-colors"
                >
                  View Pricing & Services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 8. Defense Campaign Modal */}
          {activeTile.id === 'defense-campaign' && (
            <div className="space-y-5 text-xs text-zinc-300">
              <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-fuchsia-300 text-sm">Small Business Compliance Defense Campaign</h4>
                <p className="text-zinc-300 text-xs">Fund free California compliance toolkits and legal defense calculators for Los Angeles & SGV small business owners.</p>
              </div>

              <div className="bg-[#161616] p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">Community Support</span>
                <p className="text-zinc-400 text-xs">
                  Your contributions directly sponsor free SB 553 WVPP templates, PAGA penalty calculators, and compliance checklists for local family-owned businesses.
                </p>
                <div className="text-[10px] text-zinc-500 font-mono pt-1">[PLACEHOLDER — Community Defense Donation Tracker]</div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTileId('payment-portal')}
                  className="inline-flex items-center gap-2 bg-fuchsia-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-fuchsia-500 transition-colors"
                >
                  Contribute via Portal <HeartHandshake className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </HubModal>
      )}
    </div>
  )
}
