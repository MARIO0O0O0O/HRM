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
      <div className="max-w-7xl mx-auto pl-12 pr-3.5 sm:pl-16 sm:pr-6 py-2.5 sm:py-3.5 flex flex-col justify-between min-h-[110px] sm:min-h-[135px]">
        {/* Banner Content Container */}
        <Link
          href={currentAd.href}
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-left focus:outline-none focus:ring-1 focus:ring-[#B5933C] rounded-lg p-1.5 transition-all bg-[#0f1c32]/60 border border-[#B5933C]/20 hover:border-[#B5933C]/50 shadow-md"
        >
          <div className="flex flex-col gap-1 overflow-hidden min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] bg-[#B5933C]/10 border border-[#B5933C]/30 px-2 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3 text-[#B5933C]" />
                {currentAd.badge}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-[#B5933C] transition-colors truncate">
                {currentAd.title}
              </h2>
              <p className="text-xs font-sans text-zinc-300 line-clamp-2 leading-relaxed font-medium">
                {currentAd.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-sans font-bold text-[#B5933C] shrink-0 group-hover:translate-x-1 transition-transform self-end sm:self-center">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Pagination Dots at Bottom-Left */}
        <div className="flex items-center gap-1.5 mt-2">
          {bannerAds.map((ad, idx) => {
            const isActive = idx === currentIndex
            return (
              <button
                key={ad.id}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}: ${ad.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'w-6 bg-[#B5933C]'
                    : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
