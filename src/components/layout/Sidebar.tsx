'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  DollarSign,
  UserCheck,
  ArrowRight,
  Layers,
  Lock
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'

export interface SpokeCategoryCard {
  id: string
  title: string
  href: string
  icon: typeof ShieldCheck
  description: string
  badge: string
}

export const spokeCategoryCards: SpokeCategoryCard[] = [
  {
    id: 'safety-prevention',
    title: 'Safety & Prevention',
    href: '/spokes/safety-prevention',
    icon: ShieldCheck,
    description: 'Harassment Prevention (SB 1343), Workplace Violence (SB 553), and Cal/OSHA IIPP rules.',
    badge: 'Category 1 Hub'
  },
  {
    id: 'wage-hour',
    title: 'Wage & Hour',
    href: '/spokes/wage-hour',
    icon: DollarSign,
    description: 'Paystub Itemizations (LC §226), Meal & Rest Breaks (§226.7), and Timekeeping Overtime rules.',
    badge: 'Category 2 Hub'
  },
  {
    id: 'lifecycle-admin',
    title: 'Lifecycle Admin',
    href: '/spokes/lifecycle-admin',
    icon: UserCheck,
    description: 'Hiring Wage Notices (LC §2810.5), Protected Leaves (CFRA/ADA), and Final Pay Terminations.',
    badge: 'Category 3 Hub'
  }
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Closed state: 3 Stacked Titled Notches pinned to left screen edge */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5 select-none pointer-events-auto">
        {spokeCategoryCards.map((card) => {
          const NotchIcon = card.icon
          return (
            <SheetTrigger
              key={`trigger-${card.id}`}
              className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#3b2416] via-[#2c1a0e] to-[#1e1008] text-amber-100 border-y border-r border-[#8c5a36] hover:border-[#b8860b] rounded-r-xl shadow-2xl transition-all duration-200 cursor-pointer hover:pl-4 text-left"
            >
              {/* Gold Accent Strip */}
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#d4af37] via-[#b8860b] to-[#8b6508] shrink-0" />
              <NotchIcon className="h-3.5 w-3.5 text-[#b8860b] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-xs font-mono font-bold tracking-tight text-amber-100 truncate max-w-[130px] sm:max-w-none">
                {card.title}
              </span>
            </SheetTrigger>
          )
        })}
      </div>

      {/* Open state: Carved Wooden Drawer Panel with 3 Ornate Wooden Category Chests */}
      <SheetContent
        side="left"
        className="w-[90vw] sm:w-[420px] p-0 bg-gradient-to-b from-[#2a180e] via-[#1c120c] to-[#0d0704] border-r-4 border-[#8c5a36] text-amber-50 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
      >
        {/* Wooden Cabinet Header with Gold Brass Trim */}
        <div className="p-5 border-b-2 border-[#8c5a36] bg-[#2a180e] relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#8b6508]" />
          <SheetTitle className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2 tracking-wide">
            <Layers className="h-5 w-5 text-[#b8860b]" />
            Compliance Spokes Cabinet
          </SheetTitle>
          <SheetDescription className="text-xs font-sans text-amber-200/80 mt-1">
            Open an ornate category box to enter its specialized compliance hub.
          </SheetDescription>
        </div>

        {/* 3 Ornate Wooden Category Link Chests */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {spokeCategoryCards.map((card) => {
            const CardIcon = card.icon

            return (
              <Link
                key={card.id}
                href={card.href}
                onClick={() => setIsOpen(false)}
                className="group relative block rounded-2xl border-2 border-[#8c5a36] bg-gradient-to-br from-[#3b2416] via-[#2c1a0e] to-[#1e1008] p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-[#b8860b] hover:shadow-[0_0_25px_rgba(184,134,11,0.35)] hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Decorative Gold Hinges on Left Edge */}
                <div className="absolute left-1 top-4 w-2 h-5 rounded-xs bg-gradient-to-b from-[#d4af37] via-[#b8860b] to-[#8b6508] border border-[#f0e68c]/60 shadow-md z-10" />
                <div className="absolute left-1 bottom-4 w-2 h-5 rounded-xs bg-gradient-to-b from-[#d4af37] via-[#b8860b] to-[#8b6508] border border-[#f0e68c]/60 shadow-md z-10" />

                {/* Decorative Gold Metallic Latch on Right Edge */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-8 rounded-md bg-gradient-to-b from-[#d4af37] via-[#b8860b] to-[#8b6508] border border-[#f0e68c]/70 shadow-lg z-10">
                  <Lock className="h-3.5 w-3.5 text-[#3b2416]" />
                </div>

                {/* Decorative Leather Closure Strap */}
                <div className="absolute inset-x-0 top-3 h-4 bg-gradient-to-r from-[#7a4823] via-[#593215] to-[#40220c] border-y border-[#a86532]/60 shadow-inner z-0 opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Foreground High-Legibility Dark Parchment Content Container */}
                <div className="relative z-20 bg-[#0c1626]/95 border border-[#b8860b]/40 rounded-xl p-4 shadow-xl">
                  {/* Top Header Row */}
                  <div className="flex items-start justify-between gap-3 w-full">
                    <div className="p-2 rounded-lg bg-[#1A2D4D] border border-[#b8860b]/50 text-[#b8860b] group-hover:scale-105 transition-transform shrink-0">
                      <CardIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/30 px-2 py-0.5 rounded-full shrink-0">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-3 space-y-1">
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-[#b8860b] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs font-sans text-zinc-300 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Nav Action Hint */}
                  <div className="mt-3 flex items-center justify-between text-xs font-sans font-bold text-[#b8860b] pt-2.5 border-t border-[#b8860b]/20 w-full">
                    <span>Unlock Category Hub</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
