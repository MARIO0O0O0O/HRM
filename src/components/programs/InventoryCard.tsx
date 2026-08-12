import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

interface InventoryCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  items: string[]
}

export default function InventoryCard({ href, icon: Icon, title, description, items }: InventoryCardProps) {
  return (
    <Link
      href={href}
      className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-4 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all mt-2" />
      </div>
      <div>
        <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{description}</p>
      </div>
      <ul className="flex flex-col gap-1.5 pt-3 border-t border-white/5">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="text-xs text-zinc-500 flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-indigo-500/60 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
        {items.length > 4 && (
          <li className="text-xs text-zinc-600 pl-3">+ {items.length - 4} more</li>
        )}
      </ul>
    </Link>
  )
}
