import Stripe from "stripe"

// Lazy-init to avoid crash during `next build` page data collection
let _stripe: Stripe | undefined

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
      typescript: true,
    })
  }
  return _stripe
}

/** @deprecated Use getStripe() instead */
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop]
  },
})

// ─── Create Stripe Product + Price for a coaching package ───

export async function createStripeProduct(pkg: {
  name: string
  description: string
  priceInCents: number
  billingType: "ONE_TIME" | "RECURRING"
  recurringInterval?: "month" | "week"
}) {
  const stripe = getStripe()
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

// ─── Create Stripe Customer ────────────────────────────────

export async function getOrCreateStripeCustomer(email: string, name?: string) {
  const s = getStripe()
  const existing = await s.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) return existing.data[0]

  return s.customers.create({ email, name: name || undefined })
}

// ─── Format currency for display ───────────────────────────

export function formatCurrency(amountInCents: number, currency: string = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100)
}
