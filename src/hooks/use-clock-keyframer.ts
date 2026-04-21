"use client"

import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"

export function useClockKeyframer(active: boolean, fps = 60) {
  const frameRef = useRef(-1)
  const lastFrameTimeRef = useRef(-1)

  useFrame((state) => {
    if (!active) {
      lastFrameTimeRef.current = -1
      frameRef.current = -1
      return
    }
    const elapsed = state.clock.elapsedTime - lastFrameTimeRef.current
    if (elapsed > 1 / fps) {
      lastFrameTimeRef.current = state.clock.elapsedTime
      frameRef.current += 1
    }
  })
  return frameRef
}
