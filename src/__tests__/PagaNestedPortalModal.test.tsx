import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PagaNestedPortalModal from '../components/hub/PagaNestedPortalModal'

describe('PagaNestedPortalModal Component', () => {
  it('renders Tier 1 Educational Hub by default with action buttons', () => {
    render(<PagaNestedPortalModal />)

    expect(screen.getAllByText('California Labor Code § 2698 (PAGA) Overview')[0]).toBeDefined()
    expect(screen.getAllByText('Statutory Penalty Math')[0]).toBeDefined()
    expect(screen.getAllByText('65% LWDA / 35% Employee Split')[0]).toBeDefined()
    expect(screen.getAllByText('15% Proactive Audit Cap')[0]).toBeDefined()
    expect(screen.getAllByText('30% Post-Notice Cure Cap')[0]).toBeDefined()

    expect(screen.getAllByText('Calculate Risk Exposure')[0]).toBeDefined()
    expect(screen.getAllByText('Review Audit Checklist')[0]).toBeDefined()
    expect(screen.getAllByText('Book Consultation ($75)')[0]).toBeDefined()
  })

  it('transitions to Sub-View A (Calculator) and back to Tier 1', () => {
    render(<PagaNestedPortalModal />)

    // Click Calculate Risk Exposure
    fireEvent.click(screen.getAllByText('Calculate Risk Exposure')[0])

    expect(screen.getAllByText('Non-Exempt Employees')[0]).toBeDefined()
    expect(screen.getAllByText('Pay Frequency')[0]).toBeDefined()
    expect(screen.getAllByText('Apply Proactive Audit Cap (Applies 85% penalty reduction / 15% statutory cap)')[0]).toBeDefined()
    expect(screen.getAllByText('Total Estimated Exposure')[0]).toBeDefined()

    // Click Back to PAGA Guide
    fireEvent.click(screen.getAllByText('Back to PAGA Guide')[0])
    expect(screen.getAllByText('California Labor Code § 2698 (PAGA) Overview')[0]).toBeDefined()
  })

  it('transitions to Sub-View B (Universal CA Compliance Checklist) and back to Tier 1', () => {
    render(<PagaNestedPortalModal />)

    // Click Review Audit Checklist
    fireEvent.click(screen.getAllByText('Review Audit Checklist')[0])

    expect(screen.getAllByText(/1\. Paystubs & Wage Statements \(LC § 226\)/i)[0]).toBeDefined()
    expect(screen.getAllByText(/2\. Meal & Rest Breaks \(LC § 226\.7 \/ § 512\)/i)[0]).toBeDefined()
    expect(screen.getAllByText(/3\. Safety & Cal\/OSHA \(SB 553 & Title 8 § 3203\)/i)[0]).toBeDefined()
    expect(screen.getAllByText(/4\. New Hire Notices & Disclosures/i)[0]).toBeDefined()
    expect(screen.getAllByText(/Mandatory Diagnostic Disclaimer/i)[0]).toBeDefined()

    // Click Back to PAGA Guide
    fireEvent.click(screen.getAllByText('Back to PAGA Guide')[0])
    expect(screen.getAllByText('California Labor Code § 2698 (PAGA) Overview')[0]).toBeDefined()
  })
})
