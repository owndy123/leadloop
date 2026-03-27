import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Nav ── */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-white">LeadLoop</div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-[#888] hover:text-white transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="text-sm bg-[#00d4aa] text-[#0a0a0a] px-4 py-2 font-medium hover:bg-[#00e8bb] transition-colors">
            Start free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-32 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          Pay only for<br />
          <span className="text-[#00d4aa]">verified leads.</span>
        </h1>
        <p className="text-lg text-[#888] max-w-xl mx-auto mb-10">
          We timestamp every result. We charge only on success.
        </p>
        <Link href="/signup" className="inline-block text-base bg-[#00d4aa] text-[#0a0a0a] px-8 py-4 font-semibold hover:bg-[#00e8bb] transition-colors">
          Start free — 10 enrichments
        </Link>
      </section>

      {/* ── The Problem ── */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-8">The problem</p>
          <div className="grid md:grid-cols-3 gap-0">
            <div className="border-t border-[#1a1a1a] pt-6">
              <p className="text-base text-[#ccc] leading-relaxed">
                30–40% of B2B emails go stale every year. Most enrichment tools sell you that stale data and still charge you for it.
              </p>
            </div>
            <div className="border-t border-[#1a1a1a] pt-6">
              <p className="text-base text-[#ccc] leading-relaxed">
                You pay per lookup — not per result. So you&apos;re effectively paying for the privilege of finding out an email doesn&apos;t exist.
              </p>
            </div>
            <div className="border-t border-[#1a1a1a] pt-6">
              <p className="text-base text-[#ccc] leading-relaxed">
                There&apos;s no way to know when data was last verified. You&apos;re flying blind on outreach that depends on accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-12">How it works</p>
          <div className="grid md:grid-cols-3 gap-px bg-[#1a1a1a]">
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs text-[#555] mb-4 font-mono">01</div>
              <h3 className="text-base font-semibold text-white mb-3">Submit your leads</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Upload a CSV or send an email list via API. One required field: email address.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs text-[#555] mb-4 font-mono">02</div>
              <h3 className="text-base font-semibold text-white mb-3">We verify in real-time</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                MX records, SMTP checks, and public signals. Every result gets a freshness timestamp.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs text-[#555] mb-4 font-mono">03</div>
              <h3 className="text-base font-semibold text-white mb-3">You pay only on success</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Failed lookups are free. Only verified results count against your plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why we're different ── */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-12">Why we&apos;re different</p>
          <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
            <div className="bg-[#0a0a0a] p-8">
              <h3 className="text-base font-semibold text-white mb-3">
                Freshness timestamp on every result
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Every enriched record includes the exact timestamp of when it was last verified. No guessing. No stale guesses.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-8">
              <h3 className="text-base font-semibold text-white mb-3">
                Success-only billing
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                You are charged only when enrichment returns verified data. Failed lookups are always free and never counted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-4">Pricing</p>
          <p className="text-sm text-[#555] mb-12">Pay per successful enrichment. Free lookups don&apos;t count.</p>

          <div className="grid md:grid-cols-3 gap-px bg-[#1a1a1a]">
            {/* Starter */}
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs uppercase tracking-widest text-[#555] mb-4">Starter</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-[#555]">/mo</span>
              </div>
              <div className="text-sm text-[#00d4aa] mb-6">500 enrichments</div>
              <ul className="text-sm text-[#888] space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>REST API access</li>
                <li>CSV import / export</li>
              </ul>
              <Link href="/pricing" className="block text-center text-sm text-[#0a0a0a] bg-[#00d4aa] px-6 py-3 font-medium hover:bg-[#00e8bb] transition-colors">
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs uppercase tracking-widest text-[#00d4aa] mb-4">Pro</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">$79</span>
                <span className="text-[#555]">/mo</span>
              </div>
              <div className="text-sm text-[#00d4aa] mb-6">2,000 enrichments</div>
              <ul className="text-sm text-[#888] space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>REST API access</li>
                <li>CSV import / export</li>
                <li>Priority queue</li>
              </ul>
              <Link href="/pricing" className="block text-center text-sm text-[#0a0a0a] bg-[#00d4aa] px-6 py-3 font-medium hover:bg-[#00e8bb] transition-colors">
                Get started
              </Link>
            </div>

            {/* Scale */}
            <div className="bg-[#0a0a0a] p-8">
              <div className="text-xs uppercase tracking-widest text-[#555] mb-4">Scale</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-[#555]">/mo</span>
              </div>
              <div className="text-sm text-[#00d4aa] mb-6">8,000 enrichments</div>
              <ul className="text-sm text-[#888] space-y-2 mb-8">
                <li>Success-only billing</li>
                <li>Freshness timestamp</li>
                <li>REST API access</li>
                <li>CSV import / export</li>
                <li>Priority queue</li>
                <li>Dedicated support</li>
              </ul>
              <Link href="/pricing" className="block text-center text-sm text-[#0a0a0a] bg-[#00d4aa] px-6 py-3 font-medium hover:bg-[#00e8bb] transition-colors">
                Get started
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#555] mt-8 text-center">
            10 free enrichments per month — no credit card required.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="text-sm font-semibold text-white">LeadLoop</div>
          <div className="flex items-center gap-6">
            <a href="/api/docs" className="text-xs text-[#555] hover:text-white transition-colors">API docs</a>
            <a href="mailto:hello@leadloop.io" className="text-xs text-[#555] hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-xs text-[#555]">© 2025 LeadLoop</div>
        </div>
      </footer>

    </div>
  )
}
