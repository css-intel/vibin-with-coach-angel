import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes: Record<string, string[]> = {
  "/dashboard": ["CLIENT", "COACH", "ADMIN"],
  "/admin": ["ADMIN"],
  "/api/admin": ["ADMIN"],
  "/api/clients": ["ADMIN", "COACH"],
  "/api/bookings": ["CLIENT", "COACH", "ADMIN"],
}

export default auth((req) => {
  const nextReq = req as unknown as NextRequest
  const { pathname } = nextReq.nextUrl
  const user = req.auth?.user
  const role = user?.role

  // Allow public routes and auth endpoints
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    (pathname.startsWith("/api/packages") && nextReq.method === "GET") ||
    (pathname.startsWith("/api/availability") && nextReq.method === "GET") ||
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next()
  }

  // Check protected routes
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!user) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        return NextResponse.redirect(new URL("/login", nextReq.url))
      }
      if (role && !roles.includes(role)) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
        return NextResponse.redirect(new URL("/login", nextReq.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/:path*",
    "/login",
  ],
  unstable_allowDynamic: [
    "/node_modules/bcryptjs/**",
  ],
}
