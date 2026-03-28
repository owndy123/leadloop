'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

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
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="border-b border-white/10 sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">LeadLoop</Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#888] hover:text-white text-sm">Sign in</Link>
            <Link href="/signup" className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-[#eee]">Start free</Link>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-xs uppercase tracking-widest text-[#555] mb-4"
          >
            Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Simple, honest pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-[#888]"
          >
            You pay only for successful enrichments. Failed lookups are always free.
          </motion.p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
              className={`rounded-2xl p-8 ${p.highlight ? 'border border-[#00d4aa]' : 'border border-white/10'}`}
            >
              <div className="text-sm font-semibold text-[#555] uppercase tracking-wide mb-3">{p.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-white">{p.price}</span>
                <span className="text-[#555]">/month</span>
              </div>
              <div className="text-xl font-semibold text-[#00d4aa] mb-2">{p.count} enrichments</div>
              <p className="text-sm text-[#888] mb-8">{p.desc}</p>
              <button
                onClick={() => handlePurchase(p.priceKey)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-semibold transition ${p.highlight
                  ? 'bg-[#00d4aa] text-[#0a0a0a] hover:bg-[#00e8bb]'
                  : 'border border-white/20 text-white hover:border-white/40'}`}
              >
                {loading === p.priceKey ? 'Redirecting...' : 'Get started'}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, ease: 'easeOut' }}
          className="text-center mt-16"
        >
          <p className="text-[#555] text-sm">All plans include a free tier — 10 enrichments/month, no credit card required.</p>
          <p className="text-[#444] text-xs mt-2"> Payments processed securely by Stripe. Cancel anytime.</p>
        </motion.div>
      </div>
    </div>
  )
}
