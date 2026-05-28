import PaymentOptions from '@/components/payments/PaymentOptions'

export default function PortalPage() {
  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Client Compliance Portal
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Secure billing and compliance resources for registered clients.
          </p>
        </div>

        {/* Embedded Payment Options Component */}
        <PaymentOptions />
      </div>
    </div>
  )
}
