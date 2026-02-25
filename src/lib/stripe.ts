import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
  typescript: true,
})

// ─── Create Stripe Product + Price for a coaching package ───

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

// ─── Create Stripe Customer ────────────────────────────────

export async function getOrCreateStripeCustomer(email: string, name?: string) {
  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) return existing.data[0]

  return stripe.customers.create({ email, name: name || undefined })
}

// ─── Format currency for display ───────────────────────────

export function formatCurrency(amountInCents: number, currency: string = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100)
}
