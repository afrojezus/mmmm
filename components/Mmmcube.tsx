import { Canvas, useFrame, useLoader, MeshProps, useThree } from '@react-three/fiber';
import { Suspense, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion-3d';
import { useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';

export const MmmCube = ({ isHovered, sub, position, still, noXRotate, color, frameTwo, playbackRate, ...props }: any) => {
    const ref = useRef<MeshProps>(null);
    const materialRef = useRef(null);
    const texture = useLoader(THREE.TextureLoader, "/mmmm.webp")
    useFrame((state, delta) => {
        if (ref.current && materialRef.current) {
            const threeMesh = ref.current as unknown as THREE.Mesh
            const threeMaterial = materialRef.current as unknown as THREE.MeshStandardMaterial
            if (!still) {
                if (!noXRotate) {
                    threeMesh.rotation.x += delta * playbackRate;
                }
                threeMesh.rotation.y += 0.01 * playbackRate;
            } else {
                threeMesh.rotation.y = 0;
                threeMesh.rotation.x = 0;
            }
        }
    })

    return <>
        <motion.mesh ref={ref} animate={sub ? props.animate : isHovered ? "hovered" : "normal"}
        variants={sub ? props.variants : {
            normal: { scale: 1, z: 0, rotateX: 0, rotateY: 0 },
            hovered: { scale: 1.1, z: 1 }
        }} {...props} position={position}>
            <motion.boxGeometry args={[1, 1, 1]} />
        <motion.meshStandardMaterial ref={materialRef} initial={props.colorInitial} animate={sub ? props.colorAnimate : isHovered ? "hovered" : "normal"}
            variants={sub ? props.colorVariants :{
                normal: { color: color ?? "white" },
                hovered: { color: "#ffb8e2" }
        }} map={texture} />
            </motion.mesh></>;
}

const Scene = ({ isHovered, frameOne, frameTwo, onHoverStart, onHoverEnd, playbackRate }: any) => {

    return <Canvas flat linear shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
        <motion.ambientLight animate={frameTwo ?{
                color: "#ff7be9"
        } : {
                color: "white"
            }} />
        <motion.pointLight animate={isHovered ? {
                x:5, y:20, z: 10
        } : {
                 x:0, y:10, z: 0
        }} transition={{
                duration: 1
            }} />
            <Suspense>
            <MmmCube playbackRate={playbackRate} still={!isHovered} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} isHovered={isHovered} position={[0, 0, 0]} />
            {frameOne && <>
                <MmmCube playbackRate={playbackRate} noXRotate={!frameTwo} sub colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} animate={{ x: 3, y: 0, z: -5 }}  />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} noXRotate={!frameTwo} sub animate={{ x: -3, y: 0, z: -5  }}  /></>}
            {frameTwo && <>
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[1.5, 1, -15]} animate={{ z: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[-1.5, 1, -15]} animate={{ z: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[1.5, -1, -15]} animate={{ z: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[-1.5, -1, -15]} animate={{ z: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[-3, -2, -15]} animate={{ z: 3, x: -1, y: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[3, -2, -15]} animate={{ z: -1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[3, 2, -15]} animate={{ z: 1 }} />
                <MmmCube playbackRate={playbackRate} colorInitial={{
                    color: "black"
                }} colorAnimate={{
                    color: "#ff7be9"
                }} sub frameTwo={frameTwo} position={[-3,2, -15]} animate={{ z: -3}} />
            </>}
        </Suspense>
        <EffectComposer>
             <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={1}
          height={200}
          opacity={frameTwo ? 4 : 0.1}
        ></Bloom>
        <Noise opacity={0.1} />
        </EffectComposer>
    </Canvas>
}

export default Scene;
