'use client'

import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  // Show the CTA after scrolling down a bit (e.g. 200px) or after a small mount delay
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Also set visible on pages where scroll is not required or on mount delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <Link
      href="/book"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-500 hover:to-cyan-400 active:from-indigo-700 active:to-cyan-600 text-zinc-50 font-bold tracking-wide shadow-2xl shadow-indigo-600/30 border border-white/10 transition-all duration-500 ease-out hover:scale-105 hover:shadow-cyan-500/30 group",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90 pointer-events-none"
      )}
      aria-label="Book a free consultation call"
    >
      {/* Pulse effect ring */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300 animate-pulse" />
      
      {/* Icon with spin/bounce hover effect */}
      <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
        <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
      </span>

      {/* Label */}
      <span className="relative text-sm tracking-wide">Book a Call</span>
    </Link>
  )
}
