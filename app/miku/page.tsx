"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const MikuScene = dynamic(
  () => import("@/components/miku/MikuWrapper").then((mod) => mod.MikuWrapper),
  {
    ssr: false,
  },
)

export default function Page() {
  return (
    <WebGlWrapper>
      <MikuScene />
    </WebGlWrapper>
  )
}
