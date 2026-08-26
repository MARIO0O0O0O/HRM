'use client'

import { useState } from 'react'
import {
  Scale,
  Sparkles,
  ClipboardCheck,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import HubModal from '@/components/hub/HubModal'
import PagaNestedPortalModal from '@/components/hub/PagaNestedPortalModal'
import AiGovernanceNestedModal from '@/components/hub/AiGovernanceNestedModal'
import LegalInsightsNestedModal from '@/components/hub/LegalInsightsNestedModal'
import PaymentsFundNestedModal from '@/components/hub/PaymentsFundNestedModal'

export interface HubTile {
  id: string
  title: string
  subtitle: string
  badge: string
  imageSrc: string
  icon: typeof Scale
  accentColor: string
  borderAccent: string
}

const hubTiles: HubTile[] = [
  {
    id: 'paga-risk',
    title: 'PAGA Risk',
    subtitle: 'Exposure Calculator',
    badge: 'LAW & RISK',
    imageSrc: '/images/paga_banner.jpg',
    icon: Scale,
    accentColor: 'text-amber-400',
    borderAccent: 'border-amber-500/30'
  },
  {
    id: 'ai-governance',
    title: 'AI Governance',
    subtitle: 'CRD Rules',
    badge: 'CRD RULES',
    imageSrc: '/images/ai_banner.jpg',
    icon: Sparkles,
    accentColor: 'text-cyan-400',
    borderAccent: 'border-cyan-500/30'
  },
  {
    id: 'audit-checklists',
    title: 'Audit Checklists',
    subtitle: 'Self Review',
    badge: 'SELF REVIEW',
    imageSrc: '/images/audit_banner.jpg',
    icon: ClipboardCheck,
    accentColor: 'text-emerald-400',
    borderAccent: 'border-emerald-500/30'
  },
  {
    id: 'fund-invest',
    title: 'Fund & Invest',
    subtitle: 'Defense Campaign',
    badge: 'DEFENSE FUND',
    imageSrc: '/images/invest_banner.jpg',
    icon: CreditCard,
    accentColor: 'text-purple-400',
    borderAccent: 'border-purple-500/30'
  }
]

export default function HubGrid() {
  const [activeTileId, setActiveTileId] = useState<string | null>(null)

  const activeTile = hubTiles.find((t) => t.id === activeTileId)

  return (
    <div className="h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] w-full flex flex-col bg-[#0a0a0a] text-zinc-100 overflow-hidden select-none">
      {/* 4-Tile Visual Hub Grid (2x2 Grid, Zero-Scroll 100dvh) */}
      <main className="flex-1 p-3 sm:p-5 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 overflow-hidden h-full">
        {hubTiles.map((tile) => {
          const TileIcon = tile.icon

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setActiveTileId(tile.id)}
              className={`group relative flex flex-col justify-between p-4 sm:p-6 bg-[#111111] border border-white/10 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]`}
            >
              {/* Visual Image Banner Background with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={tile.imageSrc}
                  alt={tile.title}
                  className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
              </div>

              {/* Top Row: Icon Pill & Badge */}
              <div className="relative z-10 flex items-start justify-between gap-2 w-full">
                <div className={`p-2.5 rounded-xl bg-black/60 backdrop-blur-md border ${tile.borderAccent} ${tile.accentColor} group-hover:scale-110 transition-transform`}>
                  <TileIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-zinc-300 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full truncate">
                  {tile.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto space-y-1 pt-4">
                <h3 className="text-base sm:text-xl font-black text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                  {tile.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-indigo-300 tracking-wide">
                  {tile.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-zinc-400 group-hover:text-indigo-300 transition-colors">
                  <span>Launch Portal</span>
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
          {/* Tile 1: PAGA Risk Modal */}
          {activeTile.id === 'paga-risk' && (
            <PagaNestedPortalModal
              onOpenBooking={() => setActiveTileId('fund-invest')}
            />
          )}

          {/* Tile 2: AI Governance Modal */}
          {activeTile.id === 'ai-governance' && (
            <AiGovernanceNestedModal />
          )}

          {/* Tile 3: Audit Checklists Modal */}
          {activeTile.id === 'audit-checklists' && (
            <LegalInsightsNestedModal />
          )}

          {/* Tile 4: Fund & Invest Modal */}
          {activeTile.id === 'fund-invest' && (
            <PaymentsFundNestedModal />
          )}
        </HubModal>
      )}
    </div>
  )
}
