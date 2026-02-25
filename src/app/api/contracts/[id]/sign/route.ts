import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createAuditLog, AuditActions } from "@/lib/audit"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

// POST /api/contracts/[id]/sign — Client: sign a contract
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { signatureData } = await req.json()

    if (!signatureData) {
      return NextResponse.json(
        { error: "signatureData is required" },
        { status: 400 }
      )
    }

    // Check contract exists
    const contract = await prisma.contractTemplate.findUnique({
      where: { id },
    })

    if (!contract || !contract.isActive) {
      return NextResponse.json(
        { error: "Contract not found or inactive" },
        { status: 404 }
      )
    }

    // Check if already signed
    const existingSignature = await prisma.contractSignature.findUnique({
      where: {
        contractId_userId: {
          contractId: id,
          userId: session.user.id,
        },
      },
    })

    if (existingSignature) {
      return NextResponse.json(
        { error: "Contract already signed" },
        { status: 409 }
      )
    }

    const headersList = await headers()
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Create signature
    const signature = await prisma.contractSignature.create({
      data: {
        contractId: id,
        userId: session.user.id,
        signatureData,
        ipAddress,
        userAgent,
      },
    })

    // Audit log
    await createAuditLog({
      userId: session.user.id,
      action: AuditActions.CONTRACT_SIGNED,
      entity: "ContractSignature",
      entityId: signature.id,
      metadata: {
        contractId: id,
        contractVersion: contract.version,
        ipAddress,
      },
      ipAddress,
    })

    // Create notification for admin
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } })
    if (admin) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          type: "CONTRACT_PENDING",
          title: "Contract Signed",
          body: `${session.user.name || session.user.email} has signed ${contract.name}.`,
        },
      })
    }

    return NextResponse.json({ signature }, { status: 201 })
  } catch (error) {
    console.error("[ContractSign] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
