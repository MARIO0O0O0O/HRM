import Link from 'next/link'
import ToolMarquee from './ToolMarquee'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] text-zinc-500">

      {/* Everything at a glance -- every free tool and service, one place */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4 text-center">
          Everything On This Site, At a Glance
        </p>
        <ToolMarquee />
      </div>

      {/* Main footer row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-start gap-8">

        {/* Brand */}
        <div>
          <p className="text-sm font-bold tracking-wider text-zinc-400">
            BizHR · M.E. Consulting
          </p>
          <p className="text-xs text-zinc-600 mt-1">
            California HR Compliance &amp; AI-Powered HR Consulting
          </p>
          <p className="text-xs text-zinc-700 mt-1">
            Los Angeles &amp; San Gabriel Valley, CA
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
          <Link href="/services" className="hover:text-zinc-300 transition-colors">Services</Link>
          <Link href="/tools" className="hover:text-zinc-300 transition-colors">Toolkits</Link>
          <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/paga-calculator" className="hover:text-zinc-300 transition-colors">PAGA Calculator</Link>
          <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
          <Link href="/portal" className="hover:text-zinc-300 transition-colors">Client Portal</Link>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium">
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          <Link href="/accessibility" className="hover:text-zinc-300 transition-colors">Accessibility</Link>
        </div>
      </div>

      {/* Legal disclaimer bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-3">

          <p className="text-[11px] text-zinc-700 leading-relaxed">
            <strong className="text-zinc-600">Not a Law Firm.</strong>{' '}
            BizHR and M.E. Consulting provide HR compliance guidance and policy drafting services.
            Content on this site — including all tools, documents, and calculators — constitutes
            general information only and does not constitute legal advice. No attorney-client
            relationship is formed by use of this site or its tools. For advice specific to your
            situation, consult a licensed California employment attorney.
          </p>

          <p className="text-[11px] text-zinc-700 leading-relaxed">
            <strong className="text-zinc-600">AI-Assisted Tools.</strong>{' '}
            Some tools on this platform use AI to generate draft documents. All AI output requires
            human review before implementation. AI-generated content does not constitute legal advice.
          </p>

          <p className="text-[11px] text-zinc-700 leading-relaxed">
            <strong className="text-zinc-600">Cannabis Industry Notice.</strong>{' '}
            California cannabis employers are subject to both California Labor Code and complex
            federal/state intersections. HR guidance provided does not address federal contractor
            compliance, DEA Schedule I conflicts, or banking/payment regulations. Consult specialized
            cannabis employment counsel for federal-nexus issues.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/5">
            <p className="text-[10px] text-zinc-800">
              &copy; {currentYear} M.E. Consulting / BizHR. All rights reserved. California HR Compliance &amp; AI Consulting.
            </p>
            <p className="text-[10px] text-zinc-800">
              Content accurate as of 2026 · Not a substitute for legal counsel
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
