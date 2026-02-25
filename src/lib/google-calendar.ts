import { google } from "googleapis"
import { addMinutes } from "date-fns"

// ─── Create Google Calendar Event ───────────────────

export async function createCalendarEvent(booking: {
  coachGoogleToken: string
  clientEmail: string
  coachEmail: string
  startTime: Date
  duration: number
  packageName?: string
}) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ access_token: booking.coachGoogleToken })
  const calendar = google.calendar({ version: "v3", auth })

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Coaching Session — Vibin with Coach Angel${booking.packageName ? ` (${booking.packageName})` : ""}`,
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
          { method: "email", minutes: 1440 },
          { method: "popup", minutes: 60 },
        ],
      },
    },
  })

  return {
    googleEventId: event.data.id,
    meetingLink: event.data.hangoutLink,
  }
}

// ─── Delete Google Calendar Event ───────────────────

export async function deleteCalendarEvent(
  coachGoogleToken: string,
  eventId: string
) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ access_token: coachGoogleToken })
  const calendar = google.calendar({ version: "v3", auth })

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  })
}

// ─── Get Google Calendar Busy Times ─────────────────

export async function getGoogleCalendarBusy(
  coachGoogleToken: string,
  timeMin: Date,
  timeMax: Date
) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ access_token: coachGoogleToken })
  const calendar = google.calendar({ version: "v3", auth })

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: "primary" }],
    },
  })

  const busy = response.data.calendars?.primary?.busy || []
  return busy.map((b) => ({
    start: new Date(b.start!),
    end: new Date(b.end!),
  }))
}
