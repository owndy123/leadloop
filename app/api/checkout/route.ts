import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'

const PRICE_KEYS: Record<string, string> = {
  starter: 'STRIPE_PRICE_STARTER',
  pro: 'STRIPE_PRICE_PRO',
  scale: 'STRIPE_PRICE_SCALE',
}

export async function POST(request: NextRequest) {
  try {
    const { priceKey, userId, userEmail } = await request.json()

    if (!priceKey || !PRICE_KEYS[priceKey]) {
      return NextResponse.json({ error: 'Invalid price key' }, { status: 400 })
    }

    const priceId = STRIPE_PRICES[priceKey as keyof typeof STRIPE_PRICES]
    
    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadloop-five.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        userId: userId || '',
        priceKey,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
