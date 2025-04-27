"use client"
import styles from "@/styles/header.module.scss"
import { usePathname } from "next/navigation"

type HeaderProps = {
  children: (activeRoute: string) => JSX.Element
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">

export const Header = ({ children, ...props }: HeaderProps) => {
  const pathname = usePathname()
  return (
    <>
      <header className={styles.header} {...props}>
        {children(pathname)}
      </header>
    </>
  )
}
