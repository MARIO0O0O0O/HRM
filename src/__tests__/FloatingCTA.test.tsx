import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, act } from '@testing-library/react'
import React from 'react'
import FloatingCTA from '../components/layout/FloatingCTA'

describe('FloatingCTA Component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders call to action button with correct link and label after a mount delay', () => {
    render(<FloatingCTA />)

    // Initially we can trigger the timer to mount/reveal the CTA
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    const ctaLink = screen.getByLabelText('Book a free consultation call')
    expect(ctaLink).toBeDefined()
    expect(ctaLink.getAttribute('href')).toBe('/book')
    expect(screen.getByText('Book a Call')).toBeDefined()
  })
})
