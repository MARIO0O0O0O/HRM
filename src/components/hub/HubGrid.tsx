'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShieldCheck,
  FileCheck,
  Clock,
  Scale,
  Receipt,
  Users,
  ShieldAlert,
  Cpu,
  BookOpen,
  UserCheck,
  Calendar,
  CreditCard,
  ArrowRight,
  Phone,
  type LucideIcon
} from 'lucide-react'
import BannerCarousel from '@/components/hub/BannerCarousel'
import HubModal from '@/components/hub/HubModal'
import LegalInsightsNestedModal from '@/components/hub/LegalInsightsNestedModal'
import FounderBioNestedModal from '@/components/hub/FounderBioNestedModal'
import AdvisoryBookingNestedModal from '@/components/hub/AdvisoryBookingNestedModal'
import PaymentsFundNestedModal from '@/components/hub/PaymentsFundNestedModal'

export interface ComplianceAreaCard {
  id: string
  title: string
  ctaLine?: string
  bodyText?: string
  tags?: string[]
  accentColor: string
  icon: LucideIcon
  status: 'ready' | 'coming-soon'
  href: string
}

export interface HubTile {
  id: string
  title: string
  subtitle: string
  badge: string
  icon: LucideIcon
  accentColor: string
  bgHover: string
  borderAccent: string
  bgImage: string
}

const complianceAreaCards: ComplianceAreaCard[] = [
  {
    id: 'harassment-prevention',
    title: 'Harassment and abusive conduct prevention',
    ctaLine: 'Required for every California employer with 5+ employees',
    bodyText: "Free compliance checklist, policy guide, and live training Q&A -- everything you need to meet the state's training mandate.",
    tags: ['Checklist', 'Guide', 'Live Q&A'],
    accentColor: '#0F6E56',
    icon: ShieldCheck,
    status: 'ready',
    href: '/spokes/safety-prevention/harassment-prevention'
  },
  {
    id: 'onboarding-kyr',
    title: 'Onboarding and Know Your Rights',
    ctaLine: 'Wage theft notices and the 2026 annual KYR mandate',
    bodyText: 'Free notice templates and a deadline tracker for both onboarding and annual compliance requirements.',
    tags: ['Templates', 'Tracker'],
    accentColor: '#D85A30',
    icon: FileCheck,
    status: 'ready',
    href: '/spokes/lifecycle-admin/onboarding'
  },
  {
    id: 'meal-rest',
    title: 'Meal and rest period compliance',
    ctaLine: 'The single largest source of CA wage-and-hour litigation',
    bodyText: 'Coming soon -- free premium-pay calculator and break-scheduling guide.',
    tags: [],
    accentColor: 'gray',
    icon: Clock,
    status: 'coming-soon',
    href: '/spokes/wage-hour/meal-rest-breaks'
  },
  {
    id: 'paga',
    title: 'PAGA compliance',
    ctaLine: "Reduce exposure under the 2024 reform's cure provisions",
    bodyText: 'Coming soon -- free exposure calculator and 60-day cure roadmap.',
    tags: [],
    accentColor: 'gray',
    icon: Scale,
    status: 'coming-soon',
    href: '/paga-calculator'
  },
  {
    id: 'wage-statements',
    title: 'Wage statements and pay transparency',
    ctaLine: '9 required items on every paystub, statewide',
    bodyText: 'Coming soon -- free paystub audit checklist.',
    tags: [],
    accentColor: 'gray',
    icon: Receipt,
    status: 'coming-soon',
    href: '/spokes/wage-hour/paystubs-wage-statements'
  },
  {
    id: 'exempt-classification',
    title: 'Exempt salary and classification',
    ctaLine: 'Misclassification carries retroactive liability',
    bodyText: 'Coming soon -- free classification decision guide.',
    tags: [],
    accentColor: 'gray',
    icon: Users,
    status: 'coming-soon',
    href: '/spokes/wage-hour/timekeeping-classification'
  },
  {
    id: 'wvpp',
    title: 'Workplace violence prevention',
    ctaLine: 'Mandatory written plan for nearly every CA employer',
    bodyText: 'Coming soon -- free plan template and incident log.',
    tags: [],
    accentColor: 'gray',
    icon: ShieldAlert,
    status: 'coming-soon',
    href: '/spokes/safety-prevention/workplace-violence'
  },
  {
    id: 'ai-automation',
    title: 'AI and automation compliance',
    ctaLine: 'Emerging CA rules on automated employment decisions',
    bodyText: 'Coming soon -- free AI-use policy guide.',
    tags: [],
    accentColor: 'gray',
    icon: Cpu,
    status: 'coming-soon',
    href: '/ai-governance'
  }
]

