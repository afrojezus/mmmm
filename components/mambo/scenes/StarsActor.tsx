"use client"
import { Stars } from "@react-three/drei"
import type { RenderActorProps } from "./Render"
import { useRef } from "react"
import type * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { animate } from "motion"

type StarsActorProps = RenderActorProps

export default function StarsActor({ frame, keyframes }: StarsActorProps) {
  const ref = useRef<THREE.Group>(null)
  const currentAnimation = useRef<string>()
  useFrame(() => {
    if (!ref.current) return
    const group = ref.current
    const seconds = (frame.current ?? 0) / 30

    let activeKeyframe: string | null = null
    for (const kf of keyframes) {
      if (seconds >= kf.s) {
        activeKeyframe = kf.id
      }
    }

    if (activeKeyframe && currentAnimation.current !== activeKeyframe) {
      switch (activeKeyframe) {
        case "spin3": {
          currentAnimation.current = activeKeyframe
          animate(group.position, { z: [-1000, 750] }, { duration: 20 })
          animate(group.scale, { x: 1, y: 1, z: 1 }, { duration: 0.01 })
          break
        }
        case "initial-zoom-4": {
          currentAnimation.current = activeKeyframe
          animate(group.position, { z: [-300, 1] }, { duration: 2.5 })
          animate(group.scale, { x: 1, y: 1, z: 1 }, { duration: 0.01 })
          break
        }
        case "initial": {
          currentAnimation.current = activeKeyframe
          animate(group.position, { z: -1000 }, { duration: 0.01 })
          animate(group.scale, { x: 0, y: 0, z: 0 }, { duration: 0.01 })
          break
        }
        default: {
          break
        }
      }
    }
  })
  return (
    <group ref={ref} position={[0, 0, -1000]} scale={[0, 0, 0]}>
      <Stars
        radius={100}
        depth={100}
        count={10000}
        saturation={1}
        factor={5}
        fade
      />
    </group>
  )
}
