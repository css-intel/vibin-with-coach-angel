'use client'

import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import { useAuth } from '@/lib/auth-context'

export default function AdminSettings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'notifications' | 'integrations'>('profile')

  const [profile, setProfile] = useState({
    displayName: 'Coach Angel',
    email: 'angel@vibinwithcoachangel.com',
    phone: '(555) 123-4567',
    bio: 'Certified life coach specializing in personal growth, mindset transformation, and holistic well-being. Passionate about helping women discover their inner strength and live their most vibrant lives.',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  const [business, setBusiness] = useState({
    businessName: 'Vibin With Coach Angel',
    website: 'https://vibinwithcoachangel.com',
    tagline: 'Vibrant. Intentional. Bold. Inspiring. Nurturing.',
    bookingBuffer: 15,
    cancellationPolicy: 24,
    defaultSessionDuration: 60,
    currency: 'USD',
  })

  const [notifications, setNotifications] = useState({
    emailNewBooking: true,
    emailCancellation: true,
    emailNewClient: true,
    emailPayment: true,
    emailContractSigned: true,
    emailReminder24h: true,
    emailReminder1h: false,
  })

  const [saved, setSaved] = useState(false)
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'business' as const, label: 'Business', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'notifications' as const, label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'integrations' as const, label: 'Integrations', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  ]

  return (
    <>
      <AdminHeader title="Settings" />
      <div className="p-8">
        {/* Save notification */}
        {saved && (
          <div className="fixed top-20 right-8 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg z-50 animate-[fadeIn_0.2s_ease]">
            Settings saved successfully!
          </div>
        )}

        <div className="flex gap-6">
          {/* Settings nav */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-2 sticky top-24">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id ? 'bg-lavender-50 text-lavender-700' : 'text-sage-500 hover:text-sage-700 hover:bg-sage-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6">
                <h2 className="text-lg font-serif font-bold text-sage-900 mb-4">Profile Settings</h2>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center text-2xl font-bold text-white">A</div>
                  <div>
                    <p className="text-sm font-medium text-sage-900">{profile.displayName}</p>
                    <p className="text-xs text-sage-400">Admin</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Display Name</label>
                    <input type="text" value={profile.displayName} onChange={e => setProfile({...profile, displayName: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Email</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Phone</label>
                    <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Bio</label>
                    <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} rows={4} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Timezone</label>
                    <input type="text" value={profile.timezone} disabled className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm bg-sage-50 text-sage-500" />
                  </div>
                </div>
                <button onClick={handleSave} className="mt-6 bg-sage-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Changes</button>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6">
                <h2 className="text-lg font-serif font-bold text-sage-900 mb-4">Business Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Business Name</label>
                    <input type="text" value={business.businessName} onChange={e => setBusiness({...business, businessName: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Website</label>
                    <input type="url" value={business.website} onChange={e => setBusiness({...business, website: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Tagline</label>
                    <input type="text" value={business.tagline} onChange={e => setBusiness({...business, tagline: e.target.value})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                  <hr className="border-sage-100" />
                  <h3 className="text-sm font-semibold text-sage-700">Booking Defaults</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1">Buffer Time (min)</label>
                      <input type="number" value={business.bookingBuffer} onChange={e => setBusiness({...business, bookingBuffer: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-1">Session Duration (min)</label>
                      <input type="number" value={business.defaultSessionDuration} onChange={e => setBusiness({...business, defaultSessionDuration: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-1">Cancellation Policy (hours before)</label>
                    <input type="number" value={business.cancellationPolicy} onChange={e => setBusiness({...business, cancellationPolicy: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-sage-200 rounded-xl text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent" />
                  </div>
                </div>
                <button onClick={handleSave} className="mt-6 bg-sage-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Changes</button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6">
                <h2 className="text-lg font-serif font-bold text-sage-900 mb-4">Email Notifications</h2>
                <p className="text-sm text-sage-500 mb-6">Choose which email notifications you&apos;d like to receive.</p>
                <div className="space-y-4">
                  {[
                    { key: 'emailNewBooking' as const, label: 'New Booking', desc: 'When a client books a session' },
                    { key: 'emailCancellation' as const, label: 'Cancellation', desc: 'When a client cancels a session' },
                    { key: 'emailNewClient' as const, label: 'New Client', desc: 'When a new client signs up' },
                    { key: 'emailPayment' as const, label: 'Payment Received', desc: 'When a payment is processed' },
                    { key: 'emailContractSigned' as const, label: 'Contract Signed', desc: 'When a client signs a contract' },
                    { key: 'emailReminder24h' as const, label: '24hr Reminder', desc: 'Session reminder 24 hours before' },
                    { key: 'emailReminder1h' as const, label: '1hr Reminder', desc: 'Session reminder 1 hour before' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-2 border-b border-sage-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-sage-900">{item.label}</p>
                        <p className="text-xs text-sage-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications[item.key]} onChange={e => setNotifications({...notifications, [item.key]: e.target.checked})} className="sr-only peer" />
                        <div className="w-9 h-5 bg-sage-200 peer-focus:ring-2 peer-focus:ring-lavender-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lavender-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button onClick={handleSave} className="mt-6 bg-sage-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-sage-800 transition-colors">Save Changes</button>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6">
                  <h2 className="text-lg font-serif font-bold text-sage-900 mb-4">Integrations</h2>
                  <p className="text-sm text-sage-500 mb-6">Connect third-party services to enhance your coaching platform.</p>
                </div>
                {[
                  { name: 'Stripe', desc: 'Process payments and manage subscriptions', color: 'bg-indigo-100 text-indigo-600', connected: false, icon: '$' },
                  { name: 'Google Calendar', desc: 'Sync sessions with your Google Calendar', color: 'bg-blue-100 text-blue-600', connected: false, icon: 'G' },
                  { name: 'Zoom', desc: 'Create video meeting links automatically', color: 'bg-sky-100 text-sky-600', connected: false, icon: 'Z' },
                  { name: 'Mailchimp', desc: 'Add clients to your email marketing lists', color: 'bg-amber-100 text-amber-600', connected: false, icon: 'M' },
                ].map(integration => (
                  <div key={integration.name} className="bg-white rounded-2xl shadow-sm border border-sage-100 p-5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${integration.color} flex items-center justify-center text-sm font-bold`}>
                        {integration.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sage-900">{integration.name}</p>
                        <p className="text-xs text-sage-400">{integration.desc}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      integration.connected
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                    }`}>
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
