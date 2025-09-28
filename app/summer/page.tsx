"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const SummerScene = dynamic(
  () =>
    import("@/components/summer/SummerScene").then((mod) => mod.SummerScene),
  {
    ssr: false,
  },
)

export default function Page() {
  return (
    <WebGlWrapper>
      <SummerScene />
    </WebGlWrapper>
  )
}
