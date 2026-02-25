'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import type { Payment } from '@/lib/types'

export default function DashboardBilling() {
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    if (!user?.id) return
    setPayments(dataStore.getPayments().filter(p => p.userId === user.id))
  }, [user])

  const totalPaid = payments.filter(p => p.status === 'SUCCEEDED').reduce((s, p) => s + p.amountInCents, 0)
  const pendingAmount = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + p.amountInCents, 0)

  return (
    <>
      <DashboardHeader title="Billing" />
      <div className="p-8">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-sage-900">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(pendingAmount)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <p className="text-xs text-sage-400 mb-1">Transactions</p>
            <p className="text-2xl font-bold text-sage-900">{payments.length}</p>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-sage-100">
            <h3 className="font-serif font-bold text-sage-900">Payment History</h3>
          </div>
          {payments.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-sage-50 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Description</th>
                  <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Amount</th>
                  <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-50">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-sage-50/50 transition-colors">
                    <td className="px-5 py-3 text-sm text-sage-700">{p.description}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-sage-900">{formatCurrency(p.amountInCents)}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(p.status)}`}>{p.status}</span>
                    </td>
                    <td className="px-5 py-3 text-sm text-sage-500">{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-sage-400 text-sm">No payments yet</div>
          )}
        </div>
      </div>
    </>
  )
}
