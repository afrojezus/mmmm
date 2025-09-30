import styles from "@/styles/group.module.scss"
import clsx from "clsx"

type GroupProps = {
  position?: "left" | "center" | "right" | "apart"
  gap?: number
} & React.HTMLAttributes<HTMLDivElement>

export function Group({ position = "left", children, ...props }: GroupProps) {
  return (
    <div className={clsx(styles.group, styles[position])} {...props}>
      {children}
    </div>
  )
}
