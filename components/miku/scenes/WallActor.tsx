"use client"

import { motion } from "framer-motion-3d"
import { Suspense } from "react"
import { Wall } from "../Wall"
import { BackgroundActors } from "./BackgroundActors"

export const WallActor = ({ frame }: { frame: number }) => {
  const boomFrame = frame >= 0 && frame < 1
  const litFrame = frame >= 12
  const zoomOutFrame = frame >= 265
  return (
    <Suspense fallback={null}>
      <motion.group
        animate={
          zoomOutFrame
            ? "zoomOut"
            : boomFrame
              ? "boom"
              : litFrame
                ? "lit"
                : "idle"
        }
        variants={{
          idle: {
            scale: 1,
            z: -1,
          },
          boom: {
            scale: 1,
            z: -10,
          },
          lit: {
            scale: 1,
            z: -10,
          },
          zoomOut: {
            z: -500,
            transition: {
              duration: 30,
              ease: "easeInOut",
            },
          },
        }}
      >
        <Wall
          shaderProps={{
            animate: boomFrame ? "boom" : litFrame ? "lit" : "idle",
            variants: {
              idle: {
                color: "#111",
              },
              boom: {
                color: "#003",
              },
              lit: {
                color: "#444",
              },
            },
          }}
        />
        <BackgroundActors frame={frame} />
      </motion.group>
    </Suspense>
  )
}
