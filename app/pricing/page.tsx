'use client'
import { useState } from 'react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    count: '500',
    desc: 'For freelancers and solo outbound.',
    features: ['500 successful enrichments/mo', 'Freshness timestamp', 'API access', 'CSV import/export'],
    priceIdEnv: 'NEXT_PUBLIC_STRIPE_PRICE_STARTER',
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/month',
    count: '2,000',
    desc: 'For growing sales teams.',
    highlight: true,
    features: ['2,000 successful enrichments/mo', 'Freshness timestamp', 'Priority enrichment', 'Webhook support', 'API access'],
    priceIdEnv: 'NEXT_PUBLIC_STRIPE_PRICE_PRO',
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/month',
    count: '8,000',
    desc: 'For high-volume operations.',
    features: ['8,000 successful enrichments/mo', 'Freshness timestamp', 'Dedicated throughput', 'Custom integrations', 'Priority support'],
    priceIdEnv: 'NEXT_PUBLIC_STRIPE_PRICE_SCALE',
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handlePurchase = async (priceIdEnv: string) => {
    setLoading(priceIdEnv)
    // This would call our checkout API
    // For now, redirect to signup if not logged in
    window.location.href = '/signup'
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">LeadLoop</Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white text-sm">Sign in</Link>
            <Link href="/signup" className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-slate-200">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, honest pricing</h1>
          <p className="text-slate-400">You pay only for successful enrichments. Failed lookups are always free.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-2xl p-8 ${plan.highlight ? 'border border-cyan-500' : 'border border-white/10'}`}
            >
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500">{plan.period}</span>
              </div>
              <div className="text-2xl font-semibold text-cyan-400 mb-2">{plan.count} enrichments</div>
              <p className="text-sm text-slate-400 mb-6">{plan.desc}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-slate-300">· {f}</li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.priceIdEnv)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.highlight
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                    : 'border border-white/20 text-white hover:border-white/40'
                }`}
              >
                {loading === plan.priceIdEnv ? 'Loading...' : 'Get started'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            All plans include free tier — 10 enrichments/month, no credit card required.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Payments processed securely by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
