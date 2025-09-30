"use client"

import { Canvas } from "@react-three/fiber"
import { Render } from "./scenes/Render"
import { ACESFilmicToneMapping } from "three"

export type CommonProps = {
  isHovered: boolean
}

export function Mambo(
  props: CommonProps & { mouse: React.RefObject<[number, number]> },
) {
  return (
    <Canvas
      shadows="basic"
      gl={{
        antialias: false,
        alpha: true,
        logarithmicDepthBuffer: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      dpr={window.devicePixelRatio}
      camera={{
        fov: 75,
        near: 0.1,
        far: 100000,
      }}
    >
      <Render isHovered={props.isHovered} />
    </Canvas>
  )
}
