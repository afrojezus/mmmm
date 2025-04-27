"use client"
import { useKeyframer } from "@/hooks/use-keyframer"
import { Canvas } from "@react-three/fiber"
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing"
import { motion } from "framer-motion-3d"
import { ACESFilmicToneMapping, Vector2 } from "three"
import StupidMarquees from "../shared/StupidMarquees"
import { MikuLyrics } from "./MikuLyrics"
import { GroupActor } from "./scenes/GroupActor"
import { MainActor } from "./scenes/MainActor"
import { WallActor } from "./scenes/WallActor"

export type CommonProps = {
  isHovered: boolean
}

export const Scene = (
  props: CommonProps & { mouse: React.RefObject<[number, number]> },
) => {
  const { isHovered } = props
  const frame = useKeyframer(isHovered)

  const marqueesVisible = frame >= 265
  const raveMode = frame >= 350

  return (
    <>
      <MikuLyrics frame={frame} />
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
          fov: 60,
          near: 0.1,
          far: 10000,
        }}
      >
        <motion.directionalLight
          castShadow={true}
          position={[0, 400, 500]}
          initial={{
            color: "#000000",
          }}
          animate={{
            color: "#b0ebff",
          }}
        />
        <motion.fogExp2
          attach="fog"
          animate={{
            color: "#ff2cb5",
            // @ts-expect-error
            density: 0.001,
            ...(raveMode && {
              color: ["#ff1f80", "#38deff", "#ff1f80", "#38deff", "#ff1f80"],
              transition: {
                duration: 0.7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }),
          }}
        />
        <motion.hemisphereLight
          color="#00f7ff"
          groundColor="rgb(251, 0, 255)"
          intensity={3}
        />
        <GroupActor frame={frame}>
          <WallActor frame={frame} />
          <MainActor frame={frame} />
        </GroupActor>
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            opacity={1}
            width={300}
          />
          <ChromaticAberration
            offset={new Vector2(0.0001, 0.0001)}
            radialModulation={false}
            modulationOffset={0.1}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Canvas>
      <StupidMarquees
        visible={marqueesVisible}
        miku={true}
        alternative={true}
      />
    </>
  )
}
