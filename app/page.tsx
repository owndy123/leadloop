import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-white">LeadLoop</div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-[#888] hover:text-white transition-colors">Sign in</Link>
          <Link href="/signup" className="text-sm bg-[#00d4aa] text-[#0a0a0a] px-4 py-2 font-medium hover:bg-[#00e8bb] transition-colors">
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
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

      {/* The Problem */}
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
                No competitor shows you when data was last verified. You fly blind and find out an email bounced only when your campaign fails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-12">How it works</p>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { n: '01', title: 'Paste your leads', desc: 'Upload a CSV or enter emails one by one. We handle the rest.' },
              { n: '02', title: 'We verify in real-time', desc: 'MX check, SMTP verify, public signals — every result timestamped.' },
              { n: '03', title: 'Pay only on success', desc: 'Verified data counts against your plan. Failed lookups are free.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="border-t border-[#1a1a1a] pt-6">
                <span className="text-xs text-[#00d4aa] font-mono">{n}</span>
                <h3 className="text-base font-semibold text-white mt-2 mb-2">{title}</h3>
                <p className="text-sm text-[#888]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we're different */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-12">Why we&apos;re different</p>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="border-t border-[#1a1a1a] pt-6">
              <h3 className="text-base font-semibold text-white mb-2">Freshness timestamp on every result</h3>
              <p className="text-sm text-[#888]">Every enrichment response tells you exactly when the data was last verified. No more guessing if that email is still valid.</p>
            </div>
            <div className="border-t border-[#1a1a1a] pt-6">
              <h3 className="text-base font-semibold text-white mb-2">Success-only billing</h3>
              <p className="text-sm text-[#888]">You pay only when enrichment returns verified data. Failed lookups cost nothing. That&apos;s the model.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[#1a1a1a] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[#555] mb-12">Pricing</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', count: '500', desc: 'For freelancers and solo outbound.' },
              { name: 'Pro', price: '$79', count: '2,000', desc: 'For growing sales teams.', highlight: true },
              { name: 'Scale', price: '$199', count: '8,000', desc: 'For high-volume operations.' },
            ].map(({ name, price, count, desc, highlight }) => (
              <div key={name} className={`rounded-2xl p-8 ${highlight ? 'border border-[#00d4aa]' : 'border border-white/10'}`}>
                <div className="text-sm font-semibold text-[#555] uppercase tracking-wide mb-2">{name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold text-white">{price}</span>
                  <span className="text-[#555]">/mo</span>
                </div>
                <div className="text-xl font-semibold text-[#00d4aa] mb-2">{count} enrichments</div>
                <p className="text-sm text-[#888] mb-6">{desc}</p>
                <Link href="/pricing" className={`block text-center py-3 rounded-xl font-semibold transition ${highlight ? 'bg-[#00d4aa] text-[#0a0a0a] hover:bg-[#00e8bb]' : 'border border-white/20 text-white hover:border-white/40'}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[#555] text-sm mt-8">All plans include a free tier — 10 enrichments/month, no credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-[#555] text-sm">
          LeadLoop — Pay only for verified leads.
        </div>
      </footer>
    </div>
  )
}
