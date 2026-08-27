import type { Metadata } from 'next'
import { Accessibility } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Accessibility Statement — CalBizHR | California HR Compliance',
  description: 'CalBizHR accessibility statement — our commitment to an accessible website consistent with WCAG 2.1 AA guidelines.',
}

export default function AccessibilityPage() {
  const lastUpdated = 'August 2026'

  return (
    <div className="bg-[#1A2D4D] text-zinc-100 min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[#B5933C]/10 border border-[#B5933C]/30 flex items-center justify-center">
            <Accessibility className="h-5 w-5 text-[#B5933C]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-zinc-100">Accessibility Statement</h1>
            <p className="text-xs text-zinc-400 font-mono">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-zinc-300 leading-relaxed font-sans">
          <div className="bg-[#0f1c32] border border-[#B5933C]/20 rounded-2xl p-5 text-sm">
            <p>
              CalBizHR is committed to ensuring digital accessibility for people of all abilities. We
              are actively working to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
              across this site.
            </p>
          </div>

          <section>
            <h2 className="text-lg font-serif font-bold text-white mb-2">Our Commitment</h2>
            <p>
              We continually review and improve the usability of this site for visitors using assistive
              technologies, including screen readers, keyboard-only navigation, and voice control
              software. This includes attention to color contrast, focus states, semantic HTML structure,
              and alternative text for meaningful images.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-white mb-2">Ongoing Efforts</h2>
            <p>
              Accessibility is an ongoing effort. As we add new tools, calculators, and content to this
              site, we test for keyboard navigability, screen-reader compatibility, and adequate contrast
              before publishing. Interactive components (carousels, drawers, forms) are built to respect
              reduced-motion preferences and remain fully operable via keyboard.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-serif font-bold text-white mb-2">Feedback</h2>
            <p>
              If you encounter any barrier to accessing content or functionality on this site, please
              contact us at{' '}
              <a href="tel:6267082220" className="text-[#B5933C] hover:underline">
                626-708-2220
              </a>{' '}
              or through our{' '}
              <a href="/contact" className="text-[#B5933C] hover:underline">
                contact page
              </a>
              . We take accessibility feedback seriously and will work to address reported issues
              promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
