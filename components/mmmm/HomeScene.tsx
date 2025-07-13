"use client"

import classes from "@/styles/3d.module.css"
import { Canvas, type MeshProps, useLoader } from "@react-three/fiber"
import { motion as domMotion } from "framer-motion"
import { motion } from "framer-motion-3d"
import { Suspense, useEffect, useRef, useState } from "react"
import { TextureLoader } from "three"

type MmmmProps = Parameters<typeof motion.mesh>[0] & {
  geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
    Parameters<typeof motion.boxGeometry>[0] &
    Parameters<typeof motion.planeGeometry>[0]
  shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0]
  src?: string
}

function Mmmm(props: MmmmProps) {
  const { geometryProps, shaderProps, src, ...rest } = props
  const ref = useRef<MeshProps>(null)
  const materialRef = useRef(null)
  const texture = useLoader(TextureLoader, src ?? "/mmmm.webp")

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
      </motion.mesh>
    </>
  )
}

function HomeScene() {
  const [frame, setFrame] = useState(-1)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const interval = intervalRef.current
    const cleanup = () => {
      clearInterval(interval)
      setFrame(-1)
    }
    const animate = () => {
      intervalRef.current = setInterval(() => {
        setFrame((prev) => {
          if (prev === 2) {
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }
    animate()
    return cleanup()
  }, [])

  const titleFrame = frame <= 0
  const cubeFrame = frame > 0

  return (
    <div className={[classes.canvas].filter(Boolean).join(" ")}>
      <domMotion.h1
        className={classes.title}
        initial={{
          opacity: 0,
          zIndex: 2,
        }}
        animate={titleFrame ? "visible" : "hidden"}
        variants={{
          visible: {
            opacity: 1,
            zIndex: 2,
          },
          hidden: {
            opacity: 0.5,
            zIndex: -2,
          },
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
      >
        mmmm.moe
      </domMotion.h1>
      <Suspense fallback={null}>
        <Canvas
          linear={true}
          dpr={window.devicePixelRatio}
          gl={{
            alpha: true,
          }}
          scene={{
            background: null,
          }}
        >
          <motion.group>
            <motion.directionalLight
              position={[0, 400, 1200]}
              args={["#ffffff", 3]}
              castShadow={true}
            />
            <Mmmm
              initial={{
                rotateX: 0.5,
                y: -100,
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.5,
                y: 0,
              }}
              transition={{
                rotateY: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 180,
                  ease: "linear",
                },
                y: {
                  duration: 2.7,
                },
              }}
              shaderProps={{
                initial: {
                  color: "#000",
                },
                animate: cubeFrame ? "visible" : "hidden",
                variants: {
                  visible: {
                    color: "#fff",
                  },
                  hidden: {
                    color: "#000",
                  },
                },
                transition: {
                  duration: 1,
                  ease: "linear",
                },
              }}
            />
            <Mmmm
              src="/myon.png"
              initial={{
                rotateX: 0.5,
                y: -100,
                x: -1,
                z: -2,
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.5,
                y: 2,
              }}
              transition={{
                rotateY: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 180,
                  ease: "linear",
                },
                y: {
                  duration: 2.4,
                },
              }}
              shaderProps={{
                initial: {
                  color: "#000",
                },
                animate: cubeFrame ? "visible" : "hidden",
                variants: {
                  visible: {
                    color: "#fff",
                  },
                  hidden: {
                    color: "#000",
                  },
                },
                transition: {
                  duration: 1,
                  ease: "linear",
                },
              }}
            />
            <Mmmm
              src="/miku.png"
              initial={{
                rotateX: 0.5,
                y: -100,
                x: 1,
                z: -2,
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.5,
                y: 2,
              }}
              transition={{
                rotateY: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 180,
                  ease: "linear",
                },
                y: {
                  duration: 2.4,
                },
              }}
              shaderProps={{
                initial: {
                  color: "#000",
                },
                animate: cubeFrame ? "visible" : "hidden",
                variants: {
                  visible: {
                    color: "#fff",
                  },
                  hidden: {
                    color: "#000",
                  },
                },
                transition: {
                  duration: 1,
                  ease: "linear",
                },
              }}
            />
            <Mmmm
              src="/uuuu2.webp"
              initial={{
                rotateX: 0.5,
                y: -100,
                x: -2,
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.5,
                y: 0,
              }}
              transition={{
                rotateY: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 180,
                  ease: "linear",
                },
                y: {
                  duration: 3,
                },
              }}
              shaderProps={{
                initial: {
                  color: "#000",
                },
                animate: cubeFrame ? "visible" : "hidden",
                variants: {
                  visible: {
                    color: "#fff",
                  },
                  hidden: {
                    color: "#000",
                  },
                },
                transition: {
                  duration: 1,
                  ease: "linear",
                },
              }}
            />
            <Mmmm
              src="/uuuu.webp"
              initial={{
                rotateX: 0.5,
                y: -100,
                x: 2,
              }}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.5,
                y: 0,
              }}
              transition={{
                rotateY: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 180,
                  ease: "linear",
                },
                y: {
                  duration: 2.5,
                },
              }}
              shaderProps={{
                initial: {
                  color: "#000",
                },
                animate: cubeFrame ? "visible" : "hidden",
                variants: {
                  visible: {
                    color: "#fff",
                  },
                  hidden: {
                    color: "#000",
                  },
                },
                transition: {
                  duration: 1,
                  ease: "linear",
                },
              }}
            />
          </motion.group>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default HomeScene
