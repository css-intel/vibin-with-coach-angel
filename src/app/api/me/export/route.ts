import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/me/export — GDPR data export
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const [user, profile, bookings, payments, contracts, notifications] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true, email: true, name: true, phone: true,
          timezone: true, role: true, createdAt: true,
        },
      }),
      prisma.clientProfile.findUnique({ where: { userId } }),
      prisma.booking.findMany({
        where: { clientId: userId },
        select: {
          id: true, scheduledAt: true, duration: true,
          status: true, createdAt: true,
        },
      }),
      prisma.payment.findMany({
        where: { userId },
        select: {
          id: true, amountInCents: true, currency: true,
          status: true, description: true, createdAt: true,
        },
      }),
      prisma.contractSignature.findMany({
        where: { userId },
        select: {
          id: true, signedAt: true, contractId: true,
        },
      }),
      prisma.notification.findMany({
        where: { userId },
        select: {
          id: true, type: true, title: true, body: true,
          isRead: true, sentAt: true,
        },
      }),
    ])

    const exportData = {
      exportedAt: new Date().toISOString(),
      user,
      profile,
      bookings,
      payments,
      contracts,
      notifications,
    }

    return NextResponse.json(exportData, {
      headers: {
        "Content-Disposition": `attachment; filename="data-export-${userId}.json"`,
      },
    })
  } catch (error) {
    console.error("[DataExport] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
