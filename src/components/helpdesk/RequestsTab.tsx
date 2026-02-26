'use client'

import { useState, useRef, useCallback } from 'react'
import type { Ticket, TicketCategory } from './types'
import { fetchTickets, createTicket, captureScreenshot, startScreenRecording, startVoiceRecording } from './helpdesk-api'

const CATEGORIES: { value: TicketCategory; label: string }[] = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'billing', label: 'Billing' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'account', label: 'Account' },
  { value: 'feature_request', label: 'Feature Request' },
  { value: 'bug_report', label: 'Bug Report' },
]

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-sage-100 text-sage-600',
}

interface Props {
  clientId: string
  tickets: Ticket[]
  onRefresh: () => void
  disabled?: boolean
}

export default function RequestsTab({ clientId, tickets, onRefresh, disabled }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [category, setCategory] = useState<TicketCategory>('general')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [recording, setRecording] = useState<{ type: 'screen' | 'voice'; stop: () => Promise<File | null> } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...dropped])
  }, [])

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx))

  const handleScreenshot = async () => {
    const file = await captureScreenshot()
    if (file) setFiles((prev) => [...prev, file])
  }

  const handleScreenRecord = async () => {
    if (recording?.type === 'screen') {
      const file = await recording.stop()
      if (file) setFiles((prev) => [...prev, file])
      setRecording(null)
      return
    }
    const result = await startScreenRecording()
    if (result) setRecording({ type: 'screen', stop: result.stop })
  }

  const handleVoiceRecord = async () => {
    if (recording?.type === 'voice') {
      const file = await recording.stop()
      if (file) setFiles((prev) => [...prev, file])
      setRecording(null)
      return
    }
    const result = await startVoiceRecording()
    if (result) setRecording({ type: 'voice', stop: result.stop })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) return
    setSubmitting(true)
    try {
      await createTicket(clientId, { category, subject, description, attachments: files })
      setShowForm(false)
      setSubject('')
      setDescription('')
      setFiles([])
      setCategory('general')
      onRefresh()
    } finally {
      setSubmitting(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sage-200">
        <h3 className="text-sm font-semibold text-sage-800">Support Requests</h3>
        {!disabled && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs px-3 py-1.5 rounded-lg bg-lavender-500 text-white hover:bg-lavender-600 transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Ticket'}
          </button>
        )}
      </div>

      {/* New ticket form */}
      {showForm && !disabled && (
        <form onSubmit={handleSubmit} className="p-4 border-b border-sage-200 space-y-3 bg-sage-50/50">
          <div>
            <label className="block text-xs font-medium text-sage-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
              className="w-full text-sm px-3 py-2 border border-sage-200 rounded-lg bg-white text-sage-800 focus:outline-none focus:ring-2 focus:ring-lavender-300"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-sage-600 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary..."
              className="w-full text-sm px-3 py-2 border border-sage-200 rounded-lg bg-white text-sage-800 focus:outline-none focus:ring-2 focus:ring-lavender-300"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-sage-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your issue or question..."
              className="w-full text-sm px-3 py-2 border border-sage-200 rounded-lg bg-white text-sage-800 resize-none focus:outline-none focus:ring-2 focus:ring-lavender-300"
              required
            />
          </div>

          {/* Drag & drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors text-xs ${
              dragOver ? 'border-lavender-400 bg-lavender-50' : 'border-sage-200 hover:border-sage-300'
            }`}
          >
            <p className="text-sage-500">Drop files here or click to browse</p>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
              }}
            />
          </div>

          {/* Capture buttons */}
          <div className="flex gap-2 flex-wrap">
            <button type="button" onClick={handleScreenshot} className="text-xs px-2.5 py-1.5 border border-sage-200 rounded-lg text-sage-600 hover:bg-sage-50 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
              Screenshot
            </button>
            <button
              type="button"
              onClick={handleScreenRecord}
              className={`text-xs px-2.5 py-1.5 border rounded-lg transition-colors flex items-center gap-1 ${
                recording?.type === 'screen' ? 'border-red-300 text-red-600 bg-red-50' : 'border-sage-200 text-sage-600 hover:bg-sage-50'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2}/><path strokeLinecap="round" strokeWidth={2} d="M8 21h8M12 17v4"/></svg>
              {recording?.type === 'screen' ? 'Stop Recording' : 'Record Screen'}
            </button>
            <button
              type="button"
              onClick={handleVoiceRecord}
              className={`text-xs px-2.5 py-1.5 border rounded-lg transition-colors flex items-center gap-1 ${
                recording?.type === 'voice' ? 'border-red-300 text-red-600 bg-red-50 animate-pulse' : 'border-sage-200 text-sage-600 hover:bg-sage-50'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0M12 19v3m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z"/></svg>
              {recording?.type === 'voice' ? 'Stop Voice' : 'Voice Note'}
            </button>
          </div>

          {/* Attached files list */}
          {files.length > 0 && (
            <div className="space-y-1">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white border border-sage-100 rounded-lg px-3 py-1.5">
                  <span className="text-sage-700 truncate mr-2">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sage-400">{formatSize(f.size)}</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-sage-400 hover:text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full text-sm py-2 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>
      )}

      {/* Tickets list */}
      <div className="flex-1 overflow-y-auto">
        {tickets.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-sage-400">
            No support requests yet
          </div>
        ) : (
          tickets.map((t) => (
            <div key={t.id} className="px-4 py-3 border-b border-sage-100 hover:bg-sage-50/50 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-sage-800 leading-tight">{t.subject}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2 ${STATUS_STYLES[t.status] || ''}`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-sage-500 line-clamp-2">{t.description}</p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-sage-400">
                <span className="capitalize">{t.category.replace('_', ' ')}</span>
                <span>{new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
