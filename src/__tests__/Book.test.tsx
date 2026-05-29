import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import BookPage from '../app/book/page'

// Mock next/navigation
const mockGet = vi.fn().mockReturnValue(null)
vi.mock('next/navigation', () => ({
  usePathname: () => '/book',
  useSearchParams: () => ({
    get: mockGet,
  }),
}))

// Mock Supabase Client
const mockGetUser = vi.fn().mockResolvedValue({ data: { user: null } })
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null }),
        }),
      }),
    }),
  }),
}))

describe('Booking Page Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders call values and processes interactive form state changes', () => {
    render(<BookPage />)

    // Check main titles
    expect(screen.getByText('Reserve Your Compliance Call')).toBeDefined()
    expect(screen.getByText('How the Diagnostic Call Works')).toBeDefined()
    expect(screen.getByText('$75')).toBeDefined()

    // Query form elements
    const nameInput = screen.getByPlaceholderText('Jane Doe') as HTMLInputElement
    const businessInput = screen.getByPlaceholderText('Acme Corp') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('jane@company.com') as HTMLInputElement
    
    // Simulate inputs
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(businessInput, { target: { value: 'Test Business' } })
    fireEvent.change(emailInput, { target: { value: 'test@business.com' } })
    
    expect(nameInput.value).toBe('Test User')
    expect(businessInput.value).toBe('Test Business')
    expect(emailInput.value).toBe('test@business.com')
  })
})
