"use client"
import styles from "@/styles/triple.module.scss"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TripleText({
  string,
  textProps,
  ...props
}: {
  string: string
  textProps: Parameters<typeof motion.h1>[0]
} & React.HTMLAttributes<HTMLDivElement>) {
  const [flip, setFlip] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => (prev === 1 ? 0 : 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={styles.text} {...props}>
      <motion.h1 className={styles.s3} {...textProps}>
        {string}
      </motion.h1>
      <motion.h1
        className={styles.s2}
        layout={true}
        animate={{ x: flip ? -50 : 50 }}
        {...textProps}
      >
        {string}
      </motion.h1>
      <motion.h1
        className={styles.s1}
        layout={true}
        animate={{ x: flip ? -200 : 200 }}
        {...textProps}
      >
        {string}
      </motion.h1>
    </div>
  )
}
