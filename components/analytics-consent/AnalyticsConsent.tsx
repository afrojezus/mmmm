"use client"

import styles from "@/styles/analytics.module.scss"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useAnalyticsConsent } from "./AnalyticsConsentProvider"

export function AnalyticsConsent() {
  const [showMore, setShowMore] = useState(false)
  const { consent: hasChecked, setConsent: handleConsent } =
    useAnalyticsConsent()

  return (
    <AnimatePresence>
      {hasChecked === null && (
        <motion.div
          key="notice"
          initial={{ opacity: 0, y: -50 }}
          animate={
            showMore
              ? {
                  opacity: 1,
                  y: 0,
                  height: "calc(100dvh - var(--header-height))",
                }
              : { opacity: 1, y: 0, height: "40px" }
          }
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={styles.notice}
        >
          <AnimatePresence>
            {showMore && (
              <motion.div
                className={styles.moreInfo}
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <motion.div className={styles.moreInfoContent}>
                  <motion.h1>the obligatory cookie notice</motion.h1>
                  <p>
                    This website uses <strong>Vercel Analytics</strong> to
                    understand how visitors interact with our site. We collect
                    minimal, anonymized data to help improve your experience.
                  </p>
                  <br />
                  <h3>What we collect:</h3>
                  <ul>
                    <li>Page views and basic navigation patterns</li>
                    <li>General location (country/region level only)</li>
                    <li>Device type and browser information</li>
                    <li>Referrer information (where you came from)</li>
                  </ul>
                  <br />
                  <h3>What we DON'T collect:</h3>
                  <ul>
                    <li>Personal identifying information</li>
                    <li>Precise location data</li>
                    <li>Cookies for tracking across other websites</li>
                    <li>Any sensitive personal data</li>
                  </ul>
                  <br />
                  <p>
                    <strong>Vercel Analytics</strong> is privacy-focused and
                    doesn't use traditional tracking cookies. The data is
                    processed by Vercel and helps us understand aggregate usage
                    patterns only.
                  </p>
                  <br />
                  <p>
                    You can withdraw consent at any time by refreshing the page
                    and clicking "No" when prompted again.
                  </p>
                  <br />
                  <p>
                    <small>
                      For more information about Vercel's data practices, visit{" "}
                      <a
                        href="https://vercel.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Vercel's Privacy Policy
                      </a>
                      .
                    </small>
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout className={styles.noticeInner}>
            <motion.h2>
              Do you consent to{" "}
              <motion.strong
                className={clsx(showMore ? styles.expanded : "")}
                onClick={() => setShowMore((prv) => !prv)}
              >
                analytics usage?
              </motion.strong>
            </motion.h2>
            <motion.section>
              <button type="button" onClick={() => handleConsent(true)}>
                Yes
              </button>
              <button type="button" onClick={() => handleConsent(false)}>
                No
              </button>
            </motion.section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
