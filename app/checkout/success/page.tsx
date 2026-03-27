import Link from 'next/link'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment successful</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          Your subscription is active. You can now access the dashboard and start enriching leads.
        </p>
        <Link href="/dashboard" className="bg-cyan-500 text-black px-8 py-3 font-semibold hover:bg-cyan-400">
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
