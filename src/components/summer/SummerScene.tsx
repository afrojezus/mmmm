"use client"

import classes from "@/styles/3d.module.css"
import txtStyles from "@/styles/text.module.scss"
import { useGLTF } from "@react-three/drei"
import {
  type BoxGeometryProps,
  Canvas,
  type MeshProps,
  type SphereGeometryProps,
  useFrame,
  useLoader,
} from "@react-three/fiber"
import { ColorDepth, EffectComposer } from "@react-three/postprocessing"
import { motion } from "framer-motion-3d"
import { Suspense, useCallback, useEffect, useMemo, useRef } from "react"
import {
  ACESFilmicToneMapping,
  type Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  type Object3DEventMap,
  RepeatWrapping,
  Texture,
  TextureLoader,
} from "three"

type MmmCubeProps<T extends "cube" | "sphere"> = {
  type?: "mmmm" | "uuuu" | "uuuu2"
  spin?: boolean
  shape?: "cube" | "sphere"
  shapeProps?: BoxGeometryProps
} & Omit<MeshProps, "ref"> & {
    shapeProps?: T extends "cube" ? BoxGeometryProps : SphereGeometryProps
  }

function Water(props: Parameters<typeof motion.group>[0]) {
  const mesh = useRef<Group<Object3DEventMap>>(null)
  const waterTexture = useLoader(
    TextureLoader,
    "/textures/water_tile_by_thecandyface.png",
  )

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = -Math.PI / 2
      // mesh.current.rotation.z += delta / 2 * 0.1;
    }
    waterTexture.magFilter = NearestFilter
    waterTexture.minFilter = NearestFilter
    waterTexture.wrapS = RepeatWrapping
    waterTexture.wrapT = RepeatWrapping
    waterTexture.offset.set(100, 100)
    waterTexture.repeat.set(100, 100)
  })

  return (
    <motion.group {...props}>
      <group ref={mesh}>
        <mesh>
          <planeGeometry args={[100000, 100000, 1000, 1000]} />
          <meshStandardMaterial
            map={waterTexture}
            transparent={true}
            opacity={0.96}
            color="#d5f1ff"
          />
        </mesh>
      </group>
    </motion.group>
  )
}

function Ground() {
  const obj = useGLTF("/3d/island/island.glb", false, true)

  obj.scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      // if (child.material instanceof MeshBasicMaterial) {
      //   child.material = new MeshStandardMaterial({
      //     map: child.material.map,
      //     color: "#ffffff",
      //     roughness: 0.8,
      //     metalness: 0.1,
      //   })
      //   if (child.material.map instanceof Texture) {
      //     child.material.map.magFilter = NearestFilter
      //     child.material.map.minFilter = NearestFilter
      //   }
      // }
      child.material.needsUpdate = true
      child.geometry.computeVertexNormals()
    }
  })

  return (
    <group position={[0, -60, 0]} rotation={[0, -2.5, 0]}>
      <primitive object={obj.scene} scale={50} />
    </group>
  )
}

function MmmCube<T extends "cube" | "sphere">(props: MmmCubeProps<T>) {
  const { type = "mmmm", spin, shape, shapeProps, ...meshProps } = props
  const mesh = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, `/${type}.webp`)

  useFrame(() => {
    const m = mesh.current
    if (m) {
      if (spin) {
        m.rotation.y += 0.01
      }
    }

    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
  })

  const Shape = useMemo(() => {
    if (shape === "sphere") {
      return motion.sphereGeometry
    }
    return motion.boxGeometry
  }, [shape])

  return (
    <mesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      position={[0, 0, 0]}
      scale={[20, 20, 20]}
      {...meshProps}
    >
      <Shape
        attach="geometry"
        /* biome-ignore lint/suspicious/noExplicitAny: catch-all */
        args={[1, 1, 1] as any}
        /* biome-ignore lint/suspicious/noExplicitAny: catch-all */
        {...(shapeProps as any)}
      />
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

export function SummerScene() {
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
            fov: 45,
            near: 0.1,
            far: 1000000,
            position: [0, 0, 600],
          }}
        >
          <motion.directionalLight
            initial={{
              color: "#000000",
              // @ts-expect-error
              intensity: 0,
            }}
            animate={{
              color: "#e8f5ff",
              // @ts-expect-error
              intensity: 2,
              x: 10000,
              y: 10000,
              z: 10000,
            }}
            castShadow={true}
            transition={{
              duration: 2,
              delay: 2,
            }}
          />
          <motion.fogExp2
            attach="fog"
            animate={{
              color: "#dff4ff",
              // @ts-expect-error
              density: 0.00004,
            }}
            transition={{
              duration: 2,
              delay: 2,
            }}
          />
          <hemisphereLight
            color="#d1ebff"
            groundColor="rgb(228, 216, 194)"
            intensity={2}
          />
          <motion.group
            initial={{
              x: 0,
              y: 0,
              z: -40000,
            }}
            animate={{
              x: 0,
              y: 0,
              z: 0,
              rotateY: [-360, 0, 360],
            }}
            transition={{
              duration: 2,
              delay: 2,
              rotateY: {
                duration: 5000,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          >
            <Ground />
            <Water
              animate={{
                y: [-80, -85, -80],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                rotateY: {
                  duration: 10000,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            />
            <MmmCube
              type="uuuu"
              position={[0, -70, -500]}
              rotation={[0, 0.5, 0.1]}
              scale={[100, 100, 100]}
              spin={true}
            />
            <MmmCube
              type="uuuu"
              position={[-30, -40, -100]}
              rotation={[0, 1.3, 0]}
              scale={[50, 50, 50]}
            />
            <MmmCube
              type="mmmm"
              position={[100, -20, 0]}
              rotation={[0, 1.1, 0]}
              scale={[50, 50, 50]}
            />
            <MmmCube
              type="uuuu2"
              position={[600, -80, -900]}
              rotation={[0, 0.5, 0.1]}
              scale={[100, 100, 100]}
              spin={true}
            />
            <MmmCube
              type="uuuu2"
              position={[600, -80, 900]}
              rotation={[0, 0.5, 0.1]}
              scale={[100, 100, 100]}
              spin={true}
            />
            <MmmCube
              type="uuuu2"
              spin={true}
              position={[5000, 5000, -15000]}
              rotation={[0, 3.8, 0]}
              scale={[2000, 2000, 2000]}
              shape="sphere"
              shapeProps={{
                args: [1, 32, 32],
              }}
            />
            <MmmCube
              spin={true}
              position={[5000, 5000, 15000]}
              rotation={[0, 3.8, 0]}
              scale={[1000, 1000, 1000]}
              shape="sphere"
              shapeProps={{
                args: [1, 32, 32],
              }}
            />
          </motion.group>
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
          {"太陽のぬくもりに、涙がこぼれそうになる"}
        </motion.h1>
      </div>
    </Suspense>
  )
}
