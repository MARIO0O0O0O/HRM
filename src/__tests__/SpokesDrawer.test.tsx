import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Sidebar from '../components/layout/Sidebar'

describe('3-Card Spokes Drawer Architecture', () => {
  it('renders 3 persistent Category cards', () => {
    render(<Sidebar />)

    // Check header
    expect(screen.getByText('Compliance Spokes')).toBeDefined()
    expect(screen.getByText('3-Card Drawer')).toBeDefined()

    // Check all 3 Category cards
    expect(screen.getAllByText('Safety & Workplace Prevention')[0]).toBeDefined()
    expect(screen.getAllByText('Wage & Hour Defense')[0]).toBeDefined()
    expect(screen.getAllByText('Employee Lifecycle Admin')[0]).toBeDefined()

    // Check category badges
    expect(screen.getAllByText('3 Compliance Areas')[0]).toBeDefined()
    expect(screen.getByText('2 Compliance Areas')).toBeDefined()
  })

  it('opens slide-over drawer panel when a Category card is clicked', () => {
    render(<Sidebar />)

    // Click Safety & Workplace Prevention card
    fireEvent.click(screen.getAllByText('Safety & Workplace Prevention')[0])

    // Check drawer content
    expect(screen.getAllByText('Workplace Violence (SB 553 / LC §6401.9)')[0]).toBeDefined()
    expect(screen.getByText('Harassment Prevention (SB 1343)')).toBeDefined()
    expect(screen.getByText('Cal/OSHA IIPP (8 CCR §3203)')).toBeDefined()

    // Check Toolkit action buttons
    expect(screen.getByText('Get WVPP Toolkit ($199)')).toBeDefined()
    expect(screen.getByText('Get HPP Toolkit ($149)')).toBeDefined()
    expect(screen.getByText('Get IIPP Toolkit ($199)')).toBeDefined()
  })
})
