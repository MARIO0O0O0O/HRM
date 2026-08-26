'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Free Tools' },
  { href: '/programs', label: 'Programs' },
  { href: '/services', label: 'Services' },
  { href: '/paga-calculator', label: 'PAGA Risk Check' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/portal', label: 'Client Portal' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#B5933C]/20 bg-[#0f1c32]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Minimal Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#B5933C] transition-colors">
            Cal<span className="text-[#B5933C]">BizHR</span>
          </span>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
            California HR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-sans font-medium text-zinc-300 hover:text-[#B5933C] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/book">
            <Button className="bg-[#B5933C] hover:bg-[#d4b45a] active:bg-[#8e722c] text-[#1A2D4D] font-sans font-bold tracking-wide cursor-pointer transition-all shadow-md shadow-[#B5933C]/10 border border-[#B5933C]/40">
              Book a Call
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation (Sheet-based) */}
        <div className="flex md:hidden items-center">
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="p-2 -mr-2 text-zinc-300 hover:text-[#B5933C] transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              }
            />
            <SheetContent side="right" className="bg-[#0f1c32] border-l border-[#B5933C]/20 text-zinc-100 p-6 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <SheetTitle className="text-xl font-serif font-bold tracking-tight text-white text-left">
                    Cal<span className="text-[#B5933C]">BizHR</span>
                  </SheetTitle>
                  <SheetDescription className="text-xs font-sans text-zinc-400 text-left mt-1">
                    California Labor Law Compliance & HR Consulting
                  </SheetDescription>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-sans font-semibold text-zinc-300 hover:text-[#B5933C] transition-colors py-2 text-left"
                    >
                      {link.label}
                    </Link>
                  ))}
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
