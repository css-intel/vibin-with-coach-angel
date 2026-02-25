'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import type { Resource } from '@/lib/types'

const CATEGORIES = ['Worksheet', 'Guide', 'Video', 'Audio', 'Template', 'Other']
const ICONS: Record<string, string> = {
  Worksheet: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Guide: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  Video: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  Audio: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  Template: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  Other: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
}

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [editing, setEditing] = useState<Resource | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setResources(dataStore.getResources())
  }, [])

  const filtered = resources.filter(r => {
    if (filter !== 'All' && r.category !== filter) return false
    if (search) return r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
    return true
  })

  const emptyResource: Resource = {
    id: '', title: '', description: '', category: 'Worksheet', fileUrl: '', fileType: 'pdf', isPublic: false, createdAt: new Date().toISOString(),
  }

  const handleSave = (res: Resource) => {
    let updated: Resource[]
    if (res.id && resources.find(r => r.id === res.id)) {
      updated = resources.map(r => r.id === res.id ? res : r)
    } else {
      updated = [...resources, { ...res, id: `res-${Math.random().toString(36).substring(2, 7)}`, createdAt: new Date().toISOString() }]
    }
    setResources(updated)
    dataStore.saveResources(updated)
    setShowForm(false)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    const updated = resources.filter(r => r.id !== id)
    setResources(updated)
    dataStore.saveResources(updated)
  }

  return (
    <>
      <AdminHeader title="Resources" />
      <div className="p-8">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-3 items-center flex-1">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
            </div>
            <div className="flex space-x-1 bg-sage-100 rounded-xl p-1">
              {['All', ...CATEGORIES].map(c => (
                <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${filter === c ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'}`}>{c}</button>
              ))}
            </div>
          </div>
          <button onClick={() => { setEditing(emptyResource); setShowForm(true) }} className="bg-sage-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Add Resource</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(res => (
            <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  res.category === 'Video' ? 'bg-red-100 text-red-600' :
                  res.category === 'Audio' ? 'bg-purple-100 text-purple-600' :
                  res.category === 'Guide' ? 'bg-blue-100 text-blue-600' :
                  'bg-lavender-100 text-lavender-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS[res.category] || ICONS.Other} /></svg>
                </div>
                <div className="flex space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing(res); setShowForm(true) }} className="p-1.5 text-sage-400 hover:text-sage-700 hover:bg-sage-50 rounded-lg">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(res.id)} className="p-1.5 text-sage-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <h3 className="font-serif font-bold text-sage-900 mb-1">{res.title}</h3>
              <p className="text-sm text-sage-500 mb-3 line-clamp-2">{res.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-sage-100 text-sage-600 px-2 py-0.5 rounded-full">{res.category}</span>
                <div className="flex items-center space-x-2">
                  {res.isPublic && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Public</span>}
                  <span className="text-xs text-sage-400">{formatDate(res.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sage-400 text-sm">No resources found</div>
        )}

        {/* Resource Form Modal */}
        {showForm && editing && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-sage-100 flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-sage-900">{editing.id ? 'Edit' : 'New'} Resource</h2>
                <button onClick={() => { setShowForm(false); setEditing(null) }} className="p-1 text-sage-400 hover:text-sage-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(editing) }} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Title</label>
                  <input type="text" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Description</label>
                  <textarea value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} rows={3} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Category</label>
                    <select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="relative inline-flex items-center cursor-pointer mb-2">
                      <input type="checkbox" checked={editing.isPublic} onChange={e => setEditing({...editing, isPublic: e.target.checked})} className="sr-only peer" />
                      <div className="w-9 h-5 bg-sage-200 peer-focus:ring-2 peer-focus:ring-lavender-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lavender-500"></div>
                      <span className="ml-2 text-sm text-sage-600">Public</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">File URL / Link</label>
                  <input type="url" value={editing.fileUrl} onChange={e => setEditing({...editing, fileUrl: e.target.value})} placeholder="https://" className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="flex-1 bg-sage-100 text-sage-700 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-sage-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Resource</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
