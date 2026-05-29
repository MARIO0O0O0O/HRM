import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import React from 'react'
import ComplianceCalendar from '../components/portal/ComplianceCalendar'

describe('ComplianceCalendar Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly with default deadlines', () => {
    render(<ComplianceCalendar />)

    expect(screen.getByText('California Compliance Calendar')).toBeDefined()
    expect(screen.getByText('SB 553 Workplace Violence Prevention Plan')).toBeDefined()
    expect(screen.getByText('Annual Sexual Harassment Prevention Training')).toBeDefined()
  })

  it('filters deadlines based on selected urgency tab', async () => {
    render(<ComplianceCalendar />)

    const urgentTabBtn = screen.getByRole('button', { name: 'urgent' })
    const completedTabBtn = screen.getByRole('button', { name: 'completed' })

    // Click Urgent filter tab
    await act(async () => {
      fireEvent.click(urgentTabBtn)
    })

    // SB 553 is urgent and should be visible
    expect(screen.getByText('SB 553 Workplace Violence Prevention Plan')).toBeDefined()
    
    // Annual Sexual Harassment is upcoming and should NOT be visible under urgent filter
    expect(screen.queryByText('Annual Sexual Harassment Prevention Training')).toBeNull()

    // Click Completed filter tab
    await act(async () => {
      fireEvent.click(completedTabBtn)
    })

    // Annual Form 300A Summary Posting is completed and should be visible
    expect(screen.getByText('Annual Form 300A Summary Posting')).toBeDefined()
    expect(screen.queryByText('SB 553 Workplace Violence Prevention Plan')).toBeNull()
  })

  it('allows adding a custom compliance event', async () => {
    render(<ComplianceCalendar />)

    const addBtn = screen.getByRole('button', { name: /Add Deadline Reminder/i })
    
    // Click button to show form
    await act(async () => {
      fireEvent.click(addBtn)
    })

    // Fill in form values using accessible label querying
    const titleInput = screen.getByLabelText(/Requirement Title/i)
    const dateInput = screen.getByLabelText(/Due Date/i)
    const refInput = screen.getByLabelText(/Legal Code \/ Authority/i)
    const descInput = screen.getByLabelText(/Brief Compliance Description/i)
    
    expect(titleInput).toBeDefined()
    expect(dateInput).toBeDefined()
    
    fireEvent.change(titleInput, { target: { value: 'My Custom OSHA Audit' } })
    fireEvent.change(dateInput, { target: { value: '2026-06-15' } })
    fireEvent.change(refInput, { target: { value: 'OSHA 101' } })
    fireEvent.change(descInput, { target: { value: 'Conduct initial mock safety inspections.' } })

    const saveBtn = screen.getByRole('button', { name: 'Save Reminder' })
    
    await act(async () => {
      fireEvent.click(saveBtn)
    })

    // Custom reminder should be visible in the timeline list
    expect(screen.getByText('My Custom OSHA Audit')).toBeDefined()
  })

  it('toggles complete status on a deadline item', async () => {
    render(<ComplianceCalendar />)

    // Initially there are 2 completed buttons
    const initialCompletedCount = screen.getAllByRole('button', { name: 'Completed' }).length
    expect(initialCompletedCount).toBe(2)

    // Find the complete toggle for the first active item (SB 553 WVPP)
    const completeButtons = screen.getAllByRole('button', { name: 'Mark Complete' })
    expect(completeButtons.length).toBeGreaterThan(0)

    // Click mark complete on first item
    await act(async () => {
      fireEvent.click(completeButtons[0])
    })

    // There should now be 3 completed buttons in the document
    const newCompletedCount = screen.getAllByRole('button', { name: 'Completed' }).length
    expect(newCompletedCount).toBe(3)
  })
})
