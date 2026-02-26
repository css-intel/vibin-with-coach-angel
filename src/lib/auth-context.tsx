'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, Role } from './types'

// ─── Admin credentials (client-side MVP) ────────────
const ADMIN_USERS = [
  {
    username: 'AngelH',
    password: '$Vibin2026',
    profile: {
      id: 'admin-001',
      email: 'hello@vibinwithcoachangel.com',
      name: 'Coach Angel',
      role: 'ADMIN' as Role,
      timezone: 'America/New_York',
      createdAt: '2025-01-01T00:00:00Z',
    } as User,
  },
  {
    username: 'cssdex',
    password: 'Dexter1!#',
    profile: {
      id: 'admin-002',
      email: 'cssdex@vibinwithcoachangel.com',
      name: 'cssdex',
      role: 'ADMIN' as Role,
      timezone: 'America/New_York',
      createdAt: '2026-02-26T00:00:00Z',
    } as User,
  },
]

// ─── Auth Context Types ─────────────────────────────

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginAsClient: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
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
    const u = username.trim()
    const p = password.trim()
    const admin = ADMIN_USERS.find(a => a.username.toLowerCase() === u.toLowerCase() && a.password === p)
    if (admin) {
      setUser(admin.profile)
      sessionStorage.setItem('vibin_auth', JSON.stringify(admin.profile))
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginAsClient,
        logout,
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
