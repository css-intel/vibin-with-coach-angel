import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

// ─── Redis Client ───────────────────────────────────

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// ─── Rate Limiters ──────────────────────────────────

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  prefix: "ratelimit:auth",
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "60 s"),
  analytics: true,
  prefix: "ratelimit:api",
})

export const checkoutRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
  prefix: "ratelimit:checkout",
})

// ─── Cache Keys ─────────────────────────────────────

export const CACHE_KEYS = {
  coachAvailability: (id: string, date: string) => `avail:${id}:${date}`,
  packageList: () => "packages:active",
  clientDashboard: (id: string) => `dashboard:${id}`,
  revenueStats: (period: string) => `revenue:${period}`,
}

// ─── Cache Helpers ──────────────────────────────────

export async function getCached<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = await redis.get<T>(key)
  if (cached) return cached

  const data = await fetcher()
  await redis.set(key, data, { ex: ttlSeconds })
  return data
}

export async function invalidateCache(key: string) {
  await redis.del(key)
}
