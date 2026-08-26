import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders zero-scroll 6-tile hub grid with high contrast badges', () => {
    render(<Home />)

    // Check main hub branding
    expect(screen.getAllByText('CalBizHR')[0]).toBeDefined()

    // Check all 6 persistent hub tiles
    expect(screen.getByText('PAGA Risk Center')).toBeDefined()
    expect(screen.getByText('AI & Automation Governance')).toBeDefined()
    expect(screen.getByText('Legal Insights & Blog')).toBeDefined()
    expect(screen.getByText('Founder Bio & Defense Mission')).toBeDefined()
    expect(screen.getByText('Advisory Intake & Booking')).toBeDefined()
    expect(screen.getByText('Payments & Defense Fund')).toBeDefined()

    // Check high-contrast badges
    expect(screen.getByText('LAW & RISK')).toBeDefined()
    expect(screen.getByText('CRD RULES')).toBeDefined()
    expect(screen.getByText('BRIEFINGS')).toBeDefined()
    expect(screen.getByText('LEADERSHIP')).toBeDefined()
    expect(screen.getByText('CONSULTATION')).toBeDefined()
    expect(screen.getByText('PAY & SUPPORT')).toBeDefined()

    cleanup()
  })
})
