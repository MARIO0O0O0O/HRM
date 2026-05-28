import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] text-zinc-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left Side: Brand & Copyright */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold tracking-wider text-zinc-400">
            M.E. HR Solutions
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            &copy; {currentYear} M.E. HR Solutions. All rights reserved.
          </p>
        </div>

        {/* Right Side: Legal Disclaimers & Contact */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-xs font-medium">
          <Link href="/legal/disclaimer" className="hover:text-zinc-300 transition-colors">
            Disclaimer
          </Link>
          <Link href="/legal/privacy" className="hover:text-zinc-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-zinc-300 transition-colors">
            Contact
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-white/5 text-center">
        <p className="text-[10px] text-zinc-700 leading-relaxed max-w-2xl mx-auto">
          Disclaimer: M.E. HR Solutions provides expert HR compliance consulting and automated AI tooling. We do not provide legal representation or legal advice. All content, recommendations, and AI-generated documents are for general guidance and business management purposes only.
        </p>
      </div>
    </footer>
  )
}
