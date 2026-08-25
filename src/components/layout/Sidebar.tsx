'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PanelLeft, ShieldCheck, DollarSign, UserCheck, Sparkles, Clock } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import PreviewPanel from '@/components/programs/PreviewPanel'
import { programsSeed, type ProgramRecord } from '@/data/airtable-seed'

type SidebarLink = {
  label: string
  href: string
  comingSoon?: false
}

type SidebarComingSoon = {
  label: string
  comingSoon: true
}

type SidebarCategory = {
  label: string
  icon: typeof ShieldCheck
  items: (SidebarLink | SidebarComingSoon)[]
}

// Structure only for now -- real spoke pages land in later tasks. Safety & Prevention is the
// only category with real (or explicitly placeholder) links; the other three each get a single
// disabled "Coming Soon" row until their content is built.
const sidebarCategories: SidebarCategory[] = [
  {
    label: 'Safety & Prevention',
    icon: ShieldCheck,
    items: [
      { label: 'Harassment Prevention', href: '/programs/harassment-prevention' },
      { label: 'Workplace Violence Prevention', href: '/programs/workplace-violence-prevention' },
      { label: 'Injury & Illness Prevention', href: '/programs/injury-illness-prevention' },
      { label: 'Know Your Rights', comingSoon: true },
    ],
  },
  {
    label: 'Wage & Hour',
    icon: DollarSign,
    items: [{ label: 'Wage & Hour', comingSoon: true }],
  },
  {
    label: 'Lifecycle Admin',
    icon: UserCheck,
    items: [
      { label: 'Leave Administration', comingSoon: true },
      { label: 'ADA / Reasonable Accommodation', comingSoon: true },
      { label: 'Recruitment & Selection', comingSoon: true },
      { label: 'Onboarding', comingSoon: true },
      { label: 'Employment', comingSoon: true },
      { label: 'Termination & Offboarding', comingSoon: true },
      { label: 'Employee Benefits', comingSoon: true },
    ],
  },
  {
    label: 'Specialized',
    icon: Sparkles,
    items: [
      { label: 'AI in the Workplace', comingSoon: true },
      { label: 'HRIS', comingSoon: true },
      { label: 'Unions & Collective Bargaining', comingSoon: true },
    ],
  },
]

function SidebarNav({ onPreviewProgram }: { onPreviewProgram: (code: string) => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6">
      {sidebarCategories.map((category) => (
        <div key={category.label}>
          <div className="flex items-center gap-2 px-1 mb-2.5">
            <category.icon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              {category.label}
            </h3>
          </div>
          <ul className="flex flex-col gap-1">
            {category.items.map((item) => {
              if (item.comingSoon) {
                return (
                  <li key={item.label}>
                    <span className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 cursor-not-allowed select-none">
                      {item.label}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-zinc-600 bg-zinc-800/60 border border-white/5 px-1.5 py-0.5 rounded-full shrink-0">
                        <Clock className="h-2.5 w-2.5" /> Soon
                      </span>
                    </span>
                  </li>
                )
              }

              const isActive = pathname === item.href
              const codeMap: Record<string, string> = {
                '/programs/harassment-prevention': 'HPP',
                '/programs/workplace-violence-prevention': 'WVPP',
                '/programs/injury-illness-prevention': 'IIPP',
              }
              const programCode = codeMap[item.href]

              if (programCode) {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => onPreviewProgram(programCode)}
                      className={cn(
                        'w-full text-left block px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function Sidebar() {
  const [previewProgram, setPreviewProgram] = useState<ProgramRecord | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const handlePreviewProgram = (code: string) => {
    if (programsSeed[code]) {
      setPreviewProgram(programsSeed[code])
      setPreviewOpen(true)
    }
  }

  return (
    <>
      <PreviewPanel
        isOpen={previewOpen}
        onOpenChange={setPreviewOpen}
        program={previewProgram}
      />

      {/* Desktop: persistent column, sticky under the header */}
      <aside className="hidden md:block md:w-64 md:shrink-0 md:border-r md:border-white/5 md:bg-[#0a0a0a]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
          <SidebarNav onPreviewProgram={handlePreviewProgram} />
        </div>
      </aside>

      {/* Mobile: floating trigger + slide-in Sheet, independent of Header's own nav Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <button
                className="fixed bottom-6 left-6 z-40 flex items-center justify-center h-12 w-12 rounded-full bg-[#161616] border border-white/10 text-zinc-300 shadow-xl hover:text-zinc-100 hover:border-white/20 transition-colors cursor-pointer"
                aria-label="Toggle service categories menu"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
            }
          />
          <SheetContent side="left" className="bg-[#0a0a0a] border-r border-white/10 text-zinc-100 p-6 overflow-y-auto">
            <div className="mb-6">
              <SheetTitle className="text-lg font-black tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-left">
                Service Categories
              </SheetTitle>
              <SheetDescription className="text-xs text-zinc-500 text-left mt-1">
                Browse compliance areas by category
              </SheetDescription>
            </div>
            <SidebarNav onPreviewProgram={handlePreviewProgram} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
