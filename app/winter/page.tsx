"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const FestiveScene = dynamic(
  () =>
    import("@/components/winter/FestiveScene").then((mod) => mod.FestiveScene),
  {
    ssr: false,
  },
)

const Page = () => {
  return (
    <WebGlWrapper>
      <FestiveScene />
    </WebGlWrapper>
  )
}

export default Page
