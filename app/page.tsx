import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">LeadLoop</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">Sign in</Link>
            <Link href="/signup" className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Success-only billing — pay only when we find verified data
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Pay only for<br />
          <span className="text-blue-600">verified leads</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          AI-powered lead enrichment with a freshness timestamp on every result.
          Only pay for successful lookups. Failed enrichments are always free.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
            Start free — 10 enrichments
          </Link>
          <a href="#pricing" className="text-slate-600 px-6 py-4 text-lg">
            View pricing
          </a>
        </div>
      </section>

      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Paste your leads</h3>
              <p className="text-slate-600">Upload a CSV or paste a list of emails. One field required: email address.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">We verify in real-time</h3>
              <p className="text-slate-600">We check MX records, SMTP, and public signals to confirm each lead is accurate.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Pay only for success</h3>
              <p className="text-slate-600">Each verified result counts against your plan. Failed lookups are free and do not count.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Built different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Freshness timestamp on every result</h3>
              <p className="text-slate-600">Know exactly when each data point was last verified. No more guessing if that email is still valid.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Success-only billing</h3>
              <p className="text-slate-600">You are only charged when enrichment returns verified data. Failed lookups cost nothing.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No annual contracts</h3>
              <p className="text-slate-600">Month-to-month. Cancel anytime. We earn your business every single month.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">SMB-friendly pricing</h3>
              <p className="text-slate-600">Starting at $29 per month for 500 successful enrichments. No minimum commitments.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Simple, fair pricing</h2>
          <p className="text-slate-600 text-center mb-16">Pay per successful enrichment. Failed lookups are always free.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">Starter</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-slate-900">$29</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">500 enrichments</div>
              <p className="text-sm text-slate-600 mb-6">For freelancers and solo outbound.</p>
              <ul className="text-sm text-slate-600 space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>API access</li>
                <li>CSV import/export</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800">
                Start free
              </Link>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">Pro</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">2,000 enrichments</div>
              <p className="text-sm text-slate-400 mb-6">For growing sales teams.</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>API access</li>
                <li>CSV import/export</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-xl font-semibold bg-blue-500 text-white hover:bg-blue-400">
                Start free
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">Scale</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-slate-900">$199</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">8,000 enrichments</div>
              <p className="text-sm text-slate-600 mb-6">For high-volume operations.</p>
              <ul className="text-sm text-slate-600 space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>API access</li>
                <li>CSV import/export</li>
              </ul>
              <Link href="/signup" className="block text-center py-3 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800">
                Start free
              </Link>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">All plans include a free tier — 10 enrichments per month, no credit card required.</p>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-500 text-sm">
          <div className="text-xl font-bold text-slate-900 mb-4">LeadLoop</div>
          <p>Pay only for verified leads. Never pay for stale data.</p>
        </div>
      </footer>
    </div>
  )
}
