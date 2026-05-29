/**
 * stripe/plans.ts
 *
 * Pricing plan definitions. When Stripe is activated, replace the
 * priceId values with real Stripe Price IDs from your dashboard.
 *
 * Dashboard → https://dashboard.stripe.com/products
 */

import type { StripePlan } from './types'

export const PLANS: StripePlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For solo HR managers and small teams',
    priceId: 'price_REPLACE_STARTER',   // ← replace with real Stripe Price ID
    amount: 9900,                        // $99/mo
    interval: 'month',
    features: [
      'PAGA compliance calculator',
      'Basic policy templates',
      'Email support',
      '1 user seat',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses needing full compliance coverage',
    priceId: 'price_REPLACE_PRO',       // ← replace with real Stripe Price ID
    amount: 24900,                       // $249/mo
    interval: 'month',
    highlighted: true,
    features: [
      'Everything in Starter',
      'AI Policy Wizard (unlimited)',
      'Compliance Calendar with alerts',
      'Priority support',
      '5 user seats',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For HR consultants managing multiple clients',
    priceId: 'price_REPLACE_AGENCY',    // ← replace with real Stripe Price ID
    amount: 59900,                       // $599/mo
    interval: 'month',
    features: [
      'Everything in Pro',
      'Unlimited client portals',
      'White-label reports',
      'Dedicated account manager',
      'Unlimited seats',
    ],
  },
]

export const getPlanById = (id: string): StripePlan | undefined =>
  PLANS.find((p) => p.id === id)

export const getPlanByPriceId = (priceId: string): StripePlan | undefined =>
  PLANS.find((p) => p.priceId === priceId)
