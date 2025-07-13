/** This is the worst page ever made */

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const MmmCube = dynamic(() => import("@/components/3d/MmmcubeWrapper"), {
  ssr: false,
})

export default function Page() {
  return (
    <WebGlWrapper>
      <MmmCube />
    </WebGlWrapper>
  )
}
