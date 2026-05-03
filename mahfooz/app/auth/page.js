'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  const setError = (text) => setFeedback({ type: 'error', text })
  const setSuccess = (text) => setFeedback({ type: 'success', text })

  const normalizeAuthError = (message) => {
    const lower = message.toLowerCase()

    if (lower.includes('rate limit')) {
      return 'Too many signup email attempts were made. Please wait a few minutes and try again.'
    }

    if (lower.includes('invalid login credentials')) {
      return 'Incorrect email or password. Please try again.'
    }

    if (lower.includes('email not confirmed')) {
      return 'Please confirm your email before logging in.'
    }

    return message
  }

  const handleAuth = async (event) => {
    event.preventDefault()
    setLoading(true)
    setFeedback(null)

    if (!email.trim()) {
      setLoading(false)
      setError('Please enter your email address.')
      return
    }

    if (password.length < 6) {
      setLoading(false)
      setError('Password must be at least 6 characters long.')
      return
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(normalizeAuthError(error.message))
      else router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(normalizeAuthError(error.message))
      else setSuccess('Signup successful. Check your email to confirm your account.')
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={handleAuth} className="w-full max-w-sm rounded-[28px] border border-border bg-card p-8 shadow-soft">
        <div className="mb-6 flex overflow-hidden rounded-full border border-border">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Sign Up
          </button>
        </div>

        <h1 className="mb-6 text-center text-2xl font-semibold">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-muted-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-70"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        {feedback ? (
          <p
            className={`mt-4 rounded-xl px-4 py-3 text-center text-sm ${
              feedback.type === 'error'
                ? 'bg-red-50 text-red-600'
                : 'bg-green-50 text-green-700'
            }`}
          >
            {feedback.text}
          </p>
        ) : null}
      </form>
    </main>
  )
}
