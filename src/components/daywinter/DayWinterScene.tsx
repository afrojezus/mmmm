"use client"

import classes from "@/styles/3d.module.css"
import txtStyles from "@/styles/text.module.scss"
import { useGLTF } from "@react-three/drei"
import {
  Canvas,
  type MeshProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber"
import { ColorDepth, EffectComposer } from "@react-three/postprocessing"
import { motion } from "framer-motion-3d"
import type React from "react"
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react"
import {
  ACESFilmicToneMapping,
  type InstancedMesh,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  Object3D,
  Texture,
  TextureLoader,
  Vector3,
} from "three"

type MmmCubeProps = {
  type?: "mmmm" | "uuuu" | "uuuu2"
  spin?: boolean
} & Omit<MeshProps, "ref">

const SNOW_COUNT = 10000
const MAX_RANGE = 2000
const MIN_RANGE = MAX_RANGE / 2

function Snow() {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < SNOW_COUNT; i++) {
      const x = Math.floor(Math.random() * MAX_RANGE - MIN_RANGE)
      const y = Math.floor(Math.random() * MAX_RANGE - MIN_RANGE)
      const z = Math.floor(Math.random() * MAX_RANGE - MIN_RANGE)
      const particle = new Vector3(x, y, z)
      temp.push(particle)
    }
    return temp
  }, [])
  const velocities = useMemo(() => {
    const temp = []
    for (let i = 0; i < SNOW_COUNT; i++) {
      const x = Math.floor(Math.random() * 6 - 3) * 0.1
      const y = Math.floor(Math.random() * 10 + 3) * -0.05
      const z = Math.floor(Math.random() * 6 - 3) * 0.1
      const velocity = new Vector3(x, y, z)
      temp.push(velocity)
    }
    return temp
  }, [])
  useFrame((_, delta) => {
    const m = mesh.current
    if (m) {
      particles.forEach((particle, i) => {
        const velocity = velocities[i]

        const velX = Math.cos((delta * 0.0089) & velocity.x) * 0.5
        const velZ = Math.cos((delta * 0.0015) & velocity.z) * 0.1

        particle.x += velX
        particle.y += velocity.y
        particle.z += velZ

        if (particle.y < -MIN_RANGE) {
          particle.y = MIN_RANGE
        }

        if (particle.z > MIN_RANGE) {
          particle.z = Math.floor(Math.random() * MAX_RANGE - MIN_RANGE)
        }

        if (particle.x > MIN_RANGE) {
          particle.x = Math.floor(Math.random() * MAX_RANGE - MIN_RANGE)
        }

        dummy.scale.set(0.5, 0.5, 0.5)
        dummy.position.set(particle.x, particle.y, particle.z)
        dummy.updateMatrix()
        m.setMatrixAt(i, dummy.matrix)
      })
      m.instanceMatrix.needsUpdate = true
    }
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, SNOW_COUNT]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <motion.pointsMaterial
        attach="material"
        color="#ffffff"
        initial={{
          color: "#000000",
        }}
        animate={{
          color: "#ffffff",
        }}
        transition={{
          duration: 2,
          delay: 0.4,
        }}
      />
    </instancedMesh>
  )
}

function Ground() {
  const mesh = useRef<Mesh>(null)
  const obj = useGLTF("/3d/ground/scene.gltf", false, true)

  obj.scene.traverse((child) => {
    if (child instanceof Mesh) {
      if (child.material instanceof MeshStandardMaterial) {
        if (child.material.map instanceof Texture) {
          child.material.map.magFilter = NearestFilter
          child.material.map.minFilter = LinearFilter
        }
        child.material.needsUpdate = true
      }
    }
  })

  return (
    <mesh
      ref={mesh}
      position={[0, 603, 1200]}
      rotation={[0, -16.85, 0]}
      scale={[20, 20, 20]}
      receiveShadow={true}
      castShadow={true}
    >
      <primitive object={obj.scene} scale={600} />
    </mesh>
  )
}

function MmmCube(props: MmmCubeProps) {
  const { type = "mmmm", spin, ...meshProps } = props
  const mesh = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, `/${type}.webp`)

  useFrame((state, delta) => {
    const m = mesh.current
    if (m) {
      if (spin) {
        m.rotation.y += 0.01
      }
    }

    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
  })

  return (
    <mesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      position={[0, 0, 0]}
      scale={[20, 20, 20]}
      {...meshProps}
    >
      <motion.boxGeometry attach="geometry" args={[1, 1, 1]} />
      <motion.meshStandardMaterial
        map={texture}
        attach="material"
        initial={{
          color: "#000000",
        }}
        animate={{
          color: "#ffffff",
        }}
        transition={{
          duration: 2,
          delay: 2,
        }}
        dithering={true}
      />
    </mesh>
  )
}

