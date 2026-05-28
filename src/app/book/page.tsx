export default function BookPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-zinc-100 font-sans text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Book a Consultation
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-lg">
        Schedule a 30-minute introductory compliance consultation with M.E. HR Solutions.
      </p>
      <div className="mt-8 text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-[#111111] border border-white/5 px-4 py-2 rounded-full">
        Booking calendar embedding soon
      </div>
    </div>
  )
}
