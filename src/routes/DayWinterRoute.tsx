import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

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
