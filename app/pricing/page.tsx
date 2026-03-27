'use client'
import { useState } from 'react'
import Link from 'next/link'

const plans = [
  { name: 'Starter', price: '$29', count: '500', desc: 'For freelancers and solo outbound.', priceKey: 'starter', highlight: false },
  { name: 'Pro', price: '$79', count: '2,000', desc: 'For growing sales teams.', priceKey: 'pro', highlight: true },
  { name: 'Scale', price: '$199', count: '8,000', desc: 'For high-volume operations.', priceKey: 'scale', highlight: false },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handlePurchase = async (priceKey: string) => {
    setLoading(priceKey)
    setError('')
    try {
      const whoamiRes = await fetch('/api/auth/whoami')
      let userId = null, userEmail = null
      if (whoamiRes.ok) {
        const d = await whoamiRes.json()
        userId = d.user?.id
        userEmail = d.user?.email
      }
      if (!userEmail) {
        window.location.href = `/signup?plan=${priceKey}`
        return
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceKey, userId, userEmail })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">LeadLoop</Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#888] hover:text-white text-sm">Sign in</Link>
            <Link href="/signup" className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-[#eee]">Start free</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, honest pricing</h1>
          <p className="text-[#888]">You pay only for successful enrichments. Failed lookups are always free.</p>
        </div>
        {error && <div className="max-w-md mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl p-8 ${p.highlight ? 'border border-[#00d4aa]' : 'border border-white/10'}`}>
              <div className="text-sm font-semibold text-[#555] uppercase tracking-wide mb-2">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-white">{p.price}</span>
                <span className="text-[#555]">/month</span>
              </div>
              <div className="text-xl font-semibold text-[#00d4aa] mb-2">{p.count} enrichments</div>
              <p className="text-sm text-[#888] mb-6">{p.desc}</p>
              <button onClick={() => handlePurchase(p.priceKey)} disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-semibold transition ${p.highlight ? 'bg-[#00d4aa] text-[#0a0a0a] hover:bg-[#00e8bb]' : 'border border-white/20 text-white hover:border-white/40'}`}>
                {loading === p.priceKey ? 'Redirecting...' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-[#555] text-sm">All plans include free tier — 10 enrichments/month, no credit card required.</p>
          <p className="text-[#444] text-xs mt-2">Payments processed securely by Stripe. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}
