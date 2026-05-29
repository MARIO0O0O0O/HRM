import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import Home from '../app/page'

describe('Homepage Component', () => {
  it('renders primary hero headline and main marketing content', () => {
    render(<Home />)
    
    // Check main headline
    const headline = screen.getByText('Done-for-you HR and AI services for California small businesses.')
    expect(headline).toBeDefined()

    // Check key CTA buttons
    const ctaButton = screen.getByText('Book a $75 Consultation')
    expect(ctaButton).toBeDefined()

    // Check section heading
    expect(screen.getByText('Done-for-you California HR Services')).toBeDefined()
    expect(screen.getByText('Where California Small Businesses Get into Trouble')).toBeDefined()
    expect(screen.getByText('About the Founder')).toBeDefined()
    
    cleanup()
  })
})
