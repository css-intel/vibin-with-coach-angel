'use client'

import { useState, useEffect, useMemo } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import { getDayName } from '@/lib/utils'
import type { AvailabilitySlot, Enrollment, CoachingPackage } from '@/lib/types'

export default function DashboardBooking() {
  const { user } = useAuth()
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [packages, setPackages] = useState<CoachingPackage[]>([])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedEnrollment, setSelectedEnrollment] = useState<string>('')
  const [booked, setBooked] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    setAvailability(dataStore.getAvailability().filter(a => a.isActive))
    const allEnrollments = dataStore.getEnrollments()
    setEnrollments(allEnrollments.filter(e => e.clientId === user?.id && e.status === 'ACTIVE'))
    setPackages(dataStore.getPackages())
  }, [user])

  const getPkg = (id: string) => packages.find(p => p.id === id)

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const days: { date: string; day: number; available: boolean; past: boolean }[] = []
    for (let i = 0; i < firstDay; i++) days.push({ date: '', day: 0, available: false, past: true })

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      const dayOfWeek = date.getDay()
      const dateStr = date.toISOString().split('T')[0]
      const hasSlots = availability.some(s => s.dayOfWeek === dayOfWeek)
      const isPast = date < today
      days.push({ date: dateStr, day: d, available: hasSlots && !isPast, past: isPast })
    }
    return days
  }, [currentMonth, availability])

  // Available times for selected date
  const availableTimes = useMemo(() => {
    if (!selectedDate) return []
    const dayOfWeek = new Date(selectedDate + 'T12:00:00').getDay()
    const daySlots = availability.filter(s => s.dayOfWeek === dayOfWeek)
    const times: string[] = []
    daySlots.forEach(slot => {
      const [startH] = slot.startTime.split(':').map(Number)
      const [endH] = slot.endTime.split(':').map(Number)
      for (let h = startH; h < endH; h++) {
        times.push(`${h.toString().padStart(2, '0')}:00`)
        times.push(`${h.toString().padStart(2, '0')}:30`)
      }
    })
    return times
  }, [selectedDate, availability])

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !selectedEnrollment) return
    const enrollment = enrollments.find(e => e.id === selectedEnrollment)
    const pkg = enrollment ? getPkg(enrollment.packageId) : null
    const duration = pkg?.sessionDuration || 60

    const startTime = new Date(`${selectedDate}T${selectedTime}:00`)

    const allBookings = dataStore.getBookings()
    const newBooking = {
      id: `book-${Math.random().toString(36).substring(2, 7)}`,
      clientId: user?.id || '',
      clientName: user?.name || '',
      clientEmail: user?.email || '',
      coachId: 'admin-001',
      enrollmentId: selectedEnrollment,
      scheduledAt: startTime.toISOString(),
      duration,
      status: 'SCHEDULED' as const,
      meetingLink: 'https://zoom.us/j/1234567890',
      packageName: pkg?.name || '',
    }
    allBookings.push(newBooking)
    dataStore.saveBookings(allBookings)

    // Update enrollment sessions used
    const allEnrollments = dataStore.getEnrollments()
    const updated = allEnrollments.map(e => e.id === selectedEnrollment ? { ...e, sessionsUsed: e.sessionsUsed + 1 } : e)
    dataStore.saveEnrollments(updated)

    setBooked(true)
    setTimeout(() => {
      setBooked(false)
      setSelectedDate('')
      setSelectedTime('')
    }, 3000)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <>
      <DashboardHeader title="Book a Session" />
      <div className="p-8">
        {booked && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <p className="text-sm font-medium text-green-700">Session booked successfully! Check your sessions page for details.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Select Package */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-lavender-100 flex items-center justify-center text-xs font-bold text-lavender-700">1</div>
              <h3 className="font-serif font-bold text-sage-900">Select Package</h3>
            </div>
            {enrollments.length > 0 ? (
              <div className="space-y-2">
                {enrollments.map(e => {
                  const pkg = getPkg(e.packageId)
                  const remaining = (pkg?.sessionCount || 0) - e.sessionsUsed
                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelectedEnrollment(e.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedEnrollment === e.id ? 'border-lavender-400 bg-lavender-50' : 'border-sage-100 hover:border-sage-200'
                      }`}
                    >
                      <p className="text-sm font-medium text-sage-900">{pkg?.name}</p>
                      <p className="text-xs text-sage-500">{remaining} sessions remaining &middot; {pkg?.sessionDuration}min</p>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-sage-400 text-center py-4">No active packages. Contact your coach to enroll.</p>
            )}
          </div>

          {/* Step 2: Select Date */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-lavender-100 flex items-center justify-center text-xs font-bold text-lavender-700">2</div>
              <h3 className="font-serif font-bold text-sage-900">Select Date</h3>
            </div>
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 rounded hover:bg-sage-50">
                <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-sm font-medium text-sage-900">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 rounded hover:bg-sage-50">
                <svg className="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-center text-[10px] font-medium text-sage-400 py-1">{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => (
                <button
                  key={i}
                  disabled={!d.available || !d.day}
                  onClick={() => { if (d.available) setSelectedDate(d.date) }}
                  className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                    !d.day ? '' :
                    selectedDate === d.date ? 'bg-lavender-500 text-white font-bold' :
                    d.available ? 'text-sage-700 hover:bg-lavender-50 font-medium' :
                    'text-sage-300 cursor-not-allowed'
                  }`}
                >
                  {d.day || ''}
                </button>
              ))}
            </div>
            {selectedDate && (
              <p className="mt-3 text-xs text-center text-lavender-600 font-medium">
                {getDayName(new Date(selectedDate + 'T12:00:00').getDay())}, {selectedDate}
              </p>
            )}
          </div>

          {/* Step 3: Select Time */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-lavender-100 flex items-center justify-center text-xs font-bold text-lavender-700">3</div>
              <h3 className="font-serif font-bold text-sage-900">Select Time</h3>
            </div>
            {selectedDate && availableTimes.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {availableTimes.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-3 py-2 text-sm rounded-xl border transition-all ${
                        selectedTime === t ? 'border-lavender-400 bg-lavender-50 text-lavender-700 font-medium' : 'border-sage-100 text-sage-600 hover:border-sage-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {selectedTime && selectedEnrollment && (
                  <button
                    onClick={handleBook}
                    className="w-full mt-4 bg-sage-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors"
                  >
                    Confirm Booking
                  </button>
                )}
              </>
            ) : (
              <p className="text-sm text-sage-400 text-center py-4">
                {selectedDate ? 'No available times for this date' : 'Select a date to view available times'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
