import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/clients — Admin: list all clients
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || !["ADMIN", "COACH"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    const where: Record<string, unknown> = { role: "CLIENT" }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    const [clients, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          clientProfile: true,
          bookingsAsClient: {
            where: { status: "SCHEDULED" },
            orderBy: { scheduledAt: "asc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({ clients, total })
  } catch (error) {
    console.error("[Clients] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
