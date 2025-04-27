"use client"

import styles from "@/styles/analytics.module.scss"
import { useRef, useState } from "react"

export const AnalyticsConsent = () => {
  const [hasChecked, setHasChecked] = useState<boolean | null>(() => {
    if (typeof window === "undefined") {
      return null
    }
    return window.localStorage.getItem("va-consent") !== null
  })
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleConsent = (consent: boolean) => {
    if (consent) {
      window.localStorage.setItem("va-consent", "true")
    } else {
      window.localStorage.setItem("va-consent", "false")
    }
    setHasChecked(true)
    window.location.reload()
  }

  if (hasChecked) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <p>
        Do you consent to{" "}
        <button
          className={styles.linkBtn}
          type="button"
          onClick={() => dialogRef.current?.showModal()}
        >
          analytics?
        </button>
      </p>
      <section>
        <button onClick={() => handleConsent(true)} type="button">
          Yes
        </button>
        <button onClick={() => handleConsent(false)} type="button">
          No
        </button>
      </section>
      <dialog ref={dialogRef}>
        <div className={styles.details}>
          <h2>Analytics Consent</h2>
          <p>
            Analytics is used to track down the performance of the site and to
            understand how users interact with it.
          </p>
          <p>
            If you choose not to consent, the site will not track any of your
            interactions.
          </p>
          <section>
            <button
              type="button"
              onClick={() => {
                dialogRef.current?.close()
              }}
            >
              Close
            </button>
          </section>
        </div>
      </dialog>
    </div>
  )
}
