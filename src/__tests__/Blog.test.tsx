import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import BlogPage from '../app/blog/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/blog',
}))

describe('Blog Page Component', () => {
  it('renders labor law publications and download forms correctly', () => {
    render(<BlogPage />)

    // Verify main page title and category tag
    expect(screen.getByText('California Labor Law Updates')).toBeDefined()
    expect(screen.getByText('Legal & Compliance Insights')).toBeDefined()

    // Verify some of our mock articles are present
    expect(screen.getByText('California Workplace Violence Prevention (SB 553): A Step-by-Step Compliance Guide')).toBeDefined()
    expect(screen.getByText('Break Traps: Preventing Costly California Meal & Rest Period Class Action Exposure')).toBeDefined()
    
    // Check checklist card in sidebar
    expect(screen.getByText('Free Compliance Checklist')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Download PDF' })).toBeDefined()
    
    cleanup()
  })
})
