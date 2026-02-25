import { prisma } from "@/lib/prisma"
import { addMinutes, startOfDay, endOfDay, isAfter } from "date-fns"
import { toZonedTime, fromZonedTime } from "date-fns-tz"

// ─── Types ──────────────────────────────────────────

export interface TimeSlot {
  start: Date
  end: Date
}

// ─── Get Available Slots ────────────────────────────

export async function getAvailableSlots(
  coachId: string,
  date: Date,
  duration: number = 60,
  clientTimezone: string = "America/New_York"
): Promise<TimeSlot[]> {
  const coachTz = "America/New_York" // Default coach timezone
  const zonedDate = toZonedTime(date, coachTz)
  const dayOfWeek = zonedDate.getDay()

  // 1. Get recurring availability for this day of week
  const availability = await prisma.availability.findMany({
    where: { coachId, dayOfWeek, isActive: true },
  })

  if (availability.length === 0) return []

  // 2. Get overrides for this specific date
  const dayStartUtc = fromZonedTime(startOfDay(zonedDate), coachTz)
  const overrides = await prisma.availabilityOverride.findMany({
    where: {
      coachId,
      date: dayStartUtc,
    },
  })

  // If entire day is blocked
  const dayBlocked = overrides.some((o) => o.isBlocked && !o.startTime)
  if (dayBlocked) return []

  // 3. Get existing bookings for this date
  const dayEndUtc = fromZonedTime(endOfDay(zonedDate), coachTz)
  const existingBookings = await prisma.booking.findMany({
    where: {
      coachId,
      scheduledAt: { gte: dayStartUtc, lte: dayEndUtc },
      status: { in: ["SCHEDULED"] },
    },
  })

  // 4. Generate time slots
  const slots: TimeSlot[] = []
  const now = new Date()

  for (const avail of availability) {
    const [startHour, startMin] = avail.startTime.split(":").map(Number)
    const [endHour, endMin] = avail.endTime.split(":").map(Number)

    const windowStart = new Date(zonedDate)
    windowStart.setHours(startHour, startMin, 0, 0)

    const windowEnd = new Date(zonedDate)
    windowEnd.setHours(endHour, endMin, 0, 0)

    let cursor = fromZonedTime(windowStart, coachTz)
    const windowEndUtc = fromZonedTime(windowEnd, coachTz)

    while (addMinutes(cursor, duration) <= windowEndUtc) {
      const candidateEnd = addMinutes(cursor, duration)

      // Skip past slots
      if (!isAfter(cursor, now)) {
        cursor = addMinutes(cursor, 30)
        continue
      }

      // Check blocked overrides
      const isBlocked = overrides.some((o) => {
        if (o.isBlocked && o.startTime && o.endTime) {
          const [bh, bm] = o.startTime.split(":").map(Number)
          const [eh, em] = o.endTime.split(":").map(Number)
          const blockStart = new Date(zonedDate)
          blockStart.setHours(bh, bm, 0, 0)
          const blockEnd = new Date(zonedDate)
          blockEnd.setHours(eh, em, 0, 0)
          return isOverlapping(
            cursor,
            candidateEnd,
            fromZonedTime(blockStart, coachTz),
            fromZonedTime(blockEnd, coachTz)
          )
        }
        return false
      })

      // Check existing bookings
      const isBooked = existingBookings.some((b) =>
        isOverlapping(cursor, candidateEnd, b.scheduledAt, addMinutes(b.scheduledAt, b.duration))
      )

      if (!isBlocked && !isBooked) {
        slots.push({ start: cursor, end: candidateEnd })
      }

      cursor = addMinutes(cursor, 30) // 30-minute slot granularity
    }
  }

  return slots
}

// ─── Check for booking conflicts ─────────────────────

export async function hasBookingConflict(
  coachId: string,
  startTime: Date,
  duration: number,
  excludeBookingId?: string
): Promise<boolean> {
  const endTime = addMinutes(startTime, duration)

  const conflicting = await prisma.booking.findFirst({
    where: {
      coachId,
      status: "SCHEDULED",
      id: excludeBookingId ? { not: excludeBookingId } : undefined,
      AND: [
        { scheduledAt: { lt: endTime } },
        {
          scheduledAt: {
            gte: addMinutes(startTime, -duration),
          },
        },
      ],
    },
  })

  return !!conflicting
}

// ─── Helpers ────────────────────────────────────────

function isOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 < end2 && start2 < end1
}
