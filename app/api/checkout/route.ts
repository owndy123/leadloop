import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, userEmail } = await request.json()

    if (!priceId || !STRIPE_PRICES[priceId as keyof typeof STRIPE_PRICES]) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadloop-five.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userEmail,
      line_items: [
        {
          price: STRIPE_PRICES[priceId as keyof typeof STRIPE_PRICES],
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        userId: userId || '',
        priceId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
