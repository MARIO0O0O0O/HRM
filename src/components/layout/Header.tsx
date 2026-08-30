'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  Home,
  User,
  Folder,
  Newspaper,
  Receipt,
  MessageCircle,
  Heart,
  Scale,
  ShieldCheck,
  FileText,
  Accessibility,
  Phone,
  Mail
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const mainNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/library', label: 'Free Resources Library', icon: Folder },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/pricing', label: 'Fee Schedule', icon: Receipt },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
  { href: '/support', label: 'Donate', icon: Heart },
]

const legalNavItems = [
  { href: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
  { href: '/terms', label: 'Terms of Service', icon: FileText },
  { href: '/accessibility', label: 'Accessibility', icon: Accessibility },
]

export default function Header() {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#B5933C]/20 bg-[#0f1c32]/95 backdrop-blur-md">
      {/* BAR 1: Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo + Tagline */}
        <Link href="/" className="flex flex-col justify-center group shrink-0 py-1">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#B5933C] transition-colors leading-none">
            Cal<span className="text-[#B5933C]">BizHR</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-sans text-zinc-400 font-normal leading-tight mt-1">
            AI-Powered Compliance. HR Verified.
          </span>
        </Link>

        {/* Right Hamburger Icon Trigger (Both Breakpoints) */}
        <div className="flex items-center gap-2">
          {/* Desktop Hamburger Dropdown Container */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDesktopMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-lg text-zinc-300 hover:text-[#B5933C] hover:bg-white/5 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-transparent hover:border-[#B5933C]/30"
              aria-label="Toggle navigation menu"
              aria-expanded={isDesktopMenuOpen}
            >
              {isDesktopMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Dropdown Panel */}
            {isDesktopMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-[#0f1c32] border border-[#B5933C]/30 rounded-xl shadow-2xl py-3 px-2 z-50 backdrop-blur-md">
                <nav className="flex flex-col gap-1">
                  {mainNavItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDesktopMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-sans font-medium text-zinc-200 hover:text-[#B5933C] hover:bg-[#B5933C]/10 transition-colors"
                      >
                        <Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}

                  {/* Legal Sub-Group */}
                  <div className="border-t border-[#B5933C]/20 mt-2 pt-2 px-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 pb-1">
                      <Scale className="h-3 w-3 text-zinc-500" />
                      <span>Legal</span>
                    </div>
                    {legalNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDesktopMenuOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 text-xs font-sans font-medium text-zinc-400 hover:text-[#B5933C] transition-colors"
                        >
                          <Icon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </nav>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <button
                    className="p-2 text-zinc-300 hover:text-[#B5933C] transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Toggle navigation menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                }
              />
              <SheetContent
                side="right"
                className="bg-[#0f1c32] border-l border-[#B5933C]/20 text-zinc-100 p-6 flex flex-col justify-between overflow-y-auto"
              >
                <div>
                  <div className="mb-6 border-b border-[#B5933C]/20 pb-4">
                    <SheetTitle className="text-xl font-serif font-bold tracking-tight text-white text-left">
                      Cal<span className="text-[#B5933C]">BizHR</span>
                    </SheetTitle>
                    <SheetDescription className="text-xs font-sans text-zinc-400 text-left mt-0.5">
                      AI-Powered Compliance. HR Verified.
                    </SheetDescription>
                  </div>

                  <nav className="flex flex-col gap-1.5">
                    {mainNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans font-medium text-zinc-200 hover:text-[#B5933C] hover:bg-[#B5933C]/10 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-zinc-400 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}

                    {/* Mobile Legal Subgroup */}
                    <div className="border-t border-[#B5933C]/20 mt-3 pt-3 px-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        <Scale className="h-3 w-3 text-zinc-500" />
                        <span>Legal</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {legalNavItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-2.5 py-1.5 text-xs font-sans font-medium text-zinc-400 hover:text-[#B5933C] transition-colors"
                            >
                              <Icon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Mobile Sheet Footer CTA */}
                <div className="flex flex-col gap-4 mt-8 pt-4 border-t border-white/10">
                  <Link href="/book" className="w-full">
                    <Button className="w-full bg-[#B5933C] hover:bg-[#d4b45a] text-[#1A2D4D] font-sans font-bold tracking-wide py-3 shadow-md border border-[#B5933C]/40">
                      Book a Call
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* BAR 2: Thin Utility Strip */}
      <div className="w-full bg-[#0b1526] border-t border-[#B5933C]/15 py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
          {/* Left / Center items: Phone & Email */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1">
            <a
              href="tel:6267082220"
              className="text-zinc-300 hover:text-[#B5933C] transition-colors flex items-center gap-1.5 font-sans"
            >
              <Phone className="h-3 w-3 text-[#B5933C]" />
              <span>626-708-2220</span>
            </a>

            <a
              href="mailto:info@mario00.com"
              className="text-zinc-300 hover:text-[#B5933C] transition-colors font-mono tracking-tight flex items-center gap-1.5"
            >
              <Mail className="h-3 w-3 text-[#B5933C]" />
              <span>INFO@MARIO00.COM</span>
            </a>
          </div>

          {/* Right items: Donate & Book a Call */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              href="/support"
              className="text-[#B5933C] hover:text-[#d4b45a] font-semibold transition-colors flex items-center gap-1.5 font-sans text-xs"
            >
              <Heart className="h-3.5 w-3.5 text-[#B5933C] fill-[#B5933C]/20" />
              <span>Donate</span>
            </Link>

            <Link href="/book">
              <Button
                size="sm"
                className="bg-[#B5933C] hover:bg-[#d4b45a] active:bg-[#8e722c] text-[#1A2D4D] font-sans font-bold h-7 px-3 text-[11px] shadow border border-[#B5933C]/40 cursor-pointer"
              >
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
