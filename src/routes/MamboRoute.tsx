import { lazy, Suspense } from "react"
import { WebGlWrapper } from "@/components/WebGlWrapper"

const MamboScene = lazy(() =>
  import("@/components/mambo/MamboWrapper").then((mod) => ({
    default: mod.MamboWrapper,
  })),
)

export default function MamboRoute() {
  return (
    <WebGlWrapper>
      <Suspense fallback={null}>
        <MamboScene />
      </Suspense>
    </WebGlWrapper>
  )
}
