import { useEffect, useState } from "react"

type WebGlWrapperProps = {
  children: React.ReactNode
}

function checkIfWebGLAvailable() {
  return (
    !!window.WebGLRenderingContext &&
    !!document.createElement("canvas").getContext("webgl")
  )
}

export function WebGlWrapper({ children }: WebGlWrapperProps) {
  const [isWebGlAvailable, setIsWebGlAvailable] = useState(true)

  useEffect(() => {
    if (!checkIfWebGLAvailable()) {
      setIsWebGlAvailable(false)
    }
  }, [])

  if (!isWebGlAvailable) {
    return <p>WebGL is not supported by your browser.</p>
  }

  return <>{children}</>
}
