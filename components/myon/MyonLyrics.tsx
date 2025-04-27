"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const a: string[] = [
  "昼下がりゆらゆらの",
  "こもれび　見上げてぽつり",
  "雲間からふるふると",
  "ほら",
  "虹を誘う砂糖の雨",
  "てのひらにきらきらの",
  "ひとつぶ　落としてくるり",
  "花びらがふるふると",
  "ほら",
  "連れて行くの夢の中へ",
]

const getIndex = (frame: number) => {
  if (frame > 570) {
    return 9
  }
  if (frame > 560) {
    return 8
  }
  if (frame > 530) {
    return 7
  }
  if (frame > 490) {
    return 6
  }
  if (frame > 455) {
    return 5
  }
  if (frame > 420) {
    return 4
  }
  if (frame > 410) {
    return 3
  }
  if (frame > 380) {
    return 2
  }
  if (frame > 340) {
    return 1
  }
  if (frame > 300) {
    return 0
  }

  return 0
}

const MyonLyrics = ({
  frame,
}: {
  frame: number
}) => {
  const [lyrics] = useState<string[]>(a)
  const lyricsIndex = getIndex(frame)

  const isVisible = frame > 300 && frame <= 605

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

export default MyonLyrics
