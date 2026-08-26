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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Wordmark */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CalBizHR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/book">
            <Button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide cursor-pointer transition-all shadow-md shadow-indigo-600/10">
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
                  className="p-2 -mr-2 text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              }
            />
            <SheetContent side="right" className="bg-[#0a0a0a] border-l border-white/10 text-zinc-100 p-6 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <SheetTitle className="text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-left">
                    CalBizHR
                  </SheetTitle>
                  <SheetDescription className="text-xs text-zinc-500 text-left mt-1">
                    California Labor Law Compliance & HR Consulting
                  </SheetDescription>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold text-zinc-300 hover:text-zinc-100 transition-colors py-2 text-left"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/book" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-zinc-50 font-semibold tracking-wide py-3">
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
