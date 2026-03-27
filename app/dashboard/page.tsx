'use client'
import { useState } from 'react'

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
  email: string
}

// Mock user for MVP (replace with real auth)
const MOCK_USER_ID = 'demo-user'

function formatFreshness(ts: string): string {
  const date = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [results, setResults] = useState<EnrichmentResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usage] = useState<UsageStats>({
    used: 47,
    limit: 500,
    plan: 'Starter',
    email: 'colin@leadloop.io',
  })

  const successCount = results.filter((r) => r.success).length
  const failCount = results.filter((r) => !r.success).length
  const usagePercent = Math.min((usage.used / usage.limit) * 100, 100)

  const handleEnrich = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), userId: MOCK_USER_ID }),
      })
      const data: EnrichmentResult = await res.json()
      if (!res.ok) throw new Error(data.error || data.message || 'Enrichment failed')

      setResults((prev) => [data, ...prev])
      setEmail('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvFile) return

    setLoading(true)
    setError('')

    try {
      const text = await csvFile.text()
      const lines = text.split('\n').filter((l) => l.trim())
      // Skip header row if it looks like a header
      const emails = lines
        .slice(lines[0]?.toLowerCase().includes('email') ? 1 : 0)
        .map((l) => l.split(',')[0].trim().replace(/"/g, ''))
        .filter((e) => e && e.includes('@'))

      if (emails.length === 0) throw new Error('No valid emails found in CSV')

      // Process first 5 emails as demo
      for (const em of emails.slice(0, 5)) {
        const res = await fetch('/api/enrich', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: em, userId: MOCK_USER_ID }),
        })
        const data: EnrichmentResult = await res.json()
        if (res.ok) {
          setResults((prev) => [data, ...prev])
        }
      }
      setCsvFile(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#00d4aa] flex items-center justify-center">
              <span className="text-black font-bold text-sm">L</span>
            </div>
            <span className="text-lg font-semibold">LeadLoop</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/60">{usage.email}</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {usage.plan}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Usage Banner */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Monthly usage</span>
              <span className="text-sm font-medium">
                <span className="text-[#00d4aa]">{usage.used}</span>
                <span className="text-white/40"> / {usage.limit}</span>
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${usagePercent}%`,
                  background: 'linear-gradient(90deg, #00d4aa, #00e5bb)',
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00d4aa]" />
              <span className="text-white/60">{successCount} verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-white/60">{failCount} failed</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form + Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrichment Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold mb-4">Enrich a lead</h2>
              <form onSubmit={handleEnrich} className="flex gap-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colin@acme.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-[#00d4aa] transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00d4aa] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#00e5bb] transition disabled:opacity-50 text-sm"
                >
                  {loading ? 'Checking...' : 'Enrich'}
                </button>
              </form>

              {/* CSV Upload */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-white/40 mb-2">Or upload a CSV</p>
                <form onSubmit={handleCsvUpload} className="flex gap-3">
                  <label className="flex-1 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition">
                    <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-white/60">
                      {csvFile ? csvFile.name : 'Choose CSV file...'}
                    </span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading || !csvFile}
                    className="bg-white/10 border border-white/10 text-white font-medium px-5 py-3 rounded-xl hover:bg-white/20 transition disabled:opacity-40 text-sm"
                  >
                    Upload CSV
                  </button>
                </form>
                <p className="text-xs text-white/30 mt-2">
                  CSV should have an &ldquo;email&rdquo; column. We&apos;ll process up to 5 emails in demo mode.
                </p>
              </div>

              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}
            </div>

            {/* Results Table */}
            {results.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-base font-semibold">Enrichment Results</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#00d4aa]">{successCount} verified</span>
                    <span className="text-red-400">{failCount} failed</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Freshness</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                          <td className="px-6 py-4 font-mono text-sm">{result.email || '(none)'}</td>
                          <td className="px-6 py-4">
                            {result.success ? (
                              <span className="inline-flex items-center gap-1.5 text-[#00d4aa] text-xs font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-red-400 text-xs font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {result.score ? (
                              <span className={`font-medium ${
                                result.score >= 80 ? 'text-[#00d4aa]' :
                                result.score >= 50 ? 'text-yellow-400' :
                                'text-white/40'
                              }`}>
                                {result.score}%
                              </span>
                            ) : (
                              <span className="text-white/20">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-white/60 text-xs">
                            {formatFreshness(result.freshness_timestamp)}
                          </td>
                          <td className="px-6 py-4 text-white/40 text-xs">
                            {formatTime(result.freshness_timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4">This month</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">Verified</span>
                    <span className="text-[#00d4aa] font-semibold">{successCount}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1">
                    <div
                      className="h-1 rounded-full bg-[#00d4aa]"
                      style={{ width: `${(successCount / usage.limit) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">Failed</span>
                    <span className="text-red-400 font-semibold">{failCount}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/30 mt-4">
                Failed lookups don&apos;t count against your limit.
              </p>
            </div>

            {/* Plan Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Plan: {usage.plan}</h3>
                <span className="text-xs text-[#00d4aa]">Active</span>
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {usage.limit} successful enrichments/mo
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Freshness timestamp on every result
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Success-only billing
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full API access
                </li>
              </ul>
            </div>

            {/* Quick tip */}
            <div className="bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-2xl p-5">
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="text-[#00d4aa] font-medium">Tip:</span> Upload a CSV with an &ldquo;email&rdquo; column to bulk enrich up to 5 leads at once.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
