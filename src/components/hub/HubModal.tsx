'use client'

import { useEffect, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HubModalProps {
  title: string
  subtitle?: string
  badge?: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export default function HubModal({
  title,
  subtitle,
  badge,
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-2xl',
}: HubModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content Window */}
      <div
        className={cn(
          'relative w-full bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[85vh] sm:max-h-[88vh]',
          maxWidth
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-[#161616] shrink-0">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
                {title}
              </h2>
              {badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  )
}
