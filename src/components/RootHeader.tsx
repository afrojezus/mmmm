import type { ReactElement } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "@/styles/header.module.scss"
import { getSeason } from "@/utils/season"
import { Group } from "./Group"
import { Header } from "./Header"

const ROUTES = [
  {
    href: "/",
    label: "home",
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
    label: "mmmm station",
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
  {
    href: "/creator",
    label: "creator",
    src: "/creator.png",
  },
]

function renderLinks(activeRoute: string, currentSeason: string) {
  return ROUTES.filter(
    ({ season }) => !(season && season === currentSeason),
  ).map(
    ({ href, label, src }): ReactElement => (
      <Link
        key={href}
        className={activeRoute === href ? styles.active : undefined}
        to={href}
      >
        <img
          src={src}
          alt={label}
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />
        <span>{label}</span>
      </Link>
    ),
  )
}

export function RootHeader() {
  const season = getSeason()
  const { pathname } = useLocation()
  if (pathname === "/" && season === "default") return null
  return (
    <Header>
      {(activeRoute) => <Group>{renderLinks(activeRoute, season)}</Group>}
    </Header>
  )
}
