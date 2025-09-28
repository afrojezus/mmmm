"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const MamboScene = dynamic(
  () =>
    import("@/components/mambo/MamboWrapper").then((mod) => mod.MamboWrapper),
  {
    ssr: false,
  },
)

export default function Page() {
  return (
    <WebGlWrapper>
      <MamboScene />
    </WebGlWrapper>
  )
}
