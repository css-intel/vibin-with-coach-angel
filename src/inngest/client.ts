import { Inngest } from "inngest"

export const inngest = new Inngest({
  id: "vibin-with-coach-angel",
  eventKey: process.env.INNGEST_EVENT_KEY,
})
