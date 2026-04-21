import styles from "@/styles/stack.module.scss"
import clsx from "clsx"
import type { HTMLAttributes } from "react"

type StackProps = {
  position?: "left" | "center" | "right" | "apart"
  gap?: number
} & HTMLAttributes<HTMLDivElement>

export function Stack({
  position = "center",
  gap = 10,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={clsx(styles.stack, styles[position])}
      style={{
        gap,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
