"use client"

import dynamic from "next/dynamic"

const AnalyticsConsent = dynamic(
  () =>
    import("@/components/analytics-consent/AnalyticsConsent").then(
      (mod) => mod.AnalyticsConsent,
    ),
  {
    ssr: false,
  },
)

export const AnalyticsConsentClientWrapper = () => {
  return <AnalyticsConsent />
}
