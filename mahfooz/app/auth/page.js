'use client'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Check your email to confirm signup!')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm bg-card border border-border rounded-[28px] p-8 shadow-soft">
        
        {/* Tabs */}
        <div className="flex mb-6 border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${!isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-muted-foreground mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

      </div>
    </main>
  )
}