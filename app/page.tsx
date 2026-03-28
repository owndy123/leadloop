'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
      >
        <div className="text-lg font-semibold tracking-tight">LeadLoop</div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-[#888] hover:text-white transition-colors">Sign in</Link>
          <Link href="/signup" className="text-sm bg-[#00d4aa] text-[#0a0a0a] px-4 py-2 font-medium hover:bg-[#00e8bb] transition-colors">
            Start free
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[#00d4aa] text-sm px-4 py-2 rounded-full mb-10"
        >
          <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full" />
          Success-only billing — pay only when we find verified data
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-8"
        >
          Pay only for<br />
          <span className="text-[#00d4aa]">verified leads.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="text-lg text-[#888] max-w-xl mx-auto mb-12"
        >
          We timestamp every result. We charge only on success.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/signup" className="inline-block text-base bg-[#00d4aa] text-[#0a0a0a] px-8 py-4 font-semibold hover:bg-[#00e8bb] transition-colors">
            Start free — 10 enrichments
          </Link>
          <Link href="/pricing" className="text-base text-[#888] hover:text-white transition-colors px-4 py-4">
            View pricing →
          </Link>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="border-t border-[#1a1a1a] py-32">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn><p className="text-xs uppercase tracking-widest text-[#555] mb-12">The problem</p></FadeIn>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              '30–40% of B2B emails go stale every year. Most enrichment tools sell you that stale data and still charge you for it.',
              "You pay per lookup — not per result. So you're effectively paying for the privilege of finding out an email doesn't exist.",
              'No competitor shows you when data was last verified. You fly blind and find out an email bounced only when your campaign fails.'
            ].map((text, i) => (
              <FadeIn key={i} delay={i * 0.1} className="border-t border-[#1a1a1a] pt-8">
                <p className="text-base text-[#ccc] leading-relaxed">{text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#1a1a1a] py-32">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn><p className="text-xs uppercase tracking-widest text-[#555] mb-12">How it works</p></FadeIn>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { n: '01', title: 'Paste your leads', desc: 'Upload a CSV or enter emails one by one. We handle the rest.' },
              { n: '02', title: 'We verify in real-time', desc: 'MX check, SMTP verify, public signals — every result timestamped.' },
              { n: '03', title: 'Pay only on success', desc: 'Verified data counts against your plan. Failed lookups are free.' },
            ].map(({ n, title, desc }, i) => (
              <FadeIn key={n} delay={i * 0.12} className="border-t border-[#1a1a1a] pt-8">
                <span className="text-xs text-[#00d4aa] font-mono">{n}</span>
                <h3 className="text-base font-semibold text-white mt-3 mb-3">{title}</h3>
                <p className="text-sm text-[#888]">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="border-t border-[#1a1a1a] py-32">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn><p className="text-xs uppercase tracking-widest text-[#555] mb-12">Why we&apos;re different</p></FadeIn>
          <div className="grid md:grid-cols-2 gap-0">
            {[
              { title: 'Freshness timestamp on every result', desc: 'Every enrichment response tells you exactly when the data was last verified. No more guessing if that email is still valid.' },
              { title: 'Success-only billing', desc: "You pay only when enrichment returns verified data. Failed lookups cost nothing. That's the model." },
            ].map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1} className="border-t border-[#1a1a1a] pt-8">
                <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-[#888]">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[#1a1a1a] py-32">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-[#555] mb-4">Pricing</p>
            <h2 className="text-3xl font-bold text-white mb-4">Simple, honest.</h2>
            <p className="text-[#888] mb-16">You pay only for successful enrichments. Failed lookups are always free.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$29', count: '500', desc: 'For freelancers and solo outbound.', highlight: false },
              { name: 'Pro', price: '$79', count: '2,000', desc: 'For growing sales teams.', highlight: true },
              { name: 'Scale', price: '$199', count: '8,000', desc: 'For high-volume operations.', highlight: false },
            ].map(({ name, price, count, desc, highlight }, i) => (
              <FadeIn key={name} delay={i * 0.1} className={`rounded-2xl p-8 ${highlight ? 'border border-[#00d4aa]' : 'border border-white/10'}`}>
                <div className="text-sm font-semibold text-[#555] uppercase tracking-wide mb-3">{name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold text-white">{price}</span>
                  <span className="text-[#555]">/mo</span>
                </div>
                <div className="text-xl font-semibold text-[#00d4aa] mb-2">{count} enrichments</div>
                <p className="text-sm text-[#888] mb-8">{desc}</p>
                <Link href="/pricing" className={`block text-center py-3 rounded-xl font-semibold transition ${highlight ? 'bg-[#00d4aa] text-[#0a0a0a] hover:bg-[#00e8bb]' : 'border border-white/20 text-white hover:border-white/40'}`}>
                  Get started
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn><p className="text-center text-[#555] text-sm mt-12">All plans include a free tier — 10 enrichments/month, no credit card required.</p></FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#1a1a1a] py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to stop paying for stale data?</h2>
            <p className="text-[#888] mb-10">Join the founders and sales teams who are done subsidizing bad data.</p>
            <Link href="/signup" className="inline-block text-base bg-[#00d4aa] text-[#0a0a0a] px-10 py-4 font-semibold hover:bg-[#00e8bb] transition-colors">
              Start free — 10 enrichments
            </Link>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-[#555] text-sm">
          LeadLoop — Pay only for verified leads.
        </div>
      </footer>
    </div>
  )
}
