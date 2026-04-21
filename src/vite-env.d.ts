/// <reference types="vite/client" />

declare module "*.module.css" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.module.scss" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.module.sass" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.css" {
  const content: string
  export default content
}

declare module "*.scss" {
  const content: string
  export default content
}

declare module "*.sass" {
  const content: string
  export default content
}

declare module "use-sound" {
  export default function useSound(
    src: string,
    options?: {
      volume?: number
      playbackRate?: number
      interrupt?: boolean
    },
  ): [
    () => void,
    {
      stop: () => void
      sound: {
        on: (event: string, callback: () => void) => void
        volume: (volume: number) => void
      } | null
    },
  ]
}
