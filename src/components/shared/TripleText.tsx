import { type HTMLAttributes, type HTMLProps, useEffect, useState } from "react"
import styles from "@/styles/triple.module.scss"

export function TripleText({
  string,
  textProps,
  ...props
}: {
  string: string
  textProps: HTMLProps<HTMLHeadingElement>
} & HTMLAttributes<HTMLDivElement>) {
  const [flip, setFlip] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => (prev === 1 ? 0 : 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={styles.text} {...props}>
      <h1 className={styles.s3} {...textProps}>
        {string}
      </h1>
      <h1
        className={styles.s2}
        style={{
          ...textProps.style,
          transform: `translateX(${flip ? -50 : 50}px)`,
          transition: "transform 300ms ease",
        }}
        {...textProps}
      >
        {string}
      </h1>
      <h1
        className={styles.s1}
        style={{
          ...textProps.style,
          transform: `translateX(${flip ? -200 : 200}px)`,
          transition: "transform 300ms ease",
        }}
        {...textProps}
      >
        {string}
      </h1>
    </div>
  )
}
