# Vibin with Coach Angel — Coaching Platform Backend Architecture

**Author:** System Architect  
**Date:** February 21, 2026  
**Status:** Technical Blueprint v1.0  
**Domain:** vibinwithcoachangel.com  

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

### High-Level Architecture (Text Diagram)

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  Public Site  │  │ Client Portal│  │     Admin Panel        │ │
│  │  (Next.js)   │  │  (Next.js)   │  │     (Next.js)          │ │
│  └──────┬───────┘  └──────┬───────┘  └────────┬───────────────┘ │
└─────────┼─────────────────┼───────────────────┼─────────────────┘
          │                 │                   │
          ▼                 ▼                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                     API GATEWAY / EDGE                           │
│              Next.js API Routes (App Router)                     │
│              + Middleware (Auth, Rate Limiting)                   │
└──────────────────────┬───────────────────────────────────────────┘
                       │
          ┌────────────┼────────────┬──────────────┐
          ▼            ▼            ▼              ▼
   ┌─────────┐  ┌──────────┐ ┌──────────┐  ┌──────────┐
   │  Auth   │  │ Payments │ │ Calendar │  │  Email   │
   │ Service │  │ (Stripe) │ │ (Google) │  │(Resend)  │
   └────┬────┘  └────┬─────┘ └────┬─────┘  └────┬─────┘
        │             │            │              │
        ▼             ▼            ▼              ▼
┌──────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌────────────┐  ┌─────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ PostgreSQL │  │  Redis  │  │ S3/R2    │  │  Background   │  │
│  │ (Neon.tech)│  │(Upstash)│  │ (Files)  │  │  Jobs (Inngest│  │
│  └────────────┘  └─────────┘  └──────────┘  │   or QStash)  │  │
│                                              └───────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Recommended Stack

| Layer             | Technology                  | Justification                                                     |
|-------------------|-----------------------------|-------------------------------------------------------------------|
| **Runtime**       | Next.js 14 (App Router)     | Already in use; API routes co-located; edge-ready; Vercel native  |
| **API**           | Next.js Route Handlers      | `/app/api/*`; serverless; no separate backend to manage           |
| **Database**      | PostgreSQL via Neon.tech     | Serverless Postgres; branching for dev/prod; scales to zero       |
| **ORM**           | Prisma                      | Type-safe; migrations; introspection; great DX with TS            |
| **Auth**          | NextAuth.js v5 (Auth.js)    | Native Next.js integration; supports OAuth + credentials          |
| **Payments**      | Stripe SDK + Webhooks       | Industry standard; PCI-compliant; subscriptions built-in          |
| **Calendar**      | Google Calendar API          | Direct requirement; OAuth2; robust free/busy queries              |
| **Email**         | Resend + React Email         | Developer-friendly; React-component templates; 3k free/mo        |
| **File Storage**  | Cloudflare R2 or AWS S3      | Contracts, PDFs, resources; cost-effective                        |
| **Background Jobs** | Inngest or Vercel Cron     | Serverless-compatible; event-driven; retries built-in             |
| **Cache**         | Upstash Redis               | Serverless Redis; rate limiting; session cache; availability slots |
| **Hosting**       | Vercel                      | Native Next.js; edge functions; preview deployments               |

### Why This Stack (Not AWS Full)

Your existing site is Next.js 14 on GoDaddy (static export). The architecture shift is:

1. **Move hosting to Vercel** for API route support (GoDaddy only serves static files)
2. **Keep GoDaddy domain** — point DNS A/CNAME records to Vercel
3. **Remove `output: 'export'`** from next.config.js to enable server-side features
4. **All services are serverless** — zero infrastructure management, pay-per-use, auto-scale

---

## 2. DATABASE SCHEMA

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USERS & AUTH ────────────────────────────────────

enum Role {
  ADMIN
  COACH
  CLIENT
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  phone           String?
  avatarUrl       String?
  role            Role      @default(CLIENT)
  emailVerified   DateTime?
  hashedPassword  String?
  timezone        String    @default("America/New_York")
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  accounts        Account[]
  sessions        Session[]
  bookingsAsClient  Booking[]     @relation("ClientBookings")
  bookingsAsCoach   Booking[]     @relation("CoachBookings")
  payments          Payment[]
  contractSignatures ContractSignature[]
  sessionNotes      SessionNote[]  @relation("NoteAuthor")
  clientNotes       SessionNote[]  @relation("NoteClient")
  clientProfile     ClientProfile?
  notifications     Notification[]

