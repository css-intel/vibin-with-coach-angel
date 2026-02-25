import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// POST /api/availability/overrides — Admin: set date-specific overrides
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { date, startTime, endTime, isBlocked, reason } = await req.json()

    if (!date) {
      return NextResponse.json({ error: "date is required" }, { status: 400 })
    }

    const override = await prisma.availabilityOverride.create({
      data: {
        coachId: session.user.id,
        date: new Date(date),
        startTime: startTime || null,
        endTime: endTime || null,
        isBlocked: isBlocked !== false,
        reason: reason || null,
      },
    })

    return NextResponse.json({ override }, { status: 201 })
  } catch (error) {
    console.error("[AvailabilityOverride] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/availability/overrides?month=2026-02 — Get overrides for a month
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const month = searchParams.get("month") // "2026-02"

    const where: Record<string, unknown> = { coachId: session.user.id }

    if (month) {
      const start = new Date(`${month}-01`)
      const end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      where.date = { gte: start, lt: end }
    }

    const overrides = await prisma.availabilityOverride.findMany({
      where,
      orderBy: { date: "asc" },
    })

    return NextResponse.json({ overrides })
  } catch (error) {
    console.error("[AvailabilityOverride] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
