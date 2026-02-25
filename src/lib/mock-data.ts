import {
  User, CoachingPackage, Enrollment, Booking, Payment,
  ContractTemplate, ContractSignature, AvailabilitySlot,
  Resource, SessionNote, Notification, DashboardStats, RevenueData
} from './types'

// ─── Helper ─────────────────────────────────────────

function genId() {
  return Math.random().toString(36).substring(2, 9)
}

// ─── MOCK DATA ──────────────────────────────────────

export const mockClients: User[] = [
  { id: 'client-001', email: 'sarah.j@email.com', name: 'Sarah Johnson', phone: '555-0101', role: 'CLIENT', timezone: 'America/New_York', createdAt: '2025-11-15T00:00:00Z' },
  { id: 'client-002', email: 'maria.g@email.com', name: 'Maria Garcia', phone: '555-0102', role: 'CLIENT', timezone: 'America/Chicago', createdAt: '2025-12-01T00:00:00Z' },
  { id: 'client-003', email: 'lisa.w@email.com', name: 'Lisa Williams', phone: '555-0103', role: 'CLIENT', timezone: 'America/Los_Angeles', createdAt: '2026-01-10T00:00:00Z' },
  { id: 'client-004', email: 'emma.d@email.com', name: 'Emma Davis', phone: '555-0104', role: 'CLIENT', timezone: 'America/New_York', createdAt: '2026-01-20T00:00:00Z' },
  { id: 'client-005', email: 'olivia.m@email.com', name: 'Olivia Martinez', role: 'CLIENT', timezone: 'America/Denver', createdAt: '2026-02-01T00:00:00Z' },
]

export const mockPackages: CoachingPackage[] = [
  {
    id: 'pkg-001', name: 'Discovery Session', description: 'A complimentary 30-minute call to explore if we\'re a great fit. We\'ll discuss your goals and how holistic coaching can support your journey.',
    packageType: 'ONE_ON_ONE', billingType: 'ONE_TIME', priceInCents: 0, currency: 'usd',
    sessionCount: 1, sessionDuration: 30, isActive: true,
    features: ['30-min video call', 'Goal exploration', 'Personalized recommendations', 'No commitment required'],
  },
  {
    id: 'pkg-002', name: 'Glow Up — 4-Week Jumpstart', description: 'An intensive 4-week coaching program to kickstart your transformation. Includes weekly 1:1 sessions, breathwork guidance, and personalized action plans.',
    packageType: 'ONE_ON_ONE', billingType: 'ONE_TIME', priceInCents: 39700, currency: 'usd',
    sessionCount: 4, sessionDuration: 60, isActive: true,
    features: ['4 x 60-min 1:1 sessions', 'Breathwork exercises', 'Inner child work', 'Weekly action plans', 'Email support between sessions'],
  },
  {
    id: 'pkg-003', name: 'Deep Roots — 12-Week Transformation', description: 'Our signature program for deep, lasting change. 12 weeks of intensive holistic coaching covering all aspects of well-being — mind, body, and spirit.',
    packageType: 'ONE_ON_ONE', billingType: 'ONE_TIME', priceInCents: 99700, currency: 'usd',
    sessionCount: 12, sessionDuration: 60, isActive: true,
    features: ['12 x 60-min 1:1 sessions', 'Comprehensive wellness assessment', 'Custom healing toolkit', 'Trauma-informed practices', 'Breathwork & meditation', 'Unlimited email support', 'Resource library access'],
  },
  {
    id: 'pkg-004', name: 'Vibin Circle — Group Coaching', description: 'Monthly group coaching circle. Connect with like-minded women on their healing journey in a safe, supportive space.',
    packageType: 'GROUP', billingType: 'RECURRING', priceInCents: 9700, currency: 'usd',
    sessionCount: 4, sessionDuration: 90, maxGroupSize: 8, isActive: true,
    features: ['4 x 90-min group sessions/month', 'Community support circle', 'Shared resources', 'Guest expert sessions', 'Private group chat'],
  },
]

