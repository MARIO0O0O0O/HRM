import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Sidebar from '../components/layout/Sidebar'

describe('SPOKES Drawer Global Shell Component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders closed state 3 stacked titled notches pinned to screen edge', () => {
    render(<Sidebar />)

    // Check 3 stacked trigger notches
    expect(screen.getAllByText('Safety & Prevention')[0]).toBeDefined()
    expect(screen.getAllByText('Wage & Hour')[0]).toBeDefined()
    expect(screen.getAllByText('Lifecycle Admin')[0]).toBeDefined()
  })

  it('opens drawer on notch click and renders 3 ornate wooden category boxes as real navigable Links', () => {
    render(<Sidebar />)

    // Open drawer via notch click
    const trigger = screen.getAllByText('Safety & Prevention')[0]
    fireEvent.click(trigger)

    // Check cabinet header
    expect(screen.getByText('Compliance Spokes Cabinet')).toBeDefined()

    // Check Card 1: Safety & Prevention link
    const card1 = screen.getAllByText('Safety & Prevention')[1].closest('a')
    expect(card1).not.toBeNull()
    expect(card1?.getAttribute('href')).toBe('/spokes/safety-prevention')

    // Check Card 2: Wage & Hour link
    const card2 = screen.getAllByText('Wage & Hour')[1].closest('a')
    expect(card2).not.toBeNull()
    expect(card2?.getAttribute('href')).toBe('/spokes/wage-hour')

    // Check Card 3: Lifecycle Admin link
    const card3 = screen.getAllByText('Lifecycle Admin')[1].closest('a')
    expect(card3).not.toBeNull()
    expect(card3?.getAttribute('href')).toBe('/spokes/lifecycle-admin')
  })
})
