'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { dataStore } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import type { Resource } from '@/lib/types'

const FILE_ICONS: Record<string, string> = {
  pdf: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  video: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  audio: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
}

export default function DashboardResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    // Show resources that are public or belong to the client's enrolled packages
    setResources(dataStore.getResources())
  }, [])

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))]
  const filtered = filter === 'All' ? resources : resources.filter(r => r.category === filter)

  return (
    <>
      <DashboardHeader title="Resources" />
      <div className="p-8">
        <p className="text-sm text-sage-500 mb-6">Access your coaching resources, guides, and materials.</p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${filter === c ? 'bg-lavender-100 text-lavender-700' : 'bg-sage-100 text-sage-500 hover:text-sage-700'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(res => (
            <a
              key={res.id}
              href={res.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 hover:shadow-md hover:border-lavender-200 transition-all group"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  res.fileType === 'video' ? 'bg-red-100 text-red-600' :
                  res.fileType === 'audio' ? 'bg-purple-100 text-purple-600' :
                  'bg-lavender-100 text-lavender-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={FILE_ICONS[res.fileType] || FILE_ICONS.link} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-sage-900 group-hover:text-lavender-700 transition-colors">{res.title}</h3>
                  <p className="text-xs text-sage-400 mt-0.5">{res.category} &middot; {res.fileType.toUpperCase()}</p>
                </div>
              </div>
              <p className="text-xs text-sage-500 line-clamp-2 mb-2">{res.description}</p>
              <p className="text-[10px] text-sage-400">{formatDate(res.createdAt)}</p>
            </a>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sage-400 text-sm">No resources available</div>
        )}
      </div>
    </>
  )
}
