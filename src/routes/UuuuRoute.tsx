import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

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
