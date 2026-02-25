'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import { formatDate, formatTime, getStatusColor } from '@/lib/utils'
import type { Booking, Enrollment, CoachingPackage } from '@/lib/types'

function computeEndTime(scheduledAt: string, durationMin: number) {
  return new Date(new Date(scheduledAt).getTime() + durationMin * 60000).toISOString()
}

export default function DashboardSessions() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [packages, setPackages] = useState<CoachingPackage[]>([])
  const [filter, setFilter] = useState<'ALL' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'>('ALL')

  useEffect(() => {
    if (!user?.id) return
    setBookings(dataStore.getBookings().filter(b => b.clientId === user.id))
    setEnrollments(dataStore.getEnrollments().filter(e => e.clientId === user.id))
    setPackages(dataStore.getPackages())
  }, [user])

  const getPkg = (enrollmentId?: string) => {
    if (!enrollmentId) return null
    const enrollment = enrollments.find(e => e.id === enrollmentId)
    return enrollment ? packages.find(p => p.id === enrollment.packageId) : null
  }

  const filtered = bookings
    .filter(b => filter === 'ALL' || b.status === filter)
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())

  const handleCancel = (id: string) => {
    const allBookings = dataStore.getBookings()
    const updated = allBookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' as const } : b)
    dataStore.saveBookings(updated)
    setBookings(updated.filter(b => b.clientId === user?.id))
  }

  const counts = {
    ALL: bookings.length,
    SCHEDULED: bookings.filter(b => b.status === 'SCHEDULED').length,
    COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
  }

  return (
    <>
      <DashboardHeader title="My Sessions" />
      <div className="p-8">
        {/* Filter tabs */}
        <div className="flex space-x-1 bg-sage-100 rounded-xl p-1 w-fit mb-6">
          {(['ALL', 'SCHEDULED', 'COMPLETED', 'CANCELLED'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${filter === f ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'}`}>
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Session List */}
        <div className="space-y-3">
          {filtered.length > 0 ? filtered.map(booking => {
            const pkg = getPkg(booking.enrollmentId)
            const isUpcoming = new Date(booking.scheduledAt) > new Date() && booking.status === 'SCHEDULED'
            const endTimeStr = computeEndTime(booking.scheduledAt, booking.duration)
            return (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      booking.status === 'COMPLETED' ? 'bg-green-100' :
                      booking.status === 'CANCELLED' ? 'bg-red-100' :
                      'bg-lavender-100'
                    }`}>
                      <svg className={`w-5 h-5 ${
                        booking.status === 'COMPLETED' ? 'text-green-600' :
                        booking.status === 'CANCELLED' ? 'text-red-500' :
                        'text-lavender-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-sage-900">{booking.packageName || pkg?.name || 'Session'}</h3>
                      <p className="text-xs text-sage-500 mt-0.5">
                        {formatDate(booking.scheduledAt)} &middot; {formatTime(booking.scheduledAt)} – {formatTime(endTimeStr)}
                      </p>
                      <p className="text-xs text-sage-400 mt-0.5">{booking.duration} minutes</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                {isUpcoming && (
                  <div className="mt-3 pt-3 border-t border-sage-50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {booking.meetingLink && (
                        <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-lavender-600 hover:text-lavender-800 flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          <span>Join Meeting</span>
                        </a>
                      )}
                    </div>
                    <button onClick={() => handleCancel(booking.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Cancel</button>
                  </div>
                )}
                {booking.notes && (
                  <div className="mt-3 pt-3 border-t border-sage-50">
                    <p className="text-xs font-medium text-sage-600 mb-1">Session Notes:</p>
                    <p className="text-xs text-sage-500">{booking.notes}</p>
                  </div>
                )}
              </div>
            )
          }) : (
            <div className="text-center py-12 text-sage-400 text-sm">No sessions found</div>
          )}
        </div>
      </div>
    </>
  )
}
