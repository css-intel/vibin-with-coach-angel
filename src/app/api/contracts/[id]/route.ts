import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/contracts/[id] — Get contract detail
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

    const contract = await prisma.contractTemplate.findUnique({
      where: { id },
      include: {
        signatures: {
          include: { user: { select: { name: true, email: true } } },
        },
        package: { select: { name: true } },
      },
    })

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error("[Contract] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH /api/contracts/[id] — Admin: update contract template
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

    const contract = await prisma.contractTemplate.update({
      where: { id },
      data: {
        name: data.name,
        content: data.content,
        packageId: data.packageId,
        isActive: data.isActive,
        version: { increment: 1 },
      },
    })

    return NextResponse.json({ contract })
  } catch (error) {
    console.error("[Contract] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
