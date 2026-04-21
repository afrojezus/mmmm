"use client"
import { Canvas, type MeshProps, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import { TextureLoader } from "three"
import type * as Three from "three"

type SimpleMmmCubeProps = {
  x?: number
} & MeshProps

export function SimpleMmmCube({ x, ...props }: SimpleMmmCubeProps) {
  const ref = useRef<Three.Mesh>(null)
  const texture = useLoader(TextureLoader, "/mmmm.webp")
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function SimpleMmmCubeArray() {
  const [array, setArray] = useState<JSX.Element[]>([])
  useEffect(() => {
    const newArray = []
    for (let i = -19; i <= 19; i += 2) {
      newArray.push(<SimpleMmmCube key={i} position={[i * 2, 0, -90]} />)
    }
    setArray(newArray)
  }, [])
  return (
    <group>
      <Suspense>{array}</Suspense>
    </group>
  )
}

export function Scene() {
  return (
    <Canvas
      flat={true}
      camera={{
        fov: Math.atan(Math.tan(((75 / 2) * Math.PI) / 180)),
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SimpleMmmCubeArray />
    </Canvas>
  )
}
