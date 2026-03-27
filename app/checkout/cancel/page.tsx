import Link from 'next/link'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">×</div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment cancelled</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          No charge was made. You can try again whenever you're ready.
        </p>
        <Link href="/pricing" className="border border-slate-700 text-white px-8 py-3 font-semibold hover:border-slate-500">
          Back to pricing
        </Link>
      </div>
    </div>
  )
}
