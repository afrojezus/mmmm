"use client"

import { Suspense } from "react"
import { MikuCube } from "../MikuCube"

export const MainActor = ({ frame }: { frame: number }) => {
  const boomFrame = frame >= 0 && frame < 1
  const litFrame = frame >= 12
  const spinFrame = frame >= 141 && frame <= 245
  const extremeSpinFrame = frame >= 265
  const resetFrame = frame >= 500
  return (
    <Suspense fallback={null}>
      <MikuCube
        shaderProps={{
          animate: boomFrame ? "boom" : litFrame ? "lit" : "idle",
          variants: {
            idle: {
              color: "#333",
            },
            boom: {
              color: "#f0f",
            },
            lit: {
              color: "#fff",
            },
          },
        }}
        initial={{}}
        animate={
          resetFrame
            ? "reset"
            : extremeSpinFrame
              ? "extremeSpinning"
              : spinFrame
                ? "spinning"
                : boomFrame
                  ? "boom"
                  : litFrame
                    ? "lit"
                    : "idle"
        }
        variants={{
          idle: {
            scale: 0.8,
            z: 0,
          },
          boom: {
            scale: 0.8,
            z: 0,
          },
          lit: {
            scale: 1,
            z: 0,
          },
          spinning: {
            rotateY: 360,
            rotateX: 0.5,
            transition: {
              rotateY: {
                duration: 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            },
          },
          extremeSpinning: {
            rotateY: 360,
            rotateX: 0.5,
            z: [-10, 3, -10, 3],
            transition: {
              rotateY: {
                duration: 50,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              z: {
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "linear",
              },
            },
          },
          reset: {
            scale: 1,
            z: 0,
            rotateY: 0,
            rotateX: 0,
          },
        }}
      />
    </Suspense>
  )
}
