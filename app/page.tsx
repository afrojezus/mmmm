"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import { getSeason } from "@/utils/season"
import { motion } from "motion/react"
import dynamic from "next/dynamic"

const HomeScene = dynamic(() => import("@/components/mmmm/HomeScene"), {
  ssr: false,
})

const FestiveScene = dynamic(
  () =>
    import("@/components/winter/FestiveScene").then((mod) => mod.FestiveScene),
  {
    ssr: false,
  },
)

const DayWinterScene = dynamic(
  () =>
    import("@/components/daywinter/DayWinterScene").then(
      (mod) => mod.DayWinterScene,
    ),
  {
    ssr: false,
  },
)

const SummerScene = dynamic(
  () =>
    import("@/components/summer/SummerScene").then((mod) => mod.SummerScene),
  {
    ssr: false,
  },
)

export default function IndexPage() {
  const season = getSeason()

  return (
    <motion.main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <WebGlWrapper>
        {["autumn", "spring", "default"].includes(season) && <HomeScene />}
        {season === "winter" && <FestiveScene />}
        {season === "dayWinter" && <DayWinterScene />}
        {season === "summer" && <SummerScene />}
      </WebGlWrapper>
    </motion.main>
  )
}
