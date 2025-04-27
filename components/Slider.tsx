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

export const Slider = ({
  onChange,
  value,
  min,
  max,
  step,
  disabled = false,
  className,
  style,
}: SliderProps) => {
  return (
    <div className={`slider ${className}`}>
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
