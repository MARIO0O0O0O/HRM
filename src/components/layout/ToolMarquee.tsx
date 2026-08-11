import Link from 'next/link'
import { marqueeCards, type MarqueeCard } from '@/data/marquee'

const kindStyles: Record<MarqueeCard['kind'], string> = {
  'Free Tool': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Service: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  Toolkit: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
}

function Card({ card }: { card: MarqueeCard }) {
  return (
    <Link
      href={card.href}
      className="block bg-[#111111] border border-white/10 hover:border-white/25 hover:bg-white/[0.04] rounded-xl px-4 py-3 mb-3 transition-colors"
    >
      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${kindStyles[card.kind]}`}>
        {card.kind}
      </span>
      <p className="text-sm font-semibold text-zinc-200 leading-snug">{card.label}</p>
    </Link>
  )
}

/**
 * Continuous vertical marquee of every free tool and service, split across
 * 3 columns (outer columns scroll up, middle scrolls down). Every card is a
 * real, always-present, keyboard-focusable link -- the CSS animation moves
 * the *visual* position only, so screen readers and keyboard nav are
 * completely unaffected regardless of animation state.
 *
 * Pauses on hover/focus and fully respects prefers-reduced-motion (see
 * globals.css), addressing the two standard accessibility objections to
 * auto-moving content (WCAG 2.2.2).
 */
export default function ToolMarquee() {
  // Distribute cards round-robin across 3 columns
  const columns: MarqueeCard[][] = [[], [], []]
  marqueeCards.forEach((card, i) => columns[i % 3].push(card))

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[420px] overflow-hidden relative"
      role="region"
      aria-label="All tools and services"
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

      {columns.map((col, colIdx) => (
        <div key={colIdx} className="overflow-hidden">
          <div className={colIdx === 1 ? 'marquee-col-reverse' : 'marquee-col'}>
            {/* Render the column twice back-to-back for a seamless loop */}
            {[...col, ...col].map((card, i) => (
              <Card key={`${card.href}-${i}`} card={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
