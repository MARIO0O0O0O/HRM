import { Scale, Calendar, Users, Clock } from 'lucide-react'
import type { ProgramRecord } from '@/data/airtable-seed'

export default function ProgramSummaryCard({ program }: { program: ProgramRecord }) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <p className="text-sm text-zinc-400 leading-relaxed">{program.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1">
            <Scale className="h-3 w-3" /> Governing Law
          </span>
          <span className="text-xs font-semibold text-zinc-300">{program.primaryStatute}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1">
            <Users className="h-3 w-3" /> Applies To
          </span>
          <span className="text-xs font-semibold text-zinc-300">{program.appliesTo}</span>
        </div>
        {program.trainingRequired && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Training Hours
            </span>
            <span className="text-xs font-semibold text-zinc-300">
              {program.nonSupervisoryHours ? `${program.nonSupervisoryHours}hr staff` : ''}
              {program.supervisoryHours ? ` / ${program.supervisoryHours}hr supervisors` : ''}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Recurrence
          </span>
          <span className="text-xs font-semibold text-zinc-300">{program.recurrence}</span>
        </div>
      </div>
    </div>
  )
}
