"use client"
import { Center, Text3D } from "@react-three/drei"
import type { RenderActorProps } from "./Render"
import { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { animate } from "motion"

type TextActorProps = RenderActorProps

export default function TextActor({ frame, keyframes }: TextActorProps) {
  const ref = useRef<THREE.Group>(null)
  const mamboTextRef1 = useRef<THREE.Mesh>(null)
  const mamboTextRef2 = useRef<THREE.Mesh>(null)
  const mamboTextGroupRef1 = useRef<THREE.Group>(null)
  const mamboTextGroupRef2 = useRef<THREE.Group>(null)
  const currentAnimation = useRef<string>()
  useFrame(() => {
    if (!ref.current) return
    if (!mamboTextRef1.current) return
    if (!mamboTextRef2.current) return
    if (!mamboTextGroupRef1.current) return
    if (!mamboTextGroupRef2.current) return
    const group = ref.current
    const mamboText1 = mamboTextGroupRef1.current
    const mamboText1Material = mamboTextRef1.current
      .material as THREE.MeshStandardMaterial
    const mamboText2 = mamboTextGroupRef2.current
    const mamboText2Material = mamboTextRef2.current
      .material as THREE.MeshStandardMaterial

    const seconds = (frame.current ?? 0) / 30

    let activeKeyframe: string | null = null

    for (const kf of keyframes) {
      if (seconds >= kf.s) {
        activeKeyframe = kf.id
      }
    }

    if (activeKeyframe && currentAnimation.current !== activeKeyframe) {
      switch (activeKeyframe) {
        case "initial-zoom-1": {
          currentAnimation.current = activeKeyframe
          animate(mamboText1Material, { opacity: 0 }, { duration: 5 })
          animate(mamboText1.position, { z: 100 }, { duration: 5 })
          break
        }
        case "initial-zoom-2":
        case "initial-zoom-3":
        case "initial-quick":
        case "initial-zoom-5":
        case "spin1": {
          currentAnimation.current = activeKeyframe
          animate(mamboText1Material, { opacity: 0 }, { duration: 0.01 })
          animate(mamboText1.position, { z: 100 }, { duration: 0.01 })
          animate(mamboText2Material, { opacity: 0 }, { duration: 0.01 })
          animate(mamboText2.position, { z: 100 }, { duration: 0.01 })
          break
        }
        case "initial-zoom-4": {
          currentAnimation.current = activeKeyframe
          animate(mamboText1Material, { opacity: [0, 1] }, { duration: 0.5 })
          animate(
            mamboText1.position,
            { z: [0, 100], y: -20 },
            { duration: 10, ease: "linear" },
          )
          animate(mamboText2Material, { opacity: [0, 1] }, { duration: 0.5 })
          animate(
            mamboText2.position,
            { z: [0, 100], y: 20 },
            { duration: 10, ease: "linear" },
          )
          break
        }
        case "spin2": {
          currentAnimation.current = activeKeyframe
          animate(mamboText1Material, { opacity: 1 }, { duration: 0.01 })
          animate(mamboText1.position, { z: -1, y: -2 }, { duration: 0.01 })
          animate(
            mamboText1.rotation,
            { y: [0, Math.PI * 4] },
            { duration: 2.5, repeat: Infinity, ease: "linear" },
          )
          animate(mamboText2Material, { opacity: 1 }, { duration: 0.01 })
          animate(mamboText2.position, { z: -1, y: 2 }, { duration: 0.01 })
          animate(
            mamboText2.rotation,
            { y: [0, Math.PI * 4] },
            { duration: 2.5, repeat: Infinity, ease: "linear" },
          )
          break
        }
        case "spin3": {
          currentAnimation.current = activeKeyframe
          animate(mamboText1Material, { opacity: 1 }, { duration: 0.01 })
          animate(mamboText2Material, { opacity: 1 }, { duration: 0.01 })
          animate(
            mamboText1.position,
            { z: [-1, 100], y: -2 },
            { duration: 10, ease: "linear" },
          )
          animate(
            mamboText1.rotation,
            { x: [0, Math.PI * 4] },
            { duration: 1, repeat: Infinity, ease: "linear" },
          )
          animate(
            mamboText2.position,
            { z: [-1, 100], y: 2 },
            { duration: 10, ease: "linear" },
          )
          animate(
            mamboText2.rotation,
            { x: [0, Math.PI * 4] },
            { duration: 1, repeat: Infinity, ease: "linear" },
          )
          break
        }
        default: {
          currentAnimation.current = "initial"
          animate(mamboText1Material, { opacity: 1 }, { duration: 0.01 })
          animate(mamboText1.scale, { x: 1, y: 1, z: -1 }, { duration: 0.01 })
          animate(mamboText1.position, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          animate(mamboText1.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          animate(mamboText2Material, { opacity: 0 }, { duration: 0.01 })
          animate(mamboText2.scale, { x: 1, y: 1, z: -1 }, { duration: 0.01 })
          animate(mamboText2.position, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          animate(mamboText2.rotation, { y: 0, x: 0, z: 0 }, { duration: 0.01 })
          break
        }
      }
    }
  })
  return (
    <group ref={ref}>
      <group ref={mamboTextGroupRef1}>
        <Center>
          <Text3D
            font="/fonts/Tekuplus_Regular.json"
            curveSegments={1}
            bevelEnabled
            bevelSize={0.0}
            bevelThickness={1}
            size={1}
            ref={mamboTextRef1}
          >
            {"曼波"}
            <meshStandardMaterial
              transparent
              color="#dd9933"
              attach="material"
              side={THREE.DoubleSide}
            />
          </Text3D>
        </Center>
      </group>
      <group ref={mamboTextGroupRef2}>
        <Center>
          <Text3D
            font="/fonts/Tekuplus_Regular.json"
            curveSegments={1}
            bevelEnabled
            bevelSize={0.0}
            bevelThickness={1}
            size={1}
            ref={mamboTextRef2}
          >
            {"曼波"}
            <meshStandardMaterial
              transparent
              color="#dd9933"
              attach="material"
              side={THREE.DoubleSide}
            />
          </Text3D>
        </Center>
      </group>
    </group>
  )
}
