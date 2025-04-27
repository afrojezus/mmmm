"use client"

import { useFrame, useLoader } from "@react-three/fiber"
import { motion } from "framer-motion-3d"
import { useMemo, useRef } from "react"
import {
  type InstancedMesh,
  LinearFilter,
  NearestFilter,
  Object3D,
  TextureLoader,
  Vector3,
} from "three"

const radialDistances = new Array(100).fill(0).map((_, i) => ({
  topLeft: new Vector3(-10, 10, i * 10),
  left: new Vector3(-10, 0, i * 10),
  bottomLeft: new Vector3(-10, -10, i * 10),
  bottom: new Vector3(0, -10, i * 10),
  bottomRight: new Vector3(10, -10, i * 10),
  right: new Vector3(10, 0, i * 10),
  topRight: new Vector3(10, 10, i * 10),
  top: new Vector3(0, 10, i * 10),
}))

const InstanciatedRadial = (props: Parameters<typeof motion.group>[0]) => {
  const topLeftMesh = useRef<InstancedMesh>(null)
  const topMesh = useRef<InstancedMesh>(null)
  const topRightMesh = useRef<InstancedMesh>(null)
  const bottomLeftMesh = useRef<InstancedMesh>(null)
  const bottomMesh = useRef<InstancedMesh>(null)
  const bottomRightMesh = useRef<InstancedMesh>(null)
  const leftMesh = useRef<InstancedMesh>(null)
  const rightMesh = useRef<InstancedMesh>(null)

  const texture = useLoader(TextureLoader, "/miku.png")

  texture.minFilter = LinearFilter
  texture.magFilter = NearestFilter

  const dummies = useMemo(() => {
    const dummies: Array<{
      topLeft: Object3D
      left: Object3D
      bottomLeft: Object3D
      bottom: Object3D
      bottomRight: Object3D
      right: Object3D
      topRight: Object3D
      top: Object3D
    }> = []
    for (const _ of radialDistances) {
      dummies.push({
        topLeft: new Object3D(),
        left: new Object3D(),
        bottomLeft: new Object3D(),
        bottom: new Object3D(),
        bottomRight: new Object3D(),
        right: new Object3D(),
        topRight: new Object3D(),
        top: new Object3D(),
      })
    }
    return dummies
  }, [])

  useFrame(() => {
    const tl = topLeftMesh.current
    const t = topMesh.current
    const tr = topRightMesh.current
    const bl = bottomLeftMesh.current
    const b = bottomMesh.current
    const br = bottomRightMesh.current
    const l = leftMesh.current
    const r = rightMesh.current
    if (tl && t && tr && bl && b && br && l && r) {
      radialDistances.forEach((distance, i) => {
        const dummy = dummies[i]
        dummy.topLeft.position.copy(distance.topLeft)
        dummy.left.position.copy(distance.left)
        dummy.bottomLeft.position.copy(distance.bottomLeft)
        dummy.bottom.position.copy(distance.bottom)
        dummy.bottomRight.position.copy(distance.bottomRight)
        dummy.right.position.copy(distance.right)
        dummy.topRight.position.copy(distance.topRight)
        dummy.top.position.copy(distance.top)
        dummy.topLeft.updateMatrix()
        dummy.left.updateMatrix()
        dummy.bottomLeft.updateMatrix()
        dummy.bottom.updateMatrix()
        dummy.bottomRight.updateMatrix()
        dummy.right.updateMatrix()
        dummy.topRight.updateMatrix()
        dummy.top.updateMatrix()
        tl.setMatrixAt(i, dummy.topLeft.matrix)
        l.setMatrixAt(i, dummy.left.matrix)
        bl.setMatrixAt(i, dummy.bottomLeft.matrix)
        b.setMatrixAt(i, dummy.bottom.matrix)
        br.setMatrixAt(i, dummy.bottomRight.matrix)
        r.setMatrixAt(i, dummy.right.matrix)
        tr.setMatrixAt(i, dummy.topRight.matrix)
        t.setMatrixAt(i, dummy.top.matrix)
      })
      tl.instanceMatrix.needsUpdate = true
      t.instanceMatrix.needsUpdate = true
      tr.instanceMatrix.needsUpdate = true
      bl.instanceMatrix.needsUpdate = true
      b.instanceMatrix.needsUpdate = true
      br.instanceMatrix.needsUpdate = true
      l.instanceMatrix.needsUpdate = true
      r.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <motion.group {...props}>
      <instancedMesh
        ref={topLeftMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={topMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={topRightMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={leftMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={rightMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={bottomLeftMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={bottomMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
      <instancedMesh
        ref={bottomRightMesh}
        args={[undefined, undefined, radialDistances.length]}
        castShadow={true}
        receiveShadow={true}
      >
        <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial attach="material" map={texture} />
      </instancedMesh>
    </motion.group>
  )
}

export const BackgroundActors = ({ frame }: { frame: number }) => {
  const onFrame = frame > 0 && frame < 265
  const onSecondFrame = frame > 265
  return (
    <>
      <InstanciatedRadial
        animate={onFrame ? "on" : onSecondFrame ? "off" : "idle"}
        variants={{
          on: {
            rotateZ: 360,
            transition: {
              rotateZ: {
                duration: 180,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          },
          off: {
            rotateZ: 360,
            transition: {
              rotateZ: {
                duration: 60,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          },
          idle: {
            rotateY: 0,
          },
        }}
      />
      <motion.pointLight
        color="#999999"
        decay={2}
        animate={onFrame ? "on" : onSecondFrame ? "off" : "idle"}
        variants={{
          on: {
            x: 0,
            y: 0,
            z: 1,
            // @ts-expect-error
            intensity: 500,
          },
          off: {
            x: 0,
            y: 0,
            z: 1,
            // @ts-expect-error
            intensity: 9999,
          },
          idle: {
            x: 0,
            y: 0,
            z: 0,
            // @ts-expect-error
            intensity: 0,
          },
        }}
      />
      <motion.pointLight
        animate={onFrame ? "on" : onSecondFrame ? "off" : "idle"}
        decay={0.3}
        variants={{
          on: {
            x: 0,
            y: 0,
            z: 1,
            // @ts-expect-error
            intensity: 0,
          },
          off: {
            x: 0,
            y: 0,
            z: 20,
            // @ts-expect-error
            intensity: [9999, 0],
            color: ["#ff1f80", "#38deff", "#c8ff00", "#6fff00"],
            transition: {
              duration: 1,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          },
          idle: {
            x: 0,
            y: 0,
            z: 0,
            // @ts-expect-error
            intensity: 0,
          },
        }}
      />
    </>
  )
}
