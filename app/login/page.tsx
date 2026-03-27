'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-white font-bold text-2xl">LeadLoop</Link>
          <h1 className="text-xl font-semibold text-white mt-4">Welcome back</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#555] outline-none focus:border-[#00d4aa] transition" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#555] outline-none focus:border-[#00d4aa] transition" />
          {error && <div className="text-red-400 text-sm px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#00d4aa] text-[#0a0a0a] py-3 rounded-xl font-semibold hover:bg-[#00e8bb] transition disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-[#555] text-sm mt-6">
          Don&apos;t have an account? <Link href="/signup" className="text-[#00d4aa] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
