export default function ContactPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-zinc-100 font-sans text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Get in Touch
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-lg">
        Have questions about California labor compliance or handbook setup? We are here to help.
      </p>
      
      <div className="mt-8 bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md text-left flex flex-col gap-4">
        <div>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</span>
          <p className="text-sm font-semibold text-zinc-200 mt-1 select-all">mario_espindola@outlook.com</p>
        </div>
        <div className="border-t border-white/5 pt-4">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Phone</span>
          <p className="text-sm font-semibold text-zinc-200 mt-1 select-all">626-999-6239</p>
        </div>
      </div>
    </div>
  )
}
