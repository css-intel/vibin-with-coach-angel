import { inngest } from "@/inngest/client"
import { prisma } from "@/lib/prisma"
import { sendEmail, sessionReminderEmail } from "@/lib/email"
import { format } from "date-fns"

// ─── 24-Hour Session Reminder ───────────────────────

export const sessionReminder24h = inngest.createFunction(
  { id: "session-reminder-24h" },
  { cron: "0 * * * *" }, // Check every hour
  async ({ step }) => {
    const upcoming = await step.run("find-sessions-24h", async () => {
      const from = new Date()
      const to = new Date(Date.now() + 25 * 60 * 60 * 1000) // 25 hours from now
      return prisma.booking.findMany({
        where: {
          scheduledAt: { gte: from, lte: to },
          status: "SCHEDULED",
        },
        include: { client: true, coach: true },
      })
    })

    for (const booking of upcoming) {
      await step.run(`remind-24h-${booking.id}`, async () => {
        const email = sessionReminderEmail({
          clientName: booking.client.name || "there",
          dateTime: format(booking.scheduledAt, "EEEE, MMMM d 'at' h:mm a"),
          meetingLink: booking.meetingLink || undefined,
          hoursUntil: 24,
        })
        await sendEmail({ to: booking.client.email, ...email })
      })
    }
  }
)

// ─── 1-Hour Session Reminder ────────────────────────

export const sessionReminder1h = inngest.createFunction(
  { id: "session-reminder-1h" },
  { cron: "*/15 * * * *" }, // Check every 15 minutes
  async ({ step }) => {
    const upcoming = await step.run("find-sessions-1h", async () => {
      const from = new Date()
      const to = new Date(Date.now() + 75 * 60 * 1000) // 75 minutes from now
      return prisma.booking.findMany({
        where: {
          scheduledAt: { gte: from, lte: to },
          status: "SCHEDULED",
        },
        include: { client: true },
      })
    })

    for (const booking of upcoming) {
      await step.run(`remind-1h-${booking.id}`, async () => {
        const email = sessionReminderEmail({
          clientName: booking.client.name || "there",
          dateTime: format(booking.scheduledAt, "h:mm a"),
          meetingLink: booking.meetingLink || undefined,
          hoursUntil: 1,
        })
        await sendEmail({ to: booking.client.email, ...email })
      })
    }
  }
)

// ─── No-Show Detection ─────────────────────────────

export const noShowCheck = inngest.createFunction(
  { id: "no-show-check" },
  { cron: "*/30 * * * *" }, // Check every 30 minutes
  async ({ step }) => {
    const now = new Date()
    const fifteenMinAgo = new Date(now.getTime() - 15 * 60 * 1000)

    await step.run("flag-no-shows", async () => {
      // Sessions that should have started 15+ min ago but aren't completed
      await prisma.booking.updateMany({
        where: {
          scheduledAt: { lte: fifteenMinAgo },
          status: "SCHEDULED",
        },
        data: {
          // Don't auto-flag as NO_SHOW — let coach mark manually
          // This just helps with reporting
        },
      })
    })
  }
)
