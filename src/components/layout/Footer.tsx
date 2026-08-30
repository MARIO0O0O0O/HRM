import Link from 'next/link'
import ToolMarquee from './ToolMarquee'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[#B5933C]/20 bg-[#0f1c32] text-zinc-400">

      {/* Everything at a glance -- every free tool and service, one place */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#B5933C] mb-4 text-center">
          Everything On This Site, At a Glance
        </p>
        <ToolMarquee />
      </div>

      {/* Main footer row -- 4-column grid (2-col mobile, 4-col desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1 -- Brand */}
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <p className="text-base font-serif font-bold tracking-tight text-white">
            Cal<span className="text-[#B5933C]">BizHR</span>
          </p>
          <p className="text-xs font-sans text-zinc-400">
            California HR Compliance &amp; AI-Powered HR Consulting
          </p>
          <p className="text-xs font-sans text-zinc-500">
            Los Angeles &amp; San Gabriel Valley, CA
          </p>
          <a
            href="tel:6267082220"
            className="text-xs font-sans text-zinc-400 hover:text-[#B5933C] transition-colors block pt-1"
          >
            626-708-2220
          </a>
        </div>

        {/* Column 2 -- Explore */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] mb-3">
            Explore
          </h4>
          <div className="flex flex-col gap-2 text-xs font-sans font-medium text-zinc-400">
            <Link href="/spokes/safety-prevention" className="hover:text-[#B5933C] transition-colors">
              Safety &amp; Prevention
            </Link>
            <Link href="/spokes/wage-hour" className="hover:text-[#B5933C] transition-colors">
              Wage &amp; Hour
            </Link>
            <Link href="/spokes/lifecycle-admin" className="hover:text-[#B5933C] transition-colors">
              Lifecycle Admin
            </Link>
            <Link href="/library" className="hover:text-[#B5933C] transition-colors">
              Free Resources Library
            </Link>
            <Link href="/blog" className="hover:text-[#B5933C] transition-colors">
              Blog
            </Link>
          </div>
        </div>

        {/* Column 3 -- Company */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] mb-3">
            Company
          </h4>
          <div className="flex flex-col gap-2 text-xs font-sans font-medium text-zinc-400">
            <Link href="/about" className="hover:text-[#B5933C] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#B5933C] transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Column 4 -- Legal & Support */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#B5933C] mb-3">
            Legal &amp; Support
          </h4>
          <div className="flex flex-col gap-2 text-xs font-sans font-medium text-zinc-400">
            <Link href="/privacy" className="hover:text-[#B5933C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#B5933C] transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-[#B5933C] transition-colors">
              Accessibility
            </Link>
            <Link href="/support" className="hover:text-[#B5933C] transition-colors">
              Donate
            </Link>
          </div>
        </div>

      </div>

      {/* Legal disclaimer bar */}
      <div className="border-t border-[#B5933C]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-3">

          <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
            <strong className="text-[#B5933C]">Not a Law Firm.</strong>{' '}
            CalBizHR provides HR compliance guidance and policy drafting services.
            Content on this site — including all tools, documents, and calculators — constitutes
            general information only and does not constitute legal advice. No attorney-client
            relationship is formed by use of this site or its tools. For advice specific to your
            situation, consult a licensed California employment attorney.
          </p>

          <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
            <strong className="text-[#B5933C]">AI-Assisted Tools.</strong>{' '}
            Some tools on this platform use AI to generate draft documents. All AI output requires
            human review before implementation. AI-generated content does not constitute legal advice.
          </p>

          <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
            <strong className="text-[#B5933C]">Cannabis Industry Notice.</strong>{' '}
            California cannabis employers are subject to both California Labor Code and complex
            federal/state intersections. HR guidance provided does not address federal contractor
            compliance, DEA Schedule I conflicts, or banking/payment regulations. Consult specialized
            cannabis employment counsel for federal-nexus issues.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/5">
            <p className="text-[10px] font-sans text-zinc-500">
              &copy; {currentYear} CalBizHR. All rights reserved. California HR Compliance &amp; AI Consulting.
            </p>
            <p className="text-[10px] font-sans text-zinc-500">
              Content accurate as of 2026 · Not a substitute for legal counsel
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
