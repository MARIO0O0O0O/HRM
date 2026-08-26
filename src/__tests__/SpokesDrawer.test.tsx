import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Sidebar from '../components/layout/Sidebar'

describe('3-Card Spokes Drawer Multi-Level Accordion Architecture', () => {
  it('renders 3 persistent modular cards with color accents and badges', () => {
    render(<Sidebar />)

    // Check Header title & 3-Tier badge
    expect(screen.getAllByText('Compliance Spokes')[0]).toBeDefined()

    // Check all 3 Card Headers
    expect(screen.getAllByText('Workplace Safety & Prevention')[0]).toBeDefined()
    expect(screen.getAllByText('Wage & Hour Defense')[0]).toBeDefined()
    expect(screen.getAllByText('Lifecycle Admin')[0]).toBeDefined()
  })

  it('renders Level-2 Compliance Areas under Card 1 (Workplace Safety)', () => {
    render(<Sidebar />)

    expect(screen.getAllByText('Harassment Prevention Program (SB 1343 / FEHA)')[0]).toBeDefined()
    expect(screen.getAllByText('Workplace Violence Prevention (SB 553 / LC §6401.9)')[0]).toBeDefined()
    expect(screen.getAllByText('Cal/OSHA & Safety (Title 8 CCR §3203)')[0]).toBeDefined()
  })

  it('renders Level-3 Mandates under Compliance Area 1', () => {
    render(<Sidebar />)

    expect(screen.getAllByText('Mandatory Training Cycles')[0]).toBeDefined()
    expect(screen.getAllByText('Complaint & Investigation Procedures')[0]).toBeDefined()
    expect(screen.getAllByText('Annual Policy Distribution')[0]).toBeDefined()
  })

  it('opens mandate detail modal sheet when a level-3 mandate item is clicked', () => {
    render(<Sidebar />)

    // Click Level-3 Mandate
    fireEvent.click(screen.getAllByText('Mandatory Training Cycles')[0])

    // Check Modal Content
    expect(screen.getByText('Statutory Compliance Mandate')).toBeDefined()
    expect(screen.getByText('California Legal Citation: Gov. Code § 12950.1(a)')).toBeDefined()
  })

  it('toggles Card 2 and Card 3 accordions cleanly', () => {
    render(<Sidebar />)

    // Click Wage & Hour Defense Card
    fireEvent.click(screen.getAllByText('Wage & Hour Defense')[0])

    // Check Wage & Hour Compliance Areas
    expect(screen.getAllByText('Paystubs & Wage Statements (LC §226)')[0]).toBeDefined()
  })

  it('collapses and expands persistent edge drawer when toggle button is clicked', () => {
    render(<Sidebar />)

    const toggleBtn = screen.getAllByLabelText('Collapse Edge Drawer')[0]
    expect(toggleBtn).toBeDefined()

    // Collapse Edge Drawer
    fireEvent.click(toggleBtn)
    expect(screen.getAllByLabelText('Expand Edge Drawer')[0]).toBeDefined()

    // Expand Edge Drawer
    fireEvent.click(screen.getAllByLabelText('Expand Edge Drawer')[0])
    expect(screen.getAllByLabelText('Collapse Edge Drawer')[0]).toBeDefined()
  })
})
