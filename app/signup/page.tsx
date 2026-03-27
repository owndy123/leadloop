'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')
      
      // Check if there's a plan param to redirect to checkout
      const params = new URLSearchParams(window.location.search)
      const plan = params.get('plan')
      
      if (plan) {
        // Create checkout session for the plan
        const checkoutRes = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ priceKey: plan, userId: data.user?.id, userEmail: email })
        })
        const checkoutData = await checkoutRes.json()
        if (checkoutData.url) {
          window.location.href = checkoutData.url
          return
        }
      }
      
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-white font-bold text-2xl">LeadLoop</Link>
          <h1 className="text-xl font-semibold text-white mt-4">Create your account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 outline-none focus:border-[#00d4aa] transition"
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 outline-none focus:border-[#00d4aa] transition"
              placeholder="Create password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00d4aa] text-black py-3 rounded-xl font-semibold hover:bg-[#00e8bb] transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#00d4aa] hover:underline">Sign in</Link>
        </p>

        <p className="text-center text-slate-600 text-xs mt-4">
          10 free enrichments on signup. No credit card required.
        </p>
      </div>
    </div>
  )
}