export const mockEnrollments: Enrollment[] = [
  { id: 'enr-001', clientId: 'client-001', clientName: 'Sarah Johnson', packageId: 'pkg-003', packageName: 'Deep Roots — 12-Week Transformation', status: 'ACTIVE', sessionsUsed: 7, sessionsTotal: 12, startDate: '2025-12-01T00:00:00Z' },
  { id: 'enr-002', clientId: 'client-002', clientName: 'Maria Garcia', packageId: 'pkg-002', packageName: 'Glow Up — 4-Week Jumpstart', status: 'ACTIVE', sessionsUsed: 2, sessionsTotal: 4, startDate: '2026-01-15T00:00:00Z' },
  { id: 'enr-003', clientId: 'client-003', clientName: 'Lisa Williams', packageId: 'pkg-004', packageName: 'Vibin Circle — Group Coaching', status: 'ACTIVE', sessionsUsed: 3, sessionsTotal: 4, startDate: '2026-01-01T00:00:00Z' },
  { id: 'enr-004', clientId: 'client-004', clientName: 'Emma Davis', packageId: 'pkg-002', packageName: 'Glow Up — 4-Week Jumpstart', status: 'COMPLETED', sessionsUsed: 4, sessionsTotal: 4, startDate: '2025-11-01T00:00:00Z', endDate: '2025-12-01T00:00:00Z' },
  { id: 'enr-005', clientId: 'client-005', clientName: 'Olivia Martinez', packageId: 'pkg-001', packageName: 'Discovery Session', status: 'PENDING_PAYMENT', sessionsUsed: 0, sessionsTotal: 1, startDate: '2026-02-15T00:00:00Z' },
]

export const mockBookings: Booking[] = [
  { id: 'bk-001', clientId: 'client-001', clientName: 'Sarah Johnson', clientEmail: 'sarah.j@email.com', coachId: 'admin-001', enrollmentId: 'enr-001', scheduledAt: '2026-02-24T14:00:00Z', duration: 60, status: 'SCHEDULED', meetingLink: 'https://meet.google.com/abc-defg-hij', packageName: 'Deep Roots' },
  { id: 'bk-002', clientId: 'client-002', clientName: 'Maria Garcia', clientEmail: 'maria.g@email.com', coachId: 'admin-001', enrollmentId: 'enr-002', scheduledAt: '2026-02-25T16:00:00Z', duration: 60, status: 'SCHEDULED', meetingLink: 'https://meet.google.com/klm-nopq-rst', packageName: 'Glow Up' },
  { id: 'bk-003', clientId: 'client-003', clientName: 'Lisa Williams', clientEmail: 'lisa.w@email.com', coachId: 'admin-001', enrollmentId: 'enr-003', scheduledAt: '2026-02-26T18:00:00Z', duration: 90, status: 'SCHEDULED', meetingLink: 'https://meet.google.com/uvw-xyz-123', packageName: 'Vibin Circle' },
  { id: 'bk-004', clientId: 'client-001', clientName: 'Sarah Johnson', clientEmail: 'sarah.j@email.com', coachId: 'admin-001', enrollmentId: 'enr-001', scheduledAt: '2026-02-17T14:00:00Z', duration: 60, status: 'COMPLETED', packageName: 'Deep Roots', notes: 'Great session. Sarah is making wonderful progress with breathwork.' },
  { id: 'bk-005', clientId: 'client-002', clientName: 'Maria Garcia', clientEmail: 'maria.g@email.com', coachId: 'admin-001', enrollmentId: 'enr-002', scheduledAt: '2026-02-18T16:00:00Z', duration: 60, status: 'COMPLETED', packageName: 'Glow Up', notes: 'Explored inner child work. Maria had a breakthrough moment.' },
  { id: 'bk-006', clientId: 'client-004', clientName: 'Emma Davis', clientEmail: 'emma.d@email.com', coachId: 'admin-001', scheduledAt: '2026-02-10T15:00:00Z', duration: 60, status: 'COMPLETED', packageName: 'Glow Up' },
  { id: 'bk-007', clientId: 'client-001', clientName: 'Sarah Johnson', clientEmail: 'sarah.j@email.com', coachId: 'admin-001', scheduledAt: '2026-02-28T14:00:00Z', duration: 60, status: 'SCHEDULED', packageName: 'Deep Roots' },
]

