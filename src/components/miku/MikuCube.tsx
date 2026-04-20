"use client"

import { type MeshProps, useLoader } from "@react-three/fiber"
import { motion } from "framer-motion-3d"
import { useRef } from "react"
import { LinearFilter, NearestFilter, TextureLoader } from "three"

type MikuCubeProps = Parameters<typeof motion.mesh>[0] & {
  sphere?: boolean
  geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
    Parameters<typeof motion.boxGeometry>[0] &
    Parameters<typeof motion.planeGeometry>[0]
  shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0]
}

export function MikuCube(props: MikuCubeProps) {
  const { sphere, geometryProps, shaderProps, ...rest } = props
  const ref = useRef<MeshProps>(null)
  const materialRef = useRef(null)
  const texture = useLoader(TextureLoader, "/miku.png")

  texture.minFilter = LinearFilter
  texture.magFilter = NearestFilter

  return (
    <>
      <motion.mesh ref={ref} castShadow={true} receiveShadow={true} {...rest}>
        <motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
        <motion.meshStandardMaterial
          ref={materialRef}
          map={texture}
          attach="material"
          {...shaderProps}
        />
        <motion.pointLight intensity={3} position={[1, 1, 1]} color="#7bfdff" />
      </motion.mesh>
    </>
  )
}
