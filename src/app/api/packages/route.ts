export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/packages — List active packages (public)
export async function GET() {
  try {
    const packages = await prisma.coachingPackage.findMany({
      where: { isActive: true },
      orderBy: { priceInCents: "asc" },
    })

    return NextResponse.json({ packages })
  } catch (error) {
    console.error("[Packages] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/packages — Create package (admin only)
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const pkg = await prisma.coachingPackage.create({
      data: {
        name: data.name,
        description: data.description,
        packageType: data.packageType,
        billingType: data.billingType,
        priceInCents: data.priceInCents,
        currency: data.currency || "usd",
        sessionCount: data.sessionCount,
        sessionDuration: data.sessionDuration || 60,
        maxGroupSize: data.maxGroupSize || null,
        recurringInterval: data.recurringInterval || null,
        features: data.features || [],
        isActive: data.isActive !== false,
      },
    })

    return NextResponse.json({ package: pkg }, { status: 201 })
  } catch (error) {
    console.error("[Packages] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
