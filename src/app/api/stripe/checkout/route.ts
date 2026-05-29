import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/server'

export async function POST(req: Request) {
  try {
    // Return a mock response if Stripe is not configured (preview / staging)
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key === 'REPLACE_WITH_SECRET_KEY') {
      return NextResponse.json({
        url: 'https://checkout.stripe.com/preview/mock_checkout_session',
        mock: true,
      })
    }

    const { priceId } = await req.json()

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/portal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const err = error as Error
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
