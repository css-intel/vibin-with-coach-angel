'use client'

import { useState, useEffect } from 'react'
import type { BillingRecord } from './types'
import { fetchBilling } from './helpdesk-api'

interface Props {
  clientId: string
}

const STATUS_STYLES: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  overdue: 'bg-red-100 text-red-700',
  refunded: 'bg-sage-100 text-sage-600',
}

export default function BillingTab({ clientId }: Props) {
  const [records, setRecords] = useState<BillingRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBilling(clientId).then((r) => {
      setRecords(r)
      setLoading(false)
    })
  }, [clientId])

  const formatCurrency = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-lavender-300 border-t-lavender-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-sage-200">
        <h3 className="text-sm font-semibold text-sage-800">Billing</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {records.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-sage-400">
            No billing records
          </div>
        ) : (
          records.map((r) => (
            <div key={r.id} className="px-4 py-3 border-b border-sage-100 hover:bg-sage-50/50 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-sage-800 leading-tight pr-2">{r.description}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[r.status] || ''}`}>
                  {r.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-sage-700">{formatCurrency(r.amountInCents, r.currency)}</span>
                <span className="text-[10px] text-sage-400">
                  {r.paidAt
                    ? `Paid ${new Date(r.paidAt).toLocaleDateString()}`
                    : `Due ${new Date(r.dueDate).toLocaleDateString()}`}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
