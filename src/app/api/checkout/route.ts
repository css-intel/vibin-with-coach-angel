import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { packageId } = await req.json()

    const pkg = await prisma.coachingPackage.findUnique({
      where: { id: packageId },
    })

    if (!pkg || !pkg.isActive) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 })
    }

    // Free packages (e.g., Discovery Session)
    if (pkg.priceInCents === 0) {
      const enrollment = await prisma.enrollment.create({
        data: {
          clientId: session.user.id,
          packageId: pkg.id,
          sessionsTotal: pkg.sessionCount,
          status: "ACTIVE",
        },
      })

      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_URL}/dashboard?enrolled=true`,
        enrollmentId: enrollment.id,
      })
    }

    // Paid packages — create Stripe checkout
    if (!pkg.stripePriceId) {
      return NextResponse.json(
        { error: "Package not configured for payments" },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email!,
      mode: pkg.billingType === "RECURRING" ? "subscription" : "payment",
      line_items: [{ price: pkg.stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/services?payment=cancelled`,
      metadata: {
        userId: session.user.id,
        packageId: pkg.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("[Checkout] Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
