import { Sparkles, Stars, useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { ColorDepth, EffectComposer } from "@react-three/postprocessing"
import { animate } from "motion"
import { useEffect, useRef, useState } from "react"
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  type Points,
  type RectAreaLight,
  TextureLoader,
} from "three"
import { useDebounce } from "@/hooks/use-debounce"
import { BASIC_COLOURS, SKIN_COLOURS } from "./colours"
import classes from "./creator.module.css"
import { SwatchInput } from "./SwatchInput"

const HAIR_COLOUR_SWATCHES = BASIC_COLOURS
const EYE_COLOUR_SWATCHES = BASIC_COLOURS
const SKIN_COLOUR_SWATCHES = SKIN_COLOURS

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
  const [worker, setWorker] = useState<Worker | null>(null)
  const [baseColorMapData, setBaseColorMapData] = useState<ArrayBuffer | null>(
    null,
  )
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [generatedTexture, setGeneratedTexture] = useState<Blob | null>(null)
  const [hairColour, setHairColour] = useState(HAIR_COLOUR_SWATCHES[0])
  const [eyeColour, setEyeColour] = useState(EYE_COLOUR_SWATCHES[0])
  const [skinColour, setSkinColour] = useState(SKIN_COLOUR_SWATCHES[0])
  const customNameRef = useRef<HTMLInputElement>(null)
  const [showControls, setShowControls] = useState(false)

  const debouncedHairColour = useDebounce(hairColour, 250)
  const debouncedEyeColour = useDebounce(eyeColour, 250)
  const debouncedSkinColour = useDebounce(skinColour, 250)

  useEffect(() => {
    const loadBaseMap = async () => {
      const colorMap = new Image()
      colorMap.src = new URL("/creator-color-map.png", import.meta.url).href

      await new Promise<void>((resolve) => {
        colorMap.onload = () => {
          const tempCanvas = document.createElement("canvas")
          tempCanvas.width = 2000
          tempCanvas.height = 2000
          const ctx = tempCanvas.getContext("2d")

          if (!ctx) return

          ctx.drawImage(colorMap, 0, 0)

          const imageData = ctx.getImageData(0, 0, 2000, 2000)

          setBaseColorMapData(imageData.data.buffer)
          setMapDimensions({ width: 2000, height: 2000 })
          resolve()
        }
      })
    }

    loadBaseMap()
  }, [])

  useEffect(() => {
    const newWorker = new Worker(
      new URL("./generateTexture.worker", import.meta.url),
      { type: "module" },
    )
    setWorker(newWorker)
    newWorker.onmessage = (e) => {
      const blob = e.data
      if (blob) {
        setGeneratedTexture(blob)
      } else {
        console.error("Failed to generate texture in worker.")
        setGeneratedTexture(null)
      }
    }

    return () => {
      newWorker.terminate()
    }
  }, [])

  useEffect(() => {
    if (!worker || !baseColorMapData) return

    const colorsToSend = {
      hairColour: debouncedHairColour,
      eyeColour: debouncedEyeColour,
      skinColour: debouncedSkinColour,
      baseColorMapData: baseColorMapData,
      width: mapDimensions.width,
      height: mapDimensions.height,
    }

    worker.postMessage(colorsToSend)
  }, [
    debouncedHairColour,
    debouncedEyeColour,
    debouncedSkinColour,
    baseColorMapData,
    mapDimensions,
    worker,
  ])

  const handleDownloadPng = () => {
    if (generatedTexture) {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(generatedTexture)
      const name = customNameRef.current?.value || "my-mmmm"
      link.download = `${name}.png`
      link.click()
      URL.revokeObjectURL(link.href)
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
          defaultValue="my mmmm"
        />
      </section>
      <Renderer
        autoRotate={autoRotate}
        generatedTexture={generatedTexture}
        colours={{
          hairColour: debouncedHairColour,
          eyeColour: debouncedEyeColour,
          skinColour: debouncedSkinColour,
        }}
      />
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
            <SwatchInput
              id="hairColour"
              name="hairColour"
              label="Hair colour"
              value={hairColour}
              colours={HAIR_COLOUR_SWATCHES}
              onChange={(colour) => setHairColour(colour)}
            />
            <SwatchInput
              id="eyeColour"
              name="eyeColour"
              label="Eye colour"
              value={eyeColour}
              colours={EYE_COLOUR_SWATCHES}
              onChange={(colour) => setEyeColour(colour)}
            />
            <SwatchInput
              id="skinColour"
              name="skinColour"
              label="Skin colour"
              value={skinColour}
              colours={SKIN_COLOUR_SWATCHES}
              onChange={(colour) => setSkinColour(colour)}
            />
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
  colours: LightsProps
}

const Renderer = ({ generatedTexture, autoRotate, colours }: RendererProps) => {
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
          position={[0, 5, 5]}
          color="#ffffff"
          intensity={2}
        />
        <LightsComponent {...colours} autoRotate={autoRotate} />
        <SkyComponent hairColour={colours.hairColour} autoRotate={autoRotate} />
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

type LightsProps = {
  hairColour: string
  eyeColour: string
  skinColour: string
  autoRotate?: boolean
}

const toThreeColor = (color: string) => {
  return new Color(color)
}

const LightsComponent = ({
  hairColour,
  eyeColour,
  skinColour,
  autoRotate,
}: LightsProps) => {
  const hairLightRef = useRef<RectAreaLight | null>(null)
  const eyeLightRef = useRef<RectAreaLight | null>(null)
  const skinLightRef = useRef<RectAreaLight | null>(null)

  useFrame(() => {
    if (hairLightRef.current) {
      animate(hairLightRef.current.color, toThreeColor(hairColour), {
        duration: 0.1,
      })
      if (autoRotate) {
        animate(hairLightRef.current.intensity, 1, { duration: 0.1 })
      } else {
        animate(hairLightRef.current.intensity, 0, { duration: 0.1 })
      }
    }
    if (eyeLightRef.current) {
      animate(eyeLightRef.current.color, toThreeColor(eyeColour), {
        duration: 0.1,
      })
      if (autoRotate) {
        animate(eyeLightRef.current.intensity, 1, { duration: 0.1 })
      } else {
        animate(eyeLightRef.current.intensity, 0, { duration: 0.1 })
      }
    }
    if (skinLightRef.current) {
      animate(skinLightRef.current.color, toThreeColor(skinColour), {
        duration: 0.1,
      })
      if (autoRotate) {
        animate(skinLightRef.current.intensity, 1, { duration: 0.1 })
      } else {
        animate(skinLightRef.current.intensity, 0, { duration: 0.1 })
      }
    }
  })

  return (
    <group>
      <rectAreaLight ref={hairLightRef} position={[0, 5, 5]} />
      <rectAreaLight ref={eyeLightRef} position={[0, -5, 5]} />
      <rectAreaLight ref={skinLightRef} position={[0, 0, 5]} />
    </group>
  )
}

type SkyProps = Pick<LightsProps, "hairColour" | "autoRotate">

const SkyComponent = ({ autoRotate = true, hairColour }: SkyProps) => {
  const sparklesRef = useRef<Points | null>(null)
  const starsRef = useRef<Points | null>(null)

  useFrame(() => {
    if (sparklesRef.current) {
      if (autoRotate) {
        animate(
          sparklesRef.current?.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          { duration: 0.1 },
        )
        if (starsRef.current) {
          animate(
            starsRef.current.scale,
            {
              x: 0.2,
              y: 0.2,
              z: 10,
            },
            { duration: 0.1 },
          )
        }
      } else {
        animate(
          sparklesRef.current?.scale,
          {
            x: 5,
            y: 5,
            z: 5,
          },
          { duration: 0.1 },
        )
        if (starsRef.current) {
          animate(
            starsRef.current.scale,
            {
              x: 10,
              y: 10,
              z: 10,
            },
            { duration: 0.1 },
          )
        }
      }
    }
  })

  return (
    <>
      <Sparkles ref={sparklesRef} noise={2} count={1000} color={hairColour} />
      <Stars
        ref={starsRef}
        fade
        speed={1}
        depth={50}
        count={10000}
        factor={2}
        saturation={10}
      />
      <pointLight position={[0, 0, 1]} intensity={0.2} />
    </>
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
