import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminWaitlistPage() {
  const supabase = await createClient()
  const { data: signups } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex-grow bg-[#0a0a0a] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <Link href="/admin" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 w-fit transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>
        <h1 className="text-2xl font-black text-zinc-100">Waitlist Signups</h1>

        <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
          {(!signups || signups.length === 0) ? (
            <p className="text-sm text-zinc-600 p-8 text-center">No signups yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Interested In</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3 text-zinc-300">{s.email}</td>
                    <td className="px-5 py-3 text-zinc-400">{s.spoke}</td>
                    <td className="px-5 py-3 text-zinc-600 text-xs">
                      {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
