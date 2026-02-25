'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore, mockRevenueData } from '@/lib/mock-data'
import { formatCurrency, formatDateTime, getRelativeTime, getStatusColor } from '@/lib/utils'
import type { DashboardStats, Booking, Payment } from '@/lib/types'

function StatsCard({ label, value, subtitle, icon, color }: { label: string; value: string; subtitle?: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-sage-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-sage-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-sage-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
      </div>
    </div>
  )
}

function RevenueChart({ data }: { data: typeof mockRevenueData }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1)
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
      <h3 className="text-lg font-serif font-bold text-sage-900 mb-4">Revenue Overview</h3>
      <div className="flex items-end space-x-3 h-48">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end h-40">
              <span className="text-[10px] text-sage-500 mb-1">
                {d.revenue > 0 ? formatCurrency(d.revenue) : ''}
              </span>
              <div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-lavender-500 to-lavender-400 transition-all duration-500"
                style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 4)}%` }}
              ></div>
            </div>
            <span className="text-xs text-sage-500 mt-2 font-medium">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [recentPayments, setRecentPayments] = useState<Payment[]>([])

  useEffect(() => {
    setStats(dataStore.getStats())
    setUpcomingBookings(
      dataStore.getBookings()
        .filter(b => b.status === 'SCHEDULED' && new Date(b.scheduledAt) > new Date())
        .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
        .slice(0, 5)
    )
    setRecentPayments(
      dataStore.getPayments()
        .filter(p => p.status === 'SUCCEEDED')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    )
  }, [])

  if (!stats) return null

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            subtitle="All time"
            icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            label="Active Clients"
            value={stats.activeClients.toString()}
            subtitle="Currently enrolled"
            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            color="bg-gradient-to-br from-lavender-500 to-lavender-600"
          />
          <StatsCard
            label="Upcoming Sessions"
            value={stats.upcomingBookings.toString()}
            subtitle="Scheduled ahead"
            icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            label="Pending Contracts"
            value={stats.pendingContracts.toString()}
            subtitle="Awaiting signature"
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            color="bg-gradient-to-br from-warmth-500 to-warmth-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <RevenueChart data={mockRevenueData} />

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
            <h3 className="text-lg font-serif font-bold text-sage-900 mb-4">Upcoming Sessions</h3>
            <div className="space-y-3">
              {upcomingBookings.length === 0 ? (
                <p className="text-sage-400 text-sm py-4 text-center">No upcoming sessions</p>
              ) : (
                upcomingBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between py-3 border-b border-sage-50 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-lavender-100 flex items-center justify-center text-lavender-700 text-sm font-semibold">
                        {b.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sage-900">{b.clientName}</p>
                        <p className="text-xs text-sage-400">{b.packageName} · {b.duration}min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-sage-700">{formatDateTime(b.scheduledAt)}</p>
                      <p className="text-xs text-lavender-500">{getRelativeTime(b.scheduledAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
          <h3 className="text-lg font-serif font-bold text-sage-900 mb-4">Recent Payments</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sage-100">
                  <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-2">Client</th>
                  <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-2">Description</th>
                  <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-2">Amount</th>
                  <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-2">Status</th>
                  <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map(p => (
                  <tr key={p.id} className="border-b border-sage-50 last:border-0">
                    <td className="py-3 px-2">
                      <p className="text-sm font-medium text-sage-900">{p.clientName}</p>
                      <p className="text-xs text-sage-400">{p.clientEmail}</p>
                    </td>
                    <td className="py-3 px-2 text-sm text-sage-600">{p.description}</td>
                    <td className="py-3 px-2 text-sm font-semibold text-sage-900">{formatCurrency(p.amountInCents)}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-sage-500">{formatDateTime(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
