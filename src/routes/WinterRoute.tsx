import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

const FestiveScene = lazy(() =>
  import("@/components/winter/FestiveScene").then((mod) => ({
    default: mod.FestiveScene,
  })),
)

export default function WinterRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <FestiveScene />
      </Suspense>
    </WebGlWrapper>
  )
}
