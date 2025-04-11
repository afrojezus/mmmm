"use client";
import { Canvas, type MeshProps, useLoader } from "@react-three/fiber";
import {
	Bloom,
	DepthOfField,
	EffectComposer,
} from "@react-three/postprocessing";
import { motion } from "framer-motion-3d";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StupidMarquees from "../StupidMarquees";

type CommonProps = {
	isHovered: boolean;
};

type MmmCubeProps = CommonProps &
	Parameters<typeof motion.mesh>[0] & {
		sphere?: boolean;
		geometryProps?: Parameters<typeof motion.sphereGeometry>[0] &
			Parameters<typeof motion.boxGeometry>[0] &
			Parameters<typeof motion.planeGeometry>[0];
		shaderProps?: Parameters<typeof motion.meshStandardMaterial>[0];
	};

export const MmmCube = (props: MmmCubeProps) => {
	const { isHovered, sphere, geometryProps, shaderProps, ...rest } = props;
	const ref = useRef<MeshProps>(null);
	const materialRef = useRef(null);
	const texture = useLoader(THREE.TextureLoader, "/mmmm.webp");

	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.NearestFilter;

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
				<motion.pointLight
					intensity={3}
					position={[1, 1, 1]}
					color="#ff7be9"
				/>
			</motion.mesh>
		</>
	);
};

const Scene = (
	props: CommonProps & { mouse: React.RefObject<[number, number]> },
) => {
	const { isHovered, mouse } = props;
	const [frame, setFrame] = useState(-1);
	const intervalRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		const interval = intervalRef.current;
		const cleanup = () => {
			clearInterval(interval);
			setFrame(-1);
		};
		if (!isHovered) return cleanup();
		const animate = () => {
			intervalRef.current = setInterval(() => {
				setFrame((prev) => prev + 1);
			}, 100);
		};
		animate();
		return cleanup();
	}, [isHovered]);

	const LOADING_FRAME = frame < 0 && isHovered;
	const SPINNING_FRAME = frame >= 0;
	const FRAME_ONE = frame >= 73;
	const FRAME_TWO = frame >= 146;

	return (
		<>
			<StupidMarquees visible={FRAME_TWO} />
			<Canvas
				shadows
				gl={{
					antialias: false,
					alpha: true,
					logarithmicDepthBuffer: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1,
				}}
				dpr={0.5}
				camera={{
					fov: 60,
					near: 0.1,
					far: 2000,
				}}
			>
				<motion.ambientLight
					animate={
						FRAME_TWO
							? {
									color: "#ff7be9",
							  }
							: {
									color: "white",
							  }
					}
				/>
				<motion.directionalLight
					position={[0, 0, -50]}
					rotation={[90, 0, 90]}
					intensity={10}
					castShadow
					color="#ff7be9"
				/>
				<Suspense>
					<MmmCube
						isHovered={isHovered}
						position={[0, 0, 0]}
						animate={
							LOADING_FRAME
								? "idle"
								: FRAME_ONE
								  ? "fullSpin"
								  : SPINNING_FRAME
									  ? "xSpin"
									  : "idle"
						}
						variants={{
							idle: {
								rotateY: 0,
								rotateX: 0,
								rotateZ: 0,
							},
							xSpin: {
								rotateY: [0, 180, 360],
								z: 0,
							},
							fullSpin: {
								rotateY: [0, 180, 360],
								rotateX: [0, 180, 360],
								rotateZ: [0, 360, 0, 180, 0, 360],
								z: -5,
							},
						}}
						transition={{
							z: {
								duration: 0.1,
							},
							rotateY: {
								duration: 1,
							},
							rotateX: {
								duration: 1,
							},
							rotateZ: {
								duration: 0.1,
							},
							...(isHovered && {
								z: {
									duration: 4,
									ease: "linear",
								},
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
							}),
						}}
					/>
				</Suspense>
				<Suspense>
					<motion.group
						initial={{ scale: 0 }}
						animate={FRAME_ONE ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
					>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -2,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 4,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 60,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 2,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 4,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 60,
									ease: "linear",
								},
							}}
						/>
					</motion.group>
				</Suspense>
				<Suspense>
					<motion.group
						initial={{ scale: 0 }}
						animate={FRAME_TWO ? "visible" : "hidden"}
						variants={{
							visible: {
								scale: 1,
							},
							hidden: {
								scale: 0,
							},
						}}
					>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 2,
								y: 3,
								z: -3,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -1,
								y: 3,
								z: -2,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -1,
								y: -1,
								z: 1,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 1,
								y: -1,
								z: 2,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 1,
								y: -1,
								z: -10,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -5,
								y: -1,
								z: -25,
								rotateY: [0, 180, 360],
								rotateX: [0, 90, 0, 90],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 8,
								y: 4,
								z: -25,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 8,
								y: 4,
								z: -10,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -8,
								y: 4,
								z: -10,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: 0,
								y: 10,
								z: -50,
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
						<MmmCube
							isHovered={isHovered}
							animate={{
								x: -0.3,
								y: -0.9,
								z: 4.5,
								rotateX: [0, 180, 360],
								rotateY: [0, 180, 360],
							}}
							transition={{
								duration: 1,
								ease: "linear",
								rotateY: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateZ: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 180,
									ease: "linear",
								},
								rotateX: {
									repeat: Number.POSITIVE_INFINITY,
									duration: 360,
									ease: "linear",
								},
							}}
						/>
					</motion.group>
				</Suspense>
				<EffectComposer multisampling={0}>
					<DepthOfField
						focusDistance={0}
						focalLength={0.08}
						bokehScale={FRAME_TWO ? 100 : 0}
						height={FRAME_TWO ? 3 : 0}
					/>
					<DepthOfField
						focusDistance={0}
						focalLength={0.01}
						bokehScale={3}
						height={1000}
					/>
					<Bloom
						luminanceThreshold={0.5}
						luminanceSmoothing={1}
						height={1000}
						opacity={FRAME_TWO ? 0.9 : 0.5}
					/>
				</EffectComposer>
			</Canvas>
		</>
	);
};

export default Scene;
