'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  DollarSign,
  UserCheck,
  ArrowRight,
  Layers
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
      {/* Closed state: Slim vertical tab pinned to left screen edge */}
      <SheetTrigger className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-1.5 px-3 py-2.5 bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] border border-[#B5933C]/40 rounded-r-xl shadow-2xl transition-all cursor-pointer hover:pl-4 group">
        <Layers className="h-4 w-4 text-[#1A2D4D] group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-black uppercase tracking-wider">SPOKES ❯</span>
      </SheetTrigger>

      {/* Open state: Slides over canvas revealing 3 Category Cards as real links */}
      <SheetContent side="left" className="w-[88vw] sm:w-[400px] p-0 bg-[#0f1c32] border-r border-[#B5933C]/30 text-zinc-100 flex flex-col">
        <div className="p-5 border-b border-[#B5933C]/20 bg-[#1A2D4D]">
          <SheetTitle className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#B5933C]" />
            Compliance Spokes Directory
          </SheetTitle>
          <SheetDescription className="text-xs font-sans text-zinc-300 mt-1">
            Select a category hub below to navigate to its compliance portal.
          </SheetDescription>
        </div>

        {/* 3 Real Navigable Category Link Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {spokeCategoryCards.map((card) => {
            const CardIcon = card.icon

            return (
              <Link
                key={card.id}
                href={card.href}
                onClick={() => setIsOpen(false)}
                className="group relative flex flex-col justify-between p-5 bg-[#1A2D4D] border border-[#B5933C]/30 rounded-xl text-left transition-all duration-200 hover:border-[#B5933C] hover:bg-[#1f365c] hover:shadow-xl block"
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="p-2.5 rounded-lg bg-[#0f1c32] border border-[#B5933C]/30 text-[#B5933C] group-hover:scale-105 transition-transform">
                    <CardIcon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#B5933C] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-sans font-bold text-[#B5933C] pt-3 border-t border-[#B5933C]/10 w-full">
                  <span>Navigate to Category Hub</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
