import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { ConsoleEffect } from "@/components/ConsoleEffect"
import { RootHeader } from "@/components/RootHeader"

const ThreejsDefaults = lazy(() => import("@/components/ThreejsDefaults"))
const HomeRoute = lazy(() => import("@/routes/HomeRoute"))
const ThreeDRoute = lazy(() => import("@/routes/ThreeDRoute"))
const DayWinterRoute = lazy(() => import("@/routes/DayWinterRoute"))
const MamboRoute = lazy(() => import("@/routes/MamboRoute"))
const MikuRoute = lazy(() => import("@/routes/MikuRoute"))
const MyonRoute = lazy(() => import("@/routes/MyonRoute"))
const SummerRoute = lazy(() => import("@/routes/SummerRoute"))
const UuuuRoute = lazy(() => import("@/routes/UuuuRoute"))
const WinterRoute = lazy(() => import("@/routes/WinterRoute"))
const CreatorRoute = lazy(() => import("@/routes/CreatorRoute"))

function RouteFallback() {
  return null
}

export default function App() {
  return (
    <>
      <ConsoleEffect />
      <RootHeader />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/3d" element={<ThreeDRoute />} />
          <Route path="/daywinter" element={<DayWinterRoute />} />
          <Route path="/mambo" element={<MamboRoute />} />
          <Route path="/miku" element={<MikuRoute />} />
          <Route path="/myon" element={<MyonRoute />} />
          <Route path="/summer" element={<SummerRoute />} />
          <Route path="/uuuu" element={<UuuuRoute />} />
          <Route path="/winter" element={<WinterRoute />} />
          <Route path="/creator" element={<CreatorRoute />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <ThreejsDefaults />
      </Suspense>
      <div className="scanlines" />
    </>
  )
}
