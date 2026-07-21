import { useRef } from "react"
import classes from "./swatch-input.module.css"

type SwatchInputProps = {
  id?: string
  name: string
  label: string
  value: string
  colours: string[]
  defaultValue?: string
  onChange: (value: string) => void
  [dataProp: `data-${string}`]: string
}

const ColorizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    role="presentation"
  >
    <path d="M120-120v-190l358-358-58-56 58-56 76 76 124-124q5-5 12.5-8t15.5-3q8 0 15 3t13 8l94 94q5 6 8 13t3 15q0 8-3 15.5t-8 12.5L705-555l76 78-57 57-56-58-358 358H120Zm80-80h78l332-334-76-76-334 332v78Zm447-410 96-96-37-37-96 96 37 37Zm0 0-37-37 37 37Z" />
  </svg>
)

const CustomColourInput = ({
  name,
  colours,
  value,
  onChange,
}: Pick<SwatchInputProps, "name" | "colours" | "value" | "onChange">) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const customColourIsPredefined = colours.includes(value)

  return (
    <div className={classes.customColourInput}>
      <input
        type="color"
        id={`${name}-input`}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        ref={inputRef}
        value={value}
        data-active={!customColourIsPredefined}
        style={{
          backgroundColor: value,
        }}
        title="Pick a colour"
      />
      <ColorizeIcon />
    </div>
  )
}

export const SwatchInput = ({
  id,
  name,
  label,
  value,
  colours,
  defaultValue,
  onChange,
  ...dataProps
}: SwatchInputProps) => {
  return (
    <div id={id} className={classes.swatchInput} {...dataProps}>
      <div className={classes.header}>
        <p>{label}</p>
        <CustomColourInput
          name={`${name}-custom`}
          colours={colours}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className={classes.grid}>
        {colours.map((colour) => (
          <div key={colour}>
            <label htmlFor={`${name}-${colour}`}>
              <input
                type="radio"
                name={name}
                value={colour}
                id={`${name}-${colour}`}
                checked={value === colour}
                onChange={() => onChange(colour)}
              />
              <span style={{ backgroundColor: colour }}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
