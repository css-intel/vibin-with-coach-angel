import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/admin/dashboard — Admin overview stats
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const [
      totalClients,
      activeEnrollments,
      monthlyRevenue,
      lastMonthRevenue,
      upcomingSessions,
      completedSessions,
      recentPayments,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.payment.aggregate({
        _sum: { amountInCents: true },
        where: { status: "SUCCEEDED", createdAt: { gte: startOfMonth } },
      }),
      prisma.payment.aggregate({
        _sum: { amountInCents: true },
        where: {
          status: "SUCCEEDED",
          createdAt: { gte: startOfLastMonth, lt: startOfMonth },
        },
      }),
      prisma.booking.count({
        where: { status: "SCHEDULED", scheduledAt: { gte: now } },
      }),
      prisma.booking.count({
        where: { status: "COMPLETED", scheduledAt: { gte: startOfMonth } },
      }),
      prisma.payment.findMany({
        where: { status: "SUCCEEDED" },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ])

    const currentRevenue = monthlyRevenue._sum.amountInCents || 0
    const previousRevenue = lastMonthRevenue._sum.amountInCents || 0
    const revenueGrowth = previousRevenue > 0
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
      : 0

    return NextResponse.json({
      totalClients,
      activeEnrollments,
      monthlyRevenue: currentRevenue,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      upcomingSessions,
      completedSessions,
      recentPayments,
    })
  } catch (error) {
    console.error("[AdminDashboard] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
