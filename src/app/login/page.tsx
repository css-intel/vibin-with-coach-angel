'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const { login, loginAsClient } = useAuth()
  const [isAdmin, setIsAdmin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result
      if (isAdmin) {
        result = await login(username, password)
      } else {
        result = await loginAsClient(email, password)
      }

      if (result.success) {
        router.push(isAdmin ? '/admin' : '/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-sage"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-lavender-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-warmth-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <Logo className="w-14 h-14 transform group-hover:scale-110 transition-all" />
            <div>
              <span className="text-sage-800 font-serif text-2xl font-semibold">VIBIN</span>
              <span className="block text-sage-600 text-xs tracking-wide">with Coach Angel</span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
          <h1 className="text-2xl font-serif font-bold text-sage-900 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sage-500 text-center mb-6 text-sm">
            Sign in to your account
          </p>
          <p className="text-sage-400 text-center mb-2 text-[10px]">
            v2.1
          </p>

          {/* Toggle */}
          <div className="flex bg-sage-50 rounded-lg p-1 mb-6">
            <button
              onClick={() => { setIsAdmin(true); setError('') }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isAdmin ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => { setIsAdmin(false); setError('') }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isAdmin ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'
              }`}
            >
              Client
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isAdmin ? (
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-sage-50/50 border border-sage-200 rounded-xl text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-sage-50/50 border border-sage-200 rounded-xl text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-sage-50/50 border border-sage-200 rounded-xl text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 py-2.5 px-4 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sage-500 to-sage-600 text-white py-3 rounded-xl font-medium hover:from-sage-600 hover:to-sage-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-sage-500 hover:text-lavender-600 transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
