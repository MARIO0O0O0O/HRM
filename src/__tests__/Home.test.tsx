import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders 8 compliance area cards and 4 secondary hub tiles', () => {
    render(<Home />)

    // Check main hub branding
    expect(screen.getAllByText('CalBizHR')[0]).toBeDefined()
    expect(screen.getByText('California HR Compliance Areas')).toBeDefined()

    // Check all 8 compliance area cards
    expect(screen.getByText('Harassment and abusive conduct prevention')).toBeDefined()
    expect(screen.getByText('Onboarding and Know Your Rights')).toBeDefined()
    expect(screen.getByText('Meal and rest period compliance')).toBeDefined()
    expect(screen.getByText('PAGA compliance')).toBeDefined()
    expect(screen.getByText('Wage statements and pay transparency')).toBeDefined()
    expect(screen.getByText('Exempt salary and classification')).toBeDefined()
    expect(screen.getByText('Workplace violence prevention')).toBeDefined()
    expect(screen.getByText('AI and automation compliance')).toBeDefined()

    // Check ready badges and links for ready cards
    const readyBadges = screen.getAllByText('Ready')
    expect(readyBadges.length).toBe(2)

    const harassmentLink = screen.getByRole('link', {
      name: /Harassment and abusive conduct prevention/i
    })
    expect(harassmentLink.getAttribute('href')).toBe(
      '/spokes/safety-prevention/harassment-prevention'
    )

    const onboardingLink = screen.getByRole('link', {
      name: /Onboarding and Know Your Rights/i
    })
    expect(onboardingLink.getAttribute('href')).toBe(
      '/spokes/lifecycle-admin/onboarding'
    )

    // Check coming-soon badges (6 coming soon cards)
    const comingSoonBadges = screen.getAllByText('Coming soon')
    expect(comingSoonBadges.length).toBe(6)

    // Check secondary "More from CalBizHR" hub section and 4 remaining tiles
    expect(screen.getByText('More from CalBizHR')).toBeDefined()
    expect(screen.getByText('Legal Insights & Blog')).toBeDefined()
    expect(screen.getByText('Founder Bio & Defense Mission')).toBeDefined()
    expect(screen.getByText('Advisory Intake & Booking')).toBeDefined()
    expect(screen.getByText('Payments & Defense Fund')).toBeDefined()

    // Confirm removed tiles are NOT present in secondary hub grid
    expect(screen.queryByText('PAGA Risk Center')).toBeNull()
    expect(screen.queryByText('AI & Automation Governance')).toBeNull()

    cleanup()
  })
})
