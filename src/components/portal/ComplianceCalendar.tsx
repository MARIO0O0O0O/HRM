'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, AlertCircle, CheckCircle2, Clock, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface ComplianceDeadline {
  id: string
  title: string
  dueDate: string
  ref: string
  description: string
  urgency: 'urgent' | 'upcoming' | 'past' | 'completed'
  actionLabel: string
}

export default function ComplianceCalendar() {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'upcoming' | 'completed'>('all')
  const [deadlines, setDeadlines] = useState<ComplianceDeadline[]>([
    {
      id: '1',
      title: 'SB 553 Workplace Violence Prevention Plan',
      dueDate: '2026-07-01',
      ref: 'SB 553 / Labor Code § 6401.9',
      description: 'Establish, implement, and maintain an effective written Workplace Violence Prevention Plan and conduct initial employee compliance training.',
      urgency: 'urgent',
      actionLabel: 'Generate WVPP Draft'
    },
    {
      id: '2',
      title: 'Annual Sexual Harassment Prevention Training',
      dueDate: '2026-12-31',
      ref: 'CA Gov Code § 12950.1',
      description: 'Mandatory biennial training for all supervisory (2 hours) and non-supervisory (1 hour) employees. Must be completed every 2 years.',
      urgency: 'upcoming',
      actionLabel: 'Launch Interactive Training'
    },
    {
      id: '3',
      title: 'Quarterly DE 9C Payroll Contribution Return',
      dueDate: '2026-07-31',
      ref: 'EDD California Payroll Taxing',
      description: 'File quarterly contribution return and report of wages for the second quarter of the 2026 tax year.',
      urgency: 'upcoming',
      actionLabel: 'View EDD Portal'
    },
    {
      id: '4',
      title: 'Annual Form 300A Summary Posting',
      dueDate: '2026-03-02',
      ref: 'Cal/OSHA Recordkeeping',
      description: 'Review and post Cal/OSHA Form 300A summary of work-related injuries and illnesses in a conspicuous location.',
      urgency: 'completed',
      actionLabel: 'View Completed Log'
    },
    {
      id: '5',
      title: 'Mandatory California Workplace Postings Update',
      dueDate: '2026-01-01',
      ref: 'CA DIR Posting Requirements',
      description: 'Verify all physical and electronic postings are updated with current 2026 California Minimum Wage and Paid Sick Leave regulations.',
      urgency: 'completed',
      actionLabel: 'Download 2026 Poster'
    }
  ])

  // Custom event inputs
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newRef, setNewRef] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newUrgency, setNewUrgency] = useState<'urgent' | 'upcoming'>('upcoming')

  // Expanded items for detailed descriptions
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newDate) return

    const newItem: ComplianceDeadline = {
      id: Date.now().toString(),
      title: newTitle,
      dueDate: newDate,
      ref: newRef || 'Custom Reminder',
      description: newDesc || 'No additional description provided.',
      urgency: newUrgency,
      actionLabel: 'Mark Completed'
    }

    setDeadlines([newItem, ...deadlines])
    // Reset form
    setNewTitle('')
    setNewDate('')
    setNewRef('')
    setNewDesc('')
    setNewUrgency('upcoming')
    setShowAddForm(false)
  }

  const toggleComplete = (id: string) => {
    setDeadlines(deadlines.map(d => {
      if (d.id === id) {
        const isCompleted = d.urgency === 'completed'
        return {
          ...d,
          urgency: isCompleted ? 'upcoming' : 'completed',
          actionLabel: isCompleted ? 'Mark Completed' : 'Undo Completion'
        }
      }
      return d
    }))
  }

  const handleDelete = (id: string) => {
    setDeadlines(deadlines.filter(d => d.id !== id))
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredDeadlines = deadlines.filter(d => {
    if (filter === 'all') return true
    return d.urgency === filter
  })

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-100">California Compliance Calendar</h3>
            <p className="text-xs text-zinc-400">Track and manage upcoming regulatory filing deadlines.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-zinc-50 transition-colors border border-indigo-500/20 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Add Deadline Reminder
        </button>
      </div>

      {/* Add Custom Deadline Form */}
      {showAddForm && (
        <form onSubmit={handleAddDeadline} className="bg-[#161616] border border-indigo-500/20 rounded-xl p-5 mb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-250">
          <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Plus className="h-4 w-4 text-indigo-400" /> New Compliance Reminder
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="custom-title" className="text-[10px] uppercase font-bold text-zinc-500">Requirement Title</label>
              <input
                id="custom-title"
                type="text"
                placeholder="e.g. Cal/OSHA Postings"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="custom-due-date" className="text-[10px] uppercase font-bold text-zinc-500">Due Date</label>
              <input
                id="custom-due-date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="custom-ref" className="text-[10px] uppercase font-bold text-zinc-500">Legal Code / Authority</label>
              <input
                id="custom-ref"
                type="text"
                placeholder="e.g. Labor Code § 6401.9"
                value={newRef}
                onChange={(e) => setNewRef(e.target.value)}
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="custom-urgency" className="text-[10px] uppercase font-bold text-zinc-500">Urgency Level</label>
              <select
                id="custom-urgency"
                value={newUrgency}
                onChange={(e) => setNewUrgency(e.target.value as 'urgent' | 'upcoming')}
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="urgent">Urgent / High Priority</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="custom-desc" className="text-[10px] uppercase font-bold text-zinc-500">Brief Compliance Description</label>
              <textarea
                id="custom-desc"
                placeholder="Detail what is required to satisfy this compliance item..."
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-zinc-50 cursor-pointer"
            >
              Save Reminder
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-[#161616] p-1 rounded-xl border border-white/5 w-fit">
        {(['all', 'urgent', 'upcoming', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-zinc-800 text-zinc-100 border border-white/10'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline Feed */}
      <div className="relative border-l border-white/10 pl-6 ml-3 flex flex-col gap-6">
        {filteredDeadlines.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-xs italic">
            No compliance items found matching this filter.
          </div>
        ) : (
          filteredDeadlines.map((item) => {
            const isCompleted = item.urgency === 'completed'
            const isUrgent = item.urgency === 'urgent'

            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline Dot Indicator */}
                <span className={`absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-2 flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400' 
                    : isUrgent 
                      ? 'bg-rose-950 border-rose-500 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)] animate-pulse'
                      : 'bg-[#1a1a1a] border-indigo-500 text-indigo-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                  ) : isUrgent ? (
                    <AlertCircle className="h-3 w-3 shrink-0" />
                  ) : (
                    <Clock className="h-3 w-3 shrink-0" />
                  )}
                </span>

                {/* Event Card */}
                <div className={`bg-[#161616] border rounded-xl p-5 hover:border-white/10 transition-colors ${
                  isUrgent ? 'border-rose-500/20' : isCompleted ? 'border-emerald-500/10 opacity-70' : 'border-white/5'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider ${
                          isUrgent
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : isCompleted
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          {item.urgency}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium font-mono">{item.ref}</span>
                      </div>
                      
                      <h4 className={`text-sm sm:text-base font-bold mt-2 ${isCompleted ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                        {item.title}
                      </h4>
                      
                      <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 text-zinc-500" />
                        Deadline: <span className="font-bold text-zinc-300 font-mono">{item.dueDate}</span>
                      </p>
                    </div>

                    {/* Quick Toggle Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          isCompleted
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-zinc-800 border-white/5 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>
                      
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="h-8.5 w-8.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-white/5 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        {expandedId === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      {/* Custom User Events Can Be Deleted */}
                      {['1', '2', '3', '4', '5'].indexOf(item.id) === -1 && (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="h-8.5 w-8.5 rounded-lg bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-500/10 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Description details */}
                  {expandedId === item.id && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
