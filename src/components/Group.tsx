import styles from "@/styles/group.module.scss"
import clsx from "clsx"
import type { HTMLAttributes } from "react"

type GroupProps = {
  position?: "left" | "center" | "right" | "apart"
  gap?: number
} & HTMLAttributes<HTMLDivElement>

export function Group({ position = "left", children, ...props }: GroupProps) {
  return (
    <div className={clsx(styles.group, styles[position])} {...props}>
      {children}
    </div>
  )
}
