import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

const MmmCube = lazy(() => import("@/components/3d/MmmcubeWrapper"))

export default function ThreeDRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <MmmCube />
      </Suspense>
    </WebGlWrapper>
  )
}
