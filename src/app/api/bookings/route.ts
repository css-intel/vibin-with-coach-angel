export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createAuditLog, AuditActions } from "@/lib/audit"
import { sendEmail, bookingConfirmationEmail } from "@/lib/email"
import { hasBookingConflict } from "@/lib/scheduling"
import { NextResponse } from "next/server"
import { format } from "date-fns"

// GET /api/bookings — List bookings
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")

    const where: Record<string, unknown> = {}

    // Clients only see their own bookings
    if (session.user.role === "CLIENT") {
      where.clientId = session.user.id
    }

    if (status) {
      where.status = status
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        client: { select: { id: true, name: true, email: true } },
        coach: { select: { id: true, name: true, email: true } },
        enrollment: { select: { id: true, package: { select: { name: true } } } },
      },
      orderBy: { scheduledAt: "asc" },
      take: limit,
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("[Bookings] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/bookings — Create booking
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { scheduledAt, duration, coachId, enrollmentId } = await req.json()

    if (!scheduledAt || !coachId) {
      return NextResponse.json(
        { error: "scheduledAt and coachId are required" },
        { status: 400 }
      )
    }

    const startTime = new Date(scheduledAt)
    const bookingDuration = duration || 60

    // Check for conflicts
    const conflict = await hasBookingConflict(coachId, startTime, bookingDuration)
    if (conflict) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      )
    }

    // If enrollment specified, verify it belongs to the user and has sessions left
    if (enrollmentId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
      })

      if (!enrollment || enrollment.clientId !== session.user.id) {
        return NextResponse.json({ error: "Invalid enrollment" }, { status: 400 })
      }

      if (enrollment.sessionsUsed >= enrollment.sessionsTotal) {
        return NextResponse.json(
          { error: "No sessions remaining in this package" },
          { status: 400 }
        )
      }
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        coachId,
        enrollmentId: enrollmentId || null,
        scheduledAt: startTime,
        duration: bookingDuration,
        status: "SCHEDULED",
      },
      include: {
        client: true,
        enrollment: { include: { package: true } },
      },
    })

    // Increment sessions used
    if (enrollmentId) {
      await prisma.enrollment.update({
        where: { id: enrollmentId },
        data: { sessionsUsed: { increment: 1 } },
      })
    }

    // Send confirmation email
    const emailData = bookingConfirmationEmail({
      clientName: booking.client.name || "there",
      dateTime: format(booking.scheduledAt, "EEEE, MMMM d, yyyy 'at' h:mm a"),
      duration: booking.duration,
      meetingLink: booking.meetingLink || undefined,
      packageName: booking.enrollment?.package?.name || "Coaching Session",
    })
    await sendEmail({
      to: booking.client.email,
      ...emailData,
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "BOOKING_CONFIRMATION",
        title: "Session Booked!",
        body: `Your session has been scheduled for ${format(booking.scheduledAt, "MMMM d 'at' h:mm a")}.`,
      },
    })

    // Audit log
    await createAuditLog({
      userId: session.user.id,
      action: AuditActions.BOOKING_CREATED,
      entity: "Booking",
      entityId: booking.id,
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("[Bookings] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
