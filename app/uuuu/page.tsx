import { WebGlWrapper } from "@/components/WebGlWrapper"
import dynamic from "next/dynamic"
const UuuCube = dynamic(() => import("@/components/uuuu/UuuCubeWrapper"), {
  ssr: false,
})

const Uuuu = () => {
  return (
    <WebGlWrapper>
      <UuuCube />
    </WebGlWrapper>
  )
}

export default Uuuu
