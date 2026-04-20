import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

const UuuCube = lazy(() => import("@/components/uuuu/UuuCubeWrapper"))

export default function UuuuRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <UuuCube />
      </Suspense>
    </WebGlWrapper>
  )
}
