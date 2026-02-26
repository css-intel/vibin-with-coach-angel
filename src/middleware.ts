import { NextRequest, NextResponse } from "next/server"

// ─── Middleware (client-side auth MVP) ──────────────
// Server-side NextAuth/Prisma auth is disabled for the MVP.
// Authentication is handled client-side via auth-context.tsx.
// Route protection is handled by individual layout components.

export default function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
