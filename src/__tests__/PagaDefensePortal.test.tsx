import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PagaCalculatorPage from '../app/paga-calculator/page'

describe('PAGA Calculator Page', () => {
  it('renders AB 2288 statutory framework, 15% and 30% caps, and calculator elements', () => {
    render(<PagaCalculatorPage />)

    expect(
      screen.getByRole('heading', {
        name: /California PAGA Exposure Calculator/i,
      })
    ).toBeDefined()

    expect(screen.getByText(/35% to aggrieved employees \/ 65% to LWDA/i)).toBeDefined()
    expect(screen.getAllByText(/\$9,000 per aggrieved employee/i)[0]).toBeDefined()
    expect(screen.getAllByText(/15%/i)[0]).toBeDefined()
    expect(screen.getAllByText(/30%/i)[0]).toBeDefined()
    expect(screen.getByText(/AB 2288 Reform \(June 2024\) — What Changed/i)).toBeDefined()
  })
})
