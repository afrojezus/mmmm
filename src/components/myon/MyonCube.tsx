"use client"
import { useKeyframer } from "@/hooks/use-keyframer"
import { Canvas, type MeshProps, useLoader } from "@react-three/fiber"
import { motion } from "framer-motion-3d"
import { Suspense, useRef } from "react"
import {
  ACESFilmicToneMapping,
  LinearFilter,
  NearestFilter,
  TextureLoader,
} from "three"
import StupidMarquees from "../shared/StupidMarquees"
import MyonLyrics from "./MyonLyrics"

type CommonProps = {
  isHovered: boolean
}

type MyonCubeProps = Parameters<typeof motion.mesh>[0] & {
  geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
    Parameters<typeof motion.boxGeometry>[0] &
    Parameters<typeof motion.planeGeometry>[0]
  shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0]
} & CommonProps

type MyonSceneProps = {
  mouse?: React.RefObject<[number, number]>
} & CommonProps

export function MyonCube({
  isHovered,
  geometryProps,
  shaderProps,
  ...meshProps
}: MyonCubeProps) {
  const ref = useRef<MeshProps>(null)
  const materialRef = useRef(null)
  const texture = useLoader(TextureLoader, "/myon.png")

  texture.minFilter = LinearFilter
  texture.magFilter = NearestFilter

  return (
    <>
      <motion.mesh ref={ref} {...meshProps}>
        <motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
        <motion.meshStandardMaterial
          ref={materialRef}
          attach="material"
          map={texture}
          {...shaderProps}
        />
      </motion.mesh>
    </>
  )
}

export function MyonPlane({
  isHovered,
  geometryProps,
  shaderProps,
  ...meshProps
}: MyonCubeProps) {
  const ref = useRef<MeshProps>(null)
  const materialRef = useRef(null)
  const texture = useLoader(TextureLoader, "/myon.png")

  texture.minFilter = LinearFilter
  texture.magFilter = NearestFilter

  return (
    <>
      <motion.mesh ref={ref} {...meshProps}>
        <motion.planeGeometry args={[100, 100, 1, 1]} {...geometryProps} />
        <motion.meshStandardMaterial
          ref={materialRef}
          attach="material"
          map={texture}
          {...shaderProps}
        />
      </motion.mesh>
    </>
  )
}

