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
    expect(screen.getByText('Free Tool · No Signup Required')).toBeDefined()

    // Verify parameter parameters
    expect(screen.getByText('Employee Headcount')).toBeDefined()
    expect(screen.getByText('Pay Period Frequency')).toBeDefined()
    expect(screen.getByText('How Often Do These Happen?')).toBeDefined()

    // Verify results panel
    expect(screen.getByText('Estimated PAGA Exposure')).toBeDefined()
    expect(screen.getByText('Tell Us About Your Team')).toBeDefined()
    expect(screen.getByRole('button', { name: /Want a second opinion\? Book a \$75 call/ })).toBeDefined()
    
    cleanup()
  })
})
