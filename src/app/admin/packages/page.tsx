'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import type { CoachingPackage } from '@/lib/types'

export default function AdminPackages() {
  const [packages, setPackages] = useState<CoachingPackage[]>([])
  const [editing, setEditing] = useState<CoachingPackage | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setPackages(dataStore.getPackages())
  }, [])

  const emptyPackage: CoachingPackage = {
    id: '', name: '', description: '', packageType: 'ONE_ON_ONE', billingType: 'ONE_TIME',
    priceInCents: 0, currency: 'usd', sessionCount: 1, sessionDuration: 60, isActive: true, features: [],
  }

  const handleSave = (pkg: CoachingPackage) => {
    let updated: CoachingPackage[]
    if (pkg.id) {
      updated = packages.map(p => p.id === pkg.id ? pkg : p)
    } else {
      const newPkg = { ...pkg, id: `pkg-${Math.random().toString(36).substring(2, 7)}` }
      updated = [...packages, newPkg]
    }
    setPackages(updated)
    dataStore.savePackages(updated)
    setEditing(null)
    setShowForm(false)
  }

  const toggleActive = (id: string) => {
    const updated = packages.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p)
    setPackages(updated)
    dataStore.savePackages(updated)
  }

  return (
    <>
      <AdminHeader title="Packages" />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sage-500 text-sm">{packages.length} packages configured</p>
          <button
            onClick={() => { setEditing(emptyPackage); setShowForm(true) }}
            className="bg-sage-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Add Package</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className={`bg-white rounded-2xl shadow-sm border ${pkg.isActive ? 'border-sage-100' : 'border-red-100 opacity-60'} p-6 hover:shadow-md transition-all`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-serif font-bold text-sage-900">{pkg.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${pkg.packageType === 'GROUP' ? 'bg-lavender-100 text-lavender-700' : 'bg-sage-100 text-sage-700'}`}>
                      {pkg.packageType === 'GROUP' ? 'Group' : '1:1'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-sage-900 mt-1">
                    {pkg.priceInCents === 0 ? 'Free' : formatCurrency(pkg.priceInCents)}
                    {pkg.billingType === 'RECURRING' && <span className="text-sm font-normal text-sage-400">/mo</span>}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => { setEditing(pkg); setShowForm(true) }}
                    className="p-1.5 text-sage-400 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button
                    onClick={() => toggleActive(pkg.id)}
                    className={`p-1.5 rounded-lg transition-colors ${pkg.isActive ? 'text-green-500 hover:bg-green-50' : 'text-red-400 hover:bg-red-50'}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      {pkg.isActive ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-sage-500 mb-4 line-clamp-2">{pkg.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-lg">{pkg.sessionCount} sessions</span>
                <span className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-lg">{pkg.sessionDuration} min each</span>
                {pkg.maxGroupSize && <span className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-lg">Max {pkg.maxGroupSize} people</span>}
              </div>
              <ul className="space-y-1">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-sage-600">
                    <svg className="w-3.5 h-3.5 text-lavender-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
                {pkg.features.length > 4 && <li className="text-xs text-sage-400">+{pkg.features.length - 4} more</li>}
              </ul>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {showForm && editing && (
          <PackageForm
            pkg={editing}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditing(null) }}
          />
        )}
      </div>
    </>
  )
}

function PackageForm({ pkg, onSave, onClose }: { pkg: CoachingPackage; onSave: (p: CoachingPackage) => void; onClose: () => void }) {
  const [form, setForm] = useState(pkg)
  const [featuresText, setFeaturesText] = useState(pkg.features.join('\n'))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, features: featuresText.split('\n').filter(f => f.trim()) })
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-sage-100 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-sage-900">{pkg.id ? 'Edit' : 'New'} Package</h2>
          <button onClick={onClose} className="p-1 text-sage-400 hover:text-sage-700"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Price ($)</label>
              <input type="number" step="0.01" value={(form.priceInCents / 100).toFixed(2)} onChange={e => setForm({...form, priceInCents: Math.round(parseFloat(e.target.value || '0') * 100)})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Type</label>
              <select value={form.packageType} onChange={e => setForm({...form, packageType: e.target.value as 'ONE_ON_ONE' | 'GROUP'})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent">
                <option value="ONE_ON_ONE">1:1</option>
                <option value="GROUP">Group</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1"># Sessions</label>
              <input type="number" value={form.sessionCount} onChange={e => setForm({...form, sessionCount: parseInt(e.target.value) || 1})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Duration (min)</label>
              <input type="number" value={form.sessionDuration} onChange={e => setForm({...form, sessionDuration: parseInt(e.target.value) || 60})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Features (one per line)</label>
            <textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} rows={4} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent resize-none" placeholder="60-min session&#10;Email support&#10;Resource access" />
          </div>
          <div className="flex space-x-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-sage-100 text-sage-700 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-sage-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Package</button>
          </div>
        </form>
      </div>
    </div>
  )
}
