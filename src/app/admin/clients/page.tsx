'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'
import type { User, Enrollment } from '@/lib/types'

export default function AdminClients() {
  const [clients, setClients] = useState<User[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<User | null>(null)

  useEffect(() => {
    setClients(dataStore.getClients())
    setEnrollments(dataStore.getEnrollments())
  }, [])

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const getClientEnrollments = (clientId: string) =>
    enrollments.filter(e => e.clientId === clientId)

  return (
    <>
      <AdminHeader title="Clients" />
      <div className="p-8">
        {/* Search & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-sage-200 rounded-xl text-sm text-sage-900 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent"
            />
          </div>
          <span className="text-sm text-sage-500 ml-4">{filtered.length} clients</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-sage-50/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-4">Client</th>
                    <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-4">Status</th>
                    <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-4">Joined</th>
                    <th className="text-left text-xs font-medium text-sage-500 uppercase tracking-wider py-3 px-4">Package</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const enrs = getClientEnrollments(c.id)
                    const active = enrs.find(e => e.status === 'ACTIVE')
                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedClient(c)}
                        className={`border-b border-sage-50 last:border-0 cursor-pointer hover:bg-sage-50/50 transition-colors ${selectedClient?.id === c.id ? 'bg-lavender-50/50' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lavender-200 to-lavender-400 flex items-center justify-center text-white text-sm font-semibold">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-sage-900">{c.name}</p>
                              <p className="text-xs text-sage-400">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${active ? getStatusColor('ACTIVE') : 'bg-gray-100 text-gray-500'}`}>
                            {active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-sage-500">{formatDate(c.createdAt)}</td>
                        <td className="py-3 px-4 text-sm text-sage-600">{active?.packageName || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Client Detail Panel */}
          <div className="lg:col-span-1">
            {selectedClient ? (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lavender-300 to-lavender-500 flex items-center justify-center text-white text-2xl font-serif font-bold mx-auto mb-3">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-sage-900">{selectedClient.name}</h3>
                  <p className="text-sm text-sage-500">{selectedClient.email}</p>
                  {selectedClient.phone && <p className="text-sm text-sage-400">{selectedClient.phone}</p>}
                </div>

                <div className="space-y-4">
                  <div className="bg-sage-50 rounded-xl p-4">
                    <h4 className="text-xs font-medium text-sage-500 uppercase tracking-wider mb-2">Enrollments</h4>
                    {getClientEnrollments(selectedClient.id).length === 0 ? (
                      <p className="text-sm text-sage-400">No enrollments</p>
                    ) : (
                      getClientEnrollments(selectedClient.id).map(e => (
                        <div key={e.id} className="flex items-center justify-between py-2 border-b border-sage-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-sage-800">{e.packageName}</p>
                            <p className="text-xs text-sage-400">{e.sessionsUsed}/{e.sessionsTotal} sessions</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(e.status)}`}>
                            {e.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-sage-50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-sage-900">
                        {dataStore.getBookings().filter(b => b.clientId === selectedClient.id && b.status === 'COMPLETED').length}
                      </p>
                      <p className="text-[10px] text-sage-500 uppercase">Completed</p>
                    </div>
                    <div className="bg-sage-50 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-sage-900">
                        {dataStore.getBookings().filter(b => b.clientId === selectedClient.id && b.status === 'SCHEDULED').length}
                      </p>
                      <p className="text-[10px] text-sage-500 uppercase">Upcoming</p>
                    </div>
                  </div>

                  <p className="text-xs text-sage-400 text-center">Joined {formatDate(selectedClient.createdAt)} · {selectedClient.timezone}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-8 text-center">
                <svg className="w-12 h-12 text-sage-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm text-sage-400">Select a client to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