  @@index([email])
  @@index([role])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// ─── CLIENT PROFILE ──────────────────────────────────

model ClientProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  intakeCompleted Boolean  @default(false)
  goals           String?  @db.Text
  healthHistory   String?  @db.Text
  emergencyContact String?
  onboardingStep  Int      @default(0)
  tags            String[] @default([])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ─── COACHING PACKAGES ───────────────────────────────

enum PackageType {
  ONE_ON_ONE
  GROUP
}

enum BillingType {
  ONE_TIME
  RECURRING
}

model CoachingPackage {
  id              String      @id @default(cuid())
  name            String
  description     String?     @db.Text
  packageType     PackageType
  billingType     BillingType
  priceInCents    Int
  currency        String      @default("usd")
  sessionCount    Int         // Total sessions included
  sessionDuration Int         @default(60) // minutes
  maxGroupSize    Int?        // null for 1:1
  recurringInterval String?   // 'month' | 'week' — for subscriptions
  stripePriceId   String?     @unique
  stripeProductId String?
  isActive        Boolean     @default(true)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  // Relations
  enrollments     Enrollment[]
  contracts       ContractTemplate[]

  @@index([isActive])
}

// ─── ENROLLMENT (Client ↔ Package) ───────────────────

enum EnrollmentStatus {
  PENDING_PAYMENT
  ACTIVE
  COMPLETED
  CANCELLED
  PAUSED
}

model Enrollment {
  id                String           @id @default(cuid())
  clientId          String
  packageId         String
  status            EnrollmentStatus @default(PENDING_PAYMENT)
  sessionsUsed      Int              @default(0)
  sessionsTotal     Int
  stripeSubscriptionId String?       @unique
  startDate         DateTime         @default(now())
  endDate           DateTime?
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  // Relations
  package           CoachingPackage  @relation(fields: [packageId], references: [id])
  bookings          Booking[]
  payments          Payment[]

  @@index([clientId, status])
  @@index([packageId])
}

// ─── AVAILABILITY & BOOKINGS ─────────────────────────

model Availability {
  id          String   @id @default(cuid())
  coachId     String
  dayOfWeek   Int      // 0=Sun, 1=Mon, ..., 6=Sat
  startTime   String   // "09:00" in coach's timezone
  endTime     String   // "17:00"
  timezone    String   @default("America/New_York")
  isActive    Boolean  @default(true)

  @@unique([coachId, dayOfWeek, startTime])
  @@index([coachId, isActive])
}

model AvailabilityOverride {
  id          String   @id @default(cuid())
  coachId     String
  date        DateTime @db.Date
  startTime   String?  // null = blocked entire day
  endTime     String?
  isBlocked   Boolean  @default(false) // true = unavailable
  reason      String?

  @@unique([coachId, date, startTime])
  @@index([coachId, date])
}

enum BookingStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  NO_SHOW
  RESCHEDULED
}

model Booking {
  id                  String        @id @default(cuid())
  clientId            String
  coachId             String
  enrollmentId        String?
  scheduledAt         DateTime
  duration            Int           @default(60) // minutes
  status              BookingStatus @default(SCHEDULED)
  meetingLink         String?
  googleEventId       String?
  cancellationReason  String?
  rescheduledFromId   String?       // link to original booking
  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt

  // Relations
  client              User          @relation("ClientBookings", fields: [clientId], references: [id])
  coach               User          @relation("CoachBookings", fields: [coachId], references: [id])
  enrollment          Enrollment?   @relation(fields: [enrollmentId], references: [id])
  sessionNotes        SessionNote[]

  @@index([clientId, status])
  @@index([coachId, scheduledAt])
  @@index([scheduledAt])
}

// ─── SESSION NOTES ───────────────────────────────────

model SessionNote {
  id          String   @id @default(cuid())
  bookingId   String
  authorId    String
  clientId    String
  content     String   @db.Text
  isPrivate   Boolean  @default(true) // coach-only vs shared
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  booking  Booking @relation(fields: [bookingId], references: [id])
  author   User    @relation("NoteAuthor", fields: [authorId], references: [id])
  client   User    @relation("NoteClient", fields: [clientId], references: [id])

  @@index([bookingId])
  @@index([clientId])
}

// ─── PAYMENTS ────────────────────────────────────────

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
  DISPUTED
}

model Payment {
  id                  String        @id @default(cuid())
  userId              String
  enrollmentId        String?
  amountInCents       Int
  currency            String        @default("usd")
  status              PaymentStatus @default(PENDING)
  stripePaymentIntentId String?     @unique
  stripeInvoiceId     String?
  description         String?
  failureReason       String?
  refundedAt          DateTime?
  createdAt           DateTime      @default(now())

  user       User        @relation(fields: [userId], references: [id])
  enrollment Enrollment? @relation(fields: [enrollmentId], references: [id])

  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

// ─── CONTRACTS ───────────────────────────────────────

model ContractTemplate {
  id          String   @id @default(cuid())
  name        String
  content     String   @db.Text // Markdown or HTML
  packageId   String?
  isActive    Boolean  @default(true)
  version     Int      @default(1)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  package    CoachingPackage? @relation(fields: [packageId], references: [id])
  signatures ContractSignature[]

  @@index([isActive])
}

model ContractSignature {
  id              String   @id @default(cuid())
  contractId      String
  userId          String
  signedAt        DateTime @default(now())
  ipAddress       String
  userAgent       String?  @db.Text
  signatureData   String   @db.Text // base64 canvas signature or typed name
  pdfUrl          String?  // archived PDF in S3

  contract ContractTemplate @relation(fields: [contractId], references: [id])
  user     User             @relation(fields: [userId], references: [id])

  @@unique([contractId, userId])
  @@index([userId])
}

// ─── NOTIFICATIONS ───────────────────────────────────

enum NotificationType {
  BOOKING_CONFIRMATION
  BOOKING_REMINDER_24H
  BOOKING_REMINDER_1H
  BOOKING_CANCELLED
  PAYMENT_RECEIVED
  PAYMENT_FAILED
  CONTRACT_PENDING
  ONBOARDING_WELCOME
  ONBOARDING_NUDGE
  SESSION_NOTES_SHARED
}

model Notification {
  id        String           @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  body      String           @db.Text
  isRead    Boolean          @default(false)
  metadata  Json?
  sentAt    DateTime         @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId, isRead])
  @@index([sentAt])
}

