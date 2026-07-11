import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

const Creator = lazy(() => import("@/components/creator/Creator"))

export default function CreatorRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <Creator />
      </Suspense>
    </WebGlWrapper>
  )
}
