const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

type GenerateTextureParams = {
  hairColour: string
  eyeColour: string
  skinColour: string
  baseColorMapData: ArrayBuffer
  width: number
  height: number
}
const generateTexture = ({
  hairColour,
  eyeColour,
  skinColour,
  baseColorMapData,
  width,
  height,
}: GenerateTextureParams): Promise<Blob | null> => {
  return new Promise(async (resolve) => {
    const offscreen = new OffscreenCanvas(width, height)
    const ctx = offscreen.getContext("2d", { willReadFrequently: true })
    if (!ctx) return resolve(null)

    ctx.putImageData(
      new ImageData(new Uint8ClampedArray(baseColorMapData), width, height),
      0,
      0,
    )

    ctx.globalCompositeOperation = "source-in"

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    const hair = hexToRgb(hairColour)
    const skin = hexToRgb(skinColour)
    const eye = hexToRgb(eyeColour)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const max = Math.max(r, g, b)

      if (r > 0 && r > g + 50 && r > b + 50) {
        // hair
        const brightness = max / 255
        data[i] = Math.floor(hair.r * brightness)
        data[i + 1] = Math.floor(hair.g * brightness)
        data[i + 2] = Math.floor(hair.b * brightness)
      } else if (g > 0 && g > r + 50 && g > b + 50) {
        // skin
        const brightness = max / 255
        data[i] = Math.floor(skin.r * brightness)
        data[i + 1] = Math.floor(skin.g * brightness)
        data[i + 2] = Math.floor(skin.b * brightness)
      } else if (b > 0 && b > r + 50 && b > g + 50) {
        // eyes
        const brightness = max / 255
        data[i] = Math.floor(eye.r * brightness)
        data[i + 1] = Math.floor(eye.g * brightness)
        data[i + 2] = Math.floor(eye.b * brightness)
      }
    }

    ctx.putImageData(imageData, 0, 0)

    ctx.globalCompositeOperation = "source-over"

    const blob = await offscreen.convertToBlob({ type: "image/png" })
    return resolve(blob)
  })
}

self.onmessage = async (e) => {
  const { hairColour, eyeColour, skinColour, baseColorMapData, width, height } =
    e.data

  try {
    const blob = await generateTexture({
      hairColour,
      eyeColour,
      skinColour,
      baseColorMapData,
      width,
      height,
    })

    self.postMessage(blob)
  } catch (error) {
    console.error("generate texture error:", error)
    self.postMessage(null)
  }
}
