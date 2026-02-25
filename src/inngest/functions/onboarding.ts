import { inngest } from "@/inngest/client"
import { prisma } from "@/lib/prisma"
import { sendEmail, welcomeEmail, contractReminderEmail } from "@/lib/email"

export const onboardingWorkflow = inngest.createFunction(
  { id: "client-onboarding" },
  { event: "client/onboarding.start" },
  async ({ event, step }) => {
    const { userId, enrollmentId, packageName } = event.data

    const user = await step.run("get-user", async () => {
      return prisma.user.findUnique({ where: { id: userId } })
    })

    if (!user) return

    // Step 1: Welcome email (immediate)
    await step.run("send-welcome-email", async () => {
      const email = welcomeEmail({
        clientName: user.name || "there",
        packageName: packageName || "Coaching Package",
        dashboardUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      })
      await sendEmail({
        to: user.email,
        subject: email.subject,
        html: email.html,
      })
    })

    // Step 2: Wait 1 hour, check intake form
    await step.sleep("wait-for-intake", "1h")

    const profile = await step.run("check-intake", async () => {
      return prisma.clientProfile.findUnique({ where: { userId } })
    })

    if (!profile?.intakeCompleted) {
      await step.run("send-intake-reminder", async () => {
        await sendEmail({
          to: user.email,
          subject: "Complete your intake form to get started 📋",
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #7c3aed;">One Quick Step! 📋</h2>
              <p>Hi ${user.name || "there"},</p>
              <p>To make the most of our sessions, please complete your intake form in your dashboard.</p>
              <a href="${process.env.NEXT_PUBLIC_URL}/dashboard/profile" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Complete Intake Form →
              </a>
              <p>— Coach Angel 💜</p>
            </div>
          `,
        })
      })
    }

    // Step 3: Contract signing reminder (24 hours)
    await step.sleep("wait-for-contract", "23h")

    const signature = await step.run("check-contract", async () => {
      return prisma.contractSignature.findFirst({ where: { userId } })
    })

    if (!signature) {
      await step.run("send-contract-reminder", async () => {
        const email = contractReminderEmail({
          clientName: user.name || "there",
          contractName: "Coaching Agreement",
          dashboardUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard/contracts`,
        })
        await sendEmail({ to: user.email, ...email })
      })
    }

    // Step 4: Prompt to book first session (48 hours total)
    await step.sleep("wait-for-booking", "24h")

    const hasBooking = await step.run("check-booking", async () => {
      return prisma.booking.findFirst({
        where: { clientId: userId, status: "SCHEDULED" },
      })
    })

    if (!hasBooking) {
      await step.run("send-booking-nudge", async () => {
        await sendEmail({
          to: user.email,
          subject: "Ready to book your first session? 🗓️",
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #7c3aed;">Let's Get Started! 🗓️</h2>
              <p>Hi ${user.name || "there"},</p>
              <p>Your coaching package is waiting! Book your first session and let's begin your transformation journey.</p>
              <a href="${process.env.NEXT_PUBLIC_URL}/dashboard/booking" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Book Your First Session →
              </a>
              <p>— Coach Angel 💜</p>
            </div>
          `,
        })
      })
    }
  }
)
