"use client"

import { useEffect, useRef, useState } from "react"

export function useKeyframer(active: boolean, microDelay = 95) {
  const [frame, setFrame] = useState(-1)
  const lastUpdateTimeRef = useRef<number | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const cleanup = () => {
      if (lastUpdateTimeRef.current !== null) {
        lastUpdateTimeRef.current = null
      }
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      setFrame(-1)
    }

    const updateFrame = (timestamp: number) => {
      if (!active) {
        cleanup()
        return
      }
      if (lastUpdateTimeRef.current === null) {
        lastUpdateTimeRef.current = timestamp

        animationFrameIdRef.current = requestAnimationFrame(updateFrame)
        return
      }

      const elapsed = timestamp - lastUpdateTimeRef.current

      // Check if 95ms has passed // magic number
      if (elapsed >= microDelay) {
        lastUpdateTimeRef.current = timestamp

        setFrame((prevFrame) => {
          const nextFrame = prevFrame + 1
          return nextFrame >= 999999 ? 0 : nextFrame
        })
      }

      animationFrameIdRef.current = requestAnimationFrame(updateFrame)
    }

    animationFrameIdRef.current = requestAnimationFrame(updateFrame)

    return () => {
      cleanup()
    }
  }, [active, microDelay])

  return frame
}