// ─── RESOURCES (Digital Library) ─────────────────────

model Resource {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  fileUrl     String
  fileType    String   // pdf, video, audio, link
  category    String?
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())

  @@index([category])
  @@index([isPublic])
}

// ─── AUDIT LOG ───────────────────────────────────────

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // "contract.signed", "payment.completed", etc.
  entity    String   // "Contract", "Payment", "Booking"
  entityId  String
  metadata  Json?
  ipAddress String?
  createdAt DateTime @default(now())

  @@index([entity, entityId])
  @@index([userId])
  @@index([createdAt])
}
```

### Indexing Strategy

- **Primary indexes:** All `id` fields (auto by Prisma)
- **Lookup indexes:** `email`, `stripePaymentIntentId`, `stripeSubscriptionId`, `googleEventId`
- **Query indexes:** Composite indexes on status + date fields for dashboard queries
- **Full-text:** Consider pg_trgm extension for searching session notes
- **Partitioning:** Not needed at MVP scale; consider partitioning `AuditLog` by month at >1M rows

---

## 3. AUTHENTICATION & ROLES

### Auth Strategy: NextAuth.js v5 (Auth.js)

```
┌─────────────┐
│   Client     │──→ Login Page ──→ NextAuth.js
└─────────────┘                        │
                            ┌──────────┼──────────┐
                            ▼          ▼          ▼
                        Google     Email/Pass   Magic Link
                        OAuth      (bcrypt)     (Email)
                            │          │          │
                            └──────────┼──────────┘
                                       ▼
                              JWT Session Token
                              (httpOnly cookie)
                                       │
                              ┌────────┼────────┐
                              ▼        ▼        ▼
                           ADMIN    COACH    CLIENT
```

### Configuration

```typescript
// src/lib/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 }, // 7 days
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user?.hashedPassword) return null
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        )
        return valid ? user : null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as Role
      return session
    },
  },
})
```

### Permission Model — Middleware

```typescript
// src/middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const protectedRoutes = {
  "/dashboard":    ["CLIENT", "COACH", "ADMIN"],
  "/admin":        ["ADMIN"],
  "/api/admin":    ["ADMIN"],
  "/api/bookings": ["CLIENT", "COACH", "ADMIN"],
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const role = req.auth?.user?.role

  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !roles.includes(role)) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/:path*"],
}
```

### Role Permissions Matrix

| Action                  | ADMIN | COACH | CLIENT |
|-------------------------|:-----:|:-----:|:------:|
| View all clients        |  ✅   |  ✅   |   ❌   |
| Manage packages         |  ✅   |  ❌   |   ❌   |
| Book sessions           |  ✅   |  ✅   |   ✅   |
| View own bookings       |  ✅   |  ✅   |   ✅   |
| Write session notes     |  ✅   |  ✅   |   ❌   |
| View shared notes       |  ✅   |  ✅   |   ✅   |
| Process payments        |  ✅   |  ❌   |   ❌   |
| View revenue dashboard  |  ✅   |  ❌   |   ❌   |
| Sign contracts          |  ❌   |  ❌   |   ✅   |
| Manage contracts        |  ✅   |  ❌   |   ❌   |
| Upload resources        |  ✅   |  ✅   |   ❌   |

---

## 4. PAYMENT SYSTEM (Stripe)

### Architecture

```
Client clicks "Purchase"
        │
        ▼
POST /api/checkout ────→ stripe.checkout.sessions.create()
        │                         │
        ▼                         ▼
   Redirect to            Stripe Checkout Page
   Stripe Checkout               │
                                  ▼
                          Payment Completes
                                  │
                    ┌─────────────┼─────────────┐
                    ▼                           ▼
            webhook: checkout.                webhook: invoice.
            session.completed                 payment_succeeded
                    │                           │
                    ▼                           ▼
           Create Enrollment              Record Payment
           Send Welcome Email             Update Invoice
           Trigger Onboarding             Send Receipt
```

### Stripe Products & Pricing

```typescript
// src/lib/stripe.ts
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

