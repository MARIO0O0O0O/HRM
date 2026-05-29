/**
 * stripe/types.ts
 *
 * Shared TypeScript types for Stripe integration.
 * These types are safe to import on both client and server.
 *
 * INTEGRATION STATUS: Plumbed — not yet active.
 * To activate: set NEXT_PUBLIC_STRIPE_ENABLED=true and STRIPE_SECRET_KEY
 * in Vercel environment variables.
 */

export type StripePlan = {
  id: string
  name: string
  description: string
  priceId: string           // Stripe Price ID (price_xxx)
  amount: number            // in cents, e.g. 9900 = $99.00
  interval: 'month' | 'year'
  features: string[]
  highlighted?: boolean
}

export type StripeCheckoutBody = {
  priceId: string
  successUrl?: string
  cancelUrl?: string
}

export type StripeCheckoutResponse = {
  url: string
  mock?: boolean
  error?: string
}

export type StripeSubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'paused'
  | 'trialing'
  | 'unpaid'

export type StripeWebhookEvent =
  | 'checkout.session.completed'
  | 'customer.subscription.created'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'
  | 'invoice.payment_succeeded'
  | 'invoice.payment_failed'
