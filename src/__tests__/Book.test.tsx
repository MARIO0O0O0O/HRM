import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
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

  it('renders booking page header and details correctly', () => {
    render(<BookPage />)

    // Check main titles
    expect(screen.getByText('Reserve Your Compliance Call')).toBeDefined()
    expect(screen.getByText('Select a time, pay to confirm your spot, and receive instant calendar confirmation.')).toBeDefined()
  })
})
