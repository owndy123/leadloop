import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Webhook handler for Stripe events
export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.metadata?.userId
      const priceId = session.metadata?.priceId

      if (userId && session.customer_email) {
        // Update user subscription in Supabase
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const plan = priceId === process.env.STRIPE_PRICE_STARTER ? 'starter'
          : priceId === process.env.STRIPE_PRICE_PRO ? 'pro'
          : priceId === process.env.STRIPE_PRICE_SCALE ? 'scale' : 'starter'

        await supabase
          .from('users')
          .update({ 
            plan,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      await supabase
        .from('users')
        .update({ plan: 'free' })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
