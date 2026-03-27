'use client'
import { useState } from 'react'
import Link from 'next/link'

interface EnrichmentResult {
  email: string | null
  name: string | null
  company: string | null
  success: boolean
  freshness_timestamp: string
  score?: number
  message?: string
}

const MOCK_USER = { email: 'you@example.com', plan: 'starter', used: 23, limit: 500 }

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<EnrichmentResult[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleEnrich = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })
      const data: EnrichmentResult = await res.json()
      setResults(prev => [data, ...prev])
      setEmail('')
    } finally {
      setLoading(false)
    }
  }

  const copyResult = (r: EnrichmentResult) => {
    navigator.clipboard.writeText(JSON.stringify(r, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-white">LeadLoop</span>
          <span className="text-sm text-[#888]">{MOCK_USER.email}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrich form */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Enrich a lead</h2>
              <form onSubmit={handleEnrich} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="colin@acme.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#555] outline-none focus:border-[#00d4aa] transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00d4aa] text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold hover:bg-[#00e8bb] transition disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Enrich'}
                </button>
              </form>
              <p className="text-xs text-[#555] mt-3">Verified results count against your plan. Failed lookups are free.</p>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Results</h2>
                  <div className="flex gap-4 text-sm">
                    <span className="text-[#00d4aa]">✓ {successCount} verified</span>
                    <span className="text-red-400">✗ {failCount} failed</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {results.map((r, i) => (
                    <div key={i} className={`rounded-xl border p-4 flex items-start justify-between ${r.success ? 'border-[#00d4aa]/20 bg-[#00d4aa]/5' : 'border-red-500/20 bg-red-500/5'}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold text-white">{r.email || '(no email)'}</span>
                          {r.score && (
                            <span className="text-xs bg-[#00d4aa]/20 text-[#00d4aa] px-2 py-0.5 rounded-full">{r.score}%</span>
                          )}
                        </div>
                        <div className="text-sm text-[#888]">
                          {r.company && <span>Company: {r.company} · </span>}
                          Freshness: {new Date(r.freshness_timestamp).toLocaleString()}
                          {!r.success && <span className="text-red-400 ml-2">Not verified — free</span>}
                        </div>
                      </div>
                      <button onClick={() => copyResult(r)} className="text-xs text-[#555] hover:text-white ml-4">
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Usage this month</h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#888]">{successCount} verified</span>
                  <span className="text-[#555]">/ {MOCK_USER.limit}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#00d4aa] h-2 rounded-full transition-all" style={{ width: `${Math.min((successCount / MOCK_USER.limit) * 100, 100)}%` }} />
                </div>
              </div>
              <p className="text-xs text-[#555]">Plan: <span className="text-white capitalize">{MOCK_USER.plan}</span></p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Plan features</h3>
              <ul className="space-y-2 text-sm text-[#888]">
                <li>· {MOCK_USER.limit} enrichments/mo</li>
                <li>· Freshness timestamp</li>
                <li>· API access</li>
                <li>· CSV import/export</li>
              </ul>
              <Link href="/pricing" className="block text-center mt-4 py-2 border border-[#00d4aa] text-[#00d4aa] rounded-xl text-sm font-semibold hover:bg-[#00d4aa] hover:text-[#0a0a0a] transition">
                Upgrade plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
