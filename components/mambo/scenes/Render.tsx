"use client"
import { useClockKeyframer } from "@/hooks/use-clock-keyframer"
import { useFrame } from "@react-three/fiber"
import type { CommonProps } from "../Mambo"
import MainActor from "./MainActor"
import StarsActor from "./StarsActor"
import TextActor from "./TextActor"
import BackgroundActor from "./BackgroundActor"
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing"
import { Vector2 } from "three"

export type RenderActorProps = {
  frame: React.RefObject<number>
  keyframes: AnimationState[]
}

export type AnimationState = {
  s: number
  id: string
}

export const KEYFRAMES: Record<string, AnimationState[]> = {
  mainActor: [
    { s: -1, id: "initial" },
    { s: 1, id: "initial-zoom-1" },
    { s: 2, id: "initial-zoom-2" },
    { s: 4, id: "spin1" },
    { s: 5.5, id: "initial-zoom-3" },
    { s: 7, id: "spin1" },
    { s: 12, id: "initial-zoom-4" },
    { s: 14, id: "spin2" },
    { s: 25.5, id: "initial-quick" },
    { s: 27.5, id: "spin3" },
    { s: 37, id: "initial-zoom-5" },
  ],
  starsActor: [
    { s: -1, id: "initial" },
    { s: 12, id: "initial-zoom-4" },
    { s: 14, id: "initial" },
    { s: 27.5, id: "spin3" },
  ],
  textActor: [
    { s: -1, id: "initial" },
    { s: 1, id: "initial-zoom-1" },
    { s: 2, id: "initial-zoom-2" },
    { s: 4, id: "spin1" },
    { s: 5.5, id: "initial-zoom-3" },
    { s: 7, id: "spin1" },
    { s: 12, id: "initial-zoom-4" },
    { s: 14, id: "spin2" },
    { s: 25.5, id: "initial-quick" },
    { s: 27.5, id: "spin3" },
    { s: 37, id: "initial-zoom-5" },
  ],
  backgroundActor: [
    { s: -1, id: "initial" },
    { s: 14, id: "spin2" },
    { s: 25.5, id: "initial-quick" },
  ],
}

export function Render({ isHovered }: CommonProps) {
  const frame = useClockKeyframer(isHovered)

  return (
    <>
      <directionalLight
        castShadow={true}
        position={[0, 100, 1000]}
        color="#ff00ff"
        intensity={0.5}
      />
      <hemisphereLight color="#ffffff" groundColor="#ff00ff" intensity={0.4} />
      <fogExp2 attach="fog" args={["#000000", 0.0002]} />
      <group>
        <MainActor frame={frame} keyframes={KEYFRAMES.mainActor} />
        <StarsActor frame={frame} keyframes={KEYFRAMES.starsActor} />
        <TextActor frame={frame} keyframes={KEYFRAMES.textActor} />
        <BackgroundActor frame={frame} keyframes={KEYFRAMES.backgroundActor} />
        <pointLight
          castShadow
          intensity={1}
          decay={0.01}
          position={[0, 0, 10]}
          color="#ffffff"
        />
        <pointLight
          castShadow
          intensity={50}
          decay={0.001}
          position={[0, 0, -1000]}
          color="#ffffff"
        />
      </group>
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.1}
          opacity={1}
          width={200}
        />
        <ChromaticAberration
          offset={new Vector2(0.001, 0.0001)}
          radialModulation={false}
          modulationOffset={0.1}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </>
  )
}