// Called when admin creates a new coaching package
export async function createStripeProduct(pkg: {
  name: string
  description: string
  priceInCents: number
  billingType: "ONE_TIME" | "RECURRING"
  recurringInterval?: "month" | "week"
}) {
  const product = await stripe.products.create({
    name: pkg.name,
    description: pkg.description,
  })

  const priceData: Stripe.PriceCreateParams = {
    product: product.id,
    unit_amount: pkg.priceInCents,
    currency: "usd",
  }

  if (pkg.billingType === "RECURRING") {
    priceData.recurring = {
      interval: pkg.recurringInterval || "month",
    }
  }

  const price = await stripe.prices.create(priceData)

  return { productId: product.id, priceId: price.id }
}
```

### Checkout Session Creation

```typescript
// src/app/api/checkout/route.ts
import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { packageId } = await req.json()
  const pkg = await prisma.coachingPackage.findUnique({ where: { id: packageId } })
  if (!pkg?.stripePriceId) return NextResponse.json({ error: "Invalid package" }, { status: 400 })

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    mode: pkg.billingType === "RECURRING" ? "subscription" : "payment",
    line_items: [{ price: pkg.stripePriceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/services?payment=cancelled`,
    metadata: {
      userId: session.user.id,
      packageId: pkg.id,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
```

### Webhook Handler

```typescript
// src/app/api/webhooks/stripe/route.ts
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const { userId, packageId } = session.metadata!
      const pkg = await prisma.coachingPackage.findUnique({
        where: { id: packageId },
      })

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          clientId: userId,
          packageId,
          sessionsTotal: pkg!.sessionCount,
          status: "ACTIVE",
          stripeSubscriptionId: session.subscription as string | null,
        },
      })

      // Record payment
      await prisma.payment.create({
        data: {
          userId,
          amountInCents: session.amount_total!,
          status: "SUCCEEDED",
          stripePaymentIntentId: session.payment_intent as string,
          description: `Purchase: ${pkg!.name}`,
        },
      })

      // Trigger onboarding (fire-and-forget to background job)
      // await inngest.send({ name: "client/onboarding.start", data: { userId } })
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      const sub = invoice.subscription as string
      const enrollment = await prisma.enrollment.findUnique({
        where: { stripeSubscriptionId: sub },
      })
      if (enrollment) {
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { status: "PAUSED" },
        })
        // Send payment failure email
      }
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await prisma.enrollment.update({
        where: { stripeSubscriptionId: sub.id },
        data: { status: "CANCELLED", endDate: new Date() },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
```

### Payment Failure Logic

1. **First failure:** Stripe retries automatically (Smart Retries)
2. **Webhook `invoice.payment_failed`:** Pause enrollment, email client
3. **After 3 failures:** Stripe cancels subscription → webhook `customer.subscription.deleted` → mark enrollment cancelled
4. **Grace period:** 7-day window where client can update payment method at `/dashboard/billing`
5. **Dunning emails:** Automated via Stripe's built-in dunning + supplementary emails from your system

---

## 5. SCHEDULING ENGINE

### Availability Logic

```typescript
// src/lib/scheduling.ts
import { prisma } from "@/lib/prisma"
import { addMinutes, parseISO, format, isWithinInterval } from "date-fns"
import { toZonedTime, fromZonedTime } from "date-fns-tz"

interface TimeSlot {
  start: Date
  end: Date
}

export async function getAvailableSlots(
  coachId: string,
  date: Date,
  duration: number = 60,
  clientTimezone: string = "America/New_York"
): Promise<TimeSlot[]> {
  const coachTz = "America/New_York" // from coach's User.timezone
  const dayOfWeek = toZonedTime(date, coachTz).getDay()

  // 1. Get recurring availability for this day
  const availability = await prisma.availability.findMany({
    where: { coachId, dayOfWeek, isActive: true },
  })

  // 2. Get overrides for this specific date
  const overrides = await prisma.availabilityOverride.findMany({
    where: {
      coachId,
      date: { equals: startOfDay(date) },
    },
  })

  // 3. Get existing bookings for this date
  const dayStart = startOfDay(toZonedTime(date, coachTz))
  const dayEnd = endOfDay(toZonedTime(date, coachTz))
  const existingBookings = await prisma.booking.findMany({
    where: {
      coachId,
      scheduledAt: { gte: fromZonedTime(dayStart, coachTz), lte: fromZonedTime(dayEnd, coachTz) },
      status: { in: ["SCHEDULED"] },
    },
  })

  // 4. Get Google Calendar busy times (cached in Redis)
  const googleBusy = await getGoogleCalendarBusy(coachId, date)

  // 5. Generate slots
  let slots: TimeSlot[] = []
  for (const avail of availability) {
    const slotStart = parseTimeInTz(date, avail.startTime, coachTz)
    const slotEnd = parseTimeInTz(date, avail.endTime, coachTz)
    
    let cursor = slotStart
    while (addMinutes(cursor, duration) <= slotEnd) {
      const candidateEnd = addMinutes(cursor, duration)
      const isBlocked = overrides.some(o => o.isBlocked)
      const isBooked = existingBookings.some(b =>
        isOverlapping(cursor, candidateEnd, b.scheduledAt, addMinutes(b.scheduledAt, b.duration))
      )
      const isGoogleBusy = googleBusy.some(b =>
        isOverlapping(cursor, candidateEnd, b.start, b.end)
      )

      if (!isBlocked && !isBooked && !isGoogleBusy) {
        slots.push({ start: cursor, end: candidateEnd })
      }
      cursor = addMinutes(cursor, 30) // 30-min slot granularity
    }
  }

  return slots
}
```

### Timezone Handling

- **Store all times as UTC** in the database
- **Display in client's timezone** (detected via browser `Intl.DateTimeFormat().resolvedOptions().timeZone` or from `User.timezone`)
- **Coach sets availability** in their own timezone
- **Conversion happens at API boundary** — inputs converted to UTC on save, converted to local on read

### Google Calendar Sync

```typescript
// src/lib/google-calendar.ts
import { google } from "googleapis"

export async function createCalendarEvent(booking: {
  coachGoogleToken: string
  clientEmail: string
  coachEmail: string
  startTime: Date
  duration: number
  meetingLink?: string
}) {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: booking.coachGoogleToken })
  const calendar = google.calendar({ version: "v3", auth })

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: "Coaching Session — Vibin with Coach Angel",
      start: { dateTime: booking.startTime.toISOString() },
      end: {
        dateTime: addMinutes(booking.startTime, booking.duration).toISOString(),
      },
      attendees: [
        { email: booking.coachEmail },
        { email: booking.clientEmail },
      ],
      conferenceData: {
        createRequest: {
          requestId: `vibin-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 }, // 24h
          { method: "popup", minutes: 60 },    // 1h
        ],
      },
    },
  })

  return {
    googleEventId: event.data.id,
    meetingLink: event.data.hangoutLink,
  }
}
```

### Booking Conflict Prevention

1. **Database constraint:** Transaction with `SELECT FOR UPDATE` on the timeslot
2. **Redis lock:** Acquire lock `booking:slot:{coachId}:{timestamp}` with 30s TTL during checkout
3. **Double-check on webhook:** Re-validate slot is free before finalizing enrollment booking

### Reminder System

| Trigger              | Timing    | Channel       | Implementation         |
|----------------------|-----------|---------------|------------------------|
| Booking confirmed    | Immediate | Email         | Resend (sync)          |
| 24h before session   | T-24h     | Email + SMS   | Inngest cron / QStash  |
| 1h before session    | T-1h      | Email         | Inngest cron / QStash  |
| Post-session follow-up| T+1h     | Email         | Inngest cron           |
| No-show check        | T+15min   | Internal flag | Inngest cron           |

---

## 6. CONTRACTS & E-SIGNATURE FLOW

### Flow

```
Admin creates ContractTemplate (Markdown)
        │
        ▼
