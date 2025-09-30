"use client"

import { Analytics } from "@vercel/analytics/react"
import { useAnalyticsConsent } from "./analytics-consent/AnalyticsConsentProvider"

export function ClientAnalytics() {
  const { consent } = useAnalyticsConsent()
  return (
    <Analytics
      beforeSend={(event) => {
        if (consent === false) {
          return null
        }
        return event
      }}
    />
  )
}
