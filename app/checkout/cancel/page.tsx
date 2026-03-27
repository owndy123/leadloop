import Link from 'next/link'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 text-red-400">×</div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment cancelled</h1>
        <p className="text-[#888] mb-8 max-w-md">No charge was made. You can try again whenever you&apos;re ready.</p>
        <Link href="/pricing" className="border border-white/20 text-white px-8 py-3 font-semibold hover:border-white/40 transition">
          Back to pricing
        </Link>
      </div>
    </div>
  )
}
