'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { dataStore } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import type { ContractTemplate, ContractSignature } from '@/lib/types'

export default function AdminContracts() {
  const [templates, setTemplates] = useState<ContractTemplate[]>([])
  const [signatures, setSignatures] = useState<ContractSignature[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [tab, setTab] = useState<'templates' | 'signatures'>('templates')

  useEffect(() => {
    setTemplates(dataStore.getContracts())
    setSignatures(dataStore.getSignatures())
  }, [])

  const getTemplate = (id: string) => templates.find(t => t.id === id)

  const handleSaveTemplate = (tmpl: ContractTemplate) => {
    let updated: ContractTemplate[]
    if (tmpl.id && templates.find(t => t.id === tmpl.id)) {
      updated = templates.map(t => t.id === tmpl.id ? tmpl : t)
    } else {
      updated = [...templates, { ...tmpl, id: `ctr-${Math.random().toString(36).substring(2, 7)}` }]
    }
    setTemplates(updated)
    dataStore.saveContracts(updated)
    setShowEditor(false)
    setSelectedTemplate(null)
  }

  const emptyTemplate: ContractTemplate = {
    id: '', name: '', content: '', version: 1, isActive: true,
  }

  const sigStatusCounts = {
    all: signatures.length,
    signed: signatures.filter(s => s.status === 'SIGNED').length,
    pending: signatures.filter(s => s.status === 'PENDING').length,
  }

  return (
    <>
      <AdminHeader title="Contracts" />
      <div className="p-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-sage-100 rounded-xl p-1 w-fit mb-6">
          <button onClick={() => setTab('templates')} className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${tab === 'templates' ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'}`}>Templates</button>
          <button onClick={() => setTab('signatures')} className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${tab === 'signatures' ? 'bg-white text-sage-900 shadow-sm' : 'text-sage-500 hover:text-sage-700'}`}>Signatures</button>
        </div>

        {tab === 'templates' ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-sage-500">{templates.length} templates</p>
              <button
                onClick={() => { setSelectedTemplate(emptyTemplate); setShowEditor(true) }}
                className="bg-sage-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span>New Template</span>
              </button>
            </div>

            <div className="space-y-3">
              {templates.map(tmpl => (
                <div key={tmpl.id} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-serif font-bold text-sage-900">{tmpl.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tmpl.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {tmpl.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-0.5 bg-sage-100 text-sage-500 rounded-full text-[10px] font-medium">v{tmpl.version}</span>
                      </div>
                      <p className="text-sm text-sage-500 line-clamp-2">{tmpl.content.substring(0, 150)}...</p>
                      <div className="flex space-x-4 mt-2 text-xs text-sage-400">
                        <span>{signatures.filter(s => s.contractId === tmpl.id).length} signatures</span>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-3">
                      <button onClick={() => { setSelectedTemplate(tmpl); setShowEditor(true) }} className="p-2 text-sage-400 hover:text-sage-700 hover:bg-sage-50 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Signature status pills */}
            <div className="flex space-x-2 mb-4">
              {(['all', 'signed', 'pending'] as const).map(s => (
                <span key={s} className={`px-3 py-1 rounded-full text-xs font-medium ${
                  s === 'signed' ? 'bg-green-100 text-green-700' :
                  s === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-sage-100 text-sage-600'
                }`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}: {sigStatusCounts[s]}
                </span>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sage-100 text-left">
                    <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Client</th>
                    <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Contract</th>
                    <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Sent</th>
                    <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Signed</th>
                    <th className="px-5 py-3 text-xs font-medium text-sage-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-50">
                  {signatures.map(sig => {
                    return (
                      <tr key={sig.id} className="hover:bg-sage-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-lavender-100 flex items-center justify-center text-sm font-medium text-lavender-700">
                              {sig.userName?.charAt(0) || '?'}
                            </div>
                            <span className="text-sm font-medium text-sage-900">{sig.userName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-sage-600">{sig.contractName || 'Unknown'}</td>
                        <td className="px-5 py-3 text-sm text-sage-500">{sig.signedAt ? formatDate(sig.signedAt) : '—'}</td>
                        <td className="px-5 py-3 text-sm text-sage-500">{sig.signedAt && sig.status === 'SIGNED' ? formatDate(sig.signedAt) : '—'}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            sig.status === 'SIGNED' ? 'bg-green-100 text-green-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>{sig.status}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Template Editor Modal */}
        {showEditor && selectedTemplate && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-sage-100 flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-sage-900">{selectedTemplate.id ? 'Edit' : 'New'} Contract Template</h2>
                <button onClick={() => { setShowEditor(false); setSelectedTemplate(null) }} className="p-1 text-sage-400 hover:text-sage-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveTemplate(selectedTemplate) }} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Title</label>
                  <input type="text" value={selectedTemplate.name} onChange={e => setSelectedTemplate({...selectedTemplate, name: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Contract Content</label>
                  <textarea value={selectedTemplate.content} onChange={e => setSelectedTemplate({...selectedTemplate, content: e.target.value})} rows={12} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent font-mono" />
                </div>
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={selectedTemplate.isActive} onChange={e => setSelectedTemplate({...selectedTemplate, isActive: e.target.checked})} className="sr-only peer" />
                    <div className="w-9 h-5 bg-sage-200 peer-focus:ring-2 peer-focus:ring-lavender-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lavender-500"></div>
                    <span className="ml-2 text-sm text-sage-600">Active</span>
                  </label>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => { setShowEditor(false); setSelectedTemplate(null) }} className="flex-1 bg-sage-100 text-sage-700 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-sage-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Template</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
