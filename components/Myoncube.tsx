import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber';
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise,
} from '@react-three/postprocessing';
import { motion, MotionCanvas } from 'framer-motion-3d';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { NearestFilter } from 'three';
import { useState } from 'react';
import StupidMarquees from './StupidMarquees';
import MyonLyrics from './MyonLyrics';

export const MyonCube = ({
    isHovered,
    sub,
    position,
    still,
    noXRotate,
    color,
    frameTwo,
    playbackRate,
    ...props
}: any) => {
    const ref = useRef<MeshProps>(null);
    const materialRef = useRef(null);
    const texture = useLoader(THREE.TextureLoader, '/myon.png');
    useEffect(() => {
        if (texture) {
            texture.minFilter = NearestFilter;
            texture.magFilter = NearestFilter;
        }
    }, [texture]);

    useFrame((state, delta) => {
        if (ref.current && materialRef.current) {
            const threeMesh = ref.current as unknown as THREE.Mesh;
            const threeMaterial =
                materialRef.current as unknown as THREE.MeshStandardMaterial;
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
    });

    return (
        <>
            <motion.mesh
                ref={ref}
                animate={sub ? props.animate : isHovered ? 'hovered' : 'normal'}
                variants={
                    sub
                        ? props.variants
                        : {
                              normal: {
                                  scale: 1,
                                  z: 0,
                                  rotateX: 0,
                                  rotateY: 0,
                              },
                              hovered: { scale: 1.1, z: 1 },
                          }
                }
                {...props}
                position={position}
            >
                <motion.boxGeometry args={[1, 1, 1]} />
                <motion.meshStandardMaterial
                    ref={materialRef}
                    initial={props.colorInitial}
                    animate={
                        sub
                            ? props.colorAnimate
                            : isHovered
                            ? 'hovered'
                            : 'normal'
                    }
                    variants={
                        sub
                            ? props.colorVariants
                            : {
                                  normal: { color: color ?? 'white' },
                                  hovered: { color: '#e8ffe1' },
                              }
                    }
                    map={texture}
                />
            </motion.mesh>
        </>
    );
};

let t1: NodeJS.Timeout;
let t2: NodeJS.Timeout;
let t3: NodeJS.Timeout;
let t4: NodeJS.Timeout;

const Scene = ({ isHovered, onHoverStart, onHoverEnd, playbackRate }: any) => {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        if (isHovered) {
            t1 = setTimeout(() => {
                setFrame(1);
            }, 15000);
            t2 = setTimeout(() => {
                setFrame(2);
            }, 26000);
            t3 = setTimeout(() => {
                setFrame(3);
            }, 30500);
            t3 = setTimeout(() => {
                setFrame(4);
            }, 60500);
        } else {
            setFrame(0);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        }

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [isHovered]);
    return (
        <>
            <StupidMarquees
                direction="right"
                opacity={0.4}
                myon
                visible={frame > 3}
            />
            <Canvas flat shadows dpr={[1, 2]}>
                <motion.ambientLight
                    initial={{ color: 'black' }}
                    animate={{
                        color: '#a0a0a0',
                        ...(frame > 0 && {
                            color: '#6aa376',
                        }),
                    }}
                />
                <motion.pointLight
                    animate={
                        isHovered
                            ? {
                                  x: 5,
                                  y: 10,
                                  z: 10,
                              }
                            : {
                                  x: 0,
                                  y: 10,
                                  z: 0,
                              }
                    }
                    transition={{
                        duration: 1,
                    }}
                />
                <Suspense>
                    <motion.group>
                        <MyonCube
                            playbackRate={playbackRate}
                            still={!isHovered}
                            onHoverStart={onHoverStart}
                            onHoverEnd={onHoverEnd}
                            isHovered={isHovered}
                            position={[0, 0, 0]}
                        />
                        <MyonCube
                            playbackRate={playbackRate}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                ...(isHovered && {
                                    scale: 1,
                                    z: -1,
                                }),
                                ...(frame === 3 && {
                                    z: -2,
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                }),
                            }}
                            sub
                            position={[1.5, 1, -15]}
                        />
                        <MyonCube
                            playbackRate={playbackRate}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                ...(isHovered && {
                                    scale: 1,
                                    z: -1,
                                }),
                                ...(frame === 3 && {
                                    z: -2,
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                }),
                            }}
                            sub
                            position={[-1.5, 1, -15]}
                        />
                        <MyonCube
                            playbackRate={playbackRate}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                ...(isHovered && {
                                    scale: 1,
                                    z: -1,
                                }),
                                ...(frame === 3 && {
                                    z: -2,
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                }),
                            }}
                            sub
                            position={[1.5, -1, -15]}
                        />
                        <MyonCube
                            playbackRate={playbackRate}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            initial={{
                                scale: 0,
                            }}
                            animate={{
                                ...(isHovered && {
                                    scale: 1,
                                    z: -1,
                                }),
                                ...(frame === 3 && {
                                    z: -2,
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                }),
                            }}
                            sub
                            position={[-1.5, -1, -15]}
                        />
                        <MyonCube
                            noXRotate
                            playbackRate={1.3}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 0 && {
                                    z: -2,
                                    x: -3,
                                    y: -2,
                                    scale: 2,
                                }),
                                ...(frame === 3 && {
                                    z: 15,
                                    x: -3,
                                    y: -2,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            noXRotate
                            playbackRate={1.3}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 0 && {
                                    z: -2,
                                    x: 3,
                                    y: -2,
                                    scale: 2,
                                }),
                                ...(frame === 3 && {
                                    z: 15,
                                    x: 3,
                                    y: -2,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            noXRotate
                            playbackRate={1.3}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 0 && {
                                    z: -2,
                                    x: -3,
                                    y: 2,
                                    scale: 2,
                                }),
                                ...(frame === 3 && {
                                    z: 15,
                                    x: -3,
                                    y: 2,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            noXRotate
                            playbackRate={1.3}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 0 && {
                                    z: -2,
                                    x: 3,
                                    y: 2,
                                    scale: 2,
                                }),
                                ...(frame === 3 && {
                                    z: 15,
                                    x: 3,
                                    y: 2,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            playbackRate={0.4}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 1 && {
                                    z: -2,
                                    x: 0,
                                    y: 2,
                                    scale: 2,
                                }),
                                ...(frame > 2 && {
                                    z: 10,
                                    x: 0,
                                    y: 4,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            playbackRate={0.4}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: 'white',
                                }),
                            }}
                            sub
                            initial={{
                                z: -3,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 1 && {
                                    z: -2,
                                    x: 0,
                                    y: -2,
                                    scale: 2,
                                }),
                                ...(frame > 2 && {
                                    z: 10,
                                    x: 0,
                                    y: -4,
                                    scale: 2,
                                }),
                            }}
                        />
                        <MyonCube
                            playbackRate={0.2}
                            colorInitial={{
                                color: 'black',
                            }}
                            colorAnimate={{
                                ...(isHovered && {
                                    color: '#b4edff',
                                }),
                            }}
                            sub
                            initial={{
                                z: -30,
                                x: 0,
                                y: 0,
                                scale: 0,
                            }}
                            animate={{
                                ...(frame > 3 && {
                                    z: -100,
                                    x: 0,
                                    y: 0,
                                    scale: 70,
                                }),
                            }}
                        />
                    </motion.group>
                </Suspense>
                <EffectComposer>
                    <DepthOfField
                        focusDistance={0}
                        focalLength={0.08}
                        bokehScale={20}
                        height={frame > 3 ? 2 : 180}
                    />
                    <DepthOfField
                        focusDistance={0}
                        focalLength={0.08}
                        bokehScale={10}
                        height={isHovered ? 200 : 1}
                    />
                    <Bloom
                        luminanceThreshold={0.6}
                        luminanceSmoothing={1}
                        height={400}
                        opacity={isHovered ? 0.9 : 0.1}
                    ></Bloom>
                    <Noise opacity={0.1} />
                </EffectComposer>
            </Canvas>
            <StupidMarquees myon visible={frame > 3} />
            <MyonLyrics visible={frame === 3} opacity={1} />
        </>
    );
};

export default Scene;
