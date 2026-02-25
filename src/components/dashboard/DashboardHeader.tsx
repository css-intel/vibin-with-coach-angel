'use client'

import { useAuth } from '@/lib/auth-context'

export default function DashboardHeader({ title }: { title: string }) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-sage-100 flex items-center justify-between px-8 z-30">
      <h1 className="text-lg font-serif font-bold text-sage-900">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warmth-400 to-lavender-400 flex items-center justify-center text-sm font-medium text-white">
            {user?.name?.charAt(0) || 'C'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-sage-900 leading-none">{user?.name || 'Client'}</p>
            <p className="text-[10px] text-sage-400 leading-none mt-0.5">{user?.email || ''}</p>
          </div>
        </div>
        <button onClick={logout} className="p-2 text-sage-400 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-colors" title="Logout">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </header>
  )
}
