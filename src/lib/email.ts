import { Resend } from "resend"

// Lazy-init to avoid crash during `next build` page data collection
let _resend: Resend | undefined

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

function getFrom(): string {
  return process.env.EMAIL_FROM || "Coach Angel <hello@vibinwithcoachangel.com>"
}

// ─── Send Email Helper ──────────────────────────────

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  try {
    const { data, error } = await getResend().emails.send({
      from: getFrom(),
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
    })

    if (error) {
      console.error("[Email] Failed to send:", error)
      return { success: false, error }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    console.error("[Email] Exception:", err)
    return { success: false, error: err }
  }
}

// ─── Email Template Helpers ─────────────────────────

export function bookingConfirmationEmail(data: {
  clientName: string
  dateTime: string
  duration: number
  meetingLink?: string
  packageName: string
}) {
  return {
    subject: `Your coaching session is confirmed! ✨`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7c3aed;">Session Confirmed! ✨</h2>
        <p>Hi ${data.clientName},</p>
        <p>Your coaching session has been booked:</p>
        <div style="background: #faf5ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Package:</strong> ${data.packageName}</p>
          <p><strong>Date & Time:</strong> ${data.dateTime}</p>
          <p><strong>Duration:</strong> ${data.duration} minutes</p>
          ${data.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ""}
        </div>
        <p>Looking forward to our session together! 💜</p>
        <p>— Coach Angel</p>
      </div>
    `,
  }
}

export function welcomeEmail(data: { clientName: string; packageName: string; dashboardUrl: string }) {
  return {
    subject: `Welcome to your healing journey, ${data.clientName}! 🌿`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7c3aed;">Welcome, ${data.clientName}! 🌿</h2>
        <p>I'm so excited you've taken this step on your healing journey.</p>
        <p>You've enrolled in <strong>${data.packageName}</strong>.</p>
        <div style="background: #faf5ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3>Your Next Steps:</h3>
          <ol>
            <li>Complete your intake form in your dashboard</li>
            <li>Sign your coaching agreement</li>
            <li>Book your first session</li>
          </ol>
        </div>
        <a href="${data.dashboardUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
          Go to Your Dashboard →
        </a>
        <p>With love and light,<br/>Coach Angel 💜</p>
      </div>
    `,
  }
}

export function sessionReminderEmail(data: {
  clientName: string
  dateTime: string
  meetingLink?: string
  hoursUntil: number
}) {
  return {
    subject: `Reminder: Your session is in ${data.hoursUntil} hour${data.hoursUntil > 1 ? "s" : ""} 🕐`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7c3aed;">Session Reminder 🕐</h2>
        <p>Hi ${data.clientName},</p>
        <p>Just a friendly reminder that your coaching session is coming up in <strong>${data.hoursUntil} hour${data.hoursUntil > 1 ? "s" : ""}</strong>.</p>
        <div style="background: #faf5ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Date & Time:</strong> ${data.dateTime}</p>
          ${data.meetingLink ? `<p><strong>Join Here:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ""}
        </div>
        <p>See you soon! 💜</p>
        <p>— Coach Angel</p>
      </div>
    `,
  }
}

export function paymentReceiptEmail(data: {
  clientName: string
  amount: string
  description: string
  date: string
}) {
  return {
    subject: `Payment Receipt — ${data.description}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7c3aed;">Payment Receipt 🧾</h2>
        <p>Hi ${data.clientName},</p>
        <p>Your payment has been received. Here are the details:</p>
        <div style="background: #faf5ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Amount:</strong> ${data.amount}</p>
          <p><strong>Date:</strong> ${data.date}</p>
        </div>
        <p>Thank you for investing in yourself! 💜</p>
        <p>— Coach Angel</p>
      </div>
    `,
  }
}

export function contractReminderEmail(data: { clientName: string; contractName: string; dashboardUrl: string }) {
  return {
    subject: `Action Required: Please sign your coaching agreement 📝`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7c3aed;">Coaching Agreement 📝</h2>
        <p>Hi ${data.clientName},</p>
        <p>Before we begin our work together, please review and sign your <strong>${data.contractName}</strong>.</p>
        <a href="${data.dashboardUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
          Review & Sign Contract →
        </a>
        <p>— Coach Angel 💜</p>
      </div>
    `,
  }
}
