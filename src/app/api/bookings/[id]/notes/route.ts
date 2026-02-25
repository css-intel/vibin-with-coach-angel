export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/bookings/[id]/notes — Get session notes
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

    const where: Record<string, unknown> = { bookingId: id }

    // Clients only see non-private notes
    if (session.user.role === "CLIENT") {
      where.isPrivate = false
    }

    const notes = await prisma.sessionNote.findMany({
      where,
      include: {
        author: { select: { name: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error("[SessionNotes] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/bookings/[id]/notes — Create session note (coach/admin only)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role === "CLIENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const { content, isPrivate } = await req.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const note = await prisma.sessionNote.create({
      data: {
        bookingId: id,
        authorId: session.user.id,
        clientId: booking.clientId,
        content,
        isPrivate: isPrivate !== false,
      },
    })

    // If note is shared, notify client
    if (!note.isPrivate) {
      await prisma.notification.create({
        data: {
          userId: booking.clientId,
          type: "SESSION_NOTES_SHARED",
          title: "Session Notes Available",
          body: "Your coach has shared notes from your recent session.",
        },
      })
    }

    return NextResponse.json({ note }, { status: 201 })
  } catch (error) {
    console.error("[SessionNotes] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