Client purchases package → Enrollment created
        │
        ▼
System sends "Sign Contract" email + in-portal notification
        │
        ▼
Client opens /dashboard/contracts/{id}
        │
        ▼
┌─────────────────────────────────┐
│  Contract rendered as HTML      │
│  + Canvas signature pad         │
│  + "I agree" checkbox           │
│  + IP + timestamp captured      │
└──────────────┬──────────────────┘
               │
               ▼
POST /api/contracts/{id}/sign
  → Save signature (base64) to DB
  → Generate PDF via @react-pdf/renderer or Puppeteer
  → Upload PDF to S3/R2
  → Create AuditLog entry
  → Update enrollment status
  → Send signed copy via email
```

### Storage Strategy

- **Templates:** Stored as Markdown in `ContractTemplate.content` (versioned via `version` field)
- **Signatures:** `ContractSignature.signatureData` stores base64 canvas data
- **Archived PDFs:** Uploaded to S3/R2 with path `contracts/{userId}/{contractId}/{timestamp}.pdf`
- **Retention:** Contracts retained for 7 years (legal requirement)

### Audit Trail

Every signature action logs to `AuditLog`:

```json
{
  "action": "contract.signed",
  "entity": "ContractSignature",
  "entityId": "sig_abc123",
  "metadata": {
    "contractId": "ct_xyz",
    "contractVersion": 2,
    "signedAt": "2026-02-21T15:30:00Z",
    "ipAddress": "99.89.252.43",
    "userAgent": "Mozilla/5.0..."
  }
}
```

---

## 7. CLIENT PORTAL FEATURES

### URL Structure

```
/dashboard                     → Overview (upcoming sessions, action items)
/dashboard/sessions            → Session history & upcoming
/dashboard/sessions/[id]       → Session detail + shared notes
/dashboard/booking             → Book new session (availability picker)
/dashboard/contracts           → Pending & signed contracts
/dashboard/billing             → Payment history, update payment method
/dashboard/resources           → Resource library (PDFs, videos, links)
/dashboard/profile             → Profile settings, timezone, notifications
/dashboard/messages            → Messages with coach (future phase)
```

### Dashboard Overview Components

```tsx
// Client Dashboard Page
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UpcomingSessionCard />     {/* Next session with join link */}
      <SessionProgressCard />     {/* 4/8 sessions used — progress bar */}
      <ActionItemsCard />         {/* Sign contract, complete intake, etc. */}
      <RecentNotesCard />         {/* Shared session notes */}
      <PackageStatusCard />       {/* Active enrollment details */}
      <QuickBookCard />           {/* Book next session CTA */}
    </div>
  )
}
```

---

## 8. ADMIN PANEL FEATURES

### URL Structure

```
/admin                         → Revenue dashboard
/admin/clients                 → Client list + search + tags
/admin/clients/[id]            → Client detail (profile, sessions, payments, notes)
/admin/sessions                → All sessions (calendar view + list)
/admin/sessions/[id]           → Session detail + add notes
/admin/packages                → Manage coaching packages
/admin/contracts               → Contract templates + signature status
/admin/payments                → Payment history + revenue reports
/admin/availability            → Set weekly availability + overrides
/admin/resources               → Upload & manage resource library
```

### Revenue Dashboard

```typescript
// src/app/api/admin/revenue/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const period = searchParams.get("period") || "month" // week | month | year

  const [revenue, enrollments, bookings] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amountInCents: true },
      where: {
        status: "SUCCEEDED",
        createdAt: { gte: getPeriodStart(period) },
      },
    }),
    prisma.enrollment.count({
      where: { status: "ACTIVE" },
    }),
    prisma.booking.count({
      where: {
        scheduledAt: { gte: getPeriodStart(period) },
        status: { in: ["SCHEDULED", "COMPLETED"] },
      },
    }),
  ])

  return NextResponse.json({
    totalRevenue: revenue._sum.amountInCents || 0,
    activeClients: enrollments,
    sessionsThisPeriod: bookings,
    // + monthly trend data, top packages, etc.
  })
}
```

---

## 9. AUTOMATION WORKFLOWS

### Onboarding Automation (via Inngest)

```typescript
// src/inngest/functions/onboarding.ts
import { inngest } from "@/lib/inngest"

