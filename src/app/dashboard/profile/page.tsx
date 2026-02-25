'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import type { User } from '@/lib/types'

export default function DashboardProfile() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', timezone: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    const clients = dataStore.getClients()
    const me = clients.find(c => c.id === user.id) || user
    setProfile(me)
    setForm({ name: me.name, email: me.email, phone: me.phone || '', timezone: me.timezone || '' })
  }, [user])

  const handleSave = () => {
    if (!profile) return
    const clients = dataStore.getClients()
    const idx = clients.findIndex(c => c.id === profile.id)
    if (idx >= 0) {
      clients[idx] = { ...clients[idx], name: form.name, email: form.email, phone: form.phone, timezone: form.timezone }
      dataStore.saveClients(clients)
      setProfile(clients[idx])
    }
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!profile) return null

  return (
    <>
      <DashboardHeader title="My Profile" />
      <div className="p-8 max-w-2xl">
        {saved && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium">Profile saved successfully!</div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6">
          {/* Avatar & Name */}
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-sage-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-warmth-400 to-lavender-400 flex items-center justify-center text-white text-xl font-bold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sage-900">{profile.name}</h2>
              <p className="text-sm text-sage-500">{profile.email}</p>
              <p className="text-xs text-sage-400 mt-0.5">Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-sage-600 mb-1">Full Name</label>
              {editing ? (
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-sage-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300" />
              ) : (
                <p className="text-sm text-sage-900">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-sage-600 mb-1">Email</label>
              {editing ? (
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-sage-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300" />
              ) : (
                <p className="text-sm text-sage-900">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-sage-600 mb-1">Phone</label>
              {editing ? (
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-sage-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300" />
              ) : (
                <p className="text-sm text-sage-900">{profile.phone || '—'}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-sage-600 mb-1">Timezone</label>
              {editing ? (
                <select value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} className="w-full border border-sage-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300 bg-white">
                  <option value="America/New_York">Eastern (ET)</option>
                  <option value="America/Chicago">Central (CT)</option>
                  <option value="America/Denver">Mountain (MT)</option>
                  <option value="America/Los_Angeles">Pacific (PT)</option>
                  <option value="America/Anchorage">Alaska (AKT)</option>
                  <option value="Pacific/Honolulu">Hawaii (HST)</option>
                </select>
              ) : (
                <p className="text-sm text-sage-900">{profile.timezone || '—'}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-sage-100">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="px-4 py-2 text-sm text-sage-600 rounded-xl hover:bg-sage-50">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm bg-sage-900 text-white rounded-xl hover:bg-sage-800">Save Changes</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="px-4 py-2 text-sm bg-sage-900 text-white rounded-xl hover:bg-sage-800">Edit Profile</button>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6 mt-6">
          <h3 className="text-sm font-semibold text-sage-900 mb-3">Password</h3>
          <p className="text-xs text-sage-500 mb-3">Contact your coach to reset your password.</p>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 mt-6">
          <h3 className="text-sm font-semibold text-red-700 mb-2">Sign Out</h3>
          <p className="text-xs text-sage-500 mb-4">This will end your current session.</p>
          <button onClick={logout} className="px-4 py-2 text-sm bg-red-600 text-white rounded-xl hover:bg-red-700">Sign Out</button>
        </div>
      </div>
    </>
  )
}
