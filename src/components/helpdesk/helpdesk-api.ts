import type {
  Ticket,
  TicketCategory,
  Message,
  MessageThread,
  HelpdeskDocument,
  BillingRecord,
  Report,
  HelpdeskStatus,
  TicketAttachment,
} from './types'

// ─── Config ─────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_HELPDESK_API_URL || '/api/helpdesk'

function getAuthToken(): string {
  return typeof window !== 'undefined'
    ? sessionStorage.getItem('vibin_helpdesk_token') || ''
    : ''
}

function authHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init?.headers || {}) },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Helpdesk API error ${res.status}`)
  }
  return res.json()
}

// ─── Status ─────────────────────────────────────────

export async function fetchHelpdeskStatus(clientId: string): Promise<HelpdeskStatus> {
  try {
    return await request<HelpdeskStatus>(`/status?clientId=${clientId}`)
  } catch {
    // Default to active when API is unreachable (MVP/demo mode)
    return { helpdesk_status: 'active' }
  }
}

// ─── Tickets / Requests ─────────────────────────────

export async function fetchTickets(clientId: string): Promise<Ticket[]> {
  try {
    return await request<Ticket[]>(`/tickets?clientId=${clientId}`)
  } catch {
    return getDemoTickets()
  }
}

export async function createTicket(
  clientId: string,
  data: {
    category: TicketCategory
    subject: string
    description: string
    attachments?: File[]
  },
): Promise<Ticket> {
  const formData = new FormData()
  formData.append('clientId', clientId)
  formData.append('category', data.category)
  formData.append('subject', data.subject)
  formData.append('description', data.description)
  if (data.attachments) {
    data.attachments.forEach((f) => formData.append('files', f))
  }

  try {
    const res = await fetch(`${API_BASE}/tickets`, {
      method: 'POST',
      headers: { Authorization: authHeaders().Authorization as string },
      body: formData,
    })
    if (!res.ok) throw new Error('Failed to create ticket')
    return res.json()
  } catch {
    // Demo fallback — return a local ticket
    const newTicket: Ticket = {
      id: `tkt-${Date.now()}`,
      category: data.category,
      subject: data.subject,
      description: data.description,
      status: 'open',
      priority: 'medium',
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveDemoTicket(newTicket)
    return newTicket
  }
}

// ─── Messages ───────────────────────────────────────

export async function fetchThreads(clientId: string): Promise<MessageThread[]> {
  try {
    return await request<MessageThread[]>(`/messages/threads?clientId=${clientId}`)
  } catch {
    return getDemoThreads()
  }
}

export async function fetchMessages(threadId: string): Promise<Message[]> {
  try {
    return await request<Message[]>(`/messages?threadId=${threadId}`)
  } catch {
    return getDemoMessages(threadId)
  }
}

export async function postMessage(
  threadId: string,
  body: string,
  senderId: string,
  senderName: string,
): Promise<Message> {
  try {
    return await request<Message>(`/messages`, {
      method: 'POST',
      body: JSON.stringify({ threadId, body, senderId, senderName }),
    })
  } catch {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId,
      senderName,
      senderRole: 'client',
      body,
      attachments: [],
      createdAt: new Date().toISOString(),
    }
    saveDemoMessage(threadId, msg)
    return msg
  }
}

// ─── Documents ──────────────────────────────────────

export async function fetchDocuments(clientId: string): Promise<HelpdeskDocument[]> {
  try {
    return await request<HelpdeskDocument[]>(`/documents?clientId=${clientId}`)
  } catch {
    return getDemoDocuments()
  }
}

// ─── Billing ────────────────────────────────────────

export async function fetchBilling(clientId: string): Promise<BillingRecord[]> {
  try {
    return await request<BillingRecord[]>(`/billing?clientId=${clientId}`)
  } catch {
    return getDemoBilling()
  }
}

// ─── Reports ────────────────────────────────────────

export async function fetchReports(clientId: string): Promise<Report[]> {
  try {
    return await request<Report[]>(`/reports?clientId=${clientId}`)
  } catch {
    return getDemoReports()
  }
}

// ─── Media Capture Utilities ────────────────────────

export async function captureScreenshot(): Promise<File | null> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: 'browser' } as MediaTrackConstraints,
    })
    const track = stream.getVideoTracks()[0]
    const imageCapture = new (window as any).ImageCapture(track)
    const blob: Blob = await imageCapture.grabFrame().then((bitmap: ImageBitmap) => {
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(bitmap, 0, 0)
      return new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/png'),
      )
    })
    track.stop()
    return new File([blob], `screenshot-${Date.now()}.png`, { type: 'image/png' })
  } catch {
    return null
  }
}

export function createMediaRecorder(
  stream: MediaStream,
  mimeType: string,
): { recorder: MediaRecorder; chunks: Blob[] } {
  const chunks: Blob[] = []
  const recorder = new MediaRecorder(stream, { mimeType })
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }
  return { recorder, chunks }
}

export async function startScreenRecording(): Promise<{
  recorder: MediaRecorder
  chunks: Blob[]
  stop: () => Promise<File | null>
} | null> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    })
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm'
    const { recorder, chunks } = createMediaRecorder(stream, mime)
    recorder.start()
    return {
      recorder,
      chunks,
      stop: () =>
        new Promise((resolve) => {
          recorder.onstop = () => {
            stream.getTracks().forEach((t) => t.stop())
            if (chunks.length === 0) return resolve(null)
            const blob = new Blob(chunks, { type: mime })
            resolve(
              new File([blob], `recording-${Date.now()}.webm`, { type: mime }),
            )
          }
          recorder.stop()
        }),
    }
  } catch {
    return null
  }
}

export async function startVoiceRecording(): Promise<{
  recorder: MediaRecorder
  chunks: Blob[]
  stop: () => Promise<File | null>
} | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mime = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : 'audio/ogg'
    const { recorder, chunks } = createMediaRecorder(stream, mime)
    recorder.start()
    return {
      recorder,
      chunks,
      stop: () =>
        new Promise((resolve) => {
          recorder.onstop = () => {
            stream.getTracks().forEach((t) => t.stop())
            if (chunks.length === 0) return resolve(null)
            const blob = new Blob(chunks, { type: mime })
            resolve(
              new File([blob], `voice-${Date.now()}.webm`, { type: mime }),
            )
          }
          recorder.stop()
        }),
    }
  } catch {
    return null
  }
}

// ─── Demo / Fallback Data ───────────────────────────

const DEMO_KEY = 'vibin_helpdesk_demo'

function getDemoStore(): Record<string, any> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(DEMO_KEY) || '{}')
  } catch {
    return {}
  }
}

function setDemoStore(data: Record<string, any>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(DEMO_KEY, JSON.stringify(data))
}

function getDemoTickets(): Ticket[] {
  const store = getDemoStore()
  return (store.tickets as Ticket[]) || [
    {
      id: 'tkt-demo-1',
      category: 'general',
      subject: 'How do I reschedule a session?',
      description: 'I need to change my Thursday appointment to Friday. Is that possible?',
      status: 'resolved',
      priority: 'low',
      attachments: [],
      createdAt: '2026-02-20T10:00:00Z',
      updatedAt: '2026-02-20T14:00:00Z',
    },
    {
      id: 'tkt-demo-2',
      category: 'billing',
      subject: 'Invoice for January',
      description: 'Can I get a copy of my January invoice for tax purposes?',
      status: 'open',
      priority: 'medium',
      attachments: [],
      createdAt: '2026-02-24T09:00:00Z',
      updatedAt: '2026-02-24T09:00:00Z',
    },
  ]
}

function saveDemoTicket(ticket: Ticket) {
  const store = getDemoStore()
  const tickets = (store.tickets as Ticket[]) || getDemoTickets()
  tickets.unshift(ticket)
  store.tickets = tickets
  setDemoStore(store)
}

function getDemoThreads(): MessageThread[] {
  return [
    {
      id: 'thread-1',
      subject: 'Session follow-up',
      lastMessage: 'Thank you for a great session today!',
      lastMessageAt: '2026-02-25T16:30:00Z',
      unreadCount: 1,
      participants: [
        { id: 'admin-001', name: 'Coach Angel', role: 'agent' },
      ],
    },
    {
      id: 'thread-2',
      subject: 'Breathing exercises',
      lastMessage: 'Here are the resources we discussed.',
      lastMessageAt: '2026-02-23T11:00:00Z',
      unreadCount: 0,
      participants: [
        { id: 'admin-001', name: 'Coach Angel', role: 'agent' },
      ],
    },
  ]
}

function getDemoMessages(threadId: string): Message[] {
  const store = getDemoStore()
  const custom = store[`messages_${threadId}`] as Message[] | undefined

  const defaults: Record<string, Message[]> = {
    'thread-1': [
      { id: 'msg-1a', threadId: 'thread-1', senderId: 'admin-001', senderName: 'Coach Angel', senderRole: 'agent', body: 'Great session today! Remember to practice the breathing exercises we covered.', attachments: [], createdAt: '2026-02-25T16:00:00Z' },
      { id: 'msg-1b', threadId: 'thread-1', senderId: 'client-001', senderName: 'You', senderRole: 'client', body: 'Thank you for a great session today!', attachments: [], createdAt: '2026-02-25T16:30:00Z' },
    ],
    'thread-2': [
      { id: 'msg-2a', threadId: 'thread-2', senderId: 'admin-001', senderName: 'Coach Angel', senderRole: 'agent', body: 'Here are the resources we discussed.', attachments: [], createdAt: '2026-02-23T11:00:00Z' },
    ],
  }

  return custom || defaults[threadId] || []
}

function saveDemoMessage(threadId: string, msg: Message) {
  const store = getDemoStore()
  const key = `messages_${threadId}`
  const msgs = (store[key] as Message[]) || getDemoMessages(threadId)
  msgs.push(msg)
  store[key] = msgs
  setDemoStore(store)
}

function getDemoDocuments(): HelpdeskDocument[] {
  return [
    { id: 'doc-1', name: 'Coaching Agreement.pdf', category: 'Contracts', url: '#', mimeType: 'application/pdf', sizeBytes: 245000, uploadedAt: '2025-12-01T00:00:00Z' },
    { id: 'doc-2', name: 'Wellness Assessment.pdf', category: 'Assessments', url: '#', mimeType: 'application/pdf', sizeBytes: 128000, uploadedAt: '2026-01-15T00:00:00Z' },
    { id: 'doc-3', name: 'Breathwork Guide.pdf', category: 'Resources', url: '#', mimeType: 'application/pdf', sizeBytes: 340000, uploadedAt: '2026-02-10T00:00:00Z' },
  ]
}

function getDemoBilling(): BillingRecord[] {
  return [
    { id: 'bill-1', description: 'Deep Roots — 12-Week Transformation', amountInCents: 99700, currency: 'usd', status: 'paid', dueDate: '2025-12-01T00:00:00Z', paidAt: '2025-12-01T00:00:00Z' },
    { id: 'bill-2', description: 'Vibin Circle — February', amountInCents: 9700, currency: 'usd', status: 'paid', dueDate: '2026-02-01T00:00:00Z', paidAt: '2026-02-01T00:00:00Z' },
    { id: 'bill-3', description: 'Glow Up — 4-Week Jumpstart', amountInCents: 39700, currency: 'usd', status: 'pending', dueDate: '2026-03-01T00:00:00Z' },
  ]
}

function getDemoReports(): Report[] {
  return [
    { id: 'rpt-1', title: 'February Session Summary', type: 'session_summary', generatedAt: '2026-02-25T00:00:00Z', downloadUrl: '#' },
    { id: 'rpt-2', title: 'Q1 Progress Report', type: 'progress', generatedAt: '2026-02-20T00:00:00Z', downloadUrl: '#' },
  ]
}
