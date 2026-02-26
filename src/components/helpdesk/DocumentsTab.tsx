'use client'

import { useState, useEffect } from 'react'
import type { HelpdeskDocument } from './types'
import { fetchDocuments } from './helpdesk-api'

interface Props {
  clientId: string
}

const ICON_MAP: Record<string, string> = {
  'application/pdf': '📄',
  'image/png': '🖼️',
  'image/jpeg': '🖼️',
  'video/webm': '🎬',
  'audio/webm': '🎙️',
}

export default function DocumentsTab({ clientId }: Props) {
  const [docs, setDocs] = useState<HelpdeskDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments(clientId).then((d) => {
      setDocs(d)
      setLoading(false)
    })
  }, [clientId])

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

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
        <h3 className="text-sm font-semibold text-sage-800">Documents</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {docs.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-sage-400">
            No documents available
          </div>
        ) : (
          docs.map((d) => (
            <a
              key={d.id}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 border-b border-sage-100 hover:bg-sage-50/50 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{ICON_MAP[d.mimeType] || '📎'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sage-800 truncate group-hover:text-lavender-600 transition-colors">
                  {d.name}
                </p>
                <p className="text-[10px] text-sage-400">
                  {d.category} · {formatSize(d.sizeBytes)} · {new Date(d.uploadedAt).toLocaleDateString()}
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
