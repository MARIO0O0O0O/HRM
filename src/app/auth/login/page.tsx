'use client'

// Force dynamic rendering — this page calls Supabase at runtime
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    // Instantiate inside handler — safe from prerender
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      router.push('/portal')
      router.refresh()
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    setErrorMsg(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setErrorMsg('Check your email for the confirmation link.')
    }
    setLoading(false)
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100 p-6">
      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Sign in to access your Client Compliance Portal.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#161616] border border-white/10 rounded-lg py-3 px-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-medium text-rose-400 mt-1 text-left leading-relaxed">
              {errorMsg}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-zinc-50 font-semibold tracking-wide py-3 rounded-lg cursor-pointer transition-colors"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative px-3 bg-[#111111] text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            New Client?
          </span>
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="w-full py-3 rounded-lg border border-solid border-white/10 text-zinc-300 hover:bg-white/[0.02] active:bg-white/[0.05] transition-colors text-sm font-semibold tracking-wide cursor-pointer"
        >
          Request Access / Sign Up
        </button>
      </div>
    </div>
  )
}
