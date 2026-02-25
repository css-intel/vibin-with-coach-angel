export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/resources — List resources
export async function GET(req: Request) {
  try {
    const session = await auth()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const where: Record<string, unknown> = {}

    // Unauthenticated users only see public resources
    if (!session?.user) {
      where.isPublic = true
    } else if (session.user.role === "CLIENT") {
      // Clients see public resources + all resources (they have access via enrollment)
      // In future, could filter by enrollment-linked resources
    }

    if (category) {
      where.category = category
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ resources })
  } catch (error) {
    console.error("[Resources] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/resources — Admin: create resource
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || !["ADMIN", "COACH"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { title, description, fileUrl, fileType, category, isPublic } = await req.json()

    if (!title || !fileUrl || !fileType) {
      return NextResponse.json(
        { error: "title, fileUrl, and fileType are required" },
        { status: 400 }
      )
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        description: description || null,
        fileUrl,
        fileType,
        category: category || null,
        isPublic: isPublic || false,
      },
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    console.error("[Resources] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
