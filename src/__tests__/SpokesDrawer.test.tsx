import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Sidebar from '../components/layout/Sidebar'

describe('SPOKES Drawer Global Shell Component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders closed state slim vertical tab pinned with label SPOKES ❯', () => {
    render(<Sidebar />)

    // Check closed edge tab trigger
    expect(screen.getAllByText('SPOKES ❯')[0]).toBeDefined()
  })

  it('opens drawer on click and renders exactly 3 category cards as real navigable Links', () => {
    render(<Sidebar />)

    // Open drawer
    const trigger = screen.getAllByText('SPOKES ❯')[0]
    fireEvent.click(trigger)

    // Check header
    expect(screen.getByText('Compliance Spokes Directory')).toBeDefined()

    // Check Card 1: Safety & Prevention link
    const card1 = screen.getByText('Safety & Prevention').closest('a')
    expect(card1).not.toBeNull()
    expect(card1?.getAttribute('href')).toBe('/spokes/safety-prevention')

    // Check Card 2: Wage & Hour link
    const card2 = screen.getByText('Wage & Hour').closest('a')
    expect(card2).not.toBeNull()
    expect(card2?.getAttribute('href')).toBe('/spokes/wage-hour')

    // Check Card 3: Lifecycle Admin link
    const card3 = screen.getByText('Lifecycle Admin').closest('a')
    expect(card3).not.toBeNull()
    expect(card3?.getAttribute('href')).toBe('/spokes/lifecycle-admin')
  })
})
