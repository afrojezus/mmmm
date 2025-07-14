"use client"
import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"
const MyonWrapper = dynamic(
  () => import("@/components/myon/MyonWrapper").then((mod) => mod.MyonWrapper),
  {
    ssr: false,
  },
)

export default function Page() {
  return (
    <WebGlWrapper>
      <MyonWrapper />
    </WebGlWrapper>
  )
}
