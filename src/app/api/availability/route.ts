export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getAvailableSlots } from "@/lib/scheduling"
import { NextResponse } from "next/server"

// GET /api/availability?date=2026-02-25&duration=60 — Public: get available slots
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")
    const duration = parseInt(searchParams.get("duration") || "60")
    const timezone = searchParams.get("timezone") || "America/New_York"

    if (!date) {
      return NextResponse.json({ error: "date is required" }, { status: 400 })
    }

    // Find coach (for MVP, there's one coach — the admin)
    const coach = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    })

    if (!coach) {
      return NextResponse.json({ slots: [] })
    }

    const slots = await getAvailableSlots(
      coach.id,
      new Date(date),
      duration,
      timezone
    )

    return NextResponse.json({ slots, coachId: coach.id })
  } catch (error) {
    console.error("[Availability] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/availability — Admin: set recurring availability
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { dayOfWeek, startTime, endTime, timezone } = await req.json()

    if (dayOfWeek === undefined || !startTime || !endTime) {
      return NextResponse.json(
        { error: "dayOfWeek, startTime, and endTime are required" },
        { status: 400 }
      )
    }

    const availability = await prisma.availability.upsert({
      where: {
        coachId_dayOfWeek_startTime: {
          coachId: session.user.id,
          dayOfWeek,
          startTime,
        },
      },
      update: { endTime, timezone: timezone || "America/New_York", isActive: true },
      create: {
        coachId: session.user.id,
        dayOfWeek,
        startTime,
        endTime,
        timezone: timezone || "America/New_York",
      },
    })

    return NextResponse.json({ availability }, { status: 201 })
  } catch (error) {
    console.error("[Availability] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
