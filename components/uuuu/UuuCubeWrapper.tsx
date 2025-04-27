"use client"
import classes from "@/styles/3d.module.css"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import UuuCube from "./UuuCube"

const UuuCubeWrapper = () => {
  const [playbackRate] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [play, { stop, sound }] = useSound("/uuuu.mp3", {
    volume: 1,
    playbackRate,
    interrupt: true,
  })

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
      <motion.div
        onClick={() =>
          sound ? (isHovered ? onHoverEnd() : onHoverStart()) : undefined
        }
        layout={true}
        className={classes.canvas}
      >
        <UuuCube isHovered={isHovered} />
      </motion.div>
    </motion.main>
  )
}

export default UuuCubeWrapper