export const onboardingWorkflow = inngest.createFunction(
  { id: "client-onboarding" },
  { event: "client/onboarding.start" },
  async ({ event, step }) => {
    const { userId, enrollmentId } = event.data

    // Step 1: Welcome email (immediate)
    await step.run("send-welcome-email", async () => {
      await sendEmail({
        to: userId,
        template: "welcome",
        data: { enrollmentId },
      })
    })

    // Step 2: Wait, then send intake form reminder (1 hour)
    await step.sleep("wait-for-intake", "1h")

    const profile = await step.run("check-intake", async () => {
      return prisma.clientProfile.findUnique({ where: { userId } })
    })

    if (!profile?.intakeCompleted) {
      await step.run("send-intake-reminder", async () => {
        await sendEmail({
          to: userId,
          template: "intake-reminder",
          data: { dashboardUrl: "/dashboard/profile" },
        })
      })
    }

    // Step 3: Contract signing reminder (24 hours)
    await step.sleep("wait-for-contract", "23h")

    const signature = await step.run("check-contract", async () => {
      return prisma.contractSignature.findFirst({
        where: { userId },
      })
    })

    if (!signature) {
      await step.run("send-contract-reminder", async () => {
        await sendEmail({
          to: userId,
          template: "contract-reminder",
        })
      })
    }

    // Step 4: Prompt to book first session (48 hours)
    await step.sleep("wait-for-booking", "24h")

    const hasBooking = await step.run("check-booking", async () => {
      return prisma.booking.findFirst({
        where: { clientId: userId, status: "SCHEDULED" },
      })
    })

    if (!hasBooking) {
      await step.run("send-booking-nudge", async () => {
        await sendEmail({
          to: userId,
          template: "book-first-session",
          data: { bookingUrl: "/dashboard/booking" },
        })
      })
    }
  }
)
```

### Reminder Automation

```typescript
// src/inngest/functions/reminders.ts
export const sessionReminder24h = inngest.createFunction(
  { id: "session-reminder-24h" },
  { cron: "0 * * * *" }, // Check every hour
  async ({ step }) => {
    const upcoming = await step.run("find-sessions", async () => {
      const from = new Date()
      const to = new Date(Date.now() + 25 * 60 * 60 * 1000)
      return prisma.booking.findMany({
        where: {
          scheduledAt: { gte: from, lte: to },
          status: "SCHEDULED",
        },
        include: { client: true, coach: true },
      })
    })

    for (const booking of upcoming) {
      await step.run(`remind-${booking.id}`, async () => {
        await sendEmail({
          to: booking.client.email,
          template: "session-reminder-24h",
          data: {
            coachName: booking.coach.name,
            dateTime: booking.scheduledAt,
            meetingLink: booking.meetingLink,
          },
        })
      })
    }
  }
)
```

### Upsell Automation

```typescript
// Triggered when enrollment reaches 75% sessions used
export const upsellNudge = inngest.createFunction(
  { id: "upsell-nudge" },
  { event: "booking/session.completed" },
  async ({ event, step }) => {
    const enrollment = await step.run("check-enrollment", async () => {
      return prisma.enrollment.findUnique({
        where: { id: event.data.enrollmentId },
        include: { package: true },
      })
    })

    if (!enrollment) return

    const usagePercent = enrollment.sessionsUsed / enrollment.sessionsTotal
    if (usagePercent >= 0.75 && usagePercent < 1) {
      await step.run("send-upsell", async () => {
        await sendEmail({
          to: event.data.clientId,
          template: "package-renewal-nudge",
          data: {
            sessionsRemaining: enrollment.sessionsTotal - enrollment.sessionsUsed,
            packageName: enrollment.package.name,
          },
        })
      })
    }
  }
)
```

---

## 10. SECURITY & COMPLIANCE

### Data Encryption

| Layer             | Strategy                                                    |
|-------------------|-------------------------------------------------------------|
| **In transit**    | TLS 1.3 enforced (Vercel handles this)                      |
| **At rest**       | Neon.tech encrypts at rest (AES-256); S3/R2 server-side encryption |
| **Passwords**     | bcrypt with cost factor 12                                   |
| **Tokens**        | JWT signed with RS256; refresh tokens rotated                |
| **Sensitive PII** | Encrypt `phone`, `healthHistory` at application layer with `@prisma/client` middleware using `aes-256-gcm` |

### Stripe PCI Compliance

- **Never touch raw card data** — Stripe Checkout + Stripe.js handles all card input
- **Webhook signature verification** on every event
- **Payment intents stored by ID reference only** — no card data in your DB
- **Stripe Customer Portal** for clients to manage payment methods

### Rate Limiting

```typescript
// src/middleware.ts (using Upstash @upstash/ratelimit)
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "60 s"), // 20 req/min
  analytics: true,
})