export const mockPayments: Payment[] = [
  { id: 'pay-001', userId: 'client-001', clientName: 'Sarah Johnson', clientEmail: 'sarah.j@email.com', enrollmentId: 'enr-001', amountInCents: 99700, currency: 'usd', status: 'SUCCEEDED', description: 'Deep Roots — 12-Week Transformation', createdAt: '2025-12-01T00:00:00Z' },
  { id: 'pay-002', userId: 'client-002', clientName: 'Maria Garcia', clientEmail: 'maria.g@email.com', enrollmentId: 'enr-002', amountInCents: 39700, currency: 'usd', status: 'SUCCEEDED', description: 'Glow Up — 4-Week Jumpstart', createdAt: '2026-01-15T00:00:00Z' },
  { id: 'pay-003', userId: 'client-003', clientName: 'Lisa Williams', clientEmail: 'lisa.w@email.com', enrollmentId: 'enr-003', amountInCents: 9700, currency: 'usd', status: 'SUCCEEDED', description: 'Vibin Circle — Group Coaching (Jan)', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'pay-004', userId: 'client-003', clientName: 'Lisa Williams', clientEmail: 'lisa.w@email.com', enrollmentId: 'enr-003', amountInCents: 9700, currency: 'usd', status: 'SUCCEEDED', description: 'Vibin Circle — Group Coaching (Feb)', createdAt: '2026-02-01T00:00:00Z' },
  { id: 'pay-005', userId: 'client-004', clientName: 'Emma Davis', clientEmail: 'emma.d@email.com', enrollmentId: 'enr-004', amountInCents: 39700, currency: 'usd', status: 'SUCCEEDED', description: 'Glow Up — 4-Week Jumpstart', createdAt: '2025-11-01T00:00:00Z' },
  { id: 'pay-006', userId: 'client-005', clientName: 'Olivia Martinez', clientEmail: 'olivia.m@email.com', amountInCents: 0, currency: 'usd', status: 'PENDING', description: 'Discovery Session', createdAt: '2026-02-15T00:00:00Z' },
]

export const mockContracts: ContractTemplate[] = [
  { id: 'ct-001', name: 'Coaching Agreement — Individual', content: `# Coaching Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned client ("Client").\n\n## Services\nThe Coach agrees to provide holistic life coaching services as outlined in the selected coaching package.\n\n## Confidentiality\nAll information shared during coaching sessions is strictly confidential.\n\n## Cancellation Policy\nSessions must be cancelled at least 24 hours in advance. Late cancellations or no-shows will count as a used session.\n\n## Commitment\nThe Client agrees to attend all scheduled sessions and complete agreed-upon action items between sessions.\n\n## Disclaimer\nCoaching is not therapy or medical advice. The Coach is a certified holistic health coach, not a licensed therapist.`, packageId: 'pkg-002', isActive: true, version: 1 },
  { id: 'ct-002', name: 'Coaching Agreement — Transformation', content: `# 12-Week Transformation Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned client ("Client").\n\n## Program Overview\nThe Deep Roots 12-Week Transformation program includes 12 weekly 1:1 sessions.\n\n## Investment\nClient agrees to the full program investment. No refunds after session 3.\n\n## Confidentiality\nAll information shared is strictly confidential.\n\n## Cancellation Policy\n24-hour advance notice required. No-shows count as completed sessions.`, packageId: 'pkg-003', isActive: true, version: 1 },
  { id: 'ct-003', name: 'Group Coaching Agreement', content: `# Group Coaching Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned participant ("Participant").\n\n## Group Guidelines\n- Respect all group members\n- Maintain confidentiality\n- Attend sessions on time\n- Participate actively\n\n## Subscription\nMonthly billing. Cancel anytime with 7 days notice.`, packageId: 'pkg-004', isActive: true, version: 1 },
]

export const mockSignatures: ContractSignature[] = [
  { id: 'sig-001', contractId: 'ct-002', contractName: 'Coaching Agreement — Transformation', userId: 'client-001', userName: 'Sarah Johnson', userEmail: 'sarah.j@email.com', signedAt: '2025-12-01T10:00:00Z', status: 'SIGNED' },
  { id: 'sig-002', contractId: 'ct-001', contractName: 'Coaching Agreement — Individual', userId: 'client-002', userName: 'Maria Garcia', userEmail: 'maria.g@email.com', signedAt: '2026-01-15T10:00:00Z', status: 'SIGNED' },
  { id: 'sig-003', contractId: 'ct-003', contractName: 'Group Coaching Agreement', userId: 'client-003', userName: 'Lisa Williams', userEmail: 'lisa.w@email.com', signedAt: '2026-01-01T10:00:00Z', status: 'SIGNED' },
  { id: 'sig-004', contractId: 'ct-001', contractName: 'Coaching Agreement — Individual', userId: 'client-005', userName: 'Olivia Martinez', userEmail: 'olivia.m@email.com', signedAt: '', status: 'PENDING' },
]

