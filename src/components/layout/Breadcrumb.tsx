'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  /**
   * Optional custom breadcrumb items. If not provided, it will be automatically
   * generated from the current pathname.
   */
  items?: BreadcrumbItem[]
  /**
   * Optional classes for the container
   */
  className?: string
}

const segmentLabelMap: Record<string, string> = {
  services: 'Services',
  blog: 'Blog',
  contact: 'Contact',
  portal: 'Client Portal',
  book: 'Book Consultation',
  auth: 'Authentication',
  login: 'Sign In',
  callback: 'Callback',
  spokes: 'Service Offerings',
  programs: 'Programs',
}

export default function Breadcrumb({ items: customItems, className }: BreadcrumbProps) {
  const pathname = usePathname()

  // Generate breadcrumb items from the path if custom items are not provided
  const items = customItems || (() => {
    if (!pathname) return []
    const segments = pathname.split('/').filter(Boolean)
    
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      
      // Determine label: map custom name, or format slug
      let label = segmentLabelMap[segment] || segment
      
      // If label is not explicitly mapped, format it (replace hyphens and capitalize)
      if (!segmentLabelMap[segment]) {
        label = segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }

      return { label, href }
    })
  })()

  if (pathname === '/' && !customItems) {
    return null // Don't show breadcrumb on home page unless custom items are provided
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1.5 text-xs sm:text-sm text-zinc-500 font-medium px-4 py-3 bg-zinc-900/20 backdrop-blur-sm border border-white/5 rounded-lg w-fit transition-all duration-300 hover:border-white/10",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-zinc-200 transition-colors text-zinc-500"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
            {isLast ? (
              <span className="text-zinc-300 font-semibold truncate max-w-[180px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-zinc-200 transition-colors truncate max-w-[120px] sm:max-w-48"
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
