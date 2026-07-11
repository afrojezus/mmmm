import styles from "@/styles/analytics.module.scss"
import { useAnalyticsConsent } from "./AnalyticsConsentProvider"

export function AnalyticsConsent() {
  const { consent, setConsent } = useAnalyticsConsent()

  if (consent !== null) {
    return null
  }

  return (
    <aside
      className={styles.container}
      style={{
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
    >
      <div className={styles.content}>
        <p className={styles.text}>
          Allow anonymous analytics so you can help improve this weird little
          website?
        </p>
        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => setConsent(false)}
          >
            No thanks
          </button>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => setConsent(true)}
          >
            Allow analytics
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AnalyticsConsent
