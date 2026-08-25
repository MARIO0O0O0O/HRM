import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import About from '../app/about/page'

describe('About Page Component', () => {
  it('renders founder profile and qualification details', () => {
    render(<About />)

    // Verify main credentials and heading are rendered
    expect(screen.getByText('Mario Espindola, MPA')).toBeDefined()
    expect(screen.getByText('My Story & Philosophy')).toBeDefined()
    
    // Check credentials cards
    expect(screen.getByText('MPA, Cal State Fullerton')).toBeDefined()
    expect(screen.getByText('IPMA-Senior Certified Professional')).toBeDefined()
    expect(screen.getByText('$60M HR Budget, 1,500+ Employees')).toBeDefined()
    
    cleanup()
  })
})
