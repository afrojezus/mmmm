"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const a: string[] = [
  "ボクとキミのあいだでは",
  "どっかで聴いたあの曲の",
  "懐かしいメロディが鳴ってる",
  "ボクとキミのあいだから",
  "いつの日か遠い未来",
  "新しいメロディが生まれる",
  "ToDimension",
]

const getIndex = (frame: number) => {
  if (frame > 253) {
    return 6
  }
  if (frame > 205) {
    return 5
  }
  if (frame > 170) {
    return 4
  }
  if (frame > 142) {
    return 3
  }
  if (frame > 80) {
    return 2
  }
  if (frame > 43) {
    return 1
  }
  if (frame > 12) {
    return 0
  }

  return 0
}

export const MikuLyrics = ({
  frame,
}: {
  frame: number
}) => {
  const [lyrics] = useState<string[]>(a)
  const lyricsIndex = getIndex(frame)

  const isVisible = frame > 12 && frame <= 265

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.h1
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: "9em",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "2em",
          color: "#ff0",
        }}
      >
        {lyrics[lyricsIndex]}
      </motion.h1>
    </motion.div>
  )
}
