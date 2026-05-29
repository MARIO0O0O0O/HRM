/**
 * /api/stripe/webhook/route.ts
 *
 * Stripe webhook handler — stub ready for activation.
 *
 * INTEGRATION STATUS: Plumbed — not yet active.
 *
 * To activate:
 *  1. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Vercel env vars.
 *  2. In Stripe dashboard → Webhooks, add your endpoint:
 *       https://your-domain.vercel.app/api/stripe/webhook
 *  3. Select these events:
 *       - checkout.session.completed
 *       - customer.subscription.created
 *       - customer.subscription.updated
 *       - customer.subscription.deleted
 *       - invoice.payment_succeeded
 *       - invoice.payment_failed
 *  4. Set NEXT_PUBLIC_STRIPE_ENABLED=true.
 */

import { NextResponse } from 'next/server'
import type { StripeWebhookEvent } from '@/lib/stripe/types'

// Dynamic import — Stripe only loaded at request time, never at build time
async function getStripeAndSecret() {
  const { getStripe } = await import('@/lib/stripe/server')
  const stripe = await getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not configured')
  return { stripe, secret }
}

export async function POST(req: Request) {
  // Guard: return 200 immediately if Stripe is not configured
  const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true'
  if (!stripeEnabled) {
    return NextResponse.json({ received: true, active: false })
  }

  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature') ?? ''

    const { stripe, secret } = await getStripeAndSecret()

    // Verify signature — throws if invalid
    const event = stripe.webhooks.constructEvent(body, sig, secret)

    switch (event.type as StripeWebhookEvent) {
      case 'checkout.session.completed': {
        // TODO: provision access in Supabase
        // const session = event.data.object as Stripe.Checkout.Session
        // await provisionSubscription(session)
        console.info('[webhook] checkout.session.completed — provision TODO')
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // TODO: update subscription status in Supabase
        console.info(`[webhook] ${event.type} — sync TODO`)
        break
      }
      case 'invoice.payment_failed': {
        // TODO: send dunning email via Resend
        console.info('[webhook] invoice.payment_failed — dunning TODO')
        break
      }
      default:
        // Unhandled event — safe to ignore
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const error = err as Error
    console.error('[webhook] Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
