export default function BlogPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-zinc-100 font-sans text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        HR Insights & California Labor Updates
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-lg">
        Stay up-to-date with emerging regulations, sexual harassment prevention compliance, and handbook best practices.
      </p>
      <div className="mt-8 text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-[#111111] border border-white/5 px-4 py-2 rounded-full">
        Coming Soon
      </div>
    </div>
  )
}
