import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import SafetyPreventionHubPage from '../app/spokes/safety-prevention/page'
import WageHourHubPage from '../app/spokes/wage-hour/page'
import LifecycleAdminHubPage from '../app/spokes/lifecycle-admin/page'
import HarassmentPreventionProgramPage from '../app/spokes/safety-prevention/harassment-prevention/page'
import OnboardingProgramPage from '../app/spokes/lifecycle-admin/onboarding/page'
import LeavesProgramPage from '../app/spokes/lifecycle-admin/leaves/page'
import TerminationsProgramPage from '../app/spokes/lifecycle-admin/terminations/page'

describe('Level 2 Category Hub Pages & Level 3 Program Pages', () => {
  beforeEach(() => {
    cleanup()
  })

  it('renders Level 2 Safety & Prevention Hub page with citations and 3 program cards', () => {
    render(<SafetyPreventionHubPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Safety & Workplace Prevention/i })).toBeDefined()

    expect(screen.getAllByText(/Senate Bill 1343/i)[0]).toBeDefined()
    expect(screen.getAllByText(/Senate Bill 553/i)[0]).toBeDefined()
    expect(screen.getAllByText(/Title 8 CCR §/i)[0]).toBeDefined()

    const card1 = screen.getByText('Harassment Prevention (SB 1343)').closest('a')
    expect(card1?.getAttribute('href')).toBe('/spokes/safety-prevention/harassment-prevention')

    const card2 = screen.getByText('Workplace Violence (SB 553 / LC §6401.9)').closest('a')
    expect(card2?.getAttribute('href')).toBe('/spokes/safety-prevention/workplace-violence')

    const card3 = screen.getByText('Cal/OSHA IIPP (Title 8 CCR §3203)').closest('a')
    expect(card3?.getAttribute('href')).toBe('/spokes/safety-prevention/osha-iipp')
  })

  it('renders Level 2 Wage & Hour Hub page with citations and 3 program cards', () => {
    render(<WageHourHubPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Wage & Hour Compliance/i })).toBeDefined()

    expect(screen.getAllByText(/Labor Code § 226/i)[0]).toBeDefined()
    expect(screen.getAllByText(/Senate Bill 1162/i)[0]).toBeDefined()

    const card1 = screen.getByText('Paystubs & Wage Statements (LC §226)').closest('a')
    expect(card1?.getAttribute('href')).toBe('/spokes/wage-hour/paystubs-wage-statements')

    const card2 = screen.getByText('Meal & Rest Breaks (LC §226.7 / §512)').closest('a')
    expect(card2?.getAttribute('href')).toBe('/spokes/wage-hour/meal-rest-breaks')

    const card3 = screen.getByText('Timekeeping & Classification').closest('a')
    expect(card3?.getAttribute('href')).toBe('/spokes/wage-hour/timekeeping-classification')
  })

  it('renders Level 2 Lifecycle Admin Hub page with citations and 3 program cards', () => {
    render(<LifecycleAdminHubPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Employee Lifecycle Admin/i })).toBeDefined()

    expect(screen.getAllByText(/Labor Code § 2810.5/i)[0]).toBeDefined()
    expect(screen.getAllByText(/California Family Rights Act/i)[0]).toBeDefined()
    expect(screen.getAllByText(/Labor Code §§ 201–203/i)[0]).toBeDefined()

    const card1 = screen.getByText('Hiring & Onboarding (LC §2810.5)').closest('a')
    expect(card1?.getAttribute('href')).toBe('/spokes/lifecycle-admin/onboarding')

    const card2 = screen.getByText('Protected Leaves & Accommodations').closest('a')
    expect(card2?.getAttribute('href')).toBe('/spokes/lifecycle-admin/leaves')

    const card3 = screen.getByText('Terminations & Final Pay (LC §§201–203)').closest('a')
    expect(card3?.getAttribute('href')).toBe('/spokes/lifecycle-admin/terminations')
  })

  it('renders Level 3 Harassment Prevention program page with parent Back navigation', async () => {
    const page = await HarassmentPreventionProgramPage()
    render(page)

    expect(screen.getAllByText(/Harassment Prevention/i)[0]).toBeDefined()
    const backLink = screen.getByText('Back to Safety & Prevention').closest('a')
    expect(backLink?.getAttribute('href')).toBe('/spokes/safety-prevention')
  })

  it('renders Level 3 Lifecycle Admin Hiring & Onboarding page with pending compliance review badge', () => {
    render(<OnboardingProgramPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Hiring & Onboarding/i })).toBeDefined()
    expect(screen.getByText(/pending formal compliance review/i)).toBeDefined()
    const backLink = screen.getByText('Back to Lifecycle Admin').closest('a')
    expect(backLink?.getAttribute('href')).toBe('/spokes/lifecycle-admin')
  })

  it('renders Level 3 Lifecycle Admin Protected Leaves page with pending compliance review badge', () => {
    render(<LeavesProgramPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Protected Leaves & Accommodations/i })).toBeDefined()
    expect(screen.getByText(/pending formal compliance review/i)).toBeDefined()
    const backLink = screen.getByText('Back to Lifecycle Admin').closest('a')
    expect(backLink?.getAttribute('href')).toBe('/spokes/lifecycle-admin')
  })

  it('renders Level 3 Lifecycle Admin Terminations page with pending compliance review badge', () => {
    render(<TerminationsProgramPage />)

    expect(screen.getByRole('heading', { level: 1, name: /Terminations & Final Pay/i })).toBeDefined()
    expect(screen.getByText(/pending formal compliance review/i)).toBeDefined()
    const backLink = screen.getByText('Back to Lifecycle Admin').closest('a')
    expect(backLink?.getAttribute('href')).toBe('/spokes/lifecycle-admin')
  })
})
