import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

const MyonWrapper = lazy(() =>
  import("@/components/myon/MyonWrapper").then((mod) => ({
    default: mod.MyonWrapper,
  })),
)

export default function MyonRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <MyonWrapper />
      </Suspense>
    </WebGlWrapper>
  )
}
