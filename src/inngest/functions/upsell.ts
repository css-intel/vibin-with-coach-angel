import { inngest } from "@/inngest/client"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"

// ─── Upsell Nudge (at 75% session usage) ───────────

export const upsellNudge = inngest.createFunction(
  { id: "upsell-nudge" },
  { event: "booking/session.completed" },
  async ({ event, step }) => {
    const enrollment = await step.run("check-enrollment", async () => {
      return prisma.enrollment.findUnique({
        where: { id: event.data.enrollmentId },
        include: { package: true },
      })
    })

    if (!enrollment) return

    const usagePercent = enrollment.sessionsUsed / enrollment.sessionsTotal
    if (usagePercent >= 0.75 && usagePercent < 1) {
      const user = await step.run("get-user", async () => {
        return prisma.user.findUnique({ where: { id: event.data.clientId } })
      })

      if (!user) return

      await step.run("send-upsell", async () => {
        const remaining = enrollment.sessionsTotal - enrollment.sessionsUsed
        await sendEmail({
          to: user.email,
          subject: `${remaining} session${remaining > 1 ? "s" : ""} remaining — continue your journey? 🌱`,
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #7c3aed;">You're Making Amazing Progress! 🌱</h2>
              <p>Hi ${user.name || "there"},</p>
              <p>You have <strong>${remaining} session${remaining > 1 ? "s" : ""}</strong> remaining in your <strong>${enrollment.package.name}</strong> package.</p>
              <p>I've loved watching your growth! If you'd like to continue our work together, check out the available packages:</p>
              <a href="${process.env.NEXT_PUBLIC_URL}/services" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                View Packages →
              </a>
              <p>— Coach Angel 💜</p>
            </div>
          `,
        })
      })
    }
  }
)
