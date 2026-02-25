'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useAuth } from '@/lib/auth-context'
import { dataStore } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import type { ContractSignature, ContractTemplate } from '@/lib/types'

export default function DashboardContracts() {
  const { user } = useAuth()
  const [signatures, setSignatures] = useState<ContractSignature[]>([])
  const [templates, setTemplates] = useState<ContractTemplate[]>([])
  const [viewing, setViewing] = useState<{ sig: ContractSignature; tmpl: ContractTemplate } | null>(null)

  useEffect(() => {
    if (!user?.id) return
    setSignatures(dataStore.getSignatures().filter(s => s.userId === user.id))
    setTemplates(dataStore.getContracts())
  }, [user])

  const handleSign = (sigId: string) => {
    const allSigs = dataStore.getSignatures()
    const updated = allSigs.map(s => s.id === sigId ? { ...s, status: 'SIGNED' as const, signedAt: new Date().toISOString() } : s)
    dataStore.saveSignatures(updated)
    setSignatures(updated.filter(s => s.userId === user?.id))
    setViewing(null)
  }

  return (
    <>
      <DashboardHeader title="Contracts" />
      <div className="p-8">
        <div className="space-y-3">
          {signatures.length > 0 ? signatures.map(sig => {
            const tmpl = templates.find(t => t.id === sig.contractId)
            return (
              <div key={sig.id} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sig.status === 'SIGNED' ? 'bg-green-100' : 'bg-amber-100'}`}>
                      <svg className={`w-5 h-5 ${sig.status === 'SIGNED' ? 'text-green-600' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-sage-900">{sig.contractName}</h3>
                      <p className="text-xs text-sage-500 mt-0.5">
                        {sig.status === 'SIGNED' ? `Signed ${formatDate(sig.signedAt)}` : 'Awaiting your signature'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${sig.status === 'SIGNED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {sig.status}
                    </span>
                    {tmpl && (
                      <button
                        onClick={() => setViewing({ sig, tmpl })}
                        className="text-xs font-medium text-lavender-600 hover:text-lavender-800"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="text-center py-12 text-sage-400 text-sm">No contracts</div>
          )}
        </div>

        {/* Contract View Modal */}
        {viewing && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-sage-100 flex items-center justify-between">
                <h2 className="text-lg font-serif font-bold text-sage-900">{viewing.tmpl.name}</h2>
                <button onClick={() => setViewing(null)} className="p-1 text-sage-400 hover:text-sage-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <div className="prose prose-sm max-w-none text-sage-700 whitespace-pre-wrap">{viewing.tmpl.content}</div>
              </div>
              <div className="p-6 border-t border-sage-100">
                {viewing.sig.status === 'PENDING' ? (
                  <div className="flex space-x-3">
                    <button onClick={() => setViewing(null)} className="flex-1 bg-sage-100 text-sage-700 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-200">Close</button>
                    <button onClick={() => handleSign(viewing.sig.id)} className="flex-1 bg-sage-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800">
                      Sign Contract
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    <span className="text-sm font-medium">Signed on {formatDate(viewing.sig.signedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
