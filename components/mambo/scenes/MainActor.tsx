"use client"

import {
  type MeshProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber"
import type { RenderActorProps } from "./Render"
import { type Mesh, NearestFilter, TextureLoader } from "three"
import { useRef } from "react"
import { animate } from "motion"
import { getMaterial } from "@/utils/three"
import { Sparkles } from "@react-three/drei"

type MainActorProps = RenderActorProps & Omit<MeshProps, "ref">

export default function MainActor({
  frame,
  keyframes,
  ...props
}: MainActorProps) {
  const ref = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, "/mambo.webp")
  const { width, height } = useThree((state) => state.viewport)
  const currentAnimation = useRef<string>()

  texture.minFilter = NearestFilter
  texture.magFilter = NearestFilter

  useFrame(() => {
    if (!ref.current) return
    const mesh = ref.current
    const color = getMaterial(mesh).color
    const seconds = (frame.current ?? 0) / 30

    // Find the latest keyframe that should be active
    let activeKeyframe: string | null = null
    for (const kf of keyframes) {
      if (seconds >= kf.s) {
        activeKeyframe = kf.id
      }
    }

    // Only run animation if it's different from current
    if (activeKeyframe && currentAnimation.current !== activeKeyframe) {
      switch (activeKeyframe) {
        case "spin1": {
          currentAnimation.current = activeKeyframe
          animate(
            mesh.rotation,
            { y: mesh.rotation.y + Math.PI * 2, x: 0, z: 0 },
            { duration: 5, repeat: Infinity, ease: "linear" },
          )
          animate(mesh.position, { y: 0 }, { duration: 0.5 })
          animate(mesh.scale, { x: 1, y: 1, z: 1 }, { duration: 0.3 })
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "spin2": {
          currentAnimation.current = activeKeyframe
          animate(
            mesh.rotation,
            {
              y: [-Math.PI / 8, Math.PI / 8, -Math.PI / 8],
              x: [-Math.PI / 8, Math.PI / 8, -Math.PI / 8],
              z: [0, 0, 0],
            },
            { duration: 1, repeat: Infinity },
          )
          animate(
            mesh.position,
            { y: [0, 1, 0] },
            { duration: 0.5, repeat: Infinity },
          )
          animate(
            mesh.scale,
            {
              x: [5, 1.2, 5, 1.2, 5],
              y: [1.2, 5, 1.2, 5, 1.2],
              z: [1, 1.2, 1, 1.2, 1],
            },
            { duration: 1, repeat: Infinity },
          )
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "spin3": {
          currentAnimation.current = activeKeyframe
          animate(
            mesh.rotation,
            { y: mesh.rotation.y + Math.PI * 2, x: 0, z: 0 },
            { duration: 1, repeat: Infinity, ease: "linear" },
          )
          animate(mesh.position, { y: 0 }, { duration: 0.5 })
          animate(mesh.scale, { x: 1, y: 1, z: 1 }, { duration: 0.3 })
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "initial-zoom-1": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.03 })
          animate(mesh.position, { y: 0 }, { duration: 0.03 })
          animate(mesh.scale, { x: 2, y: 1.5, z: 1.5 }, { duration: 0.03 })
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "initial-zoom-2": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.03 })
          animate(mesh.position, { y: 0 }, { duration: 0.03 })
          animate(mesh.scale, { x: 1.5, y: 3, z: 1.5 }, { duration: 0.03 })
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "initial-zoom-3": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.03 })
          animate(mesh.position, { y: 0 }, { duration: 0.03 })
          animate(mesh.scale, { x: 5, y: 1.5, z: 1.5 }, { duration: 0.03 })
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "initial-zoom-4": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0 })
          animate(mesh.position, { y: 0 }, { duration: 0 })
          animate(
            mesh.scale,
            {
              x: [4, 0.25],
              y: [4, 0.25],
              z: [4, 0.25],
            },
            { duration: 2.5 },
          )
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0 })
          break
        }
        case "initial-zoom-5": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.3 })
          animate(mesh.position, { y: 0 }, { duration: 0.3 })
          animate(
            mesh.scale,
            {
              x: [1, width / 2],
              y: [1, height / 2],
              z: [1, 5],
            },
            { duration: 2 },
          )
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.3 })
          break
        }
        case "initial-quick": {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          animate(mesh.position, { y: 0 }, { duration: 0.01 })
          animate(
            mesh.scale,
            {
              x: 4,
              y: 4,
              z: 4,
            },
            { duration: 0.05 },
          )
          animate(color, { r: 1, g: 1, b: 1 }, { duration: 0.01 })
          break
        }
        default: {
          currentAnimation.current = activeKeyframe
          animate(mesh.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.3 })
          animate(mesh.position, { y: 0 }, { duration: 0.3 })
          animate(mesh.scale, { x: 1, y: 1, z: 1 }, { duration: 0.3 })
          animate(color, { r: 0.5, g: 0.5, b: 0.5 }, { duration: 0.3 })
          break
        }
      }
    }
  })

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}
