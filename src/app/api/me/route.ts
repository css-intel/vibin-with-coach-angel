import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/me — Get current user profile
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        clientProfile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove sensitive fields
    const { hashedPassword, ...safeUser } = user

    return NextResponse.json({ user: safeUser })
  } catch (error) {
    console.error("[Me] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/me — Update current user profile
export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        phone: data.phone,
        timezone: data.timezone,
      },
    })

    // Update client profile if fields provided
    if (data.goals !== undefined || data.healthHistory !== undefined || data.emergencyContact !== undefined || data.intakeCompleted !== undefined) {
      await prisma.clientProfile.upsert({
        where: { userId: session.user.id },
        update: {
          goals: data.goals,
          healthHistory: data.healthHistory,
          emergencyContact: data.emergencyContact,
          intakeCompleted: data.intakeCompleted,
        },
        create: {
          userId: session.user.id,
          goals: data.goals,
          healthHistory: data.healthHistory,
          emergencyContact: data.emergencyContact,
          intakeCompleted: data.intakeCompleted || false,
        },
      })
    }

    const { hashedPassword, ...safeUser } = user
    return NextResponse.json({ user: safeUser })
  } catch (error) {
    console.error("[Me] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
