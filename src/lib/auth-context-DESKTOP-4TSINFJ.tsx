'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Role } from './types'

// ─── Admin credentials (client-side MVP) ────────────
const ADMIN_USER = {
  username: 'AngelH',
  password: '$Vibin2026',
}

const ADMIN_PROFILE: User = {
  id: 'admin-001',
  email: 'hello@vibinwithcoachangel.com',
  name: 'Coach Angel',
  role: 'ADMIN' as Role,
  timezone: 'America/New_York',
  createdAt: '2025-01-01T00:00:00Z',
}

// ─── Auth Context Types ─────────────────────────────

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginAsClient: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ─── Auth Provider ──────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const stored = sessionStorage.getItem('vibin_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch {
        sessionStorage.removeItem('vibin_auth')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setUser(ADMIN_PROFILE)
      sessionStorage.setItem('vibin_auth', JSON.stringify(ADMIN_PROFILE))
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password' }
  }

  const loginAsClient = async (email: string, password: string) => {
    // Check against stored clients
    const clientsStr = localStorage.getItem('vibin_clients')
    if (clientsStr) {
      const clients = JSON.parse(clientsStr) as User[]
      const client = clients.find(c => c.email === email)
      if (client) {
        const passwords = JSON.parse(localStorage.getItem('vibin_client_passwords') || '{}')
        if (passwords[email] === password) {
          setUser(client)
          sessionStorage.setItem('vibin_auth', JSON.stringify(client))
          return { success: true }
        }
      }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('vibin_auth')
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    sessionStorage.setItem('vibin_auth', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginAsClient,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
