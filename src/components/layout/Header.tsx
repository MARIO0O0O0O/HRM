'use client'

import Link from 'next/link'
import { Menu, ChevronDown, Layers } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

// Permanent tabs — always directly visible, never tucked behind a menu
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Fee Schedule' },
  { href: '/contact', label: 'Contact' },
  { href: '/portal', label: 'Client Portal' },
]

// Spokes — live in their own dedicated menu, not the permanent tab row
const spokeLinks = [
  { href: '/spokes/safety-prevention', label: 'Safety & Prevention' },
  { href: '/spokes/wage-hour', label: 'Wage & Hour' },
  { href: '/spokes/lifecycle-admin', label: 'Lifecycle Admin' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/accessibility', label: 'Accessibility' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#B5933C]/20 bg-[#0f1c32]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Minimal Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#B5933C] transition-colors">
            Cal<span className="text-[#B5933C]">BizHR</span>
          </span>
        </Link>

        {/* Desktop Navigation — permanent tabs + Spokes menu + Legal dropdown */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {/* Spokes — dedicated dropdown, first in the row so compliance content is easy to spot */}
          <div className="relative group/spokes">
            <button className="flex items-center gap-1 text-xs xl:text-sm font-sans font-semibold text-[#B5933C] hover:text-[#d4b45a] transition-colors cursor-pointer">
              <Layers className="h-3.5 w-3.5" />
              Spokes
              <ChevronDown className="h-3 w-3 group-hover/spokes:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 pt-2 hidden group-hover/spokes:block">
              <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-lg shadow-xl py-2 min-w-[190px]">
                {spokeLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-xs font-sans text-zinc-300 hover:text-[#B5933C] hover:bg-[#B5933C]/10 transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs xl:text-sm font-sans font-medium text-zinc-300 hover:text-[#B5933C] transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}

          {/* Legal — grouped dropdown, not 3 separate top-level tabs */}
          <div className="relative group/legal">
            <button className="flex items-center gap-0.5 text-xs xl:text-sm font-sans font-medium text-zinc-300 hover:text-[#B5933C] transition-colors cursor-pointer">
              Legal
              <ChevronDown className="h-3 w-3 group-hover/legal:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full right-0 pt-2 hidden group-hover/legal:block">
              <div className="bg-[#0f1c32] border border-[#B5933C]/30 rounded-lg shadow-xl py-2 min-w-[170px]">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-xs font-sans text-zinc-300 hover:text-[#B5933C] hover:bg-[#B5933C]/10 transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link href="/book">
            <Button className="bg-[#B5933C] hover:bg-[#d4b45a] active:bg-[#8e722c] text-[#1A2D4D] font-sans font-bold tracking-wide cursor-pointer transition-all shadow-md shadow-[#B5933C]/10 border border-[#B5933C]/40">
              Book a Call
            </Button>
          </Link>
        </div>

        {/* Mobile — two triggers side by side: dedicated Spokes menu + general menu for everything else */}
        <div className="flex lg:hidden items-center gap-1 shrink-0">
          {/* Spokes trigger (mobile) */}
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-sans font-bold text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 hover:bg-[#B5933C]/20 transition-colors cursor-pointer min-h-[38px]"
                  aria-label="Open Spokes menu"
                >
                  <Layers className="h-4 w-4" />
                  Spokes
                </button>
              }
            />
            <SheetContent side="right" className="bg-[#0f1c32] border-l border-[#B5933C]/20 text-zinc-100 p-6">
              <SheetTitle className="text-lg font-serif font-bold tracking-tight text-white text-left mb-1">
                Compliance Spokes
              </SheetTitle>
              <SheetDescription className="text-xs font-sans text-zinc-400 text-left mb-6">
                Safety, wage & hour, and lifecycle compliance programs.
              </SheetDescription>
              <nav className="flex flex-col gap-4">
                {spokeLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-sans font-semibold text-zinc-200 hover:text-[#B5933C] transition-colors py-1 text-left"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* General menu trigger (mobile) — Home, About, Blog, Fee Schedule, Contact, Client Portal, Legal, Book a Call */}
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="p-2 text-zinc-300 hover:text-[#B5933C] transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              }
            />
            <SheetContent side="right" className="bg-[#0f1c32] border-l border-[#B5933C]/20 text-zinc-100 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="mb-8">
                  <SheetTitle className="text-xl font-serif font-bold tracking-tight text-white text-left">
                    Cal<span className="text-[#B5933C]">BizHR</span>
                  </SheetTitle>
                  <SheetDescription className="text-xs font-sans text-zinc-400 text-left mt-1">
                    California Labor Law Compliance & HR Consulting
                  </SheetDescription>
                </div>
                <nav className="flex flex-col gap-3.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-sans font-semibold text-zinc-300 hover:text-[#B5933C] transition-colors py-1 text-left"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#B5933C]/20 pt-3.5 mt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Legal</span>
                    <div className="flex flex-col gap-2.5 mt-2">
                      {legalLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-sm font-sans font-medium text-zinc-400 hover:text-[#B5933C] transition-colors text-left"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/book" className="w-full">
                  <Button className="w-full bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold tracking-wide py-3">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
