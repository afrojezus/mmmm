import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { ColorDepth, EffectComposer } from "@react-three/postprocessing"
import { animate } from "motion"
import { useEffect, useRef, useState } from "react"
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  TextureLoader,
} from "three"
import classes from "./creator.module.css"

const COMMON_COLOUR_SWATCHES = [
  "#000000",
  "#111111",
  "#222222",
  "#333333",
  "#444444",
  "#555555",
  "#FF0000",
  "#FF3300",
  "#FF6600",
  "#FF9900",
  "#FFCC00",
  "#FFFF00",
  "#CCFF00",
  "#99FF00",
  "#66FF00",
  "#33FF00",
  "#00FF00",
  "#00FF99",
  "#00FFCC",
  "#00FFFF",
  "#00CCFF",
  "#0099FF",
  "#0066FF",
  "#0033FF",
  "#0000FF",
  "#3300FF",
  "#6600FF",
  "#9900FF",
  "#CC00FF",
  "#FF00FF",
  "#FF33FF",
  "#FF66FF",
  "#FF99FF",
  "#FFCCFF",
  "#EEEEEE",
  "#F5F5F5",
  "#FAFAFA",
  "#FFFFFF",
]

const HAIR_COLOUR_SWATCHES = [...COMMON_COLOUR_SWATCHES]
const EYE_COLOUR_SWATCHES = [...COMMON_COLOUR_SWATCHES]
const SKIN_COLOUR_SWATCHES = [
  "#ffffff",
  "#fdddd2",
  "#F5D0C7",
  "#F8C5B8",
  "#FCC6B2",
  "#F4C2A6",
  "#E9B38E",
  "#E0A37A",
  "#D9A07E",
  "#C98E6F",
  "#C47A5E",
  "#B56F4F",
  "#A86A4E",
  "#9B5E45",
  "#8D4C3E",
  "#7C3F35",
  "#6B3A2F",
  "#5C2F28",
]

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
}
const generateTexture = ({
  hairColour,
  eyeColour,
  skinColour,
}: GenerateTextureParams): Promise<Blob | null> => {
  return new Promise(async (resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return resolve(null)

    canvas.width = 2000
    canvas.height = 2000

    const colorMap = new Image()
    colorMap.src = new URL("/creator-color-map.png", import.meta.url).href

    await Promise.all(
      [colorMap].map(
        (img) =>
          new Promise((res) => {
            img.onload = () => res(null)
          }),
      ),
    )

    // Draw base color map
    ctx.drawImage(colorMap, 0, 0)

    ctx.globalCompositeOperation = "source-in"

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const hair = hexToRgb(hairColour)
    const skin = hexToRgb(skinColour)
    const eye = hexToRgb(eyeColour)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const max = Math.max(r, g, b)

      // Determine region by dominant channel
      if (r > 0 && r > g + 50 && r > b + 50) {
        // **Hair** (red dominant)
        const brightness = max / 255
        data[i] = Math.floor(hair.r * brightness)
        data[i + 1] = Math.floor(hair.g * brightness)
        data[i + 2] = Math.floor(hair.b * brightness)
      } else if (g > 0 && g > r + 50 && g > b + 50) {
        // **Skin** (green dominant)
        const brightness = max / 255
        data[i] = Math.floor(skin.r * brightness)
        data[i + 1] = Math.floor(skin.g * brightness)
        data[i + 2] = Math.floor(skin.b * brightness)
      } else if (b > 0 && b > r + 50 && b > g + 50) {
        // **Eyes** (blue dominant)
        const brightness = max / 255
        data[i] = Math.floor(eye.r * brightness)
        data[i + 1] = Math.floor(eye.g * brightness)
        data[i + 2] = Math.floor(eye.b * brightness)
      }
    }

    ctx.putImageData(imageData, 0, 0)

    ctx.globalCompositeOperation = "source-over"

    canvas.toBlob((blob) => resolve(blob), "image/png", 1.0)
  })
}

