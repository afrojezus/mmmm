import { motion } from "motion/react"
import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"
import { getSeason } from "@/utils/season"

const HomeScene = lazy(() => import("@/components/mmmm/HomeScene"))
const FestiveScene = lazy(() =>
  import("@/components/winter/FestiveScene").then((mod) => ({
    default: mod.FestiveScene,
  })),
)
const DayWinterScene = lazy(() =>
  import("@/components/daywinter/DayWinterScene").then((mod) => ({
    default: mod.DayWinterScene,
  })),
)
const SummerScene = lazy(() =>
  import("@/components/summer/SummerScene").then((mod) => ({
    default: mod.SummerScene,
  })),
)

export default function HomeRoute() {
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
        <Suspense fallback={null}>
          {["autumn", "spring", "default"].includes(season) && <HomeScene />}
          {season === "winter" && <FestiveScene />}
          {season === "dayWinter" && <DayWinterScene />}
          {season === "summer" && <SummerScene />}
        </Suspense>
      </WebGlWrapper>
    </motion.main>
  )
}
