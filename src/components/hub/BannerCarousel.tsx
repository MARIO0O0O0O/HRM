'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { bannerAds, type BannerAd } from '@/data/banner-ads'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerAds.length)
  }, [])

  // Auto-advance interval setup
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, prefersReducedMotion, nextSlide])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const currentAd: BannerAd = bannerAds[currentIndex]

  return (
    <section
      aria-label="Compliance Highlights Banner"
      className="w-full bg-[#1A2D4D] border-b border-[#B5933C]/30 relative overflow-hidden select-none shrink-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2.5 flex flex-col justify-between min-h-[48px] sm:min-h-[64px]">
        {/* Banner Content Container */}
        <Link
          href={currentAd.href}
          className="group flex items-center justify-between gap-2 text-left focus:outline-none focus:ring-1 focus:ring-[#B5933C] rounded-lg p-0.5 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-1.5 py-0.5 rounded-full">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#B5933C]" />
                {currentAd.badge}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-[#B5933C] transition-colors truncate">
                {currentAd.title}
              </h2>
              <p className="hidden xs:block sm:block text-[11px] sm:text-xs font-sans text-zinc-300 truncate leading-snug">
                {currentAd.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-sans font-bold text-[#B5933C] shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="hidden md:inline">Learn More</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
        </Link>

        {/* Pagination Dots at Bottom-Left */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
          {bannerAds.map((ad, idx) => {
            const isActive = idx === currentIndex
            return (
              <button
                key={ad.id}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}: ${ad.title}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'w-5 sm:w-6 bg-[#B5933C]'
                    : 'w-1.5 sm:w-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
