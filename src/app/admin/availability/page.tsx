'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { getDayName } from '@/lib/utils'
import type { AvailabilitySlot } from '@/lib/types'

const DAYS = [0, 1, 2, 3, 4, 5, 6] as const
const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)

export default function AdminAvailability() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setSlots(dataStore.getAvailability())
  }, [])

  const slotsByDay = DAYS.map(day => ({
    day,
    name: getDayName(day),
    slots: slots.filter(s => s.dayOfWeek === day).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }))

  const handleSave = (slot: AvailabilitySlot) => {
    let updated: AvailabilitySlot[]
    if (slot.id && slots.find(s => s.id === slot.id)) {
      updated = slots.map(s => s.id === slot.id ? slot : s)
    } else {
      updated = [...slots, { ...slot, id: `avail-${Math.random().toString(36).substring(2, 7)}` }]
    }
    setSlots(updated)
    dataStore.saveAvailability(updated)
    setShowForm(false)
    setEditingSlot(null)
  }

  const handleDelete = (id: string) => {
    const updated = slots.filter(s => s.id !== id)
    setSlots(updated)
    dataStore.saveAvailability(updated)
  }

  const toggleSlot = (id: string) => {
    const updated = slots.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    setSlots(updated)
    dataStore.saveAvailability(updated)
  }

  const emptySlot: AvailabilitySlot = {
    id: '', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true,
  }

  return (
    <>
      <AdminHeader title="Availability" />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-sage-500">Configure your weekly availability for client bookings</p>
          </div>
          <button
            onClick={() => { setEditingSlot(emptySlot); setShowForm(true) }}
            className="bg-sage-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Add Time Slot</span>
          </button>
        </div>

        {/* Weekly Grid */}
        <div className="space-y-3">
          {slotsByDay.map(({ day, name, slots: daySlots }) => (
            <div key={day} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif font-bold text-sage-900">{name}</h3>
                {daySlots.length === 0 && <span className="text-xs text-sage-400 italic">No availability</span>}
              </div>
              {daySlots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {daySlots.map(slot => (
                    <div key={slot.id} className={`group relative flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all ${
                      slot.isActive
                        ? 'bg-lavender-50 border-lavender-200 text-lavender-700'
                        : 'bg-sage-50 border-sage-200 text-sage-400 line-through'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium">{slot.startTime} – {slot.endTime}</span>
                      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-0.5 ml-1 transition-opacity">
                        <button onClick={() => toggleSlot(slot.id)} className={`p-0.5 rounded ${slot.isActive ? 'hover:bg-lavender-100' : 'hover:bg-sage-200'}`}>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            {slot.isActive ? (
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            ) : (
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            )}
                          </svg>
                        </button>
                        <button onClick={() => { setEditingSlot(slot); setShowForm(true) }} className="p-0.5 rounded hover:bg-lavender-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(slot.id)} className="p-0.5 rounded hover:bg-red-100 text-red-400">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => { setEditingSlot({ ...emptySlot, dayOfWeek: day }); setShowForm(true) }}
                    className="text-xs text-lavender-600 hover:text-lavender-800 font-medium flex items-center space-x-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span>Add availability</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timezone note */}
        <div className="mt-6 bg-lavender-50 border border-lavender-200 rounded-2xl p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-lavender-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-lavender-700">Timezone</p>
            <p className="text-xs text-lavender-600 mt-0.5">All times shown in your local timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone}). Clients will see times converted to their timezone.</p>
          </div>
        </div>

        {/* Slot Form Modal */}
        {showForm && editingSlot && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
              <div className="p-6 border-b border-sage-100 flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-sage-900">{editingSlot.id ? 'Edit' : 'Add'} Time Slot</h2>
                <button onClick={() => { setShowForm(false); setEditingSlot(null) }} className="p-1 text-sage-400 hover:text-sage-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(editingSlot) }} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Day</label>
                  <select value={editingSlot.dayOfWeek} onChange={e => setEditingSlot({...editingSlot, dayOfWeek: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent">
                    {DAYS.map(d => <option key={d} value={d}>{getDayName(d)}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Start Time</label>
                    <select value={editingSlot.startTime} onChange={e => setEditingSlot({...editingSlot, startTime: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent">
                      {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">End Time</label>
                    <select value={editingSlot.endTime} onChange={e => setEditingSlot({...editingSlot, endTime: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent">
                      {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); setEditingSlot(null) }} className="flex-1 bg-sage-100 text-sage-700 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-sage-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
