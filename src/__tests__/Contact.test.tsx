import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import ContactPage from '../app/contact/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/contact',
}))

describe('Contact Page Component', () => {
  it('renders all contact details, payment boxes, and form fields correctly', () => {
    render(<ContactPage />)

    // Check headings
    expect(screen.getByText('Get in Touch with CalBizHR')).toBeDefined()
    expect(screen.getByText('Contact Information')).toBeDefined()
    expect(screen.getByText('Billing & Peer-to-Peer Payments')).toBeDefined()

    // Check contact data (using substring matching which is highly robust in testing-library)
    expect(screen.getAllByText('626-708-2220')[0]).toBeDefined()
    expect(screen.getAllByText('info@mario00.com', { exact: false })[0]).toBeDefined()

    // Query form inputs
    const nameInput = screen.getByPlaceholderText('Jane Doe') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('jane@company.com') as HTMLInputElement
    
    // Simulate inputs
    fireEvent.change(nameInput, { target: { value: 'Jane Contact' } })
    fireEvent.change(emailInput, { target: { value: 'jane@contact.com' } })
    
    expect(nameInput.value).toBe('Jane Contact')
    expect(emailInput.value).toBe('jane@contact.com')

    cleanup()
  })
})