const DEFAULT_CAMERA_POSITION = {
  x: 0,
  y: -100,
  z: 400,
}

function CameraController(props: {
  mouse: React.RefObject<[number, number]>
}) {
  const { mouse } = props
  const { camera } = useThree()

  useFrame(() => {
    const c = camera
    if (c) {
      const [x, y] = mouse.current || [0, 0]
      c.position.x = DEFAULT_CAMERA_POSITION.x + x * 0.001
      c.position.y = DEFAULT_CAMERA_POSITION.y - y * 0.001

      if (c.position.x > 10 || c.position.x < -10) {
        c.position.x = DEFAULT_CAMERA_POSITION.x
      }
      if (c.position.y > -90 || c.position.y < -110) {
        c.position.y = DEFAULT_CAMERA_POSITION.y
      }
    }
  })

  return null
}

export function DayWinterScene() {
  const mouse = useRef<[number, number]>([0, 0])
  const mounted = useRef(false)
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }: React.MouseEvent<HTMLElement>) => {
      mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]
    },
    [],
  )
  useEffect(() => {
    if (mounted.current) {
      return
    }
    console.info(
      "Ground mesh credits:",
      `This work is based on "Snowy Mountain - Terrain" (https://sketchfab.com/3d-models/snowy-mountain-terrain-9fa3c56fd32746bcb0e06cd2c4229ca0) by artfromheath (https://sketchfab.com/artfromheath) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)`,
    )
    mounted.current = true
  }, [])
  return (
    <Suspense fallback={null}>
      <div
        onMouseMove={onMouseMove}
        className={[classes.canvas, classes.daywinter]
          .filter(Boolean)
          .join(" ")}
      >
        <Canvas
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
            position: [0, -100, 400],
          }}
        >
          <CameraController mouse={mouse} />
          <motion.directionalLight
            position={[0, 400, 1200]}
            args={[undefined, 1.4]}
            castShadow={true}
            initial={{
              color: "#000000",
            }}
            animate={{
              color: "#b0ebff",
            }}
            transition={{
              duration: 2,
              delay: 2,
            }}
          />
          <motion.fogExp2
            attach="fog"
            initial={{
              color: "#000000",
            }}
            animate={{
              color: "#00c8ff",
            }}
            transition={{
              duration: 2,
              delay: 2,
            }}
            args={["#000000", 0.0004]}
          />
          <motion.ambientLight
            initial={{
              color: "#000000",
            }}
            animate={{
              color: "#ffffff",
            }}
            transition={{
              duration: 2,
              delay: 2,
            }}
          />
          <Snow />
          <group dispose={null}>
            <Ground />
            <MmmCube position={[-40, -90, 300]} rotation={[0, 0.7, 0]} />
            <MmmCube
              type="uuuu"
              position={[-60, -90, 310]}
              rotation={[0, 0.4, 0.09]}
            />
            <MmmCube
              spin={true}
              type="uuuu2"
              position={[-65, -65, 280]}
              rotation={[-0.2, 0.8, 0.09]}
            />
            <MmmCube
              type="uuuu"
              position={[50, -90, 190]}
              rotation={[0.3, 0.5, -0.09]}
            />
            <MmmCube
              type="uuuu2"
              position={[80, -90, 190]}
              rotation={[0.3, 0, -0.09]}
            />
            <MmmCube
              type="mmmm"
              position={[80, -90, 100]}
              rotation={[0, 0, 0]}
              scale={[50, 50, 50]}
            />
            <MmmCube
              type="uuuu"
              position={[80, 70, -500]}
              rotation={[1, 0.4, 0]}
              scale={[100, 100, 100]}
            />
            <MmmCube
              type="mmmm"
              position={[-700, 500, -2500]}
              rotation={[0, 0.4, 0]}
              scale={[1000, 1000, 1000]}
              spin={true}
            />
            <MmmCube
              type="uuuu"
              position={[500, 1100, -3000]}
              rotation={[0, 0.4, 0]}
              scale={[500, 500, 500]}
              spin={true}
            />
          </group>
          <EffectComposer multisampling={0}>
            <ColorDepth bits={12} />
          </EffectComposer>
        </Canvas>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 2,
            delay: 2,
          }}
          className={txtStyles.title}
        >
          {"今季、舞い降る雪の結晶"}
        </motion.h1>
      </div>
    </Suspense>
  )
}
