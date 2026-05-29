import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react'
import React from 'react'
import LoginPage from '../app/auth/login/page'

// Mock next/navigation
const mockPush = vi.fn()
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}))

// Mock Supabase client
const mockSignIn = vi.fn().mockResolvedValue({ error: null })
const mockSignUp = vi.fn().mockResolvedValue({ error: null })
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
      signUp: mockSignUp,
    },
  }),
}))

describe('LoginPage Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders login form and responds to form actions', async () => {
    render(<LoginPage />)

    // Verify heading is rendered
    expect(screen.getByText('Welcome Back')).toBeDefined()

    // Query elements
    const emailInput = screen.getByPlaceholderText('you@company.com') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: 'Sign In' })

    // Simulate inputting email & password
    fireEvent.change(emailInput, { target: { value: 'mario@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(emailInput.value).toBe('mario@test.com')
    expect(passwordInput.value).toBe('password123')

    // Click Sign In
    await act(async () => {
      fireEvent.click(submitButton)
    })

    // Expect Supabase auth sign-in to be called with entered values
    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'mario@test.com',
      password: 'password123',
    })

    // Expect router push to portal on success
    expect(mockPush).toHaveBeenCalledWith('/portal')
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('allows requested sign up and triggers Supabase signUp handler', async () => {
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const signUpButton = screen.getByRole('button', { name: 'Request Access / Sign Up' })

    fireEvent.change(emailInput, { target: { value: 'newclient@company.com' } })
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } })

    await act(async () => {
      fireEvent.click(signUpButton)
    })

    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'newclient@company.com',
      password: 'securepassword',
      options: {
        emailRedirectTo: expect.stringContaining('/auth/callback'),
      },
    })
  })
})
