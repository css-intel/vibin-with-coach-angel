import { prisma } from "@/lib/prisma"

interface AuditLogEntry {
  userId?: string
  action: string
  entity: string
  entityId: string
  metadata?: Record<string, unknown>
  ipAddress?: string
}

export async function createAuditLog(entry: AuditLogEntry) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId,
        metadata: entry.metadata || undefined,
        ipAddress: entry.ipAddress,
      },
    })
  } catch (error) {
    // Audit logging should never break the main flow
    console.error("[AuditLog] Failed to log:", error)
  }
}

// ─── Common audit actions ───────────────────────────

export const AuditActions = {
  // Auth
  USER_LOGIN: "user.login",
  USER_SIGNUP: "user.signup",
  USER_LOGOUT: "user.logout",

  // Bookings
  BOOKING_CREATED: "booking.created",
  BOOKING_CANCELLED: "booking.cancelled",
  BOOKING_RESCHEDULED: "booking.rescheduled",
  BOOKING_COMPLETED: "booking.completed",

  // Payments
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_FAILED: "payment.failed",
  PAYMENT_REFUNDED: "payment.refunded",

  // Contracts
  CONTRACT_CREATED: "contract.created",
  CONTRACT_SIGNED: "contract.signed",

  // Packages
  PACKAGE_CREATED: "package.created",
  PACKAGE_UPDATED: "package.updated",

  // Enrollment
  ENROLLMENT_CREATED: "enrollment.created",
  ENROLLMENT_COMPLETED: "enrollment.completed",
  ENROLLMENT_CANCELLED: "enrollment.cancelled",

  // Resources
  RESOURCE_UPLOADED: "resource.uploaded",
  RESOURCE_DELETED: "resource.deleted",
} as const
