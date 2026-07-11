import { useAudioScene } from "@/hooks/use-audio-scene"
import classes from "@/styles/3d.module.css"
import { Slider } from "../Slider"
import UuuCube from "./UuuCube"

function UuuCubeWrapper() {
  const { volume, isHovered, sound, onClick, handleVolumeChange } =
    useAudioScene({ src: "/uuuu.mp3" })

  return (
    <main style={{ opacity: sound ? 1 : 0 }}>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        className={classes.slider}
      />
      <div onClick={onClick} className={classes.canvas}>
        <UuuCube isHovered={isHovered} />
      </div>
    </main>
  )
}

export default UuuCubeWrapper
