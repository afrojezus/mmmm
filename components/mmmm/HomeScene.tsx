"use client";

import classes from "@/styles/3d.module.css";
import { Canvas, type MeshProps, useLoader } from "@react-three/fiber";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
} from "@react-three/postprocessing";
import { motion as domMotion } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type MmmmProps = Parameters<typeof motion.mesh>[0] & {
	geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
		Parameters<typeof motion.boxGeometry>[0] &
		Parameters<typeof motion.planeGeometry>[0];
	shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
	src?: string;
};

const Mmmm = (props: MmmmProps) => {
	const { geometryProps, shaderProps, src, ...rest } = props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, src ?? "/mmmm.webp");

	return (
		<>
			<motion.mesh ref={ref} castShadow receiveShadow {...rest}>
				<motion.boxGeometry args={[1, 1, 1]} {...geometryProps} />
				<motion.meshStandardMaterial
					ref={materialRef}
					map={texture}
					attach="material"
					{...shaderProps}
				/>
			</motion.mesh>
		</>
	);
};

const CubeFloor = ({
	cols = 50,
	rows = 30,
	gutter = 1,
	...rest
}: {
	cols?: number;
	rows?: number;
	gutter?: number;
} & Parameters<typeof motion.group>[0]) => {
	const mmmm = useMemo(() => {
		const temp = [];
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				temp.push(
					<Mmmm
						key={`${i}-${j}`}
						position={[
							i * (gutter + 1) - (cols * (gutter + 1)) / 2,
							0,
							j * (gutter + 1) - (rows * (gutter + 1)) / 2,
						]}
						transition={{
							y: {
								repeat: Number.POSITIVE_INFINITY,
								duration: 10,
							},
						}}
						shaderProps={{
							animate: {
								color: "#555555",
							},
						}}
					/>,
				);
			}
		}
		return temp;
	}, [cols, rows, gutter]);
	return <motion.group {...rest}>{mmmm}</motion.group>;
};

const HomeScene = () => {
	const mouse = useRef<[number, number]>([0, 0]);
	const mounted = useRef(false);
	const [frame, setFrame] = useState(-1);
	const intervalRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		const interval = intervalRef.current;
		const cleanup = () => {
			clearInterval(interval);
			setFrame(-1);
		};
		const animate = () => {
			intervalRef.current = setInterval(() => {
				setFrame((prev) => {
					if (prev === 2) {
						return prev;
					}
					return prev + 1;
				});
			}, 1000);
		};
		animate();
		return cleanup();
	}, []);

	const TITLE_FRAME = frame <= 0;
	const CUBE_FRAME = frame > 0;

	return (
		<div className={[classes.canvas].filter(Boolean).join(" ")}>
			<domMotion.h1
				className={classes.title}
				initial={{
					opacity: 0,
					zIndex: 2,
				}}
				animate={TITLE_FRAME ? "visible" : "hidden"}
				variants={{
					visible: {
						opacity: 1,
						zIndex: 2,
					},
					hidden: {
						opacity: 0.5,
						zIndex: -2,
					},
				}}
				transition={{
					duration: 1,
					ease: "linear",
				}}
			>
				mmmm.moe
			</domMotion.h1>
			<Suspense fallback={null}>
				<Canvas
					linear
					dpr={1}
					gl={{
						alpha: true,
					}}
					scene={{
						background: null,
					}}
				>
					<motion.group>
						<motion.directionalLight
							position={[0, 400, 1200]}
							args={["#ffffff", 3]}
							castShadow
						/>
						<Mmmm
							initial={{
								rotateX: 0.5,
								y: -100,
							}}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.5,
								y: 0,
							}}
							transition={{
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								y: {
									duration: 2.7,
								},
							}}
							shaderProps={{
								initial: {
									color: "#000",
								},
								animate: CUBE_FRAME ? "visible" : "hidden",
								variants: {
									visible: {
										color: "#fff",
									},
									hidden: {
										color: "#000",
									},
								},
								transition: {
									duration: 1,
									ease: "linear",
								},
							}}
						/>
						<Mmmm
							src="/myon.png"
							initial={{
								rotateX: 0.5,
								y: -100,
								x: 0,
								z: -2,
							}}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.5,
								y: 2,
							}}
							transition={{
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								y: {
									duration: 2.4,
								},
							}}
							shaderProps={{
								initial: {
									color: "#000",
								},
								animate: CUBE_FRAME ? "visible" : "hidden",
								variants: {
									visible: {
										color: "#fff",
									},
									hidden: {
										color: "#000",
									},
								},
								transition: {
									duration: 1,
									ease: "linear",
								},
							}}
						/>
						<Mmmm
							src="/uuuu2.webp"
							initial={{
								rotateX: 0.5,
								y: -100,
								x: -2,
							}}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.5,
								y: 0,
							}}
							transition={{
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								y: {
									duration: 3,
								},
							}}
							shaderProps={{
								initial: {
									color: "#000",
								},
								animate: CUBE_FRAME ? "visible" : "hidden",
								variants: {
									visible: {
										color: "#fff",
									},
									hidden: {
										color: "#000",
									},
								},
								transition: {
									duration: 1,
									ease: "linear",
								},
							}}
						/>
						<Mmmm
							src="/uuuu.webp"
							initial={{
								rotateX: 0.5,
								y: -100,
								x: 2,
							}}
							animate={{
								rotateY: [0, 180, 360],
								rotateX: 0.5,
								y: 0,
							}}
							transition={{
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								y: {
									duration: 2.5,
								},
							}}
							shaderProps={{
								initial: {
									color: "#000",
								},
								animate: CUBE_FRAME ? "visible" : "hidden",
								variants: {
									visible: {
										color: "#fff",
									},
									hidden: {
										color: "#000",
									},
								},
								transition: {
									duration: 1,
									ease: "linear",
								},
							}}
						/>
					</motion.group>
					<EffectComposer>
						<Bloom
							luminanceThreshold={0.5}
							luminanceSmoothing={1}
							height={1000}
							opacity={0.9}
						/>
					</EffectComposer>
				</Canvas>
			</Suspense>
		</div>
	);
};

export default HomeScene;
