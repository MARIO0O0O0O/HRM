import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders primary hero headline and main marketing content', () => {
    render(<Home />)
    
    // Check main title in hero
    const headline = screen.getByText('CalBizHR')
    expect(headline).toBeDefined()

    // Check key CTA buttons
    const ctaButton = screen.getByText('Book a $75 Consultation')
    expect(ctaButton).toBeDefined()

    // Check section headings
    expect(screen.getByText('Done-for-you California HR Services')).toBeDefined()
    expect(screen.getByText('What CalBizHR Does About It')).toBeDefined()
    expect(screen.getByText('Why Mario & CalBizHR')).toBeDefined()
    
    cleanup()
  })
})
