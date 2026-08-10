/**
 * stripe/server.ts — server-only Stripe client (lazy + dynamic import)
 *
 * Uses dynamic import() so webpack never executes the Stripe constructor
 * during the build's page-data collection phase.
 *
 * NEVER import this file from client components.
 */

// Cached instance — re-used across requests in the same serverless worker
let _stripe: import('stripe').default | null = null

export async function getStripe(): Promise<import('stripe').default> {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key === 'REPLACE_WITH_SECRET_KEY') {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    // Dynamic import — deferred until actual request execution
    const Stripe = (await import('stripe')).default
    _stripe = new Stripe(key, {
      apiVersion: '2026-07-29.dahlia' as const,
    })
  }
  return _stripe
}
