import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import PagaCalculatorPage from '../app/paga-calculator/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/paga-calculator',
}))

describe('PAGA Calculator Page Component', () => {
  it('renders inputs, controls, and dynamic calculations blocks correctly', () => {
    render(<PagaCalculatorPage />)

    // Verify header titles
    expect(screen.getByText('California PAGA Exposure Calculator')).toBeDefined()
    expect(screen.getByText('Compliance Risk Assessment')).toBeDefined()

    // Verify parameter parameters
    expect(screen.getByText('Aggrieved Employee Headcount')).toBeDefined()
    expect(screen.getByText('Pay Period Frequency')).toBeDefined()
    expect(screen.getByText('Estimated Labor Code Deviation Rates')).toBeDefined()

    // Verify results panel
    expect(screen.getByText('Total Compliance Risk Exposure')).toBeDefined()
    expect(screen.getByText('Diagnostic Parameters')).toBeDefined()
    expect(screen.getByRole('button', { name: /Lock in \$75 Mitigation Consultation/ })).toBeDefined()
    
    cleanup()
  })
})
