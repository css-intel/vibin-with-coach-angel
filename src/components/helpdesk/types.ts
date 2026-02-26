// ─── Helpdesk Types ─────────────────────────────────

export type TicketCategory =
  | 'general'
  | 'billing'
  | 'technical'
  | 'account'
  | 'feature_request'
  | 'bug_report'

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TicketAttachment {
  id: string
  filename: string
  url: string
  mimeType: string
  sizeBytes: number
  createdAt: string
}

export interface Ticket {
  id: string
  category: TicketCategory
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  attachments: TicketAttachment[]
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  ticketId?: string
  threadId?: string
  senderId: string
  senderName: string
  senderRole: 'client' | 'agent' | 'system'
  body: string
  attachments: TicketAttachment[]
  readAt?: string
  createdAt: string
}

export interface MessageThread {
  id: string
  subject: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  participants: { id: string; name: string; role: string }[]
}

export interface HelpdeskDocument {
  id: string
  name: string
  category: string
  url: string
  mimeType: string
  sizeBytes: number
  uploadedAt: string
}

export interface BillingRecord {
  id: string
  description: string
  amountInCents: number
  currency: string
  status: 'paid' | 'pending' | 'overdue' | 'refunded'
  invoiceUrl?: string
  dueDate: string
  paidAt?: string
}

export interface Report {
  id: string
  title: string
  type: 'session_summary' | 'progress' | 'invoice' | 'custom'
  generatedAt: string
  downloadUrl: string
}

export interface HelpdeskStatus {
  helpdesk_status: 'active' | 'restricted' | 'suspended'
  message?: string
  subscription_url?: string
}

export type HelpdeskTab = 'requests' | 'messages' | 'documents' | 'billing' | 'reports'

export interface HelpdeskProps {
  clientId: string
}
