import Link from 'next/link'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 text-[#00d4aa]">✓</div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment successful</h1>
        <p className="text-[#888] mb-8 max-w-md">Your subscription is active. You can now access the dashboard and start enriching leads.</p>
        <Link href="/dashboard" className="bg-[#00d4aa] text-[#0a0a0a] px-8 py-3 font-semibold hover:bg-[#00e8bb] transition">
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
