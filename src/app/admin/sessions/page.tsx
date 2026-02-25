'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatDateTime, formatDate, getStatusColor } from '@/lib/utils'
import type { Booking } from '@/lib/types'

export default function AdminSessions() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<string>('ALL')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    setBookings(dataStore.getBookings().sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()))
  }, [])

  const filtered = filter === 'ALL' ? bookings : bookings.filter(b => b.status === filter)
  const counts = {
    ALL: bookings.length,
    SCHEDULED: bookings.filter(b => b.status === 'SCHEDULED').length,
    COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
  }

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: newStatus as Booking['status'] } : b)
    setBookings(updated)
    dataStore.saveBookings(updated)
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus as Booking['status'] })
    }
  }

  const handleSaveNote = (bookingId: string) => {
    if (!noteText.trim()) return
    const updated = bookings.map(b => b.id === bookingId ? { ...b, notes: noteText } : b)
    setBookings(updated)
    dataStore.saveBookings(updated)
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, notes: noteText })
    }
  }

  return (
    <>
      <AdminHeader title="Sessions" />
      <div className="p-8">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6">
          {(['ALL', 'SCHEDULED', 'COMPLETED', 'CANCELLED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-sage-900 text-white'
                  : 'bg-white text-sage-600 hover:bg-sage-50 border border-sage-200'
              }`}
            >
              {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()} ({counts[f]})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sage-400">No sessions found</p>
                </div>
              ) : (
                <div className="divide-y divide-sage-50">
                  {filtered.map(b => (
                    <div
                      key={b.id}
                      onClick={() => { setSelectedBooking(b); setNoteText(b.notes || '') }}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-sage-50/50 transition-colors ${
                        selectedBooking?.id === b.id ? 'bg-lavender-50/50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center text-lavender-700 text-sm font-semibold">
                          {b.clientName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-sage-900">{b.clientName}</p>
                          <p className="text-xs text-sage-400">{b.packageName} · {b.duration}min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-sage-700">{formatDateTime(b.scheduledAt)}</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Session Detail */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6 space-y-5 sticky top-24">
                <div>
                  <h3 className="text-lg font-serif font-bold text-sage-900">Session Details</h3>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Client</span>
                    <span className="text-sage-900 font-medium">{selectedBooking.clientName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Date & Time</span>
                    <span className="text-sage-900">{formatDateTime(selectedBooking.scheduledAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Duration</span>
                    <span className="text-sage-900">{selectedBooking.duration} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-500">Package</span>
                    <span className="text-sage-900">{selectedBooking.packageName || '—'}</span>
                  </div>
                  {selectedBooking.meetingLink && (
                    <div>
                      <span className="text-sm text-sage-500">Meeting Link</span>
                      <a href={selectedBooking.meetingLink} target="_blank" rel="noopener" className="block text-sm text-lavender-600 hover:underline truncate mt-0.5">
                        {selectedBooking.meetingLink}
                      </a>
                    </div>
                  )}
                </div>

                {/* Status Actions */}
                {selectedBooking.status === 'SCHEDULED' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'COMPLETED')}
                      className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'CANCELLED')}
                      className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Session Notes */}
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1.5">Session Notes</label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add notes about this session..."
                    rows={4}
                    className="w-full px-3 py-2.5 bg-sage-50/50 border border-sage-200 rounded-xl text-sm text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent resize-none"
                  />
                  <button
                    onClick={() => handleSaveNote(selectedBooking.id)}
                    className="mt-2 w-full bg-sage-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-sage-800 transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-8 text-center">
                <svg className="w-12 h-12 text-sage-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-sage-400">Select a session to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
