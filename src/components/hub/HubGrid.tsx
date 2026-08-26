'use client'

import { useState } from 'react'
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
}

const hubTiles: HubTile[] = [
  {
    id: 'paga-risk',
    title: 'PAGA Risk',
    subtitle: 'AB 2288 Penalty Calculator & Cure Rules',
    badge: 'LAW & RISK',
    icon: Scale,
    accentColor: 'text-amber-400',
    bgHover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
    borderAccent: 'border-amber-500/20'
  },
  {
    id: 'ai-automation',
    title: 'AI Lab',
    subtitle: 'CRD Decision Rules & Policy Architect',
    badge: 'CRD RULES',
    icon: Sparkles,
    accentColor: 'text-cyan-400',
    bgHover: 'hover:border-cyan-500/30 hover:bg-cyan-500/5',
    borderAccent: 'border-cyan-500/20'
  },
  {
    id: 'legal-insights',
    title: 'Briefings',
    subtitle: 'California Labor Code Briefings',
    badge: 'BRIEFINGS',
    icon: BookOpen,
    accentColor: 'text-indigo-400',
    bgHover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    borderAccent: 'border-indigo-500/20'
  },
  {
    id: 'founder-bio',
    title: 'Founder Bio',
    subtitle: 'Mario Espindola, MPA Profile & Mission',
    badge: 'LEADERSHIP',
    icon: UserCheck,
    accentColor: 'text-purple-400',
    bgHover: 'hover:border-purple-500/30 hover:bg-purple-500/5',
    borderAccent: 'border-purple-500/20'
  },
  {
    id: 'advisory-intake',
    title: 'Intake',
    subtitle: 'Direct Consultation & Diagnostic Intake',
    badge: 'CONSULTATION',
    icon: Calendar,
    accentColor: 'text-emerald-400',
    bgHover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
    borderAccent: 'border-emerald-500/20'
  },
  {
    id: 'payments-fund',
    title: 'Retainers',
    subtitle: 'Client Retainers & Defense Campaign',
    badge: 'PAY & SUPPORT',
    icon: CreditCard,
    accentColor: 'text-indigo-400',
    bgHover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    borderAccent: 'border-indigo-500/20'
  }
]

export default function HubGrid() {
  const [activeTileId, setActiveTileId] = useState<string | null>(null)

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
              CalBizHR <span className="text-xs font-normal text-zinc-400">| Compliance Hub</span>
            </h1>
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

      {/* Main 6-Tile Hub Grid (2x3 on Mobile, 3x2 on Desktop) */}
      <main className="flex-1 p-3 sm:p-5 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-3 sm:gap-4 overflow-hidden h-[calc(100dvh-56px)]">
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
