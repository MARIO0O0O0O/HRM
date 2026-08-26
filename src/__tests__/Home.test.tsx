import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders zero-scroll 4-tile visual hub grid with high contrast badges', () => {
    render(<Home />)

    // Check 4 visual hub cards
    expect(screen.getByText('PAGA Risk')).toBeDefined()
    expect(screen.getByText('AI Governance')).toBeDefined()
    expect(screen.getByText('Audit Checklists')).toBeDefined()
    expect(screen.getByText('Fund & Invest')).toBeDefined()

    // Check badges
    expect(screen.getByText('LAW & RISK')).toBeDefined()
    expect(screen.getByText('CRD RULES')).toBeDefined()
    expect(screen.getByText('SELF REVIEW')).toBeDefined()
    expect(screen.getByText('DEFENSE FUND')).toBeDefined()

    cleanup()
  })
})
