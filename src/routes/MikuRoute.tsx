import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

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
