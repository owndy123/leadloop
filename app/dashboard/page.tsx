'use client'
import { useState, useEffect } from 'react'

interface EnrichmentResult {
  email: string | null
  name: string | null
  title: string | null
  company: string | null
  phone: string | null
  linkedin: string | null
  success: boolean
  freshness_timestamp: string
  score?: number
  message?: string
  error?: string
}

interface UsageStats {
  used: number
  limit: number
  plan: string
}

// Mock user for MVP (replace with real auth check)
const MOCK_USER_ID = 'demo-user'

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<EnrichmentResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usage] = useState<UsageStats>({ used: 0, limit: 500, plan: 'Starter' })
  const [copied, setCopied] = useState(false)

  const handleEnrich = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), userId: MOCK_USER_ID })
      })
      const data: EnrichmentResult = await res.json()
      if (!res.ok) throw new Error(data.error || data.message || 'Enrichment failed')

      setResults(prev => [data, ...prev])
      setEmail('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyResult = (result: EnrichmentResult) => {
    const text = JSON.stringify(result, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">LeadLoop</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {usage.plan} plan
            </span>
            <div className="text-sm">
              <span className="font-semibold text-slate-900">{usage.used}</span>
              <span className="text-slate-400"> / {usage.limit} enrichments</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Enrichment form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Enrich a lead</h2>
              <form onSubmit={handleEnrich} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colin@acme.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Enrich'}
                </button>
              </form>
              {error && (
                <div className="mt-3 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
              )}
              <p className="text-xs text-slate-400 mt-3">
                We'll verify the email and return available data with a freshness timestamp.
              </p>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Results</h2>
                  <div className="flex gap-3 text-sm">
                    <span className="text-green-600">✓ {successCount} verified</span>
                    <span className="text-red-500">✗ {failCount} failed</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {results.map((result, i) => (
                    <div key={i} className={`rounded-xl border p-4 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-semibold">{result.email || '(no email)'}</span>
                            {result.score && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {result.score}% confidence
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-600">
                            {result.name && <span>Name: {result.name} · </span>}
                            {result.company && <span>Company: {result.company} · </span>}
                            {result.title && <span>Title: {result.title}</span>}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Freshness: {new Date(result.freshness_timestamp).toLocaleString()}
                            {!result.success && ' · Not verified — not counted against usage'}
                          </div>
                        </div>
                        <button
                          onClick={() => copyResult(result)}
                          className="text-xs text-slate-400 hover:text-slate-600 ml-4"
                        >
                          {copied ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Stats sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Your usage this month</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">{successCount} successful</span>
                  <span className="text-slate-400">/ {usage.limit}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((successCount / usage.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Failed lookups don't count against your limit.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Plan: {usage.plan}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {usage.limit} successful enrichments/mo</li>
                <li>✓ Freshness timestamp on every result</li>
                <li>✓ Success-only billing</li>
                <li>✓ API access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
