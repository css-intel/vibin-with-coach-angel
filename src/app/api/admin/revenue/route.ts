export const dynamic = 'force-dynamic'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/revenue?period=month
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const period = searchParams.get("period") || "month"

    const now = new Date()
    let periodStart: Date

    switch (period) {
      case "week":
        periodStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "year":
        periodStart = new Date(now.getFullYear(), 0, 1)
        break
      case "month":
      default:
        periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    const [totalRevenue, paymentCount, payments] = await Promise.all([
      prisma.payment.aggregate({
        _sum: { amountInCents: true },
        _count: true,
        where: {
          status: "SUCCEEDED",
          createdAt: { gte: periodStart },
        },
      }),
      prisma.payment.count({
        where: { status: "SUCCEEDED", createdAt: { gte: periodStart } },
      }),
      prisma.payment.findMany({
        where: {
          status: "SUCCEEDED",
          createdAt: { gte: periodStart },
        },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
    ])

    // Revenue by package
    const enrollments = await prisma.enrollment.findMany({
      where: { createdAt: { gte: periodStart } },
      include: { package: { select: { name: true } } },
    })

    const revenueByPackage: Record<string, number> = {}
    for (const enrollment of enrollments) {
      const pkgName = enrollment.package.name
      if (!revenueByPackage[pkgName]) revenueByPackage[pkgName] = 0
      // Sum payments for this enrollment
      const pkgPayments = await prisma.payment.aggregate({
        _sum: { amountInCents: true },
        where: { enrollmentId: enrollment.id, status: "SUCCEEDED" },
      })
      revenueByPackage[pkgName] += pkgPayments._sum.amountInCents || 0
    }

    return NextResponse.json({
      period,
      totalRevenue: totalRevenue._sum.amountInCents || 0,
      paymentCount,
      payments,
      revenueByPackage,
    })
  } catch (error) {
    console.error("[AdminRevenue] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
