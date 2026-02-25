import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/clients/[id] — Admin: get client detail
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || !["ADMIN", "COACH"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params

    const client = await prisma.user.findUnique({
      where: { id },
      include: {
        clientProfile: true,
        bookingsAsClient: {
          include: {
            enrollment: { include: { package: true } },
          },
          orderBy: { scheduledAt: "desc" },
        },
        payments: { orderBy: { createdAt: "desc" } },
        contractSignatures: {
          include: { contract: true },
        },
      },
    })

    if (!client || client.role !== "CLIENT") {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    // Get enrollments
    const enrollments = await prisma.enrollment.findMany({
      where: { clientId: id },
      include: { package: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ client, enrollments })
  } catch (error) {
    console.error("[Client] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/clients/[id] — Admin: update client
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const data = await req.json()

    // Update user fields
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        timezone: data.timezone,
      },
    })

    // Update profile fields if provided
    if (data.tags || data.goals) {
      await prisma.clientProfile.update({
        where: { userId: id },
        data: {
          tags: data.tags,
          goals: data.goals,
        },
      })
    }

    return NextResponse.json({ client: user })
  } catch (error) {
    console.error("[Client] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
