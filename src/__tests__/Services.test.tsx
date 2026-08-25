import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import ServicesPage from '../app/services/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/services',
}))

describe('Services Page Component', () => {
  it('renders all solution catalog headers and details correctly', () => {
    render(<ServicesPage />)

    // Verify page header titles
    expect(screen.getByText('CalBizHR Solutions Catalog')).toBeDefined()
    expect(screen.getByText('Comprehensive Compliance')).toBeDefined()

    // Verify some catalog items are visible
    expect(screen.getByText('HR Compliance Audit')).toBeDefined()
    expect(screen.getByText('Wage-and-Hour Cleanup')).toBeDefined()
    expect(screen.getByText('Handbooks & Policies')).toBeDefined()
    expect(screen.getByText('AI-Powered HR Consulting', { exact: false })).toBeDefined()
    
    cleanup()
  })
})
