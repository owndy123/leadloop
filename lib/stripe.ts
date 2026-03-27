import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export const STRIPE_PRICES = {
  starter: process.env.STRIPE_PRICE_STARTER || 'price_1TFenxHUNUh5JlXeNe6Lxysk',
  pro: process.env.STRIPE_PRICE_PRO || 'price_1TFeoDHUNUh5JlXePNkvvgDk',
  scale: process.env.STRIPE_PRICE_SCALE || 'price_1TFeoqHUNUh5JlXeQ9ynpAZ3',
}
