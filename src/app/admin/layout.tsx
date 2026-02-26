'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Helpdesk } from '@/components/helpdesk'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== 'ADMIN') {
        router.replace('/login')
      } else {
        setChecked(true)
      }
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-lavender-200 border-t-lavender-600 rounded-full animate-spin"></div>
          <p className="text-sage-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sage-50/50">
      <AdminSidebar />
      <div className="ml-64">
        {children}
      </div>
      <Helpdesk clientId={user?.id || 'admin-001'} />
    </div>
  )
}
