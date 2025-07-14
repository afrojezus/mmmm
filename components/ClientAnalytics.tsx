"use client"

import { Analytics } from "@vercel/analytics/react"

export function ClientAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("va-disable")) {
          return null
        }
        return event
      }}
    />
  )
}
