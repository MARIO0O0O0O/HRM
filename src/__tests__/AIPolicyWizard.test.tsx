import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import React from 'react'
import AIPolicyWizard from '../components/portal/AIPolicyWizard'

describe('AIPolicyWizard Component', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders template options and configurations correctly', () => {
    render(<AIPolicyWizard />)

    expect(screen.getByText('AI California Compliance Policy Wizard')).toBeDefined()
    expect(screen.getByText('SB 553 Workplace Violence Prevention Plan')).toBeDefined()
    expect(screen.getByText('California Meal & Rest Break Policy')).toBeDefined()
    expect(screen.getByText('California Expense Reimbursement Policy')).toBeDefined()
  })

  it('triggers interactive loading animation sequences on generation', async () => {
    vi.useFakeTimers()
    render(<AIPolicyWizard />)

    const generateBtn = screen.getByRole('button', { name: 'Generate Policy Draft' })
    expect(generateBtn).toBeDefined()

    // Trigger generate action
    await act(async () => {
      fireEvent.click(generateBtn)
    })

    // Should display analyzing state initially
    expect(screen.getByText('Analyzing Regulations...')).toBeDefined()
    expect(screen.getByText('Analyzing Statutes')).toBeDefined()

    // Fast-forward timers for step 2
    await act(async () => {
      vi.advanceTimersByTime(600)
    })
    expect(screen.getByText('Structuring Compliance Guidelines')).toBeDefined()

    // Fast-forward timers for step 3
    await act(async () => {
      vi.advanceTimersByTime(600)
    })
    expect(screen.getByText('Injecting California Safe Harbors')).toBeDefined()

    // Fast-forward timers for output render completion
    await act(async () => {
      vi.advanceTimersByTime(600)
    })

    // Output policy document text should now be printed and render copying buttons
    expect(screen.getByText('Copy Policy Text')).toBeDefined()
    expect(screen.getByText(/CALIFORNIA WORKPLACE VIOLENCE PREVENTION PLAN/i)).toBeDefined()
  })

  it('allows customizing form fields and generating corresponding texts', async () => {
    vi.useFakeTimers()
    render(<AIPolicyWizard />)

    // Change company name input
    const companyInput = screen.getByDisplayValue('Acme SGV Enterprises') as HTMLInputElement
    fireEvent.change(companyInput, { target: { value: 'Delta Legal Services' } })

    const leadInput = screen.getByDisplayValue('Jane Doe') as HTMLInputElement
    fireEvent.change(leadInput, { target: { value: 'Robert Vance' } })

    const generateBtn = screen.getByRole('button', { name: 'Generate Policy Draft' })
    
    await act(async () => {
      fireEvent.click(generateBtn)
      vi.advanceTimersByTime(2000)
    })

    // Verify company and lead names appear in the final generated template text
    expect(screen.getByText(/Delta Legal Services/i)).toBeDefined()
    expect(screen.getByText(/Robert Vance/i)).toBeDefined()
  })
})
