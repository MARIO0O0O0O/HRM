import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import BlogPostPage from '../app/blog/[slug]/page'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/blog/california-sb-553-workplace-violence-prevention',
}))

describe('Blog Detail Page Component', () => {
  it('renders article detail layout and seeded text parameters correctly', async () => {
    const mockParams = Promise.resolve({
      slug: 'california-sb-553-workplace-violence-prevention',
    })

    render(await BlogPostPage({ params: mockParams }))

    // Verify main page title and category
    expect(screen.getByText('California Workplace Violence Prevention (SB 553): A Step-by-Step Compliance Guide')).toBeDefined()
    expect(screen.getByText('Workplace Safety')).toBeDefined()

    // Verify takeaways list
    expect(screen.getByText('Key Takeaways for W-2 Employers:')).toBeDefined()
    expect(screen.getByText('WVPP must be written, custom-tailored, and readily accessible to all shift employees.')).toBeDefined()
    
    // Check call action button
    expect(screen.getByRole('button', { name: /Book Diagnostic Call/ })).toBeDefined()

    cleanup()
  })
})