// Apply to API routes
const rateLimits = {
  "/api/auth":     { requests: 10, window: "60 s" },
  "/api/checkout": { requests: 5,  window: "60 s" },
  "/api/bookings": { requests: 20, window: "60 s" },
  "/api/webhooks": null, // No rate limit on webhooks
}
```

### GDPR Considerations

1. **Consent:** Cookie banner + explicit opt-in for marketing emails
2. **Data portability:** `GET /api/me/export` — returns all user data as JSON
3. **Right to deletion:** `DELETE /api/me` — anonymizes records, retains financial data per legal requirements
4. **Privacy policy** page required with data processing details
5. **Data processor agreements** with Stripe, Neon, Vercel, Google

### Backup Strategy

| Data             | Strategy                          | Frequency        |
|------------------|-----------------------------------|------------------|
| PostgreSQL       | Neon.tech automated backups       | Continuous (WAL) |
| Point-in-time    | Neon branching for recovery       | Any point in 7d  |
| File storage     | S3/R2 versioning enabled          | Automatic        |
| Contracts (PDF)  | Cross-region replication on R2    | Automatic        |
| Code             | Git (GitHub)                      | Every push       |

---

## 11. SCALABILITY PLAN

### Current Scale Target

- **MVP:** 1 coach, <100 clients, <50 sessions/month
- **Year 1:** 1 coach, <500 clients, <200 sessions/month
- **Year 2+:** Potentially multi-coach

### Horizontal Scaling

| Component          | Scale Strategy                                        |
|--------------------|-------------------------------------------------------|
| API (Next.js)      | Vercel auto-scales serverless functions                |
| Database           | Neon auto-scales compute; add read replicas if needed  |
| Background jobs    | Inngest scales workers automatically                   |
| File storage       | S3/R2 is infinitely scalable                           |
| Real-time (future) | Add Pusher/Ably only when messaging is implemented     |

### Caching Strategy

```typescript
// Redis cache for hot paths
const CACHE_KEYS = {
  coachAvailability: (id: string, date: string) => `avail:${id}:${date}`,   // TTL: 5min
  packageList:       () => "packages:active",                                 // TTL: 1hr
  clientDashboard:   (id: string) => `dashboard:${id}`,                      // TTL: 2min
  revenueStats:      (period: string) => `revenue:${period}`,                // TTL: 15min
}
```

### Background Job Processing

- **Inngest** for event-driven workflows (onboarding, reminders, upsells)
- **Vercel Cron** for simple scheduled tasks (daily cleanup, weekly reports)
- **All jobs are idempotent** — safe to retry on failure

### CDN Usage

- **Vercel Edge Network** for all static assets and ISR pages
- **R2/S3 + CloudFront** for resource library files (PDFs, videos)
- **Image optimization** via Next.js `<Image>` component (already in use)

---

## 12. MVP ROADMAP

### Phase 1 — Core (Weeks 1–4)

| Week | Deliverable                                                       |
|------|-------------------------------------------------------------------|
| 1    | Project setup: Vercel deploy, Prisma + Neon, NextAuth, Stripe keys |
| 1    | Database schema migration, seed data                               |
| 2    | Auth system: signup, login, Google OAuth, role-based middleware     |
| 2    | Package CRUD (admin), Stripe product sync                          |
| 3    | Checkout flow, Stripe webhooks, enrollment creation                |
| 3    | Coach availability editor, booking engine                          |
| 4    | Google Calendar sync, booking confirmation emails                  |
| 4    | Basic client dashboard (upcoming sessions, enrollment status)      |

**Phase 1 delivers:** Clients can sign up, purchase a package, and book sessions.

### Phase 2 — Operations (Weeks 5–8)

| Week | Deliverable                                                       |
|------|-------------------------------------------------------------------|
| 5    | Contract templates, e-signature flow, PDF generation               |
| 5    | Session notes (coach writes, optionally shares with client)        |
| 6    | Admin dashboard: revenue, clients, sessions, contracts             |
| 6    | Automated reminders (24h, 1h before session)                       |
| 7    | Client portal: billing history, contract archive, resource library |
| 7    | Onboarding automation workflow                                     |
| 8    | Email templates (React Email), intake form                         |
| 8    | Testing, security review, GDPR compliance page                    |

**Phase 2 delivers:** Full coaching operations with contracts, notes, automation.

### Phase 3 — Growth (Weeks 9–12)

| Week | Deliverable                                                       |
|------|-------------------------------------------------------------------|
| 9    | Group coaching: package type, shared booking slots, waitlist       |
| 9    | Upsell automation, package renewal reminders                       |
| 10   | Client messaging / chat (simple async messaging)                   |
| 10   | Advanced analytics: retention, package popularity, revenue trends  |
| 11   | Client testimonials / review collection system                     |
| 11   | Mobile-responsive dashboard optimization                           |
| 12   | Performance optimization, monitoring (Sentry), load testing        |
| 12   | Documentation, admin guide, SOPs                                   |

**Phase 3 delivers:** Growth features, group coaching, messaging, analytics.

---

## APPENDIX A: API ROUTE STRUCTURE

```
src/app/api/
├── auth/
│   └── [...nextauth]/route.ts          # NextAuth handlers
├── checkout/
│   └── route.ts                        # POST: create Stripe checkout session
├── webhooks/
│   └── stripe/route.ts                 # POST: Stripe webhook receiver
├── bookings/
│   ├── route.ts                        # GET: list, POST: create
│   ├── [id]/route.ts                   # GET, PATCH, DELETE
│   └── [id]/notes/route.ts            # GET, POST session notes
├── availability/
│   ├── route.ts                        # GET: public slots, POST: admin set
│   └── overrides/route.ts             # POST: date-specific overrides
├── packages/
│   └── route.ts                        # GET: public list, POST: admin create
├── contracts/
│   ├── route.ts                        # GET: list templates
│   └── [id]/
│       ├── route.ts                    # GET: contract detail
│       └── sign/route.ts              # POST: sign contract
├── clients/
│   ├── route.ts                        # GET: admin client list
│   └── [id]/route.ts                  # GET: client detail
├── admin/
│   ├── revenue/route.ts               # GET: revenue stats
│   ├── sessions/route.ts              # GET: all sessions
│   └── dashboard/route.ts            # GET: overview stats
├── me/
│   ├── route.ts                        # GET: current user profile
│   ├── export/route.ts               # GET: GDPR data export
│   └── notifications/route.ts        # GET, PATCH: notifications
└── resources/
    └── route.ts                        # GET: list, POST: admin upload
