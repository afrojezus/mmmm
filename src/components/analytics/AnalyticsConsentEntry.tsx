import { lazy, Suspense } from "react"

const AnalyticsConsent = lazy(() =>
  import("./AnalyticsConsent").then((mod) => ({
    default: mod.AnalyticsConsent,
  })),
)

export function AnalyticsConsentClientWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsConsent />
    </Suspense>
  )
}
