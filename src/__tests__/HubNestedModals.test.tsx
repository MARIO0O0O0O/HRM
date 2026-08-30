import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AiGovernanceNestedModal from '../components/hub/AiGovernanceNestedModal'
import LegalInsightsNestedModal from '../components/hub/LegalInsightsNestedModal'
import FounderBioNestedModal from '../components/hub/FounderBioNestedModal'
import AdvisoryBookingNestedModal from '../components/hub/AdvisoryBookingNestedModal'
import PaymentsFundNestedModal from '../components/hub/PaymentsFundNestedModal'

describe('Hub Nested Modals Suite', () => {
  it('renders AiGovernanceNestedModal and switches between sub-views', () => {
    render(<AiGovernanceNestedModal />)
    expect(screen.getByText('CRD Automated Decision Systems (ADS) Rules')).toBeDefined()

    // Click AI Bias Assessment
    fireEvent.click(screen.getByRole('button', { name: /AI Bias Assessment/i }))
    expect(screen.getByText('Algorithmic Tool Screener')).toBeDefined()

    // Back button
    fireEvent.click(screen.getByText('Back to AI Governance'))
    expect(screen.getByText('CRD Automated Decision Systems (ADS) Rules')).toBeDefined()

    // Click Vendor Indemnity Checklist
    fireEvent.click(screen.getByRole('button', { name: /Vendor Indemnity Checklist/i }))
    expect(screen.getByText('Mandatory AI Contract Clauses')).toBeDefined()
  })

  it('renders LegalInsightsNestedModal and switches between sub-views', () => {
    render(<LegalInsightsNestedModal />)
    expect(screen.getByText('California Labor Code Briefings & Case Law')).toBeDefined()

    // Click Compliance Briefings
    fireEvent.click(screen.getByRole('button', { name: /Compliance Briefings/i }))
    expect(screen.getByText('California SB 553 Workplace Violence Prevention')).toBeDefined()

    // Back button
    fireEvent.click(screen.getByText('Back to Briefings'))
    expect(screen.getByText('California Labor Code Briefings & Case Law')).toBeDefined()

    // Click State Deadlines Calendar
    fireEvent.click(screen.getByRole('button', { name: /State Deadlines Calendar/i }))
    expect(screen.getByText('Cal/OSHA Form 300A Posting')).toBeDefined()
  })

  it('renders FounderBioNestedModal and switches between sub-views', () => {
    render(<FounderBioNestedModal />)
    expect(screen.getByText('Mario Espindola, MPA — Founder Profile')).toBeDefined()

    // Click Background & Credentials
    fireEvent.click(screen.getByRole('button', { name: /Background & Credentials/i }))
    expect(screen.getByText('Master of Public Administration (MPA)')).toBeDefined()

    // Back button
    fireEvent.click(screen.getByText('Back to Leadership'))
    expect(screen.getByText('Mario Espindola, MPA — Founder Profile')).toBeDefined()

    // Click Defense Philosophy
    fireEvent.click(screen.getByRole('button', { name: /Defense Philosophy/i }))
    expect(screen.getByText('Why Proactive Auditing Shields Employers')).toBeDefined()
  })

  it('renders AdvisoryBookingNestedModal and switches between sub-views', () => {
    render(<AdvisoryBookingNestedModal />)
    expect(screen.getByText('Direct Consultation & Compliance Intake')).toBeDefined()

    // Click Book Diagnostic Session
    fireEvent.click(screen.getByRole('button', { name: /Book Diagnostic Session/i }))
    expect(screen.getByText('30-Minute Diagnostic Session')).toBeDefined()

    // Back button
    fireEvent.click(screen.getByText('Back to Consultation'))
    expect(screen.getByText('Direct Consultation & Compliance Intake')).toBeDefined()

    // Click Direct Message Intake
    fireEvent.click(screen.getByRole('button', { name: /Direct Message Intake/i }))
    expect(screen.getByText('Your Name')).toBeDefined()
  })

  it('renders PaymentsFundNestedModal and switches between sub-views', () => {
    render(<PaymentsFundNestedModal />)
    expect(screen.getByText('Payments, Retainers & Defense Fund')).toBeDefined()

    // Click Client Payments & Retainers
    fireEvent.click(screen.getByRole('button', { name: /Client Payments & Retainers/i }))
    expect(screen.getByText('Zelle Handle')).toBeDefined()
    expect(screen.getAllByText('info@mario00.com')[0]).toBeDefined()

    // Back button
    fireEvent.click(screen.getByText('Back to Payments & Fund'))
    expect(screen.getByText('Payments, Retainers & Defense Fund')).toBeDefined()

    // Small Business Defense Fund link to /support
    const defenseLink = screen.getByRole('link', { name: /Small Business Defense Fund/i })
    expect(defenseLink).toBeDefined()
    expect(defenseLink.getAttribute('href')).toBe('/support')
  })
})
