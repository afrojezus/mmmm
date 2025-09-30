import clsx from "clsx"
import styles from "@/styles/slider.module.scss"

type SliderProps = {
  onChange: (value: number) => void
  value: number
  min: number
  max: number
  step: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Slider({
  onChange,
  value,
  min,
  max,
  step,
  disabled = false,
  className,
  style,
}: SliderProps) {
  return (
    <div className={clsx(styles.slider)}>
      <span>volume</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        style={{ ...style, cursor: disabled ? "not-allowed" : "pointer" }}
      />
    </div>
  )
}
