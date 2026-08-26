import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders zero-scroll 6-tile hub and primary compliance modules', () => {
    render(<Home />)

    // Check main hub branding
    expect(screen.getAllByText('CalBizHR')[0]).toBeDefined()

    // Check all 6 persistent hub tiles
    expect(screen.getByText('PAGA Risk Center')).toBeDefined()
    expect(screen.getByText('AI & Automation Governance')).toBeDefined()
    expect(screen.getByText('Legal Insights & Blog')).toBeDefined()
    expect(screen.getByText('Founder Bio')).toBeDefined()
    expect(screen.getByText('Advisory Intake')).toBeDefined()
    expect(screen.getByText('Booking & Scheduling')).toBeDefined()

    cleanup()
  })
})
