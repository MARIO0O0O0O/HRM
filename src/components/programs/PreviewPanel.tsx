'use client'

import Link from 'next/link'
import { ShieldCheck, ArrowRight, Clock, Users, FileText, Scale } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { type ProgramRecord } from '@/data/airtable-seed'

interface PreviewPanelProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  program: ProgramRecord | null
}

export default function PreviewPanel({ isOpen, onOpenChange, program }: PreviewPanelProps) {
  if (!program) return null

  const hubHref = `/programs/${program.code === 'HPP' ? 'harassment-prevention' : program.code.toLowerCase()}`

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-[#0a0a0a] border-l border-white/10 text-zinc-100 p-6 w-full sm:max-w-md flex flex-col justify-between overflow-y-auto">
        <div>
          <SheetHeader className="p-0 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              Program Overview
            </div>
            <SheetTitle className="text-xl font-bold text-zinc-100 text-left">
              {program.name}
            </SheetTitle>
            <SheetDescription className="text-xs text-zinc-400 text-left mt-1">
              {program.primaryStatute || program.governingLaw}
            </SheetDescription>
          </SheetHeader>

          {/* Description */}
          <div className="space-y-4 mb-6">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Key Figures Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                <Users className="h-3.5 w-3.5 text-indigo-400" />
                Applies To
              </div>
              <p className="text-sm font-semibold text-zinc-100">{program.appliesTo}</p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                Recurrence
              </div>
              <p className="text-sm font-semibold text-zinc-100">{program.recurrence}</p>
            </div>

            {program.supervisoryHours !== null && (
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-white/5 col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
                  <Scale className="h-3.5 w-3.5 text-indigo-400" />
                  Training Hours Requirement
                </div>
                <p className="text-sm font-semibold text-zinc-100">
                  {program.supervisoryHours}h Supervisors / {program.nonSupervisoryHours}h Non-Supervisory Staff
                </p>
              </div>
            )}
          </div>

          {/* Key Deliverables */}
          {program.keyDeliverables && (
            <div className="p-4 rounded-lg bg-indigo-950/20 border border-indigo-500/20 mb-6">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                <FileText className="h-3.5 w-3.5" />
                Key Deliverables Included
              </h4>
              <p className="text-xs text-zinc-300 leading-normal">
                {program.keyDeliverables}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <SheetFooter className="p-0 mt-6 pt-4 border-t border-white/10 flex-col gap-2">
          <SheetClose
            render={
              <Link
                href={hubHref}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shadow-md shadow-indigo-600/20"
              >
                View Full Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
