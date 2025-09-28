"use client"
import type { RenderActorProps } from "./Render"
import { useRef } from "react"
import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber"
import { animate } from "motion"

type BackgroundActorProps = RenderActorProps

export default function BackgroundActor({
  frame,
  keyframes,
}: BackgroundActorProps) {
  const ref = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useLoader(THREE.TextureLoader, "/mambo-w.webp")

  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(10, 10)
  texture.offset.set(0, 0)
  texture.needsUpdate = true

  const currentAnimation = useRef<string>()
  useFrame(() => {
    if (!ref.current) return
    if (!matRef.current) return
    const mat = matRef.current
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
        case "spin2": {
          currentAnimation.current = activeKeyframe
          animate(mat, { opacity: 1 }, { duration: 0.03 })
          animate(
            group.rotation,
            {
              y: group.rotation.y + Math.PI * 2,
              x: group.rotation.x + Math.PI * 2,
              z: group.rotation.z + Math.PI * 2,
            },
            { duration: 5, ease: "linear", repeat: Infinity },
          )
          break
        }
        case "initial-quick": {
          currentAnimation.current = activeKeyframe
          animate(mat, { opacity: 0 }, { duration: 0.03 })
          animate(group.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.03 })
          break
        }
        case "initial": {
          currentAnimation.current = activeKeyframe
          animate(mat, { opacity: 0 }, { duration: 0.01 })
          animate(group.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          break
        }
        default: {
          break
        }
      }
    }
  })
  return (
    <group ref={ref}>
      <mesh castShadow={true} receiveShadow={true} rotation={[0.5, 0, 0.5]}>
        <boxGeometry args={[10000, 10000, 10000]} />
        <meshStandardMaterial
          transparent
          side={THREE.BackSide}
          map={texture}
          toneMapped={false}
          shadowSide={THREE.BackSide}
          ref={matRef}
        />
      </mesh>
      <pointLight
        castShadow
        intensity={1}
        decay={0.01}
        position={[0, 10000, 10000]}
        color="#ffffff"
      />
      <pointLight
        castShadow
        intensity={1}
        decay={0.01}
        position={[0, -10000, -10000]}
        color="#ffffff"
      />
      <pointLight
        castShadow
        intensity={1}
        decay={0.01}
        position={[10000, 0, 10000]}
        color="#ffffff"
      />
      <pointLight
        castShadow
        intensity={1}
        decay={0.01}
        position={[-10000, 0, -10000]}
        color="#ffffff"
      />
    </group>
  )
}
