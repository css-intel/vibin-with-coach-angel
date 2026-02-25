'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import { formatCurrency, formatDate, formatTime, getDaysUntil } from '@/lib/utils'
import type { Booking, Enrollment, Payment, CoachingPackage, ContractSignature } from '@/lib/types'

export default function DashboardOverview() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [packages, setPackages] = useState<CoachingPackage[]>([])
  const [signatures, setSignatures] = useState<ContractSignature[]>([])

  useEffect(() => {
    if (!user?.id) return
    const allBookings = dataStore.getBookings()
    const allEnrollments = dataStore.getEnrollments()
    const allPayments = dataStore.getPayments()
    setBookings(allBookings.filter(b => b.clientId === user.id))
    setEnrollments(allEnrollments.filter(e => e.clientId === user.id))
    setPayments(allPayments.filter(p => p.userId === user.id))
    setPackages(dataStore.getPackages())
    setSignatures(dataStore.getSignatures().filter(s => s.userId === user.id))
  }, [user])

  const upcomingBookings = bookings
    .filter(b => b.status === 'SCHEDULED' && new Date(b.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const completedCount = bookings.filter(b => b.status === 'COMPLETED').length
  const getPkg = (id: string) => packages.find(p => p.id === id)
  const pendingContracts = signatures.filter(s => s.status === 'PENDING')

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="p-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-lavender-100 to-sage-100 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-serif font-bold text-sage-900 mb-1">Welcome back, {user?.name?.split(' ')[0]}!</h2>
          <p className="text-sm text-sage-600">
            {upcomingBookings.length > 0
              ? `You have ${upcomingBookings.length} upcoming session${upcomingBookings.length > 1 ? 's' : ''}. Your next session is ${getDaysUntil(upcomingBookings[0].scheduledAt)}.`
              : 'You have no upcoming sessions. Book one to continue your journey!'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-4">
            <p className="text-xs text-sage-400 mb-1">Upcoming</p>
            <p className="text-2xl font-bold text-sage-900">{upcomingBookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-4">
            <p className="text-xs text-sage-400 mb-1">Completed</p>
            <p className="text-2xl font-bold text-sage-900">{completedCount}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-4">
            <p className="text-xs text-sage-400 mb-1">Active Packages</p>
            <p className="text-2xl font-bold text-sage-900">{enrollments.filter(e => e.status === 'ACTIVE').length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-4">
            <p className="text-xs text-sage-400 mb-1">Pending Contracts</p>
            <p className="text-2xl font-bold text-amber-600">{pendingContracts.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-sage-900">Upcoming Sessions</h3>
              <Link href="/dashboard/sessions" className="text-xs text-lavender-600 hover:text-lavender-800 font-medium">View All</Link>
            </div>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.slice(0, 4).map(booking => {
                  const enrollment = enrollments.find(e => e.id === booking.enrollmentId)
                  const pkg = enrollment ? getPkg(enrollment.packageId) : null
                  return (
                    <div key={booking.id} className="flex items-center space-x-3 p-3 rounded-xl bg-sage-50/50 hover:bg-sage-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-lavender-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sage-900">{pkg?.name || 'Session'}</p>
                        <p className="text-xs text-sage-500">{formatDate(booking.scheduledAt)} at {formatTime(booking.scheduledAt)}</p>
                      </div>
                      <span className="text-xs text-lavender-600 font-medium">{getDaysUntil(booking.scheduledAt)}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-sage-400 mb-3">No upcoming sessions</p>
                <Link href="/dashboard/booking" className="text-sm font-medium text-lavender-600 hover:text-lavender-800">Book a session</Link>
              </div>
            )}
          </div>

          {/* Active Packages */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-sage-900">My Packages</h3>
            </div>
            {enrollments.length > 0 ? (
              <div className="space-y-3">
                {enrollments.map(enrollment => {
                  const pkg = getPkg(enrollment.packageId)
                  const progress = pkg ? (enrollment.sessionsUsed / pkg.sessionCount) * 100 : 0
                  return (
                    <div key={enrollment.id} className="p-3 rounded-xl bg-sage-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-sage-900">{pkg?.name}</h4>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          enrollment.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                          enrollment.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                          'bg-sage-100 text-sage-600'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-sage-200 rounded-full overflow-hidden">
                          <div className="h-full bg-lavender-500 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                        </div>
                        <span className="text-xs text-sage-500">{enrollment.sessionsUsed}/{pkg?.sessionCount}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-sage-400">No active packages</p>
              </div>
            )}
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-sage-900">Recent Payments</h3>
              <Link href="/dashboard/billing" className="text-xs text-lavender-600 hover:text-lavender-800 font-medium">View All</Link>
            </div>
            {payments.length > 0 ? (
              <div className="space-y-2">
                {payments.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-sage-50 last:border-0">
                    <div>
                      <p className="text-sm text-sage-700">{p.description}</p>
                      <p className="text-xs text-sage-400">{formatDate(p.createdAt)}</p>
                    </div>
                    <span className="text-sm font-semibold text-sage-900">{formatCurrency(p.amountInCents)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-sage-400">No payments yet</p>
              </div>
            )}
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <h3 className="font-serif font-bold text-sage-900 mb-4">Action Items</h3>
            <div className="space-y-2">
              {pendingContracts.length > 0 && (
                <Link href="/dashboard/contracts" className="flex items-center space-x-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">{pendingContracts.length} contract(s) awaiting signature</p>
                    <p className="text-xs text-amber-600">Click to review and sign</p>
                  </div>
                </Link>
              )}
              <Link href="/dashboard/booking" className="flex items-center space-x-3 p-3 rounded-xl bg-lavender-50 hover:bg-lavender-100/80 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-lavender-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-lavender-800">Book your next session</p>
                  <p className="text-xs text-lavender-600">View available time slots</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
