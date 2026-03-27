import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const PRICE_KEYS: Record<string, { name: string; amount: number }> = {
  starter: { name: 'LeadLoop Starter', amount: 2900 },   // $29
  pro:     { name: 'LeadLoop Pro',     amount: 7900 },   // $79
  scale:   { name: 'LeadLoop Scale',   amount: 19900 },  // $199
}

export async function POST(request: NextRequest) {
  try {
    const { priceKey, userId, userEmail } = await request.json()

    if (!priceKey || !PRICE_KEYS[priceKey]) {
      return NextResponse.json({ error: 'Invalid price key' }, { status: 400 })
    }

    const { name, amount } = PRICE_KEYS[priceKey]
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadloop-five.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              description: priceKey === 'starter' ? '500 successful enrichments/month'
                : priceKey === 'pro' ? '2,000 successful enrichments/month'
                : '8,000 successful enrichments/month',
            },
            unit_amount: amount,
            recurring: {
              interval: 'month',
            },
          },
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
