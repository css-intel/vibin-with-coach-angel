'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import type { Payment, CoachingPackage } from '@/lib/types'

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [packages, setPackages] = useState<CoachingPackage[]>([])
  const [filter, setFilter] = useState<'ALL' | 'SUCCEEDED' | 'PENDING' | 'REFUNDED'>('ALL')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setPayments(dataStore.getPayments())
    setPackages(dataStore.getPackages())
  }, [])

  const getPkg = (id?: string) => id ? packages.find(p => p.id === id) : null

  const filtered = payments.filter(p => {
    if (filter !== 'ALL' && p.status !== filter) return false
    if (search) {
      const name = p.clientName.toLowerCase()
      return name.includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  const stats = {
    total: payments.filter(p => p.status === 'SUCCEEDED').reduce((s, p) => s + p.amountInCents, 0),
    pending: payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + p.amountInCents, 0),
    refunded: payments.filter(p => p.status === 'REFUNDED').reduce((s, p) => s + p.amountInCents, 0),
    count: payments.length,
  }

  return (
    <>
      <AdminHeader title="Payments" />
      <div className="p-8">
        {/* Revenue Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-sage-900">{formatCurrency(stats.total)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(stats.pending)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Refunded</p>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(stats.refunded)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Transactions</p>
            <p className="text-2xl font-bold text-sage-900">{stats.count}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text" placeholder="Search payments..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-1 bg-sage-100 rounded-xl p-1">
            {(['ALL', 'SUCCEEDED', 'PENDING', 'REFUNDED'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${filter === f ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'}`}>
                {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sage-100 text-left">
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Client</th>
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Description</th>
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Package</th>
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Amount</th>
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Status</th>
                <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-50">
              {filtered.length > 0 ? filtered.map(payment => {
                const pkg = payment.enrollmentId ? getPkg(payment.enrollmentId) : null
                return (
                  <tr key={payment.id} className="hover:bg-sage-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                          {payment.clientName?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-sage-900">{payment.clientName}</p>
                          <p className="text-xs text-sage-400">{payment.clientEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-sage-600">{payment.description}</td>
                    <td className="px-5 py-3 text-sm text-sage-500">{pkg?.name || '—'}</td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-semibold text-sage-900">{formatCurrency(payment.amountInCents)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-sage-500">{formatDate(payment.createdAt)}</td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sage-400 text-sm">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
