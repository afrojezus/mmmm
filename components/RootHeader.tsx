"use client"

import styles from "@/styles/header.module.scss"
import { getSeason } from "@/utils/season"
import Image from "next/image"
import Link from "next/link"
import { Group } from "./Group"
import { Header } from "./Header"

const ROUTES = [
  {
    href: "/",
    label: "mmmm",
    src: "/mmmm.webp",
  },
  {
    href: "/uuuu",
    label: "uuuu",
    src: "/uuuu.webp",
  },
  {
    href: "/myon",
    label: "myon",
    src: "/myon.png",
  },
  {
    href: "/3d",
    label: "ms",
    src: "/mmmm.webp",
  },
  {
    href: "/winter",
    label: "winter",
    src: "/uuuu2.webp",
    season: "winter",
  },
  {
    href: "/daywinter",
    label: "daywinter",
    src: "/uuuu2.webp",
    season: "dayWinter",
  },
  {
    href: "/miku",
    label: "miku",
    src: "/miku.png",
  },
  {
    href: "/summer",
    label: "summer",
    src: "/mmmm.webp",
    season: "summer",
  },
  {
    href: "/mambo",
    label: "mambo",
    src: "/mambo.webp",
  },
]

function renderLinks(activeRoute: string, currentSeason: string) {
  return ROUTES.map(({ href, label, src, season }) =>
    season && season === currentSeason ? null : (
      <Link
        key={href}
        className={activeRoute === href ? styles.active : undefined}
        href={href}
      >
        <Image src={src} alt={label} width={28} height={28} />
        <span>{label}</span>
      </Link>
    ),
  ).filter(Boolean)
}

export function RootHeader() {
  const season = getSeason()
  return (
    <Header>
      {(activeRoute) => (
        <>
          <Group>{renderLinks(activeRoute, season)}</Group>
        </>
      )}
    </Header>
  )
}
