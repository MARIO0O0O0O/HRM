'use client'

import Link from 'next/link'
import { Phone, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      {/* Top Release Banner */}
      <div className="w-full bg-gradient-to-r from-indigo-950 via-zinc-900 to-indigo-950 border-b border-indigo-500/20 px-3 py-1 text-center">
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide text-indigo-300 flex items-center justify-center gap-1.5 truncate">
          <span>⚡ CalBizHR (Beta): Full Launch Jan 1, 2027</span>
          <span className="hidden sm:inline text-zinc-500">•</span>
          <span className="hidden sm:inline text-emerald-400">2026 California Labor Code Active</span>
        </p>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo Wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            CalBizHR
          </span>
        </Link>

        {/* Center Header Tabs: [Bio] | [Blog] | [Book ($75)] */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
          <Link
            href="/about"
            className="px-2.5 py-1 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Bio
          </Link>
          <Link
            href="/blog"
            className="px-2.5 py-1 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/book"
            className="px-2.5 py-1 text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 rounded-lg transition-colors flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span>Book ($75)</span>
          </Link>
        </nav>

        {/* Header Right: Phone & BETA Status */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:6267082220"
            className="text-xs font-bold text-zinc-300 hover:text-indigo-400 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition-colors"
          >
            <Phone className="h-3 w-3 text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">626-708-2220</span>
          </a>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
            BETA • Launch Jan 1, 2027
          </span>
        </div>
      </div>
    </header>
  )
}
