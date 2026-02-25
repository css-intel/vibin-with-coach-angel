import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // ─── Create Admin/Coach user ──────────────────────
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "angel@vibinwithcoachangel.com" },
    update: {},
    create: {
      email: "angel@vibinwithcoachangel.com",
      name: "Coach Angel",
      role: "ADMIN",
      hashedPassword: adminPassword,
      timezone: "America/New_York",
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // ─── Create Coaching Packages ─────────────────────
  const discoveryPkg = await prisma.coachingPackage.upsert({
    where: { id: "pkg-discovery" },
    update: {},
    create: {
      id: "pkg-discovery",
      name: "Discovery Session",
      description: "A complimentary 30-minute call to explore if we're a great fit.",
      packageType: "ONE_ON_ONE",
      billingType: "ONE_TIME",
      priceInCents: 0,
      sessionCount: 1,
      sessionDuration: 30,
      features: ["30-min video call", "Goal exploration", "Personalized recommendations", "No commitment required"],
    },
  })

  const glowUpPkg = await prisma.coachingPackage.upsert({
    where: { id: "pkg-glowup" },
    update: {},
    create: {
      id: "pkg-glowup",
      name: "Glow Up — 4-Week Jumpstart",
      description: "An intensive 4-week coaching program to kickstart your transformation.",
      packageType: "ONE_ON_ONE",
      billingType: "ONE_TIME",
      priceInCents: 39700,
      sessionCount: 4,
      sessionDuration: 60,
      features: ["4 x 60-min 1:1 sessions", "Breathwork exercises", "Inner child work", "Weekly action plans", "Email support between sessions"],
    },
  })

  const deepRootsPkg = await prisma.coachingPackage.upsert({
    where: { id: "pkg-deeproots" },
    update: {},
    create: {
      id: "pkg-deeproots",
      name: "Deep Roots — 12-Week Transformation",
      description: "Our signature program for deep, lasting change.",
      packageType: "ONE_ON_ONE",
      billingType: "ONE_TIME",
      priceInCents: 99700,
      sessionCount: 12,
      sessionDuration: 60,
      features: ["12 x 60-min 1:1 sessions", "Comprehensive wellness assessment", "Custom healing toolkit", "Trauma-informed practices", "Breathwork & meditation", "Unlimited email support", "Resource library access"],
    },
  })

  const groupPkg = await prisma.coachingPackage.upsert({
    where: { id: "pkg-group" },
    update: {},
    create: {
      id: "pkg-group",
      name: "Vibin Circle — Group Coaching",
      description: "Monthly group coaching circle for healing and growth.",
      packageType: "GROUP",
      billingType: "RECURRING",
      priceInCents: 9700,
      sessionCount: 4,
      sessionDuration: 90,
      maxGroupSize: 8,
      recurringInterval: "month",
      features: ["4 x 90-min group sessions/month", "Community support circle", "Shared resources", "Guest expert sessions", "Private group chat"],
    },
  })

  console.log("✅ Coaching packages created")

  // ─── Create Default Availability (Mon-Fri 9am-5pm) ─
  const weekdays = [1, 2, 3, 4, 5] // Mon-Fri
  for (const day of weekdays) {
    await prisma.availability.upsert({
      where: {
        coachId_dayOfWeek_startTime: {
          coachId: admin.id,
          dayOfWeek: day,
          startTime: "09:00",
        },
      },
      update: {},
      create: {
        coachId: admin.id,
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
        timezone: "America/New_York",
      },
    })
  }
  console.log("✅ Default availability set (Mon-Fri 9am-5pm ET)")

  // ─── Create Contract Templates ────────────────────
  await prisma.contractTemplate.upsert({
    where: { id: "ct-individual" },
    update: {},
    create: {
      id: "ct-individual",
      name: "Coaching Agreement — Individual",
      content: `# Coaching Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned client ("Client").\n\n## Services\nThe Coach agrees to provide holistic life coaching services as outlined in the selected coaching package.\n\n## Confidentiality\nAll information shared during coaching sessions is strictly confidential.\n\n## Cancellation Policy\nSessions must be cancelled at least 24 hours in advance. Late cancellations or no-shows will count as a used session.\n\n## Commitment\nThe Client agrees to attend all scheduled sessions and complete agreed-upon action items between sessions.\n\n## Disclaimer\nCoaching is not therapy or medical advice. The Coach is a certified holistic health coach, not a licensed therapist.`,
      packageId: glowUpPkg.id,
    },
  })

  await prisma.contractTemplate.upsert({
    where: { id: "ct-transformation" },
    update: {},
    create: {
      id: "ct-transformation",
      name: "Coaching Agreement — Transformation",
      content: `# 12-Week Transformation Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned client ("Client").\n\n## Program Overview\nThe Deep Roots 12-Week Transformation program includes 12 weekly 1:1 sessions.\n\n## Investment\nClient agrees to the full program investment. No refunds after session 3.\n\n## Confidentiality\nAll information shared is strictly confidential.\n\n## Cancellation Policy\n24-hour advance notice required. No-shows count as completed sessions.`,
      packageId: deepRootsPkg.id,
    },
  })

  await prisma.contractTemplate.upsert({
    where: { id: "ct-group" },
    update: {},
    create: {
      id: "ct-group",
      name: "Group Coaching Agreement",
      content: `# Group Coaching Agreement\n\nThis agreement is between Coach Angel ("Coach") and the undersigned participant ("Participant").\n\n## Group Guidelines\n- Respect all group members\n- Maintain confidentiality\n- Attend sessions on time\n- Participate actively\n\n## Subscription\nMonthly billing. Cancel anytime with 7 days notice.`,
      packageId: groupPkg.id,
    },
  })

  console.log("✅ Contract templates created")

  // ─── Create Sample Resources ──────────────────────
  await prisma.resource.upsert({
    where: { id: "res-breathwork" },
    update: {},
    create: {
      id: "res-breathwork",
      title: "Breathwork for Beginners Guide",
      description: "A comprehensive PDF guide to getting started with breathwork practices.",
      fileUrl: "/resources/breathwork-guide.pdf",
      fileType: "pdf",
      category: "Breathwork",
      isPublic: false,
    },
  })

  await prisma.resource.upsert({
    where: { id: "res-journal" },
    update: {},
    create: {
      id: "res-journal",
      title: "Weekly Reflection Journal Template",
      description: "Use this template to track your weekly reflections and progress.",
      fileUrl: "/resources/journal-template.pdf",
      fileType: "pdf",
      category: "Journaling",
      isPublic: false,
    },
  })

  console.log("✅ Sample resources created")
  console.log("\n🎉 Seed complete!")
  console.log("\n📧 Admin Login:")
  console.log("   Email: angel@vibinwithcoachangel.com")
  console.log("   Password: admin123")
  console.log("\n⚠️  Change the admin password after first login!")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
