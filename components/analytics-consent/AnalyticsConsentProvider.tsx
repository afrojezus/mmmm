"use client"

import { createContext, useContext, useEffect, useState } from "react"

const consentContext = createContext<{
  consent: boolean | null
  setConsent: (consent: boolean) => void
}>({
  consent: null,
  setConsent: () => {},
})

export function AnalyticsConsentProvider({
  children,
}: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<boolean | null>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedConsent = window.localStorage.getItem("va-consent")
      if (storedConsent === "true") {
        setConsent(true)
      } else if (storedConsent === "false") {
        setConsent(false)
      } else {
        setConsent(null)
      }
    }
  }, [])
  const handleSetConsent = (newConsent: boolean) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("va-consent", newConsent ? "true" : "false")
    }
    setConsent(newConsent)
  }
  return (
    <consentContext.Provider value={{ consent, setConsent: handleSetConsent }}>
      {children}
    </consentContext.Provider>
  )
}

export function useAnalyticsConsent() {
  return useContext(consentContext)
}
