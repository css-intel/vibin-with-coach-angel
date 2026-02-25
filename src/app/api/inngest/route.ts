export const dynamic = 'force-dynamic'

import { serve } from "inngest/next"
import { inngest } from "@/inngest/client"
import { onboardingWorkflow } from "@/inngest/functions/onboarding"
import { sessionReminder24h, sessionReminder1h, noShowCheck } from "@/inngest/functions/reminders"
import { upsellNudge } from "@/inngest/functions/upsell"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    onboardingWorkflow,
    sessionReminder24h,
    sessionReminder1h,
    noShowCheck,
    upsellNudge,
  ],
})
