import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadLoop — Pay Only for Verified Leads',
  description: 'AI-powered lead enrichment with success-only billing. Never pay for stale data or failed lookups.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
