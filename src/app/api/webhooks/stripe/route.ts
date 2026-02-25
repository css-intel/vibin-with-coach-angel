export const dynamic = 'force-dynamic'

import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { createAuditLog, AuditActions } from "@/lib/audit"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const packageId = session.metadata?.packageId

        if (!userId || !packageId) break

        const pkg = await prisma.coachingPackage.findUnique({
          where: { id: packageId },
        })

        if (!pkg) break

        // Create enrollment
        const enrollment = await prisma.enrollment.create({
          data: {
            clientId: userId,
            packageId,
            sessionsTotal: pkg.sessionCount,
            status: "ACTIVE",
            stripeSubscriptionId: session.subscription as string | null,
          },
        })

        // Record payment
        await prisma.payment.create({
          data: {
            userId,
            enrollmentId: enrollment.id,
            amountInCents: session.amount_total!,
            status: "SUCCEEDED",
            stripePaymentIntentId: session.payment_intent as string,
            description: `Purchase: ${pkg.name}`,
          },
        })

        // Create notification
        await prisma.notification.create({
          data: {
            userId,
            type: "PAYMENT_RECEIVED",
            title: "Payment Confirmed",
            body: `Your payment for ${pkg.name} has been received. Welcome aboard!`,
          },
        })

        // Audit log
        await createAuditLog({
          userId,
          action: AuditActions.ENROLLMENT_CREATED,
          entity: "Enrollment",
          entityId: enrollment.id,
          metadata: { packageId, amount: session.amount_total },
        })

        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const sub = (invoice as any).subscription as string

        if (!sub) break

        const enrollment = await prisma.enrollment.findUnique({
          where: { stripeSubscriptionId: sub },
        })

        if (enrollment) {
          await prisma.payment.create({
            data: {
              userId: enrollment.clientId,
              enrollmentId: enrollment.id,
              amountInCents: invoice.amount_paid,
              status: "SUCCEEDED",
              stripeInvoiceId: invoice.id,
              description: `Subscription renewal`,
            },
          })
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const sub = (invoice as any).subscription as string

        if (!sub) break

        const enrollment = await prisma.enrollment.findUnique({
          where: { stripeSubscriptionId: sub },
        })

        if (enrollment) {
          await prisma.enrollment.update({
            where: { id: enrollment.id },
            data: { status: "PAUSED" },
          })

          await prisma.notification.create({
            data: {
              userId: enrollment.clientId,
              type: "PAYMENT_FAILED",
              title: "Payment Failed",
              body: "Your recent payment could not be processed. Please update your payment method.",
            },
          })
        }
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        const enrollment = await prisma.enrollment.findUnique({
          where: { stripeSubscriptionId: sub.id },
        })

        if (enrollment) {
          await prisma.enrollment.update({
            where: { id: enrollment.id },
            data: { status: "CANCELLED", endDate: new Date() },
          })
        }
        break
      }
    }
  } catch (error) {
    console.error("[Stripe Webhook] Processing error:", error)
    // Still return 200 to prevent Stripe from retrying
  }

  return NextResponse.json({ received: true })
}
