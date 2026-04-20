"use client"

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type AnalyticsConsentValue = {
  consent: boolean | null
  setConsent: (value: boolean) => void
}

const STORAGE_KEY = "analytics-consent"

const AnalyticsConsentContext = createContext<AnalyticsConsentValue | null>(
  null,
)

type AnalyticsConsentProviderProps = {
  children: ReactNode
}

export function AnalyticsConsentProvider({
  children,
}: AnalyticsConsentProviderProps) {
  const [consent, setConsentState] = useState<boolean | null>(null)

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (storedValue === "true") {
      setConsentState(true)
      return
    }

    if (storedValue === "false") {
      setConsentState(false)
      return
    }

    setConsentState(null)
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return
      }

      if (event.newValue === "true") {
        setConsentState(true)
        return
      }

      if (event.newValue === "false") {
        setConsentState(false)
        return
      }

      setConsentState(null)
    }

    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const setConsent = (value: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, String(value))
    setConsentState(value)
  }

  const contextValue = useMemo(
    () => ({
      consent,
      setConsent,
    }),
    [consent],
  )

  return (
    <AnalyticsConsentContext.Provider value={contextValue}>
      {children}
    </AnalyticsConsentContext.Provider>
  )
}

export function useAnalyticsConsent() {
  const context = useContext(AnalyticsConsentContext)

  if (!context) {
    throw new Error(
      "useAnalyticsConsent must be used within an AnalyticsConsentProvider",
    )
  }

  return context
}
