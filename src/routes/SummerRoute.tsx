import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

const SummerScene = lazy(() =>
  import("@/components/summer/SummerScene").then((mod) => ({
    default: mod.SummerScene,
  })),
)

export default function SummerRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <SummerScene />
      </Suspense>
    </WebGlWrapper>
  )
}
