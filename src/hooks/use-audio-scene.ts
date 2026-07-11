import { useCallback, useEffect, useRef, useState } from "react"
import useSound from "use-sound"

type UseAudioSceneOptions = {
  src: string
  initialVolume?: number
}

export function useAudioScene({
  src,
  initialVolume = 0.25,
}: UseAudioSceneOptions) {
  const [volume, setVolume] = useState(initialVolume)
  const [isHovered, setIsHovered] = useState(false)
  const [play, { stop, sound }] = useSound(src, {
    volume,
    playbackRate: 1,
    interrupt: true,
  })
  const mouse = useRef<[number, number]>([0, 0])

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }: React.MouseEvent<HTMLElement>) => {
      mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]
    },
    [],
  )

  const onHoverStart = useCallback(() => {
    setIsHovered(true)
    play()
  }, [play])

  const onHoverEnd = useCallback(() => {
    setIsHovered(false)
    stop()
  }, [stop])

  const handleVolumeChange = useCallback(
    (value: number) => {
      setVolume(value)
      if (sound) sound.volume(value)
    },
    [sound],
  )

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

  return {
    volume,
    isHovered,
    sound,
    mouse,
    onMouseMove,
    onHoverStart,
    onHoverEnd,
    handleVolumeChange,
    onClick: () => {
      if (sound) {
        if (isHovered) {
          onHoverEnd()
        } else {
          onHoverStart()
        }
      }
    },
  }
}
