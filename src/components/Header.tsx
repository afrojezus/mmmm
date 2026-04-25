import type { HTMLAttributes, ReactElement } from "react"
import { useLocation } from "react-router-dom"
import styles from "@/styles/header.module.scss"

type HeaderProps = {
  children: (activeRoute: string) => ReactElement
} & Omit<HTMLAttributes<HTMLDivElement>, "children">

export function Header({ children, ...props }: HeaderProps) {
  const { pathname } = useLocation()
  return (
    <header className={styles.header} {...props}>
      <div className={styles.inner}>{children(pathname)}</div>
    </header>
  )
}
