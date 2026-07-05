import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

const DayWinterScene = lazy(() =>
  import("@/components/daywinter/DayWinterScene").then((mod) => ({
    default: mod.DayWinterScene,
  })),
)

export default function DayWinterRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <DayWinterScene />
      </Suspense>
    </WebGlWrapper>
  )
}
