export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createAuditLog, AuditActions } from "@/lib/audit"
import { NextResponse } from "next/server"

// GET /api/bookings/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, email: true } },
        coach: { select: { id: true, name: true, email: true } },
        enrollment: { include: { package: true } },
        sessionNotes: {
          where: session.user.role === "CLIENT" ? { isPrivate: false } : {},
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Clients can only view their own bookings
    if (session.user.role === "CLIENT" && booking.clientId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("[Booking] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/bookings/[id] — Update booking (cancel, reschedule, complete)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await req.json()

    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Clients can only modify their own bookings
    if (session.user.role === "CLIENT" && booking.clientId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: data.status || undefined,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
        cancellationReason: data.cancellationReason || undefined,
        meetingLink: data.meetingLink || undefined,
      },
    })

    // Handle cancellation — return session to enrollment
    if (data.status === "CANCELLED" && booking.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: booking.enrollmentId },
        data: { sessionsUsed: { decrement: 1 } },
      })
    }

    // Handle completion
    if (data.status === "COMPLETED") {
      await createAuditLog({
        userId: session.user.id,
        action: AuditActions.BOOKING_COMPLETED,
        entity: "Booking",
        entityId: id,
      })
    }

    if (data.status === "CANCELLED") {
      await createAuditLog({
        userId: session.user.id,
        action: AuditActions.BOOKING_CANCELLED,
        entity: "Booking",
        entityId: id,
        metadata: { reason: data.cancellationReason },
      })
    }

    return NextResponse.json({ booking: updated })
  } catch (error) {
    console.error("[Booking] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
