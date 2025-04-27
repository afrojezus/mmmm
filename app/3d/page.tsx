/** This is the worst page ever made */

import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"

const MmmCube = dynamic(() => import("@/components/3d/MmmcubeWrapper"), {
  ssr: false,
})

const Page = () => {
  return (
    <WebGlWrapper>
      <MmmCube />
    </WebGlWrapper>
  )
}

export default Page
