import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

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
