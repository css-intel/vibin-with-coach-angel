'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { MessageThread, Message } from './types'
import { fetchThreads, fetchMessages, postMessage } from './helpdesk-api'

interface Props {
  clientId: string
  disabled?: boolean
}

export default function MessagesTab({ clientId, disabled }: Props) {
  const [threads, setThreads] = useState<MessageThread[]>([])
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const loadThreads = useCallback(async () => {
    const data = await fetchThreads(clientId)
    setThreads(data)
    setLoading(false)
  }, [clientId])

  const loadMessages = useCallback(async (threadId: string) => {
    const data = await fetchMessages(threadId)
    setMessages(data)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  // Initial load
  useEffect(() => { loadThreads() }, [loadThreads])

  // Auto-refresh every 30s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      loadThreads()
      if (activeThread) loadMessages(activeThread)
    }, 30000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [loadThreads, loadMessages, activeThread])

  const openThread = (threadId: string) => {
    setActiveThread(threadId)
    loadMessages(threadId)
  }

  const handleSend = async () => {
    if (!reply.trim() || !activeThread || disabled) return
    setSending(true)
    try {
      const msg = await postMessage(activeThread, reply, clientId, 'You')
      setMessages((prev) => [...prev, msg])
      setReply('')
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    } finally {
      setSending(false)
    }
  }

  // Thread list view
  if (!activeThread) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-sage-200">
          <h3 className="text-sm font-semibold text-sage-800">Messages</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-5 h-5 border-2 border-lavender-300 border-t-lavender-600 rounded-full animate-spin" />
            </div>
          ) : threads.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-sage-400">
              No messages yet
            </div>
          ) : (
            threads.map((t) => (
              <button
                key={t.id}
                onClick={() => openThread(t.id)}
                className="w-full text-left px-4 py-3 border-b border-sage-100 hover:bg-sage-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-sage-800 truncate pr-2">{t.subject}</p>
                  {t.unreadCount > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lavender-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {t.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-sage-500 truncate">{t.lastMessage}</p>
                <p className="text-[10px] text-sage-400 mt-1">
                  {new Date(t.lastMessageAt).toLocaleDateString()} · {t.participants.map((p) => p.name).join(', ')}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    )
  }

  // Conversation view
  const thread = threads.find((t) => t.id === activeThread)

  return (
    <div className="flex flex-col h-full">
      {/* Thread header */}
      <div className="px-4 py-3 border-b border-sage-200 flex items-center gap-2">
        <button
          onClick={() => setActiveThread(null)}
          className="text-sage-400 hover:text-sage-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-sage-800 truncate">{thread?.subject || 'Thread'}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.senderRole === 'client' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                m.senderRole === 'client'
                  ? 'bg-lavender-500 text-white rounded-br-md'
                  : 'bg-sage-100 text-sage-800 rounded-bl-md'
              }`}
            >
              {m.body}
            </div>
            <span className="text-[10px] text-sage-400 mt-1 px-1">
              {m.senderName} · {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Reply input */}
      {!disabled && (
        <div className="p-3 border-t border-sage-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Type a reply..."
              className="flex-1 text-sm px-3 py-2 border border-sage-200 rounded-lg bg-white text-sage-800 focus:outline-none focus:ring-2 focus:ring-lavender-300"
            />
            <button
              onClick={handleSend}
              disabled={sending || !reply.trim()}
              className="px-3 py-2 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 disabled:opacity-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