export function Scene(props: MyonSceneProps) {
  const { isHovered } = props
  const frame = useKeyframer(isHovered)

  const initialFrame = frame < 0
  const floatFrame = frame >= 0
  const floatFrame2 = frame > 150
  const floatFrame3 = frame > 230
  const floatFrameKinda4 = frame > 260 && frame <= 300
  const floatFrame4 = frame > 290 && frame <= 300
  const lyricsFrame = frame > 300 && frame <= 605
  const lyricsFrameSecond = frame > 455 && frame <= 605
  const aboutToFinalFrame = frame > 590
  const finalFrame = frame > 605
  const almostConcludingFrame = frame > 755
  const concludingFrame = frame > 910

  return (
    <>
      <StupidMarquees
        direction="right"
        opacity={0.4}
        myon={true}
        visible={finalFrame}
      />
      <Canvas
        shadows={true}
        gl={{
          antialias: false,
          alpha: true,
          logarithmicDepthBuffer: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        dpr={window.devicePixelRatio}
      >
        <motion.ambientLight
          initial={{ color: "black" }}
          animate={{
            color: "#a0a0a0",
            ...(floatFrame && {
              color: "#fff",
            }),
          }}
          intensity={2}
        />
        <Suspense>
          <motion.pointLight
            position={[0, 0, 0]}
            intensity={13}
            distance={100}
            decay={0.3}
            initial={{ color: "#000000" }}
            animate={finalFrame ? "visible" : "hidden"}
            variants={{
              hidden: { color: "#000000" },
              visible: {
                color: ["#000000", "#abfaab", "#000000"],
              },
            }}
            transition={{
              color: {
                duration: 0.3,
                ease: "linear",
              },
              ...(finalFrame && {
                color: {
                  duration: 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }),
            }}
          />
          <motion.group
            initial={{ scale: 0 }}
            animate={lyricsFrameSecond ? "visible" : "hidden"}
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
            transition={{
              duration: 0.1,
            }}
          >
            <MyonPlane
              isHovered={isHovered}
              position={[0, 0, -20]}
              animate={{
                x: [0, 7],
              }}
              geometryProps={{
                args: [100, 100, 1, 1],
              }}
              shaderProps={{
                initial: {
                  color: "#000000",
                },
                color: "#000000",
                animate: {
                  ...(lyricsFrameSecond && {
                    color: "#555555",
                  }),
                },
                transition: {
                  duration: 1,
                },
              }}
              transition={{
                duration: 1,
                x: {
                  duration: 10,
                  ease: "linear",
                },
              }}
            />
          </motion.group>
          <motion.group>
            <MyonCube
              isHovered={isHovered}
              position={[0, 0, 0]}
              animate={
                initialFrame
                  ? "idle"
                  : concludingFrame
                    ? "concluding"
                    : finalFrame
                      ? "fullSpin"
                      : aboutToFinalFrame
                        ? "float4"
                        : lyricsFrame
                          ? "lyrics"
                          : floatFrame4
                            ? "float4"
                            : floatFrame3
                              ? "float3"
                              : floatFrame2
                                ? "float2"
                                : floatFrame
                                  ? "float1"
                                  : "idle"
              }
              variants={{
                idle: {
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  y: 0,
                  z: 0,
                },
                float1: {
                  rotateX: 0.25,
                  rotateY: [0, 180, 360],
                },
                float2: {
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                },
                float3: {
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                  rotateZ: [0, 180, 360],
                },
                float4: {
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  y: 0,
                  z: 3,
                },
                lyrics: {
                  rotateX: 0.25,
                  rotateY: [0, 180, 360],
                  rotateZ: 0,
                  y: [0, 0.5, 0, -0.5, 0],
                },
                fullSpin: {
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                  rotateZ: [0, 180, 360],
                  y: 0,
                },
                concluding: {
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  y: 0,
                  z: 0,
                },
              }}
              transition={{
                duration: 1,
                y: {
                  duration: 0.1,
                  ease: "linear",
                },
                ...(isHovered && {
                  y: {
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  rotateX: {
                    duration: 180,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  rotateZ: {
                    duration: 180,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  rotateY: {
                    duration: 180,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }),
                ...(initialFrame && {
                  rotateX: {
                    duration: 0.1,
                    repeat: 0,
                    ease: "linear",
                  },
                  rotateY: {
                    duration: 1,
                    repeat: 0,
                    ease: "linear",
                  },
                  rotateZ: {
                    duration: 0.1,
                    repeat: 0,
                    ease: "linear",
                  },
                  y: {
                    duration: 1,
                    ease: "linear",
                  },
                }),
                ...(floatFrame && {
                  rotateX: {
                    duration: 0.1,
                    ease: "linear",
                  },
                }),
                ...((floatFrame4 || aboutToFinalFrame) && {
                  rotateX: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                  rotateY: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                  rotateZ: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                  z: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                  y: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                }),
                ...(finalFrame && {
                  rotateX: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  rotateZ: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  rotateY: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }),
                ...(concludingFrame && {
                  rotateX: {
                    duration: 0.1,
                    ease: "linear",
                  },
                  rotateZ: {
                    duration: 0.1,
                    ease: "linear",
                  },
                  rotateY: {
                    duration: 15,
                    ease: "linear",
                  },
                }),
              }}
            />
          </motion.group>
          <motion.group
            initial={{ scale: 0 }}
            animate={
              floatFrameKinda4 || lyricsFrame || concludingFrame
                ? "hidden"
                : floatFrame2
                  ? "spin"
                  : floatFrame
                    ? "visible"
                    : "hidden"
            }
            variants={{
              hidden: { scale: 0, rotateY: [0, 180, 360] },
              visible: { scale: 1, rotateY: 0 },
              spin: {
                scale: 1,
                rotateY: [0, 180, 360],
              },
            }}
            transition={{
              duration: 0.1,
              ...(floatFrame2 && {
                rotateY: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }),
              ...(floatFrameKinda4 && {
                duration: 3,
              }),
              ...(concludingFrame && {
                duration: 15,
              }),
            }}
          >
            <MyonCube
              isHovered={isHovered}
              position={[-2, 0, -1]}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.25,
              }}
              transition={{
                duration: 1,
                rotateY: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abfaab",
                animate: {
                  ...(finalFrame && {
                    color: "#ffffff",
                  }),
                  ...(floatFrameKinda4 && {
                    color: "#000000",
                  }),
                  ...(floatFrame2 && {
                    color: "#ffffff",
                  }),
                },
                transition: {
                  duration: 3,
                },
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[2, 0, -1]}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.25,
              }}
              transition={{
                duration: 1,
                rotateY: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abfaab",
                animate: {
                  ...(finalFrame && {
                    color: "#ffffff",
                  }),
                  ...(floatFrameKinda4 && {
                    color: "#000000",
                  }),
                  ...(floatFrame2 && {
                    color: "#ffffff",
                  }),
                },
                transition: {
                  duration: 3,
                },
              }}
            />
          </motion.group>
          <motion.group
            initial={{ scale: 0 }}
            animate={
              floatFrameKinda4 || lyricsFrame || concludingFrame
                ? "hidden"
                : floatFrame3
                  ? "spin"
                  : floatFrame2
                    ? "visible"
                    : "hidden"
            }
            variants={{
              hidden: {
                scale: 0,
                rotateY: [0, 180, 360],
                rotateZ: [0, 180, 360],
              },
              visible: { scale: 1, rotateZ: 0, rotateY: 0 },
              spin: {
                scale: 1,
                rotateY: [0, 180, 360],
                rotateZ: [0, 180, 360],
              },
            }}
            transition={{
              duration: 0.1,
              ...(floatFrame3 && {
                rotateY: {
                  duration: 180,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                rotateZ: {
                  duration: 180,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }),
              ...(floatFrameKinda4 && {
                duration: 3,
              }),
              ...(concludingFrame && {
                duration: 15,
              }),
            }}
          >
            <MyonCube
              isHovered={isHovered}
              position={[-2, 2, 1]}
              animate={{
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 1,
                rotateX: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#f2faab",
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[2, 2, 1]}
              animate={{
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 1,
                rotateX: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abfaab",
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[-2, -2, 1]}
              animate={{
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 1,
                rotateX: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abe7fa",
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[2, -2, 1]}
              animate={{
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 1,
                rotateX: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#faabab",
              }}
            />
          </motion.group>
          <motion.group
            initial={{ scale: 0 }}
            animate={
              concludingFrame ? "hidden" : finalFrame ? "spin" : "hidden"
            }
            variants={{
              hidden: { scale: 0, rotateZ: [0, 180, 360] },
              visible: { scale: 1, rotateZ: 0 },
              spin: {
                scale: 1,
                rotateZ: [0, 180, 360],
              },
            }}
            transition={{
              duration: 0.1,
              rotateZ: {
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              ...(floatFrameKinda4 && {
                duration: 3,
              }),
              ...(concludingFrame && {
                duration: 15,
              }),
            }}
          >
            <MyonCube
              isHovered={isHovered}
              position={[0, -2, -1]}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.25,
              }}
              transition={{
                duration: 1,
                rotateY: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abfaab",
                animate: {
                  ...(finalFrame && {
                    color: "#ffffff",
                  }),
                  ...(floatFrameKinda4 && {
                    color: "#000000",
                  }),
                  ...(floatFrame2 && {
                    color: "#ffffff",
                  }),
                },
                transition: {
                  duration: 3,
                },
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[0, 2, -1]}
              animate={{
                rotateY: [0, 180, 360],
                rotateX: 0.25,
              }}
              transition={{
                duration: 1,
                rotateY: {
                  duration: 60,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
              shaderProps={{
                color: "#abfaab",
                animate: {
                  ...(finalFrame && {
                    color: "#ffffff",
                  }),
                  ...(floatFrameKinda4 && {
                    color: "#000000",
                  }),
                  ...(floatFrame2 && {
                    color: "#ffffff",
                  }),
                },
                transition: {
                  duration: 3,
                },
              }}
            />
          </motion.group>
          <motion.group
            initial={{ scale: 0 }}
            animate={
              concludingFrame ? "hidden" : finalFrame ? "visible" : "hidden"
            }
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1 },
            }}
            transition={{
              duration: 0.1,
              ...(concludingFrame && {
                duration: 15,
              }),
            }}
          >
            <MyonCube
              isHovered={isHovered}
              position={[0, 0, -50]}
              scale={[30, 30, 30]}
              animate={{
                rotateY: [0, 180, 360],
                rotateZ: [0, 180, 360],
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 360,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              shaderProps={{
                color: "#abfaab",
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[-30, 0, 0]}
              scale={[30, 30, 30]}
              animate={{
                rotateY: [0, 180, 360],
                rotateZ: [0, 180, 360],
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 360,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              shaderProps={{
                color: "#abfaab",
                initial: {
                  color: "#000000",
                },
                animate: {
                  ...(almostConcludingFrame && {
                    color: "#abfaab",
                  }),
                },
              }}
            />
            <MyonCube
              isHovered={isHovered}
              position={[30, 0, 0]}
              scale={[30, 30, 30]}
              animate={{
                rotateY: [0, 180, 360],
                rotateZ: [0, 180, 360],
                rotateX: [0, 180, 360],
              }}
              transition={{
                duration: 360,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              shaderProps={{
                color: "#abfaab",
                initial: {
                  color: "#000000",
                },
                animate: {
                  ...(almostConcludingFrame && {
                    color: "#abfaab",
                  }),
                },
              }}
            />
          </motion.group>
        </Suspense>
      </Canvas>
      <StupidMarquees myon={true} visible={finalFrame} />
      <MyonLyrics frame={frame} />
    </>
  )
}
