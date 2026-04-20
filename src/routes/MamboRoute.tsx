import { WebGlWrapper } from "@/components/WebGlWrapper"
import { Suspense, lazy } from "react"

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