const downloadGLTF = async (textureBlob: Blob, filename: string) => {
  const { GLTFExporter } = await import(
    "three/examples/jsm/exporters/GLTFExporter.js"
  )

  const url = URL.createObjectURL(textureBlob)
  const texture = await new TextureLoader().loadAsync(url)
  URL.revokeObjectURL(url)

  const mesh = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ map: texture }),
  )

  const exporter = new GLTFExporter()
  exporter.parse(
    mesh,
    (result) => {
      const blob = new Blob(
        [result instanceof ArrayBuffer ? result : JSON.stringify(result)],
        { type: "model/gltf-binary" },
      )
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}.glb`
      link.click()
      URL.revokeObjectURL(link.href)
    },
    (error) => console.error("GLTFExporter error:", error),
    { binary: true },
  )
}

export default function Creator() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [generatedTexture, setGeneratedTexture] = useState<Blob | null>(null)
  const [hairColour, setHairColour] = useState(HAIR_COLOUR_SWATCHES[0])
  const [eyeColour, setEyeColour] = useState(EYE_COLOUR_SWATCHES[0])
  const [skinColour, setSkinColour] = useState(SKIN_COLOUR_SWATCHES[0])
  const customNameRef = useRef<HTMLInputElement>(null)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    ;(async () => {
      const texture = await generateTexture({
        hairColour,
        eyeColour,
        skinColour,
      })
      setGeneratedTexture(texture)
    })()
    return () => {}
  }, [hairColour, eyeColour, skinColour])

  const handleDownloadPng = () => {
    if (generatedTexture) {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(generatedTexture)
      const name = customNameRef.current?.value || "my-mmmm"
      link.download = `${name}.png`
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    }
  }

  const handleDownload3DCube = () => {
    if (generatedTexture) {
      const name = customNameRef.current?.value || "my-mmmm"
      downloadGLTF(generatedTexture, name)
    }
  }

  return (
    <main>
      <section className={classes.header}>
        <input
          className={classes.headerInput}
          type="text"
          ref={customNameRef}
          defaultValue="Creator"
        />
      </section>
      <Renderer autoRotate={autoRotate} generatedTexture={generatedTexture} />
      <section
        className={[classes.controls, showControls ? classes.open : ""].join(
          " ",
        )}
      >
        <button
          type="button"
          className={classes.toggle}
          onClick={() => setShowControls(!showControls)}
        >
          <span className={classes.arrow}></span>
          <h3>Controls</h3>
          <span className={classes.arrow}></span>
        </button>
        <div className={classes.panes}>
          <section>
            <div className={classes.swatch}>
              <p>Hair colour</p>
              <div className={classes.swatches}>
                {HAIR_COLOUR_SWATCHES.map((colour) => (
                  <div key={colour}>
                    <label htmlFor={`hairColour-${colour}`}>
                      <input
                        type="radio"
                        name="hairColour"
                        value={colour}
                        id={`hairColour-${colour}`}
                        checked={hairColour === colour}
                        onChange={() => setHairColour(colour)}
                      />
                      <span style={{ backgroundColor: colour }}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.swatch}>
              <p>Eye colour</p>
              <div className={classes.swatches}>
                {EYE_COLOUR_SWATCHES.map((colour) => (
                  <div key={colour}>
                    <label htmlFor={`eyeColour-${colour}`}>
                      <input
                        type="radio"
                        name="eyeColour"
                        value={colour}
                        id={`eyeColour-${colour}`}
                        checked={eyeColour === colour}
                        onChange={() => setEyeColour(colour)}
                      />
                      <span style={{ backgroundColor: colour }}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.swatch}>
              <p>Skin colour</p>
              <div className={classes.swatches}>
                {SKIN_COLOUR_SWATCHES.map((colour) => (
                  <div key={colour}>
                    <label htmlFor={`skinColour-${colour}`}>
                      <input
                        type="radio"
                        name="skinColour"
                        value={colour}
                        id={`skinColour-${colour}`}
                        checked={skinColour === colour}
                        onChange={() => setSkinColour(colour)}
                      />
                      <span style={{ backgroundColor: colour }}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className={classes.divider} />
          <section>
            <div className={classes.input}>
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
                id="autoRotate"
              />
              <label htmlFor="autoRotate">Auto rotate</label>
            </div>
            <img
              alt="2D preview"
              className={classes.preview}
              src={
                generatedTexture
                  ? URL.createObjectURL(generatedTexture)
                  : "/creator.png"
              }
            />
            <button type="button" onClick={handleDownload3DCube}>
              Download cube
            </button>
            <button type="button" onClick={handleDownloadPng}>
              Download PNG
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}

type RendererProps = {
  generatedTexture: Blob | null
  autoRotate?: boolean
}

const Renderer = ({ generatedTexture, autoRotate }: RendererProps) => {
  return (
    <div className={classes.canvas}>
      <Canvas
        shadows="basic"
        gl={{
          antialias: false,
          alpha: true,
          logarithmicDepthBuffer: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        dpr={window.devicePixelRatio / 2}
        camera={{
          fov: 20,
          near: 0.1,
          far: 100000,
        }}
      >
        <directionalLight
          castShadow={true}
          position={[5, 5, 5]}
          color="#ffffff"
          intensity={5}
        />
        <ambientLight color="#ffffff" intensity={0.5} />
        <group>
          <Cube autoRotate={autoRotate} generatedTexture={generatedTexture} />
        </group>
        <EffectComposer multisampling={0}>
          <ColorDepth bits={16} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

type CubeProps = {
  autoRotate?: boolean
  generatedTexture: Blob | null
}

const Cube = ({ autoRotate = true, generatedTexture }: CubeProps) => {
  const meshRef = useRef<Mesh>(null)
  const [textureUrl, setTextureUrl] = useState("/creator.png")

  useEffect(() => {
    if (!generatedTexture) return
    const url = URL.createObjectURL(generatedTexture)
    setTextureUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [generatedTexture])

  const texture = useTexture(textureUrl)

  texture.minFilter = NearestFilter
  texture.magFilter = NearestFilter

  useFrame(() => {
    if (meshRef.current) {
      if (autoRotate) {
        animate(
          meshRef.current.rotation,
          {
            y: meshRef.current.rotation.y + 0.2,
            x: Math.PI / 7,
            z: 0,
          },
          { duration: 0.25 },
        )
      } else {
        animate(
          meshRef.current.rotation,
          {
            y: 0,
            x: 0,
            z: 0,
          },
          { duration: 0.25 },
        )
      }
    }
  })

  return (
    <mesh castShadow={true} receiveShadow={true} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}
