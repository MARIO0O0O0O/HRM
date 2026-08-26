'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Scale,
  Sparkles,
  BookOpen,
  UserCheck,
  Calendar,
  CreditCard,
  ArrowRight,
  Phone
} from 'lucide-react'
import BannerCarousel from '@/components/hub/BannerCarousel'
import HubModal from '@/components/hub/HubModal'
import PagaNestedPortalModal from '@/components/hub/PagaNestedPortalModal'
import AiGovernanceNestedModal from '@/components/hub/AiGovernanceNestedModal'
import LegalInsightsNestedModal from '@/components/hub/LegalInsightsNestedModal'
import FounderBioNestedModal from '@/components/hub/FounderBioNestedModal'
import AdvisoryBookingNestedModal from '@/components/hub/AdvisoryBookingNestedModal'
import PaymentsFundNestedModal from '@/components/hub/PaymentsFundNestedModal'

export interface HubTile {
  id: string
  title: string
  subtitle: string
  badge: string
  icon: typeof Scale
  accentColor: string
  bgHover: string
  borderAccent: string
  bgImage: string
}

const hubTiles: HubTile[] = [
  {
    id: 'paga-risk',
    title: 'PAGA Risk Center',
    subtitle: 'AB 2288 Penalty Calculator & Cure Rules',
    badge: 'LAW & RISK',
    icon: Scale,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_paga_risk.jpg'
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Governance',
    subtitle: 'CRD Decision Rules & Policy Architect',
    badge: 'CRD RULES',
    icon: Sparkles,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_ai_automation.jpg'
  },
  {
    id: 'legal-insights',
    title: 'Legal Insights & Blog',
    subtitle: 'California Labor Code Briefings',
    badge: 'BRIEFINGS',
    icon: BookOpen,
    accentColor: 'text-[#B5933C]',
    bgHover: 'hover:border-[#B5933C]',
    borderAccent: 'border-[#B5933C]/30',
    bgImage: '/images/tile_legal_insights.jpg'
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
    bgImage: '/images/tile_founder_bio.jpg'
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

  const activeTile = hubTiles.find((t) => t.id === activeTileId)

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col bg-[#1A2D4D] text-zinc-100 overflow-hidden select-none">
      {/* Top Hub Bar */}
      <header className="px-4 py-2.5 bg-[#0f1c32] border-b border-[#B5933C]/20 flex items-center justify-between shrink-0 h-[52px]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#B5933C]/10 border border-[#B5933C]/30 flex items-center justify-center text-[#B5933C] font-mono font-bold text-xs">
            HR
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-serif font-bold tracking-tight text-white leading-none">
              CalBizHR <span className="text-xs font-sans text-zinc-400">| Compliance Hub</span>
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
            className="text-xs font-sans font-bold text-zinc-200 hover:text-[#B5933C] flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1A2D4D] border border-[#B5933C]/30 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#B5933C]" />
            <span className="hidden sm:inline">626-708-2220</span>
          </a>
        </div>
      </header>

      {/* Auto-Advancing Homepage Banner Carousel */}
      <BannerCarousel />

      {/* Main 6-Tile Hub Grid (2x3 on Mobile, 3x2 on Desktop, Zero-Scroll) */}
      <main className="flex-1 p-2 sm:p-4 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-2.5 sm:gap-4 overflow-hidden">
        {hubTiles.map((tile) => {
          const TileIcon = tile.icon

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setActiveTileId(tile.id)}
              className={`group relative flex flex-col justify-between p-3.5 sm:p-5 bg-[#0f1c32] border border-[#B5933C]/30 rounded-xl text-left transition-all duration-200 cursor-pointer overflow-hidden ${tile.bgHover} hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]`}
            >
              {/* Full-Bleed Tile Background Image with Contrast Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={tile.bgImage}
                  alt={`${tile.title} background`}
                  fill
                  className="object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c32] via-[#0f1c32]/85 to-[#0f1c32]/60 z-10" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-20 flex flex-col justify-between h-full w-full">
                {/* Top Accent Pill */}
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className="p-2 rounded-lg bg-[#1A2D4D]/90 border border-[#B5933C]/40 text-[#B5933C] group-hover:scale-105 transition-transform shrink-0">
                    <TileIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#1A2D4D]/90 border border-[#B5933C]/30 px-2 py-0.5 rounded-full truncate">
                    {tile.badge}
                  </span>
                </div>

                {/* Center Content */}
                <div className="my-1.5 space-y-0.5 sm:space-y-1">
                  <h3 className="text-xs sm:text-base font-serif font-bold text-white tracking-tight group-hover:text-[#B5933C] transition-colors leading-tight">
                    {tile.title}
                  </h3>
                  <p className="text-xs font-sans text-zinc-300 line-clamp-2 leading-snug font-medium">
                    {tile.subtitle}
                  </p>
                </div>

                {/* Bottom Action Hint */}
                <div className="flex items-center justify-between text-xs font-sans font-bold text-[#B5933C] group-hover:text-[#d4b45a] transition-colors pt-1.5 border-t border-[#B5933C]/20 w-full">
                  <span>Launch Module</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
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
          {/* Tile 1: PAGA Risk Center Modal */}
          {activeTile.id === 'paga-risk' && (
            <PagaNestedPortalModal
              onOpenBooking={() => setActiveTileId('advisory-intake')}
            />
          )}

          {/* Tile 2: AI & Automation Governance Modal */}
          {activeTile.id === 'ai-automation' && (
            <AiGovernanceNestedModal />
          )}

          {/* Tile 3: Legal Insights & Blog Modal */}
          {activeTile.id === 'legal-insights' && (
            <LegalInsightsNestedModal />
          )}

          {/* Tile 4: Founder Bio Modal */}
          {activeTile.id === 'founder-bio' && (
            <FounderBioNestedModal />
          )}

          {/* Tile 5: Advisory Intake & Booking Modal */}
          {activeTile.id === 'advisory-intake' && (
            <AdvisoryBookingNestedModal />
          )}

          {/* Tile 6: Payments & Defense Fund Modal */}
          {activeTile.id === 'payments-fund' && (
            <PaymentsFundNestedModal />
          )}
        </HubModal>
      )}
    </div>
  )
}