export const mockAvailability: AvailabilitySlot[] = [
  { id: 'av-001', dayOfWeek: 1, startTime: '09:00', endTime: '12:00', isActive: true },
  { id: 'av-002', dayOfWeek: 1, startTime: '14:00', endTime: '17:00', isActive: true },
  { id: 'av-003', dayOfWeek: 2, startTime: '10:00', endTime: '13:00', isActive: true },
  { id: 'av-004', dayOfWeek: 2, startTime: '15:00', endTime: '18:00', isActive: true },
  { id: 'av-005', dayOfWeek: 3, startTime: '09:00', endTime: '12:00', isActive: true },
  { id: 'av-006', dayOfWeek: 3, startTime: '14:00', endTime: '17:00', isActive: true },
  { id: 'av-007', dayOfWeek: 4, startTime: '10:00', endTime: '13:00', isActive: true },
  { id: 'av-008', dayOfWeek: 4, startTime: '15:00', endTime: '18:00', isActive: true },
  { id: 'av-009', dayOfWeek: 5, startTime: '09:00', endTime: '12:00', isActive: true },
]

export const mockResources: Resource[] = [
  { id: 'res-001', title: 'Breathwork Basics Guide', description: 'A comprehensive guide to daily breathwork practices for stress relief and emotional healing.', fileUrl: '#', fileType: 'pdf', category: 'Breathwork', isPublic: false, createdAt: '2025-10-01T00:00:00Z' },
  { id: 'res-002', title: 'Inner Child Meditation', description: '15-minute guided meditation for connecting with your inner child.', fileUrl: '#', fileType: 'audio', category: 'Meditation', isPublic: false, createdAt: '2025-11-01T00:00:00Z' },
  { id: 'res-003', title: 'Journaling Prompts for Healing', description: '30 powerful journaling prompts to support your healing journey.', fileUrl: '#', fileType: 'pdf', category: 'Journaling', isPublic: true, createdAt: '2025-12-01T00:00:00Z' },
  { id: 'res-004', title: 'Understanding Trauma Responses', description: 'An educational video about trauma responses and how to work through them.', fileUrl: '#', fileType: 'video', category: 'Education', isPublic: false, createdAt: '2026-01-01T00:00:00Z' },
  { id: 'res-005', title: 'Weekly Wellness Checklist', description: 'A printable weekly wellness tracking checklist.', fileUrl: '#', fileType: 'pdf', category: 'Wellness', isPublic: true, createdAt: '2026-01-15T00:00:00Z' },
  { id: 'res-006', title: 'Nourishment & Nutrition Guide', description: 'Holistic nutrition guide focused on nourishing mind and body.', fileUrl: '#', fileType: 'pdf', category: 'Nutrition', isPublic: false, createdAt: '2026-02-01T00:00:00Z' },
]

export const mockNotifications: Notification[] = [
  { id: 'not-001', userId: 'admin-001', type: 'BOOKING_CONFIRMATION', title: 'New Booking', body: 'Sarah Johnson booked a session for Feb 24 at 2:00 PM', isRead: false, sentAt: '2026-02-20T10:00:00Z' },
  { id: 'not-002', userId: 'admin-001', type: 'PAYMENT_RECEIVED', title: 'Payment Received', body: 'Lisa Williams paid $97.00 for Vibin Circle (Feb)', isRead: false, sentAt: '2026-02-01T00:00:00Z' },
  { id: 'not-003', userId: 'admin-001', type: 'CONTRACT_PENDING', title: 'Contract Pending', body: 'Olivia Martinez has not signed their coaching agreement', isRead: true, sentAt: '2026-02-15T10:00:00Z' },
]

export const mockRevenueData: RevenueData[] = [
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 39700 },
  { month: 'Dec', revenue: 99700 },
  { month: 'Jan', revenue: 49400 },
  { month: 'Feb', revenue: 9700 },
]

// ─── localStorage Data Layer ────────────────────────

const STORAGE_KEYS = {
  clients: 'vibin_clients',
  packages: 'vibin_packages',
  enrollments: 'vibin_enrollments',
  bookings: 'vibin_bookings',
  payments: 'vibin_payments',
  contracts: 'vibin_contracts',
  signatures: 'vibin_signatures',
  availability: 'vibin_availability',
  resources: 'vibin_resources',
  notifications: 'vibin_notifications',
  initialized: 'vibin_data_init_v2',
} as const

