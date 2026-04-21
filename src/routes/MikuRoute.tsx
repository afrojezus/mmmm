import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

const MikuScene = lazy(() =>
  import("@/components/miku/MikuWrapper").then((mod) => ({
    default: mod.MikuWrapper,
  })),
)

export default function MikuRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <MikuScene />
      </Suspense>
    </WebGlWrapper>
  )
}