```

## APPENDIX B: PROJECT FOLDER STRUCTURE

```
src/
├── app/
│   ├── (public)/                  # Public marketing pages (existing)
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── services/
│   │   ├── book/
│   │   ├── contact/
│   │   ├── shop/
│   │   └── resources/
│   ├── (auth)/                    # Auth pages
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── dashboard/                 # Client portal (protected)
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── sessions/
│   │   ├── booking/
│   │   ├── contracts/
│   │   ├── billing/
│   │   ├── resources/
│   │   └── profile/
│   ├── admin/                     # Admin panel (protected)
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── clients/
│   │   ├── sessions/
│   │   ├── packages/
│   │   ├── contracts/
│   │   ├── payments/
│   │   ├── availability/
│   │   └── resources/
│   ├── api/                       # API routes (see Appendix A)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                        # Shared UI primitives
│   ├── dashboard/                 # Dashboard-specific components
│   ├── admin/                     # Admin-specific components
│   ├── booking/                   # Booking flow components
│   ├── contracts/                 # Signature pad, contract viewer
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Logo.tsx
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # NextAuth config
│   ├── stripe.ts                  # Stripe client + helpers
│   ├── google-calendar.ts         # Calendar integration
│   ├── email.ts                   # Resend + templates
│   ├── redis.ts                   # Upstash Redis client
│   ├── scheduling.ts              # Availability/slot logic
│   └── audit.ts                   # Audit log helper
├── inngest/
│   ├── client.ts                  # Inngest client
│   └── functions/
│       ├── onboarding.ts
│       ├── reminders.ts
│       └── upsell.ts
├── types/
│   ├── next-auth.d.ts             # Auth type extensions
│   └── index.ts                   # Shared types
└── emails/
    ├── WelcomeEmail.tsx           # React Email templates
    ├── BookingConfirmation.tsx
    ├── SessionReminder.tsx
    ├── ContractReminder.tsx
    └── PaymentReceipt.tsx
```

## APPENDIX C: ENVIRONMENT VARIABLES

```env
# Database
DATABASE_URL="postgresql://user:pass@host/vibincoachangel?sslmode=require"

# Auth
NEXTAUTH_URL="https://vibinwithcoachangel.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"

# Stripe
STRIPE_SECRET_KEY="sk_live_xxx"
STRIPE_PUBLISHABLE_KEY="pk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Email
RESEND_API_KEY="re_xxx"

# Storage
R2_ACCOUNT_ID="xxx"
R2_ACCESS_KEY_ID="xxx"
R2_SECRET_ACCESS_KEY="xxx"
R2_BUCKET_NAME="vibin-files"

# Redis
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxx"

# Inngest
INNGEST_EVENT_KEY="xxx"
INNGEST_SIGNING_KEY="xxx"

# App
NEXT_PUBLIC_URL="https://vibinwithcoachangel.com"
```

## APPENDIX D: MIGRATION PATH FROM CURRENT SETUP

### Current State
- Next.js 14 with `output: 'export'` (static HTML)
- Hosted on GoDaddy shared hosting via FTP
- No backend, no database, no auth

### Migration Steps

1. **Create Vercel account** → Import GitHub repo → Deploy
2. **Update GoDaddy DNS:**
   - Remove A record pointing to GoDaddy IP (107.180.113.87)
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21` (Vercel's IP)
3. **Remove from next.config.js:** `output: 'export'`
4. **Add Prisma**, run `npx prisma migrate dev`
5. **Implement Phase 1** features incrementally
6. **Keep GoDaddy hosting** as backup until DNS propagation confirmed, then cancel

---

*This blueprint is designed to be implemented incrementally. Start with Phase 1, validate with real clients, then expand. The architecture supports a single coach scaling to a multi-coach platform without rewrites.*
