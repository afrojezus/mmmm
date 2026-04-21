import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

function normalizePath(id: string) {
  return id.replaceAll("\\", "/")
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = normalizePath(id)

          if (!normalizedId.includes("node_modules")) {
            return
          }

          if (
            normalizedId.includes("@react-three/fiber") ||
            normalizedId.includes("@react-three/drei") ||
            normalizedId.includes("@react-three/postprocessing") ||
            normalizedId.includes("/three/")
          ) {
            return "three-vendor"
          }

          if (normalizedId.includes("framer-motion-3d")) {
            return "motion-3d-vendor"
          }

          if (normalizedId.includes("framer-motion")) {
            return "framer-motion-vendor"
          }

          if (normalizedId.includes("motion/react")) {
            return "motion-react-vendor"
          }

          if (normalizedId.includes("motion-dom")) {
            return "motion-dom-vendor"
          }

          if (normalizedId.includes("/node_modules/motion/")) {
            return "motion-core-vendor"
          }

          if (
            normalizedId.includes("howler") ||
            normalizedId.includes("use-sound")
          ) {
            return "audio-vendor"
          }

          if (normalizedId.includes("react-fast-marquee")) {
            return "marquee-vendor"
          }

          if (
            normalizedId.includes("react-router-dom") ||
            normalizedId.includes("react-router") ||
            normalizedId.includes("@remix-run/router")
          ) {
            return "router-vendor"
          }
        },
      },
    },
  },
})
