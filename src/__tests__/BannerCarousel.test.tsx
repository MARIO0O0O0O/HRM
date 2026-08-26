import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import React from 'react'
import BannerCarousel from '../components/hub/BannerCarousel'
import { bannerAds } from '../data/banner-ads'

describe('BannerCarousel Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders initial ad slot (ad 1) with title and badge', () => {
    render(<BannerCarousel />)

    const headings = screen.getAllByRole('heading', { name: bannerAds[0].title })
    expect(headings[0]).toBeDefined()
    expect(screen.getAllByText(bannerAds[0].badge)[0]).toBeDefined()
  })

  it('renders 10 pagination dots corresponding to the 10 ad slots', () => {
    render(<BannerCarousel />)

    const dots = screen.getAllByRole('button', { name: /^Go to slide \d+:/ })
    expect(dots.length).toBe(10)
  })

  it('auto-advances to the next ad after 5 seconds', () => {
    render(<BannerCarousel />)

    expect(screen.getAllByRole('heading', { name: bannerAds[0].title })[0]).toBeDefined()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.getAllByRole('heading', { name: bannerAds[1].title })[0]).toBeDefined()
  })

  it('jumps directly to selected ad on dot click', () => {
    render(<BannerCarousel />)

    const dots = screen.getAllByRole('button', { name: /^Go to slide \d+:/ })
    fireEvent.click(dots[4]) // Click slide 5

    expect(screen.getAllByRole('heading', { name: bannerAds[4].title })[0]).toBeDefined()
  })
})
