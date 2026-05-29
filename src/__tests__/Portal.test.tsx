import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import React from 'react'
import PortalPage from '../app/portal/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// Mock Supabase client
const mockGetUser = vi.fn().mockResolvedValue({
  data: {
    user: {
      id: 'test-user-123',
      email: 'employer@acmesgv.com'
    }
  }
})

const mockSingle = vi.fn().mockResolvedValue({
  data: {
    id: 'test-user-123',
    company_name: 'Acme SGV Enterprises',
    contact_email: 'employer@acmesgv.com',
    plan_tier: 'premium',
    created_at: '2026-05-29T00:00:00.000Z'
  },
  error: null
})

const mockEq = vi.fn().mockReturnValue({
  single: mockSingle
})

const mockSelect = vi.fn().mockReturnValue({
  eq: mockEq
})

const mockFrom = vi.fn().mockReturnValue({
  select: mockSelect
})

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  }),
}))

// Mock PaymentOptions component since it is rendered inside billing tab
vi.mock('@/components/payments/PaymentOptions', () => ({
  default: () => <div data-testid="payment-options">Mocked Payment Options</div>
}))

describe('PortalPage Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders loading state initially and then renders profile info and secure documents', async () => {
    let resolvePromise: (value: void | PromiseLike<void>) => void
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve
    })
    
    mockGetUser.mockImplementationOnce(() => {
      resolvePromise()
      return Promise.resolve({
        data: {
          user: {
            id: 'test-user-123',
            email: 'employer@acmesgv.com'
          }
        }
      })
    })

    await act(async () => {
      render(<PortalPage />)
    })

    // Wait for the mock API calls to finish and state updates to settle
    await act(async () => {
      await promise
    })

    // Verify presence of title and company info
    expect(screen.getByText('Client Portal Dashboard')).toBeDefined()
    expect(screen.getByText('Acme SGV Enterprises')).toBeDefined()
    expect(screen.getByText('Admin Contact: employer@acmesgv.com')).toBeDefined()
    expect(screen.getByText('premium')).toBeDefined()

    // Verify document locker items
    expect(screen.getByText('California Employee Handbook (Draft)')).toBeDefined()
    expect(screen.getByText('SB 553 Workplace Violence Prevention Plan')).toBeDefined()
    expect(screen.getByText('Meal & Rest Break Policy Acknowledgment Form')).toBeDefined()
  })

  it('allows switching between Dashboard and Secure Billing tabs', async () => {
    await act(async () => {
      render(<PortalPage />)
    })

    // Get tab buttons
    const dashboardTabBtn = screen.getByRole('button', { name: 'Dashboard' })
    const billingTabBtn = screen.getByRole('button', { name: 'Secure Billing' })

    expect(dashboardTabBtn).toBeDefined()
    expect(billingTabBtn).toBeDefined()

    // Initially Dashboard is active, verify that billing options are NOT shown yet
    expect(screen.queryByTestId('payment-options')).toBeNull()

    // Click Billing Tab
    await act(async () => {
      fireEvent.click(billingTabBtn)
    })

    // Verify Billing component is now rendered
    expect(screen.getByTestId('payment-options')).toBeDefined()

    // Switch back to Dashboard
    await act(async () => {
      fireEvent.click(dashboardTabBtn)
    })

    // Verify Billing is gone
    expect(screen.queryByTestId('payment-options')).toBeNull()
  })
})
