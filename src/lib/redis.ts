import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

// ─── Redis Client (lazy-init to avoid crash during `next build`) ────

let _redis: Redis | undefined

export function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return _redis
}

/** @deprecated Use getRedis() */
export const redis = new Proxy({} as Redis, {
  get(_, prop) {
    return (getRedis() as any)[prop]
  },
})

// ─── Rate Limiters (lazy-init) ──────────────────────

let _authRateLimit: Ratelimit | undefined
let _apiRateLimit: Ratelimit | undefined
let _checkoutRateLimit: Ratelimit | undefined

export function getAuthRateLimit(): Ratelimit {
  if (!_authRateLimit) {
    _authRateLimit = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "ratelimit:auth",
    })
  }
  return _authRateLimit
}

export function getApiRateLimit(): Ratelimit {
  if (!_apiRateLimit) {
    _apiRateLimit = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(20, "60 s"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  }
  return _apiRateLimit
}

export function getCheckoutRateLimit(): Ratelimit {
  if (!_checkoutRateLimit) {
    _checkoutRateLimit = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true,
      prefix: "ratelimit:checkout",
    })
  }
  return _checkoutRateLimit
}

/** @deprecated Use getAuthRateLimit() */
export const authRateLimit = new Proxy({} as Ratelimit, {
  get(_, prop) { return (getAuthRateLimit() as any)[prop] },
})

/** @deprecated Use getApiRateLimit() */
export const apiRateLimit = new Proxy({} as Ratelimit, {
  get(_, prop) { return (getApiRateLimit() as any)[prop] },
})

/** @deprecated Use getCheckoutRateLimit() */
export const checkoutRateLimit = new Proxy({} as Ratelimit, {
  get(_, prop) { return (getCheckoutRateLimit() as any)[prop] },
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
  const r = getRedis()
  const cached = await r.get<T>(key)
  if (cached) return cached

  const data = await fetcher()
  await r.set(key, data, { ex: ttlSeconds })
  return data
}

export async function invalidateCache(key: string) {
  await getRedis().del(key)
}
