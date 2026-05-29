import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Breadcrumb from '../components/layout/Breadcrumb'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/services/compliance-audit',
}))

describe('Breadcrumb Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders dynamic path segments correctly with capital letters and mapped values', () => {
    render(<Breadcrumb />)
    
    // Check if Home link is rendered
    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toBeDefined()
    
    // Check if Services segment is rendered (mapped from segmentLabelMap)
    const servicesLink = screen.getByText('Services')
    expect(servicesLink).toBeDefined()
    expect(servicesLink.getAttribute('href')).toBe('/services')
    
    // Check if the leaf segment is rendered with formatted label (slug capitalized and hiphens removed)
    const leafSegment = screen.getByText('Compliance Audit')
    expect(leafSegment).toBeDefined()
    expect(leafSegment.getAttribute('aria-current')).toBe('page')
  })

  it('renders custom items when provided overrides', () => {
    const customItems = [
      { label: 'Custom Section', href: '/custom' },
      { label: 'Deep Resource', href: '/custom/deep' },
    ]
    
    render(<Breadcrumb items={customItems} />)
    
    // Home should still exist
    const homeLink = screen.getByLabelText('Home')
    expect(homeLink).toBeDefined()
    
    // Check if custom items are rendered
    const customItem1 = screen.getByText('Custom Section')
    expect(customItem1).toBeDefined()
    expect(customItem1.getAttribute('href')).toBe('/custom')

    const customItem2 = screen.getByText('Deep Resource')
    expect(customItem2).toBeDefined()
    expect(customItem2.getAttribute('aria-current')).toBe('page')
  })
})
