"use client"

import { motion } from "framer-motion-3d"
import { Suspense } from "react"

export const GroupActor = ({
  frame,
  children,
}: { frame: number; children: React.ReactNode }) => {
  const chord1Frame = frame >= 16
  const chord2Frame = frame >= 27
  const chord3Frame = frame >= 45
  const chord4Frame = frame >= 60
  const chord5Frame = frame >= 79
  const chord6Frame = frame >= 91
  const chord7Frame = frame >= 110
  const chord8Frame = frame >= 123
  const chord9Frame = frame >= 140
  const chord10Frame = frame > 253 && frame < 265
  const chord11Frame = frame >= 265
  return (
    <Suspense fallback={null}>
      <motion.group
        initial={{}}
        animate={
          chord11Frame
            ? "chord11"
            : chord10Frame
              ? "chord10"
              : chord9Frame
                ? "chord9"
                : chord8Frame
                  ? "chord8"
                  : chord7Frame
                    ? "chord7"
                    : chord6Frame
                      ? "chord6"
                      : chord5Frame
                        ? "chord5"
                        : chord4Frame
                          ? "chord4"
                          : chord3Frame
                            ? "chord3"
                            : chord2Frame
                              ? "chord2"
                              : chord1Frame
                                ? "chord1"
                                : "idle"
        }
        variants={{
          idle: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            z: 0,
            x: 0,
            y: 0,
          },
          chord1: {
            rotateY: -0.5,
            rotateX: 0.5,
            rotateZ: 0,
          },
          chord2: {
            rotateY: 0.5,
            rotateX: -0.5,
            rotateZ: 0,
          },
          chord3: {
            rotateY: 0,
            rotateX: 0.5,
            rotateZ: 0,
          },
          chord4: {
            rotateY: 0,
            rotateX: -0.5,
            rotateZ: 0,
          },
          chord5: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0.5,
          },
          chord6: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: -0.5,
          },
          chord7: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            z: 2,
          },
          chord8: {
            rotateY: 0,
            rotateX: -1.5,
            rotateZ: 360,
            z: 0,
            transition: {
              rotateZ: {
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            },
          },
          chord9: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            z: 0,
            x: 0,
            y: 0,
          },
          chord10: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            z: 3,
          },
          chord11: {
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            z: 0,
            x: 0,
            y: 0,
          },
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.group>
    </Suspense>
  )
}