const secondaryHubTiles: HubTile[] = [
  {
    id: 'legal-insights',
    title: 'Legal Insights & Blog',
    subtitle: 'California Labor Code Briefings',
    badge: 'BRIEFINGS',
    icon: BookOpen,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_legal_insights_clean.jpg'
  },
  {
    id: 'founder-bio',
    title: 'Founder Bio & Defense Mission',
    subtitle: 'Mario Espindola, MPA Profile & Mission',
    badge: 'LEADERSHIP',
    icon: UserCheck,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_founder_bio_clean.jpg'
  },
  {
    id: 'advisory-intake',
    title: 'Advisory Intake & Booking',
    subtitle: 'Direct Consultation & Diagnostic Intake',
    badge: 'CONSULTATION',
    icon: Calendar,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_advisory_booking.jpg'
  },
  {
    id: 'payments-fund',
    title: 'Payments & Defense Fund',
    subtitle: 'Client Retainers & Defense Campaign',
    badge: 'PAY & SUPPORT',
    icon: CreditCard,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_payments_fund.jpg'
  }
]

export default function HubGrid() {
  const [activeTileId, setActiveTileId] = useState<string | null>(null)

  const activeTile = secondaryHubTiles.find((t) => t.id === activeTileId)

  return (
    <div className="min-h-[calc(100dvh-var(--header-height,64px))] w-full flex flex-col bg-[#1A2D4D] text-zinc-100 overflow-y-auto select-none">
      {/* Top Hub Bar */}
      <header className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0f1c32] border-b border-[#B5933C]/20 flex items-center justify-between shrink-0 h-[42px] sm:h-[46px]">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-[#B5933C]/10 border border-[#B5933C]/30 flex items-center justify-center text-[#B5933C] font-mono font-bold text-xs">
            HR
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-serif font-bold tracking-tight text-white leading-none">
              CalBizHR <span className="text-[11px] sm:text-xs font-sans text-zinc-400">| Compliance Hub</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/20 px-2.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B5933C] animate-pulse" />
            Live System
          </span>
          <a
            href="tel:6267082220"
            className="text-xs font-sans font-bold text-zinc-200 hover:text-[#B5933C] flex items-center gap-1.5 px-2 py-0.5 sm:py-1 rounded-md bg-[#1A2D4D] border border-[#B5933C]/30 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#B5933C]" />
            <span className="hidden sm:inline">626-708-2220</span>
          </a>
        </div>
      </header>

      {/* Auto-Advancing Homepage Banner Carousel */}
      <BannerCarousel />

      {/* Primary Section: 8 Compliance Area Cards */}
      <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 pb-2">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#B5933C] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#B5933C] animate-pulse" />
            California HR Compliance Areas
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
            Mandatory state compliance programs and free employer toolkits
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {complianceAreaCards.map((card) => {
            const CardIcon = card.icon
            const isReady = card.status === 'ready'

            if (isReady) {
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative flex flex-col justify-between p-4 sm:p-5 bg-[#0f1c32] border border-[#B5933C]/30 hover:border-[#B5933C] rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#B5933C] focus:ring-offset-2 focus:ring-offset-[#1A2D4D]"
                >
                  <div>
                    {/* Top Row: Icon + Ready Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className="p-2 rounded-lg bg-[#1A2D4D] border border-white/10 shrink-0"
                        style={{ color: card.accentColor }}
                      >
                        <CardIcon className="h-5 w-5" />
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                        style={{
                          color: card.accentColor,
                          borderColor: `${card.accentColor}50`,
                          backgroundColor: `${card.accentColor}18`
                        }}
                      >
                        Ready
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight group-hover:text-[#B5933C] transition-colors leading-snug mb-1">
                      {card.title}
                    </h3>

                    {/* CTA Line */}
                    {card.ctaLine && (
                      <p
                        className="text-xs sm:text-sm font-sans font-semibold mb-2 leading-tight"
                        style={{ color: card.accentColor }}
                      >
                        {card.ctaLine}
                      </p>
                    )}

                    {/* Body Text */}
                    {card.bodyText && (
                      <p className="text-xs font-sans text-zinc-300 leading-relaxed font-normal mb-4">
                        {card.bodyText}
                      </p>
                    )}
                  </div>

                  {/* Tag Pills */}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mt-auto">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-sans font-medium text-zinc-300 bg-[#1A2D4D] border border-white/10 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )
            }

            {/* coming-soon cards */}
            return (
              <div
                key={card.id}
                className="relative flex flex-col justify-between p-4 sm:p-5 bg-[#0f1c32]/60 border border-zinc-800/80 rounded-xl opacity-70 cursor-default select-none transition-opacity"
              >
                <div>
                  {/* Top Row: Muted Icon + Coming Soon Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-[#1A2D4D]/60 border border-zinc-800 text-zinc-400 shrink-0">
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">
                      Coming soon
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-zinc-200 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Secondary Section: Remaining 4 Hub Tiles */}
      <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 pt-6 sm:pt-8 pb-8 mt-4 sm:mt-6 border-t border-[#B5933C]/20">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            More from CalBizHR
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {secondaryHubTiles.map((tile) => {
            const TileIcon = tile.icon

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => setActiveTileId(tile.id)}
                className={`group relative flex flex-col justify-between p-3 sm:p-4 bg-[#0f1c32] border border-[#B5933C]/30 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden ${tile.bgHover} hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] min-h-[140px]`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={tile.bgImage}
                    alt={`${tile.title} illustration`}
                    fill
                    className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Content Box */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full bg-[#0c1626]/90 border border-[#B5933C]/30 backdrop-blur-xs rounded-lg p-2.5 sm:p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-1 w-full">
                    <div className="p-1 rounded-md bg-[#1A2D4D] border border-[#B5933C]/50 text-[#B5933C] group-hover:scale-105 transition-transform shrink-0">
                      <TileIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#1A2D4D] border border-[#B5933C]/30 px-1.5 py-0.5 rounded-full truncate">
                      {tile.badge}
                    </span>
                  </div>

                  <div className="my-1.5 space-y-0.5 min-w-0">
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-white tracking-tight group-hover:text-[#B5933C] transition-colors leading-tight">
                      {tile.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-sans text-zinc-300 truncate leading-tight">
                      {tile.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans font-bold text-[#B5933C] group-hover:text-[#d4b45a] transition-colors pt-1 border-t border-[#B5933C]/20 w-full">
                    <span>Launch Module</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Secondary Tile Modals */}
      {activeTile && (
        <HubModal
          title={activeTile.title}
          subtitle={activeTile.subtitle}
          badge={activeTile.badge}
          isOpen={!!activeTileId}
          onClose={() => setActiveTileId(null)}
        >
          {activeTile.id === 'legal-insights' && <LegalInsightsNestedModal />}
          {activeTile.id === 'founder-bio' && <FounderBioNestedModal />}
          {activeTile.id === 'advisory-intake' && <AdvisoryBookingNestedModal />}
          {activeTile.id === 'payments-fund' && <PaymentsFundNestedModal />}
        </HubModal>
      )}
    </div>
  )
}
