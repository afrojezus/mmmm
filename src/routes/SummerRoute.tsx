import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

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
