"use client"

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const DayWinterScene = dynamic(
  () =>
    import("@/components/daywinter/DayWinterScene").then(
      (mod) => mod.DayWinterScene,
    ),
  {
    ssr: false,
  },
)

const Page = () => {
  return (
    <WebGlWrapper>
      <DayWinterScene />
    </WebGlWrapper>
  )
}

export default Page
