import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PagaDefensePortalPage from '../app/programs/paga-defense/page'

vi.mock('next/navigation', () => ({
  usePathname: () => '/programs/paga-defense',
}))

describe('PAGA Defense Portal Page', () => {
  it('renders AB 2288 statutory framework, 15% and 30% caps, and calculator elements', () => {
    render(<PagaDefensePortalPage />)

    expect(
      screen.getByRole('heading', {
        name: /PAGA Defense Readiness & Cure Portal/i,
      })
    ).toBeDefined()

    expect(screen.getByText(/35% \/ 65%/i)).toBeDefined()
    expect(screen.getAllByText(/\$9,000/i)[0]).toBeDefined()
    expect(screen.getAllByText(/15% Cap/i)[0]).toBeDefined()
    expect(screen.getAllByText(/30% Cap/i)[0]).toBeDefined()

    expect(screen.getByText(/AB 2288 Statutory Framework/i)).toBeDefined()
    expect(screen.getByText(/60-Day Cure Protocol & LWDA Notice Log/i)).toBeDefined()
    expect(screen.getByText(/PAGA Audit Readiness & Toolkit/i)).toBeDefined()

    expect(screen.getByText(/AB 2288 PAGA Knowledge Check/i)).toBeDefined()
  })
})
