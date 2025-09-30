"use client"

import classes from "@/styles/3d.module.css"
import { Center, Stage } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { motion } from "motion/react"
import { animate } from "motion"
import { Suspense, useRef, useState } from "react"
import { TextureLoader } from "three"
import * as THREE from "three"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import useSound from "use-sound"

type MmmmProps = {
  src?: string
  position?: [number, number, number]
  onClick?: () => void
}

function Mmmm(props: MmmmProps) {
  const { src, position, onClick, ...rest } = props
  const ref = useRef<THREE.Mesh>(null)
  const materialRef = useRef(null)
  const texture = useLoader(TextureLoader, src ?? "/mmmm.webp")
  const [play] = useSound("/click.wav", {
    volume: 0.25,
    playbackRate: Math.random() * 0.9 + 0.5,
  })

  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.generateMipmaps = false

  useFrame((state, delta) => {
    if (!ref.current) return
    animate(
      ref.current.rotation,
      {
        y: ref.current.rotation.y + 1,
      },
      {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      },
    )
  })

  return (
    <>
      <mesh
        ref={ref}
        castShadow={true}
        receiveShadow={true}
        onClick={(e) => {
          e.stopPropagation()
          play()
          animate(
            e.eventObject.rotation,
            { y: 0 },
            { duration: 0.03, ease: "easeInOut" },
          )
          animate(
            e.eventObject.position,
            { z: 5, y: 0, x: 0 },
            {
              duration: 0.03,
              ease: "easeInOut",
            },
          ).finished
          if (onClick) onClick()
        }}
        position={position}
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
          animate(
            e.eventObject.position,
            { z: 0.5 },
            { duration: 0.3, ease: "easeInOut" },
          )
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "default"
          animate(
            e.eventObject.position,
            { z: 0 },
            { duration: 0.3, ease: "easeInOut" },
          )
        }}
        {...rest}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          attach="material"
        />
      </mesh>
    </>
  )
}

function HomeScene() {
  const router = useRouter()
  return (
    <motion.div
      className={[classes.canvas].filter(Boolean).join(" ")}
      initial={{
        background: "#000000",
      }}
      animate={{
        background: ["#ff0000", "#dedede"],
      }}
      transition={{
        duration: 2,
        ease: "anticipate",
        delay: 0.1,
        times: [0, 1],
      }}
    >
      <motion.h1
        className={clsx(classes["corner-text"], classes.black)}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.1,
          y: 10,
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
      >
        interactive multimedia experience demoscene simulation procedural
        graphics art installation
        <br />
        webgl gimmick avant-garde experimental cube gallery
        <br />
        state of art rotation mechanism on the intersection of 21-century
        virtual cube spinning systems
        <br />
        mmmm.moe
      </motion.h1>
      <div className={classes["title-container"]}>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: -400,
            webkitTextStrokeColor: "rgba(0,0,0,.1)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.15 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: -300,
            webkitTextStrokeColor: "rgba(0,0,0,.25)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.1 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: -200,
            webkitTextStrokeColor: "rgba(0,0,0,.5)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.05 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: -100,
            webkitTextStrokeColor: "rgba(0,0,0,1)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(classes["extreme-font-title"])}
          initial={{ color: "#fff" }}
          animate={{ color: ["#fff", "#000"] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <motion.strong
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
          >
            m
          </motion.strong>
          <motion.strong
            initial={{ opacity: 0, y: -21 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}
          >
            m
          </motion.strong>
          <motion.strong
            initial={{ opacity: 0, y: -22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
          >
            m
          </motion.strong>
          <motion.strong
            initial={{ opacity: 0, y: -23 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.25 }}
          >
            m
          </motion.strong>
          <motion.strong
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
          >
            .
          </motion.strong>
          <motion.strong
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
          >
            moe
          </motion.strong>
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 100,
            webkitTextStrokeColor: "rgba(0,0,0,1)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 200,
            webkitTextStrokeColor: "rgba(0,0,0,.5)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.05 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 300,
            webkitTextStrokeColor: "rgba(0,0,0,.25)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.1 }}
        >
          mmmm.moe
        </motion.h1>
        <motion.h1
          className={clsx(
            classes.black,
            classes["extreme-font-title"],
            classes["extreme-font-title-stroke"],
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 400,
            webkitTextStrokeColor: "rgba(0,0,0,.1)",
          }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.15 }}
        >
          mmmm.moe
        </motion.h1>
      </div>
      <Suspense fallback={null}>
        <Canvas
          dpr={window.devicePixelRatio}
          gl={{
            antialias: false,
            alpha: true,
            logarithmicDepthBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
          }}
          scene={{
            background: null,
          }}
          camera={{
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          shadows
        >
          <Stage adjustCamera={0.6}>
            <Center>
              <Mmmm
                src="/mambo.webp"
                position={[6, 0, 0]}
                onClick={() => router.push("/mambo")}
              />
              <Mmmm
                src="/miku.png"
                position={[4, 0, 0]}
                onClick={() => router.push("/miku")}
              />
              <Mmmm
                src="/myon.png"
                position={[-4, 0, 0]}
                onClick={() => router.push("/myon")}
              />
              <Mmmm
                src="/uuuu2.webp"
                position={[-2, 0, 0]}
                onClick={() => router.push("/uuuu")}
              />
              <Mmmm position={[0, 0, 0]} onClick={() => router.push("/3d")} />
              <Mmmm
                src="/uuuu.webp"
                position={[2, 0, 0]}
                onClick={() => router.push("/uuuu")}
              />
            </Center>
          </Stage>
        </Canvas>
      </Suspense>
    </motion.div>
  )
}

export default HomeScene
