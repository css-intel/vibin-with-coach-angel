// ─── Core Types ──────────────────────────────────────

export type Role = 'ADMIN' | 'COACH' | 'CLIENT'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: Role
  timezone: string
  avatarUrl?: string
  createdAt: string
}

export interface ClientProfile {
  id: string
  userId: string
  intakeCompleted: boolean
  goals?: string
  healthHistory?: string
  emergencyContact?: string
  onboardingStep: number
  tags: string[]
}

// ─── Packages & Enrollments ─────────────────────────

export type PackageType = 'ONE_ON_ONE' | 'GROUP'
export type BillingType = 'ONE_TIME' | 'RECURRING'

export interface CoachingPackage {
  id: string
  name: string
  description: string
  packageType: PackageType
  billingType: BillingType
  priceInCents: number
  currency: string
  sessionCount: number
  sessionDuration: number
  maxGroupSize?: number
  isActive: boolean
  features: string[]
}

export type EnrollmentStatus = 'PENDING_PAYMENT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'PAUSED'

export interface Enrollment {
  id: string
  clientId: string
  clientName: string
  packageId: string
  packageName: string
  status: EnrollmentStatus
  sessionsUsed: number
  sessionsTotal: number
  startDate: string
  endDate?: string
}

// ─── Bookings ───────────────────────────────────────

export type BookingStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED'

export interface Booking {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  coachId: string
  enrollmentId?: string
  scheduledAt: string
  duration: number
  status: BookingStatus
  meetingLink?: string
  notes?: string
  packageName?: string
}

// ─── Session Notes ──────────────────────────────────

export interface SessionNote {
  id: string
  bookingId: string
  authorId: string
  authorName: string
  clientId: string
  content: string
  isPrivate: boolean
  createdAt: string
}

// ─── Payments ───────────────────────────────────────

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED'

export interface Payment {
  id: string
  userId: string
  clientName: string
  clientEmail: string
  enrollmentId?: string
  amountInCents: number
  currency: string
  status: PaymentStatus
  description: string
  createdAt: string
}

// ─── Contracts ──────────────────────────────────────

export interface ContractTemplate {
  id: string
  name: string
  content: string
  packageId?: string
  isActive: boolean
  version: number
}

export interface ContractSignature {
  id: string
  contractId: string
  contractName: string
  userId: string
  userName: string
  userEmail: string
  signedAt: string
  status: 'PENDING' | 'SIGNED'
}

// ─── Availability ───────────────────────────────────

export interface AvailabilitySlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}

export interface AvailabilityOverride {
  id: string
  date: string
  startTime?: string
  endTime?: string
  isBlocked: boolean
  reason?: string
}

// ─── Resources ──────────────────────────────────────

export interface Resource {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: 'pdf' | 'video' | 'audio' | 'link'
  category: string
  isPublic: boolean
  createdAt: string
}

// ─── Notifications ──────────────────────────────────

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  body: string
  isRead: boolean
  sentAt: string
}

// ─── Dashboard Stats ────────────────────────────────

export interface DashboardStats {
  totalRevenue: number
  activeClients: number
  sessionsThisMonth: number
  completedSessions: number
  upcomingBookings: number
  pendingContracts: number
}

export interface RevenueData {
  month: string
  revenue: number
}
