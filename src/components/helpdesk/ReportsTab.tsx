'use client'

import { useState, useEffect } from 'react'
import type { Report } from './types'
import { fetchReports } from './helpdesk-api'

interface Props {
  clientId: string
}

const TYPE_ICONS: Record<string, string> = {
  session_summary: '📋',
  progress: '📈',
  invoice: '🧾',
  custom: '📊',
}

export default function ReportsTab({ clientId }: Props) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports(clientId).then((r) => {
      setReports(r)
      setLoading(false)
    })
  }, [clientId])

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
        <h3 className="text-sm font-semibold text-sage-800">Reports</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {reports.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-sage-400">
            No reports available
          </div>
        ) : (
          reports.map((r) => (
            <a
              key={r.id}
              href={r.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 border-b border-sage-100 hover:bg-sage-50/50 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{TYPE_ICONS[r.type] || '📊'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sage-800 truncate group-hover:text-lavender-600 transition-colors">
                  {r.title}
                </p>
                <p className="text-[10px] text-sage-400">
                  {r.type.replace('_', ' ')} · {new Date(r.generatedAt).toLocaleDateString()}
                </p>
              </div>
              <svg className="w-4 h-4 text-sage-300 group-hover:text-lavender-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          ))
        )}
      </div>
    </div>
  )
}