export function initializeData() {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(STORAGE_KEYS.initialized)) return

  localStorage.setItem(STORAGE_KEYS.clients, JSON.stringify(mockClients))
  localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(mockPackages))
  localStorage.setItem(STORAGE_KEYS.enrollments, JSON.stringify(mockEnrollments))
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(mockBookings))
  localStorage.setItem(STORAGE_KEYS.payments, JSON.stringify(mockPayments))
  localStorage.setItem(STORAGE_KEYS.contracts, JSON.stringify(mockContracts))
  localStorage.setItem(STORAGE_KEYS.signatures, JSON.stringify(mockSignatures))
  localStorage.setItem(STORAGE_KEYS.availability, JSON.stringify(mockAvailability))
  localStorage.setItem(STORAGE_KEYS.resources, JSON.stringify(mockResources))
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(mockNotifications))

  // Set default passwords for demo clients
  const passwords: Record<string, string> = {}
  mockClients.forEach(c => { passwords[c.email] = 'demo123' })
  localStorage.setItem('vibin_client_passwords', JSON.stringify(passwords))

  localStorage.setItem(STORAGE_KEYS.initialized, 'true')
}

function getData<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : fallback
}

function setData<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// ─── CRUD Operations ────────────────────────────────

export const dataStore = {
  // Clients
  getClients: () => getData<User>(STORAGE_KEYS.clients, mockClients),
  saveClients: (data: User[]) => setData(STORAGE_KEYS.clients, data),
  addClient: (client: Omit<User, 'id' | 'createdAt'>) => {
    const clients = dataStore.getClients()
    const newClient: User = { ...client, id: `client-${genId()}`, createdAt: new Date().toISOString() }
    clients.push(newClient)
    dataStore.saveClients(clients)
    return newClient
  },

  // Packages
  getPackages: () => getData<CoachingPackage>(STORAGE_KEYS.packages, mockPackages),
  savePackages: (data: CoachingPackage[]) => setData(STORAGE_KEYS.packages, data),

  // Enrollments
  getEnrollments: () => getData<Enrollment>(STORAGE_KEYS.enrollments, mockEnrollments),
  saveEnrollments: (data: Enrollment[]) => setData(STORAGE_KEYS.enrollments, data),

  // Bookings
  getBookings: () => getData<Booking>(STORAGE_KEYS.bookings, mockBookings),
  saveBookings: (data: Booking[]) => setData(STORAGE_KEYS.bookings, data),
  addBooking: (booking: Omit<Booking, 'id'>) => {
    const bookings = dataStore.getBookings()
    const newBooking: Booking = { ...booking, id: `bk-${genId()}` }
    bookings.push(newBooking)
    dataStore.saveBookings(bookings)
    return newBooking
  },

  // Payments
  getPayments: () => getData<Payment>(STORAGE_KEYS.payments, mockPayments),
  savePayments: (data: Payment[]) => setData(STORAGE_KEYS.payments, data),

  // Contracts
  getContracts: () => getData<ContractTemplate>(STORAGE_KEYS.contracts, mockContracts),
  saveContracts: (data: ContractTemplate[]) => setData(STORAGE_KEYS.contracts, data),
  getSignatures: () => getData<ContractSignature>(STORAGE_KEYS.signatures, mockSignatures),
  saveSignatures: (data: ContractSignature[]) => setData(STORAGE_KEYS.signatures, data),

  // Availability
  getAvailability: () => getData<AvailabilitySlot>(STORAGE_KEYS.availability, mockAvailability),
  saveAvailability: (data: AvailabilitySlot[]) => setData(STORAGE_KEYS.availability, data),

  // Resources
  getResources: () => getData<Resource>(STORAGE_KEYS.resources, mockResources),
  saveResources: (data: Resource[]) => setData(STORAGE_KEYS.resources, data),

  // Notifications
  getNotifications: () => getData<Notification>(STORAGE_KEYS.notifications, mockNotifications),
  saveNotifications: (data: Notification[]) => setData(STORAGE_KEYS.notifications, data),

  // Stats
  getStats: (): DashboardStats => {
    const payments = dataStore.getPayments()
    const enrollments = dataStore.getEnrollments()
    const bookings = dataStore.getBookings()
    const signatures = dataStore.getSignatures()

    const totalRevenue = payments
      .filter(p => p.status === 'SUCCEEDED')
      .reduce((sum, p) => sum + p.amountInCents, 0)

    return {
      totalRevenue,
      activeClients: enrollments.filter(e => e.status === 'ACTIVE').length,
      sessionsThisMonth: bookings.filter(b => {
        const d = new Date(b.scheduledAt)
        const now = new Date()
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }).length,
      completedSessions: bookings.filter(b => b.status === 'COMPLETED').length,
      upcomingBookings: bookings.filter(b => b.status === 'SCHEDULED' && new Date(b.scheduledAt) > new Date()).length,
      pendingContracts: signatures.filter(s => s.status === 'PENDING').length,
    }
  },

  getRevenueData: () => mockRevenueData,
}
