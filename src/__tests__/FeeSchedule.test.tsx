import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import PricingPage from '../app/pricing/page'
import { feeSchedule, currentPricingPhase } from '../data/fee-schedule'

describe('Fee Schedule Pricing Page', () => {
  it('renders fee schedule framework with TBD rates and no dollar amounts', () => {
    render(<PricingPage />)

    // Check header title
    expect(screen.getByRole('heading', { level: 1, name: /Fee Schedule/i })).toBeDefined()

    // Check section headings
    expect(screen.getByRole('heading', { level: 2, name: /Hourly Services/i })).toBeDefined()
    expect(screen.getByRole('heading', { level: 2, name: /Flat-Fee Trainings/i })).toBeDefined()

    // Check all fee schedule items from fee-schedule.ts are rendered
    feeSchedule.forEach((item) => {
      expect(screen.getByText(item.label)).toBeDefined()
    })

    // Check that every price item displays "Rate TBD"
    const tbdElements = screen.getAllByText('Rate TBD')
    expect(tbdElements.length).toBe(feeSchedule.length)

    // Verify no dollar sign amounts are rendered anywhere on the page
    const pageText = document.body.textContent || ''
    expect(pageText).not.toMatch(/\$\d+/)

    // Check pricing phase footnote
    expect(screen.getByText(`Pricing Notice: ${currentPricingPhase.description}`)).toBeDefined()

    // Check internal strategy terms are NOT present
    expect(pageText).not.toContain('25%')
    expect(pageText).not.toContain('SQL database')

    // Check old SaaS subscription tier content is completely gone
    expect(pageText).not.toContain('Starter')
    expect(pageText).not.toContain('Pro')
    expect(pageText).not.toContain('Agency')
    expect(pageText).not.toContain('$99')
    expect(pageText).not.toContain('$249')
    expect(pageText).not.toContain('$599')

    // Check Book a Call CTA button
    const bookCallLink = screen.getByRole('link', { name: /Book a Call/i })
    expect(bookCallLink.getAttribute('href')).toBe('/book')

    cleanup()
  })
})
