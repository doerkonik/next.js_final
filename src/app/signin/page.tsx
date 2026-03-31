'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSignin } from '@/hooks/useAuthForms'
import { AuthCard, FormInput } from '@/components/UI'

function SigninForm() {
  const { submit, loading, error } = useSignin()
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ email: '', password: '' })
  const [successMsg, setSuccessMsg] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  useEffect(() => {
    if (searchParams.get('registered') === 'true')
      setSuccessMsg('Account created! Please sign in to continue.')
  }, [searchParams])

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to manage your hosting and domains.">
      <form className="space-y-5" onSubmit={e => { e.preventDefault(); submit(form) }}>

        {/* Success (from signup redirect) */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {successMsg}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            {error}
          </div>
        )}

        <FormInput id="email" label="Email Address" type="email" placeholder="you@example.com"
          value={form.email} onChange={(e: { target: { value: string } }) => set('email', e.target.value)} required />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <a href="#" className="text-xs text-primary hover:underline font-semibold">Forgot password?</a>
          </div>
          <input id="password" type="password" placeholder="Your password" required
            value={form.password} onChange={e => set('password', e.target.value)}
            className="w-full px-4 py-3 rounded-xl glass border border-white/30 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-xl bg-primary text-white font-extrabold glow-primary hover:scale-105 active:scale-95 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2">
          {loading ? (
            <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>Signing in…</>
          ) : 'Sign In →'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary font-bold hover:underline">Register free</Link>
      </p>
    </AuthCard>
  )
}

export default function SigninPage() {
  return <Suspense><SigninForm /></Suspense>
}
