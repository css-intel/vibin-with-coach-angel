export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/sessions — All sessions with filters
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const clientId = searchParams.get("clientId")
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const limit = parseInt(searchParams.get("limit") || "50")

    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (clientId) where.clientId = clientId
    if (from || to) {
      where.scheduledAt = {}
      if (from) (where.scheduledAt as Record<string, unknown>).gte = new Date(from)
      if (to) (where.scheduledAt as Record<string, unknown>).lte = new Date(to)
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, email: true } },
        coach: { select: { id: true, name: true } },
        enrollment: { include: { package: { select: { name: true } } } },
        sessionNotes: { select: { id: true } },
      },
      orderBy: { scheduledAt: "desc" },
      take: limit,
    })

    const total = await prisma.booking.count({ where })

    return NextResponse.json({ bookings, total })
  } catch (error) {
    console.error("[AdminSessions] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
