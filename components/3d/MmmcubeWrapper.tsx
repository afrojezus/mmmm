"use client"
import classes from "@/styles/3d.module.css"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import useSound from "use-sound"
import { Slider } from "../Slider"
import Mmmcube from "./Mmmcube"

const MmmcubeWrapper = () => {
  const [playbackRate] = useState(1)
  const [volume, setVolume] = useState(0.25)
  const [isHovered, setIsHovered] = useState(false)
  const [play, { stop, sound }] = useSound("/mmmm.mp3", {
    volume,
    playbackRate,
    interrupt: true,
  })
  const mouse = useRef<[number, number]>([0, 0])
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }: React.MouseEvent<HTMLElement>) => {
      mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]
    },
    [],
  )

  const onHoverStart = () => {
    setIsHovered(true)
    play()
  }
  const onHoverEnd = () => {
    setIsHovered(false)
    stop()
  }

  useEffect(() => {
    if (isHovered && sound) {
      sound.on("end", () => {
        setIsHovered(false)
      })
    }
  }, [isHovered, sound])

  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: sound ? 1 : 0 }}>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(value) => {
          setVolume(value)
          if (sound) sound.volume(value)
        }}
        className={classes.slider}
      />
      <motion.div
        onMouseMove={onMouseMove}
        onClick={() =>
          sound ? (isHovered ? onHoverEnd() : onHoverStart()) : undefined
        }
        layout={true}
        className={classes.canvas}
      >
        <Mmmcube isHovered={isHovered} mouse={mouse} />
      </motion.div>
    </motion.main>
  )
}

export default MmmcubeWrapper
