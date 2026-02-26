'use client'

import { useState, useEffect, useCallback } from 'react'
import type { HelpdeskTab, HelpdeskProps, HelpdeskStatus, Ticket } from './types'
import { fetchHelpdeskStatus, fetchTickets } from './helpdesk-api'
import RequestsTab from './RequestsTab'
import MessagesTab from './MessagesTab'
import DocumentsTab from './DocumentsTab'
import BillingTab from './BillingTab'
import ReportsTab from './ReportsTab'

// ─── Tab config ─────────────────────────────────────

const TABS: { key: HelpdeskTab; label: string; icon: JSX.Element }[] = [
  {
    key: 'requests',
    label: 'Requests',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    key: 'documents',
    label: 'Docs',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'billing',
    label: 'Billing',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

// ─── Main Component ─────────────────────────────────

export default function Helpdesk({ clientId }: HelpdeskProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<HelpdeskTab>('requests')
  const [status, setStatus] = useState<HelpdeskStatus>({ helpdesk_status: 'active' })
  const [tickets, setTickets] = useState<Ticket[]>([])

  const isRestricted = status.helpdesk_status === 'restricted'

  const loadStatus = useCallback(async () => {
    const s = await fetchHelpdeskStatus(clientId)
    setStatus(s)
  }, [clientId])

  const loadTickets = useCallback(async () => {
    const t = await fetchTickets(clientId)
    setTickets(t)
  }, [clientId])

  useEffect(() => {
    loadStatus()
    loadTickets()
  }, [loadStatus, loadTickets])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* FAB trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close Helpdesk' : 'Open Helpdesk'}
        className={`
          fixed bottom-6 right-6 z-[9998]
          w-12 h-12 rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 transform
          ${open
            ? 'bg-sage-600 text-white rotate-45 hover:bg-sage-700'
            : 'bg-lavender-500 text-white hover:bg-lavender-600 hover:scale-110'
          }
        `}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-[9998] transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`
          fixed top-0 right-0 z-[9999]
          h-full w-[380px] max-w-[90vw]
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ fontFamily: 'inherit' }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sage-700 to-sage-800 text-white">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h2 className="text-sm font-semibold tracking-wide">Helpdesk</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close helpdesk"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Restricted banner */}
        {isRestricted && (
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-200">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-amber-800">Helpdesk Access Restricted</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {status.message || 'Your subscription requires attention to continue using support features.'}
                </p>
                {status.subscription_url && (
                  <a
                    href={status.subscription_url}
                    className="inline-block mt-2 text-xs font-medium px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Update Billing →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex border-b border-sage-200 bg-sage-50/50">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`
                flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors relative
                ${tab === t.key
                  ? 'text-lavender-600'
                  : 'text-sage-400 hover:text-sage-600'
                }
              `}
            >
              {t.icon}
              <span>{t.label}</span>
              {tab === t.key && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-lavender-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden">
          {tab === 'requests' && (
            <RequestsTab
              clientId={clientId}
              tickets={tickets}
              onRefresh={loadTickets}
              disabled={isRestricted}
            />
          )}
          {tab === 'messages' && (
            <MessagesTab clientId={clientId} disabled={isRestricted} />
          )}
          {tab === 'documents' && (
            <DocumentsTab clientId={clientId} />
          )}
          {tab === 'billing' && (
            <BillingTab clientId={clientId} />
          )}
          {tab === 'reports' && (
            <ReportsTab clientId={clientId} />
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-sage-100 bg-sage-50/50 text-center">
          <p className="text-[10px] text-sage-400">VIBIN with Coach Angel · Helpdesk</p>
        </div>
      </div>
    </>
  )
}
