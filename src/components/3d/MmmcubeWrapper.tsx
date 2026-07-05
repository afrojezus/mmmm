import { useAudioScene } from "@/hooks/use-audio-scene"
import classes from "@/styles/3d.module.css"
import { Slider } from "../Slider"
import Mmmcube from "./Mmmcube"

function MmmcubeWrapper() {
  const {
    volume,
    isHovered,
    sound,
    mouse,
    onMouseMove,
    onClick,
    handleVolumeChange,
  } = useAudioScene({ src: "/mmmm.mp3" })

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
      <div
        onMouseMove={onMouseMove}
        onClick={onClick}
        onKeyDown={(e) => e.preventDefault()}
        className={classes.canvas}
      >
        <Mmmcube isHovered={isHovered} mouse={mouse} />
      </div>
    </main>
  )
}

export default MmmcubeWrapper
