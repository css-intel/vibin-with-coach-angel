export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/contracts — List contract templates
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role === "CLIENT") {
      // Clients see contracts that need their signature
      const contracts = await prisma.contractTemplate.findMany({
        where: { isActive: true },
        include: {
          signatures: {
            where: { userId: session.user.id },
          },
          package: { select: { name: true } },
        },
      })

      return NextResponse.json({ contracts })
    }

    // Admin sees all contracts
    const contracts = await prisma.contractTemplate.findMany({
      include: {
        signatures: {
          include: { user: { select: { name: true, email: true } } },
        },
        package: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error("[Contracts] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/contracts — Admin: create contract template
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, content, packageId } = await req.json()

    if (!name || !content) {
      return NextResponse.json(
        { error: "name and content are required" },
        { status: 400 }
      )
    }

    const contract = await prisma.contractTemplate.create({
      data: {
        name,
        content,
        packageId: packageId || null,
      },
    })

    return NextResponse.json({ contract }, { status: 201 })
  } catch (error) {
    console.error("[Contracts] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
